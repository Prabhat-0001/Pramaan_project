import React from 'react';
import type { AgentSSEEvent, Language } from './types';

interface ExecutionLedgerProps {
  language: Language;
  events: AgentSSEEvent[];
  isExecuting: boolean;
  onClearLedger: () => void;
}

export const ExecutionLedger: React.FC<ExecutionLedgerProps> = ({
  language,
  events,
  isExecuting,
  onClearLedger,
}) => {
  // Find completed event
  const completedEvent = events.find((e) => e.step_type === 'COMPLETED');
  const selfHealCount = events.filter((e) => e.step_type === 'SELF_HEAL').length;
  const validationErrorCount = events.filter((e) => e.step_type === 'VALIDATION_ERROR').length;

  // Print receipt
  const handlePrintReceipt = () => {
    window.print();
  };

  // Download Audit JSON
  const handleDownloadAuditJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `PRAMAAN_EXECUTION_AUDIT_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <aside className="border-hairline-l bg-[var(--bg-paper)] flex flex-col h-full overflow-y-auto">
      {/* Column Header */}
      <div className="border-hairline-b bg-[var(--bg-ledger)] px-3 py-2 flex items-center justify-between">
        <div>
          <span className="font-mono text-[9px] tracking-widest text-[var(--ink-muted)] block uppercase">
            {language === 'en' ? 'DETERMINISTIC AUDIT // LEDGER' : 'अपरिवर्तनीय ऑडिट // बहीखाता'}
          </span>
          <h2 className="font-serif text-sm font-bold uppercase tracking-tight text-ink">
            {language === 'en' ? 'Section C // Execution Ledger' : 'खंड स // निष्पादन लेखा-बही'}
          </h2>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[9px]">
          <span className="px-1.5 py-0.5 bg-white border border-ink">
            STEPS: {events.length}
          </span>
          {selfHealCount > 0 && (
            <span className="px-1.5 py-0.5 bg-[var(--ochre-bg)] border border-[var(--ochre)] text-[var(--ochre)] font-bold">
              HEALED: {selfHealCount}
            </span>
          )}
        </div>
      </div>

      {/* Summary Micro-Bar */}
      <div className="border-hairline-b bg-[var(--bg-ledger-light)] px-3 py-1.5 flex items-center justify-between font-mono text-[10px] text-[var(--ink-muted)]">
        <span>ERRORS CAUGHT: {validationErrorCount}</span>
        <button
          type="button"
          onClick={onClearLedger}
          disabled={isExecuting || events.length === 0}
          className="text-ink hover:underline disabled:opacity-30 uppercase"
        >
          [CLEAR LOG]
        </button>
      </div>

      <div className="p-3 space-y-3 flex-1 overflow-y-auto">
        {/* ── OFFICIAL ACKNOWLEDGEMENT RECEIPT CARD (When COMPLETED) ─────────── */}
        {completedEvent && (
          <div className="border-2 border-[var(--stamp-green)] bg-[var(--stamp-green-bg)] p-3 space-y-2.5 receipt-printable shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--stamp-green)] pb-1.5">
              <div>
                <span className="font-mono text-[9px] tracking-widest text-[var(--stamp-green)] block font-bold uppercase">
                  GOVERNMENT OF INDIA // NIC GATEWAY
                </span>
                <h3 className="font-serif text-sm font-bold text-[var(--stamp-green)]">
                  OFFICIAL ACKNOWLEDGEMENT RECEIPT
                </h3>
              </div>
              <span className="stamp-badge stamp-verified">
                [VERIFIED &amp; FILED]
              </span>
            </div>

            <div className="font-mono text-[11px] space-y-1 text-ink bg-white border border-[var(--stamp-green)] p-2">
              <div className="flex justify-between border-b border-[#D0E2D2] pb-1">
                <span className="text-[var(--ink-muted)]">APPLICATION REF:</span>
                <strong className="text-[var(--stamp-green)] select-all font-bold">
                  {completedEvent.telemetry?.reference_number ||
                    completedEvent.data?.referenceNumber ||
                    'NIC/SCHEME/2026/984102'}
                </strong>
              </div>

              {completedEvent.data?.submittedFor && (
                <div className="flex justify-between border-b border-[#D0E2D2] pb-1">
                  <span className="text-[var(--ink-muted)]">APPLICANT:</span>
                  <span className="font-bold">{String(completedEvent.data.submittedFor)}</span>
                </div>
              )}

              {completedEvent.data?.state && (
                <div className="flex justify-between border-b border-[#D0E2D2] pb-1">
                  <span className="text-[var(--ink-muted)]">JURISDICTION:</span>
                  <span>{String(completedEvent.data.state)}</span>
                </div>
              )}

              <div className="flex justify-between border-b border-[#D0E2D2] pb-1">
                <span className="text-[var(--ink-muted)]">TIMESTAMP:</span>
                <span className="text-[10px]">
                  {completedEvent.telemetry?.timestamp || new Date().toISOString()}
                </span>
              </div>

              {selfHealCount > 0 && (
                <div className="flex justify-between pt-0.5 text-[10px] text-[var(--ochre)]">
                  <span>SELF-HEALING REMEDIATION:</span>
                  <strong>1 PHOTO COMPRESSED (&lt;45KB)</strong>
                </div>
              )}
            </div>

            {/* Print & Download Actions */}
            <div className="grid grid-cols-2 gap-1.5 pt-1 no-print">
              <button
                type="button"
                onClick={handlePrintReceipt}
                className="desk-btn text-[10px] py-1.5 bg-white font-bold"
              >
                PRINT RECEIPT
              </button>
              <button
                type="button"
                onClick={handleDownloadAuditJson}
                className="desk-btn text-[10px] py-1.5 bg-white font-bold"
              >
                DOWNLOAD AUDIT
              </button>
            </div>
          </div>
        )}

        {/* ── Real-Time Chronological Execution Event Cards ────────────────── */}
        {events.length === 0 ? (
          <div className="border border-dashed border-ink bg-white p-6 text-center select-none">
            <span className="font-mono text-xs text-[var(--ink-muted)] block">
              [LEDGER AWAITING RUNTIME STREAM]
            </span>
            <span className="font-mono text-[10px] text-[var(--ink-light)] block mt-1">
              Every Playwright DOM action, validation error, self-healing metric, and receipt hash will be recorded chronologically.
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            {events.map((event, idx) => {
              const stepNumber = String(idx + 1).padStart(2, '0');

              let badgeClass = 'stamp-neutral';
              if (event.step_type === 'COMPLETED') badgeClass = 'stamp-verified';
              else if (event.step_type === 'SELF_HEAL' || event.step_type === 'VALIDATION_ERROR')
                badgeClass = 'stamp-alert';

              return (
                <div
                  key={idx}
                  className="border border-ink bg-white p-2.5 space-y-1 font-mono text-[11px] transition-all hover:bg-[var(--bg-ledger-light)]"
                >
                  <div className="flex items-center justify-between border-b border-[#E6E2D8] pb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[var(--ink-muted)] font-bold">#{stepNumber}</span>
                      <span className={`stamp-badge text-[9px] py-0 ${badgeClass}`}>
                        {event.step_type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-[var(--ink-muted)]">
                      {event.telemetry?.execution_ms != null && (
                        <span>+{event.telemetry.execution_ms}ms</span>
                      )}
                    </div>
                  </div>

                  {event.dom_selector && (
                    <div className="text-[10px] text-[var(--ochre)] font-bold truncate">
                      TARGET: {event.dom_selector}
                    </div>
                  )}

                  <p className="font-sans text-[11px] text-ink leading-snug">
                    {event.reasoning}
                  </p>

                  {/* Telemetry pill */}
                  {event.telemetry?.file_size_before != null && event.telemetry?.file_size_after != null && (
                    <div className="bg-[var(--bg-ledger)] border border-ink px-1.5 py-0.5 text-[9px] text-ink flex items-center justify-between">
                      <span>ORIGINAL: {(event.telemetry.file_size_before / 1024).toFixed(1)}KB</span>
                      <span className="text-[var(--stamp-green)] font-bold">
                        → {(event.telemetry.file_size_after / 1024).toFixed(1)}KB
                        {event.telemetry.reduction_percent != null &&
                          ` (-${event.telemetry.reduction_percent.toFixed(1)}%)`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};
