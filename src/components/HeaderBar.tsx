import React from 'react';
import type { Language, ExecutionMode, BackendHealth } from './types';

interface HeaderBarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  mode: ExecutionMode;
  onModeChange: (mode: ExecutionMode) => void;
  backendHealth: BackendHealth;
  isExecuting: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  language,
  onLanguageChange,
  mode,
  onModeChange,
  backendHealth,
  isExecuting,
}) => {
  return (
    <header className="border-hairline-b bg-[var(--bg-ledger)] px-4 py-2.5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Gazette Masthead */}
        <div className="flex items-center gap-3">
          <div className="border border-ink bg-white px-2 py-1 text-center select-none">
            <span className="block font-mono text-[9px] tracking-widest text-[var(--ink-muted)]">
              GOVT. OF INDIA
            </span>
            <span className="block font-serif text-sm font-bold leading-none text-ink">
              प्रमाण
            </span>
            <span className="block font-mono text-[8px] font-semibold tracking-tighter text-[var(--ochre)]">
              ESTD. 2026
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg md:text-xl font-bold tracking-tight text-ink">
                PRAMAAN <span className="font-mono text-xs font-normal text-[var(--ink-muted)]">//</span> AUTONOMOUS PUBLIC SERVICE EXECUTION DESK
              </h1>
              <span className="hidden lg:inline-block font-mono text-[10px] bg-white border border-ink px-1.5 py-0.5 tracking-wider uppercase font-semibold text-[var(--stamp-green)]">
                VERIFIED CSC RUNTIME
              </span>
            </div>
            <p className="font-mono text-[11px] text-[var(--ink-muted)] tracking-wide">
              FORM NO. NIC-EXEC-1.3 • LIVE PLAYWRIGHT &amp; DOM REMEDIATION ENGINE • NXTWAVE LAUNCHPAD FORGE
            </p>
          </div>
        </div>

        {/* Center/Right: System Telemetry & Mode Switches */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Backend Health Badge */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono border ${
              backendHealth.status === 'online'
                ? 'bg-[var(--stamp-green-bg)] text-[var(--stamp-green)] border-[var(--stamp-green)]'
                : backendHealth.status === 'checking'
                ? 'bg-white text-[var(--ink-muted)] border-ink'
                : 'bg-[var(--ochre-bg)] text-[var(--ochre)] border-[var(--ochre)]'
            }`}
            title="Backend Express server status on port 3001"
          >
            <span
              className={`inline-block w-1.5 h-1.5 ${
                backendHealth.status === 'online'
                  ? 'bg-[var(--stamp-green)]'
                  : backendHealth.status === 'checking'
                  ? 'bg-gray-400 animate-pulse'
                  : 'bg-[var(--ochre)]'
              }`}
            />
            <span>
              {backendHealth.status === 'online'
                ? `PORT 3001: ONLINE (${backendHealth.latencyMs}ms)`
                : backendHealth.status === 'checking'
                ? 'PINGING /API/HEALTH...'
                : 'PORT 3001: OFFLINE'}
            </span>
          </div>

          {/* Mode Selector */}
          <div className="flex border border-ink bg-white">
            <button
              type="button"
              disabled={isExecuting}
              onClick={() => onModeChange('live-discovery')}
              className={`px-3 py-1 font-mono text-[11px] font-semibold tracking-wider uppercase transition-colors ${
                mode === 'live-discovery'
                  ? 'bg-ink text-[var(--bg-paper)]'
                  : 'text-ink hover:bg-[var(--bg-ledger)]'
              }`}
            >
              [01] LIVE MYSCHEME.GOV.IN
            </button>
            <button
              type="button"
              disabled={isExecuting}
              onClick={() => onModeChange('legacy-portal')}
              className={`px-3 py-1 font-mono text-[11px] font-semibold tracking-wider uppercase border-l border-ink transition-colors ${
                mode === 'legacy-portal'
                  ? 'bg-ink text-[var(--bg-paper)]'
                  : 'text-ink hover:bg-[var(--bg-ledger)]'
              }`}
            >
              [02] FULL E2E NIC PORTAL
            </button>
          </div>

          {/* Language Toggle */}
          <div className="flex border border-ink bg-white font-mono text-[11px]">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 font-bold ${
                language === 'en'
                  ? 'bg-ink text-[var(--bg-paper)]'
                  : 'text-ink hover:bg-[var(--bg-ledger)]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-1 font-bold border-l border-ink ${
                language === 'hi'
                  ? 'bg-ink text-[var(--bg-paper)]'
                  : 'text-ink hover:bg-[var(--bg-ledger)]'
              }`}
            >
              हिं
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
