/**
 * PRAMAAN – Shared Type Definitions
 */

export type Language = 'en' | 'hi';
export type ExecutionMode = 'live-discovery' | 'legacy-portal';

export type StepType =
  | 'PLAN'
  | 'NAVIGATE'
  | 'FILL'
  | 'VALIDATION_ERROR'
  | 'SELF_HEAL'
  | 'HITL_PAUSE'
  | 'COMPLETED';

export interface CitizenData {
  fullName: string;
  fatherName: string;
  dateOfBirth: string; // DD/MM/YYYY or YYYY-MM-DD
  gender: string;
  category: string;
  state: string;
  district: string;
  tehsil: string;
  address: string;
  pincode: string;
  annualIncome: string;
  occupation: string;
  aadhaarNumber: string;
  documentType: string;
}

export interface FileMetadata {
  file: File;
  name: string;
  sizeBytes: number;
  sizeKB: number;
  dimensions?: { width: number; height: number };
  previewUrl: string;
  isOversized: boolean; // > 50KB
}

export interface AgentSSEEvent {
  sessionId?: string;
  step_type: StepType;
  screenshot?: string; // base64 JPEG
  dom_selector?: string;
  reasoning: string;
  telemetry: {
    execution_ms: number;
    timestamp: string;
    file_size_before?: number;
    file_size_after?: number;
    reduction_percent?: number;
    quality_used?: number;
    url?: string;
    target_portal?: string;
    total_execution_ms?: number;
    reference_number?: string;
    [key: string]: unknown;
  };
  data?: {
    schemes?: SchemeResult[];
    searchUrl?: string;
    referenceNumber?: string;
    submittedFor?: string;
    state?: string;
    captchaScreenshot?: string;
    captchaImage?: string;
    expectedCaptcha?: string;
    [key: string]: unknown;
  };
}

export interface PreflightAuditResult {
  eligibility_verdict: 'ELIGIBLE' | 'CONDITIONALLY_ELIGIBLE' | 'INELIGIBLE';
  compliance_score: number;
  matched_criteria: string[];
  detected_portal_traps: Array<{
    trap_id: string;
    field: string;
    issue: string;
    expected: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
    agent_remediation: string;
  }>;
  official_source_url: string;
  citation: string;
  audited_at: string;
}

export interface SchemeResult {
  title: string;
  ministry: string;
  description: string;
  eligibility: string[];
  sourceUrl: string;
  lastVerified: string;
}

export interface BackendHealth {
  status: 'online' | 'offline' | 'checking';
  latencyMs: number;
  version?: string;
}
