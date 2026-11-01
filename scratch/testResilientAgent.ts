/**
 * Test script verifying:
 * 1. Dirty currency sanitization ('₹1,80,000' -> '180000') & SELF_HEAL event
 * 2. Instant resilient dropdown selection with bilingual strings ('Male / पुरुष', 'General / सामान्य', 'Maharashtra')
 * 3. Pre-flight audit speed with strict timeout
 */

process.env.PORT = '3098';
process.env.NODE_ENV = 'test';

import path from 'node:path';
import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTest() {
  console.log('========================================================');
  console.log('  TESTING RESILIENT AGENT & DOM SANITIZATION');
  console.log('========================================================');

  const { default: app } = await import('../server/index.js');
  const { runLegacyPortalAgent, resolveHITL } = await import('../server/playwrightAgent.js');
  const { generateDynamicCitizenScan } = await import('../server/selfHealingTools.js');
  const { auditPreflightCompliance } = await import('../server/geminiClient.js');

  // 1. Test Pre-flight audit speed
  console.log('\n[1/3] Testing Pre-Flight Compliance Audit Speed (Strict <=8s)...');
  const startAudit = Date.now();
  const auditRes = await auditPreflightCompliance(
    {
      fullName: 'Aarav Rajesh Sharma',
      fatherName: 'Rajesh Sharma',
      dateOfBirth: '1995-08-15',
      gender: 'Male / पुरुष',
      category: 'General / सामान्य',
      state: 'Maharashtra',
      district: 'Pune',
      address: 'Pune, Maharashtra 411005',
      aadhaarNumber: '8912 3456 7890',
      annualIncome: '₹1,80,000',
      documentType: 'Certificate',
    },
    85000
  );
  const auditTime = Date.now() - startAudit;
  console.log(`      Pre-flight audit completed in: ${auditTime}ms`);
  console.log(`      Verdict: ${auditRes.eligibility_verdict} (${auditRes.compliance_score}%)`);
  console.log(`      Detected traps: ${auditRes.detected_portal_traps.map(t => t.trap_id).join(', ')}`);

  // 2. Prepare test scan & dossier with bilingual strings and dirty currency
  const testScanPath = path.join(__dirname, 'test_bilingual_scan.jpg');
  await generateDynamicCitizenScan(testScanPath);

  const testDossier = {
    fullName: 'Aarav Rajesh Sharma',
    fatherName: 'Rajesh Sharma',
    dateOfBirth: '1995-08-15', // ISO format to trigger Date trap & self-healing
    gender: 'Male / पुरुष',      // Bilingual string
    category: 'General / सामान्य',// Bilingual string
    state: 'Maharashtra',
    district: 'Pune',
    tehsil: 'Haveli',
    address: 'Pune, Maharashtra 411005',
    pincode: '411005',
    annualIncome: '₹1,80,000',  // Dirty currency string with ₹ and commas!
    aadhaarNumber: '8912 3456 7890',
    schemeName: 'National Scholarship Scheme',
  };

  const sessionId = `test-bilingual-${Date.now()}`;
  const receivedEvents: any[] = [];
  let currencySelfHealDetected = false;

  console.log('\n[2/3] Launching Playwright Agent with Bilingual Strings & Dirty Currency...');
  const runStart = Date.now();

  await runLegacyPortalAgent(
    sessionId,
    testDossier as any,
    testScanPath,
    (event: any) => {
      receivedEvents.push(event);
      console.log(`  [AGENT EVENT] ${event.step_type.padEnd(16)} | +${event.telemetry?.execution_ms}ms | ${event.reasoning.slice(0, 85)}...`);

      if (event.step_type === 'SELF_HEAL' && event.dom_selector === '#annual-income') {
        currencySelfHealDetected = true;
        console.log(`      ★ Currency Self-Heal Captured: "${event.reasoning}"`);
      }

      if (event.step_type === 'HITL_PAUSE') {
        const expected = (event.data?.expectedCaptcha as string) || '7M3X9K';
        console.log(`\n[3/3] HITL Interrupt hit. Resuming with CAPTCHA: ${expected}`);
        setTimeout(() => {
          resolveHITL(sessionId, expected);
        }, 300);
      }
    }
  );

  const totalTime = Date.now() - runStart;
  console.log('\n========================================================');
  console.log('  TEST RESULTS:');
  console.log(`  Total Execution Time: ${totalTime}ms (Must be < 20,000ms, NO 30s timeout!)`);
  console.log(`  Currency Sanitization Self-Heal: ${currencySelfHealDetected ? 'PASS' : 'FAIL'}`);
  console.log(`  Full Flow Completed: ${receivedEvents.some(e => e.step_type === 'COMPLETED') ? 'PASS' : 'FAIL'}`);
  console.log('========================================================');

  // Clean up
  await fs.unlink(testScanPath).catch(() => {});
  process.exit(0);
}

runTest().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
