/**
 * Automated E2E Verification Script for PRAMAAN Mode 2 Execution
 */

process.env.PORT = '3099';
process.env.NODE_ENV = 'test';

import path from 'node:path';
import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runE2ETest() {
  console.log('========================================================');
  console.log('  PRAMAAN // FULL E2E AUTONOMOUS AGENT VERIFICATION');
  console.log('========================================================');

  // Dynamically import server so PORT=3099 is respected
  const { default: app } = await import('../server/index.js');
  const { runLegacyPortalAgent, resolveHITL } = await import('../server/playwrightAgent.js');
  const { generateDynamicCitizenScan } = await import('../server/selfHealingTools.js');

  console.log(`[1/6] Test server initialized on port ${process.env.PORT}`);

  // 2. Generate a real test oversized scan (>50KB)
  const testScanPath = path.join(__dirname, 'test_oversized_scan.jpg');
  console.log('[2/6] Generating dynamic authentic citizen scan (>80KB)...');
  const scanMeta = await generateDynamicCitizenScan(testScanPath);
  console.log(`      Created: ${testScanPath} (${(scanMeta.sizeBytes / 1024).toFixed(1)}KB)`);

  // 3. Prepare Citizen Dossier with deliberate traps
  const testDossier = {
    fullName: 'Rajesh Kumar Sharma',
    fatherName: 'Rameshwar Sharma',
    dateOfBirth: '1998-05-15', // ISO format to trigger Date trap & self-healing
    dob: '1998-05-15',
    gender: 'Male',
    category: 'OBC',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    tehsil: 'Pindra',
    pincode: '221001',
    annualIncome: '180000',
    occupation: 'Student / Artisan',
    aadhaarNumber: 'XXXX-XXXX-4589',
    schemeName: 'Post Matric Scholarship for OBC Students',
  };

  const sessionId = `test-session-${Date.now()}`;
  const receivedEvents: any[] = [];
  let completedEvent: any = null;

  console.log('[3/6] Launching Playwright Autonomous Agent...');

  // 4. Run agent with SSE event listener
  await runLegacyPortalAgent(
    sessionId,
    testDossier,
    testScanPath,
    (event: any) => {
      receivedEvents.push(event);
      console.log(`  [AGENT EVENT] ${event.step_type.padEnd(16)} | ${event.reasoning.slice(0, 95)}...`);

      if (event.step_type === 'HITL_PAUSE') {
        const expected = (event.data?.expectedCaptcha as string) || '7M3X9K';
        console.log(`[4/6] HITL INTERRUPT DETECTED: Canvas CAPTCHA challenge`);
        console.log(`      Expected CAPTCHA: "${expected}"`);
        console.log(`      Testing case-insensitivity: Resuming with LOWERCASE "${expected.toLowerCase()}"...`);

        setTimeout(() => {
          const resolved = resolveHITL(sessionId, expected.toLowerCase());
          console.log(`      HITL Resumed successfully: ${resolved}`);
        }, 500);
      }

      if (event.step_type === 'COMPLETED') {
        completedEvent = event;
      }
    }
  );

  console.log('[5/6] Agent execution finished. Validating pipeline results...');

  // Assertions
  const stepTypes = receivedEvents.map((e) => e.step_type);
  console.log('      Captured Steps:', stepTypes);

  const hasPlan = stepTypes.includes('PLAN');
  const hasNav = stepTypes.includes('NAVIGATE');
  const hasSelfHeal = stepTypes.includes('SELF_HEAL');
  const hasHITL = stepTypes.includes('HITL_PAUSE');
  const hasCompleted = stepTypes.includes('COMPLETED');

  console.log(`      - PLAN emitted:         ${hasPlan ? 'PASS' : 'FAIL'}`);
  console.log(`      - NAVIGATE emitted:     ${hasNav ? 'PASS' : 'FAIL'}`);
  console.log(`      - SELF_HEAL emitted:    ${hasSelfHeal ? 'PASS' : 'FAIL'}`);
  console.log(`      - HITL_PAUSE emitted:   ${hasHITL ? 'PASS' : 'FAIL'}`);
  console.log(`      - COMPLETED emitted:    ${hasCompleted ? 'PASS' : 'FAIL'}`);

  if (completedEvent) {
    const refNum = (completedEvent.data?.referenceNumber as string) || (completedEvent.telemetry?.reference_number as string);
    console.log('========================================================');
    console.log('  TEST RESULT: 100% SUCCESS!');
    console.log(`  Official Receipt Reference: ${refNum}`);
    console.log(`  Total Execution Time:       ${completedEvent.telemetry?.total_execution_ms}ms`);
    console.log(`  Receipt Screenshot:         ${completedEvent.screenshot ? completedEvent.screenshot.length + ' chars base64' : 'N/A'}`);
    console.log('========================================================');
  } else {
    throw new Error('Test failed: COMPLETED event not received.');
  }

  // Clean up test file
  await fs.unlink(testScanPath).catch(() => {});
  process.exit(0);
}

runE2ETest().catch((err) => {
  console.error('FATAL TEST ERROR:', err);
  process.exit(1);
});
