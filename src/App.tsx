import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HeaderBar } from './components/HeaderBar';
import { CitizenDossier } from './components/CitizenDossier';
import { LiveBrowserViewport } from './components/LiveBrowserViewport';
import { ExecutionLedger } from './components/ExecutionLedger';
import type {
  CitizenData,
  FileMetadata,
  Language,
  ExecutionMode,
  AgentSSEEvent,
  BackendHealth,
  SchemeResult,
  PreflightAuditResult,
} from './components/types';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [mode, setMode] = useState<ExecutionMode>('legacy-portal');
  const [isExecuting, setIsExecuting] = useState(false);
  const [events, setEvents] = useState<AgentSSEEvent[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isHITLPaused, setIsHITLPaused] = useState(false);
  const [fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null);
  const [liveSchemes, setLiveSchemes] = useState<SchemeResult[]>([]);
  const [preflightAudit, setPreflightAudit] = useState<PreflightAuditResult | null>(null);
  const [isRunningPreflight, setIsRunningPreflight] = useState(false);

  const [backendHealth, setBackendHealth] = useState<BackendHealth>({
    status: 'checking',
    latencyMs: 0,
  });

  // Default Dossier with deliberate ISO date (YYYY-MM-DD) to test self-correction trap!
  const [dossier, setDossier] = useState<CitizenData>({
    fullName: 'Aarav Rajesh Sharma',
    fatherName: 'Rajesh Sharma',
    dateOfBirth: '1995-08-15', // Deliberate YYYY-MM-DD format to demonstrate self-healing!
    gender: 'Male',
    category: 'General',
    state: 'Maharashtra',
    district: 'Pune',
    tehsil: 'Haveli',
    address: 'Flat 402, Shanti Heights, FC Road, Pune, Maharashtra',
    pincode: '411005',
    annualIncome: '180000',
    occupation: 'Student / Researcher',
    aadhaarNumber: '8912 3456 7890',
    documentType: 'Aadhaar Card',
  });

  // ── Ping Backend Health ────────────────────────────────────────────────────
  const checkHealth = useCallback(async () => {
    const start = Date.now();
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setBackendHealth({
          status: 'online',
          latencyMs: Date.now() - start,
          version: data.version,
        });
      } else {
        setBackendHealth({ status: 'offline', latencyMs: 0 });
      }
    } catch {
      setBackendHealth({ status: 'offline', latencyMs: 0 });
    }
  }, []);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  // ── File Selection & Metadata Inspection ───────────────────────────────────
  const handleFileSelect = useCallback((file: File) => {
    const sizeBytes = file.size;
    const sizeKB = Math.round((sizeBytes / 1024) * 10) / 10;
    const isOversized = sizeBytes > 50 * 1024; // >50KB government portal limit
    const previewUrl = URL.createObjectURL(file);

    // Read image dimensions if image
    if (file.type.startsWith('image/')) {
      const img = new Image();
      img.onload = () => {
        setFileMetadata({
          file,
          name: file.name,
          sizeBytes,
          sizeKB,
          dimensions: { width: img.naturalWidth, height: img.naturalHeight },
          previewUrl,
          isOversized,
        });
      };
      img.src = previewUrl;
    } else {
      setFileMetadata({
        file,
        name: file.name,
        sizeBytes,
        sizeKB,
        previewUrl,
        isOversized,
      });
    }
  }, []);

  // ── Execute Autonomous Agent Stream ────────────────────────────────────────
  const handleExecuteAgent = useCallback(async () => {
    setIsExecuting(true);
    setEvents([]);
    setIsHITLPaused(false);
    setSessionId(null);

    const formData = new FormData();
    formData.append('mode', mode);
    formData.append('fullName', dossier.fullName);
    formData.append('fatherName', dossier.fatherName);
    formData.append('dateOfBirth', dossier.dateOfBirth);
    formData.append('gender', dossier.gender);
    formData.append('category', dossier.category);
    formData.append('state', dossier.state);
    formData.append('district', dossier.district);
    formData.append('tehsil', dossier.tehsil);
    formData.append('address', dossier.address);
    formData.append('pincode', dossier.pincode);
    formData.append('annualIncome', dossier.annualIncome);
    formData.append('occupation', dossier.occupation);
    formData.append('aadhaarNumber', dossier.aadhaarNumber);

    if (fileMetadata?.file) {
      formData.append('photo', fileMetadata.file);
    }

    try {
      const response = await fetch('/api/agent/stream', {
        method: 'POST',
        body: formData,
      });

      if (!response.body) {
        throw new Error('No readable stream returned by agent server');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const rawData = line.slice(6).trim();
              if (rawData === '{"done":true}') {
                setIsExecuting(false);
                continue;
              }

              const event = JSON.parse(rawData) as AgentSSEEvent;

              if (event.sessionId && !sessionId) {
                setSessionId(event.sessionId);
              }

              if (event.step_type === 'HITL_PAUSE') {
                setIsHITLPaused(true);
              } else if (event.step_type === 'COMPLETED') {
                setIsHITLPaused(false);
                setIsExecuting(false);
              }

              if (event.data?.schemes) {
                setLiveSchemes(event.data.schemes);
              }

              if (event.step_type && event.step_type !== ('SESSION_INIT' as any)) {
                setEvents((prev) => [...prev, event]);
              }
            } catch {
              // Ignore partial JSON parse errors in chunk stream
            }
          }
        }
      }
    } catch (err) {
      setEvents((prev) => [
        ...prev,
        {
          step_type: 'VALIDATION_ERROR',
          reasoning: `Stream error: ${err instanceof Error ? err.message : String(err)}`,
          telemetry: { execution_ms: 0, timestamp: new Date().toISOString() },
        },
      ]);
    } finally {
      setIsExecuting(false);
    }
  }, [mode, dossier, fileMetadata, sessionId]);

  // ── Resume HITL CAPTCHA ────────────────────────────────────────────────────
  const handleResumeHITL = useCallback(
    async (captchaText: string) => {
      if (!sessionId) return;

      const res = await fetch('/api/agent/resume-hitl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, captchaText }),
      });

      const data = await res.json();
      if (data.success) {
        setIsHITLPaused(false);
      } else {
        alert(`HITL Resume Failed: ${data.error || 'Unknown error'}`);
      }
    },
    [sessionId]
  );

  // ── Run AI Pre-Flight Compliance & Citation Audit ────────────────────────
  const handleRunPreflight = useCallback(async () => {
    setIsRunningPreflight(true);
    try {
      const res = await fetch('/api/agent/preflight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dossier,
          photoSizeBytes: fileMetadata?.sizeBytes || 87040,
        }),
      });

      const data = await res.json();
      if (data.success && data.audit) {
        setPreflightAudit(data.audit);
      }
    } catch (err) {
      console.error('Pre-flight audit failed:', err);
    } finally {
      setIsRunningPreflight(false);
    }
  }, [dossier, fileMetadata]);

  // Latest event and self-heal event
  const latestEvent = useMemo(() => {
    return events.length > 0 ? events[events.length - 1] : null;
  }, [events]);

  const selfHealEvent = useMemo(() => {
    return [...events].reverse().find((e) => e.step_type === 'SELF_HEAL') || null;
  }, [events]);

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[var(--bg-paper)] text-ink overflow-hidden">
      {/* 1. Institutional Masthead */}
      <HeaderBar
        language={language}
        onLanguageChange={setLanguage}
        mode={mode}
        onModeChange={setMode}
        backendHealth={backendHealth}
        isExecuting={isExecuting}
      />

      {/* 2. Asymmetric 3-Column Operator Desk */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[28fr_44fr_28fr] overflow-hidden">
        {/* Left Column (28%): Citizen Dossier & Multimodal Ingestion */}
        <CitizenDossier
          language={language}
          mode={mode}
          dossier={dossier}
          onDossierChange={setDossier}
          fileMetadata={fileMetadata}
          onFileSelect={handleFileSelect}
          isExecuting={isExecuting}
          onExecute={handleExecuteAgent}
          liveSchemes={liveSchemes}
          onSchemesDiscovered={setLiveSchemes}
        />

        {/* Center Column (44%): Live Browser Viewport & HITL Console */}
        <LiveBrowserViewport
          language={language}
          latestEvent={latestEvent}
          selfHealEvent={selfHealEvent}
          isHITLPaused={isHITLPaused}
          sessionId={sessionId}
          onResumeHITL={handleResumeHITL}
          isExecuting={isExecuting}
          preflightAudit={preflightAudit}
          onRunPreflight={handleRunPreflight}
          isRunningPreflight={isRunningPreflight}
        />

        {/* Right Column (28%): Deterministic Execution Ledger & Receipt */}
        <ExecutionLedger
          language={language}
          events={events}
          isExecuting={isExecuting}
          onClearLedger={() => setEvents([])}
        />
      </div>
    </div>
  );
}
