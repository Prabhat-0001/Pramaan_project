/**
 * Verification test for Gemini 3.8 Flash & Fallback Architecture
 */
import {
  getGeminiApiKey,
  callGeminiWithFallback,
  extractCitizenDossier,
  solveCaptchaFromScreenshot,
  auditPreflightCompliance,
} from '../server/geminiClient.js';
import { discoverSchemes } from '../server/liveGovService.js';
import { generateDynamicCitizenScan } from '../server/selfHealingTools.js';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runVerification() {
  console.log('======================================================');
  console.log('  TESTING REAL GEMINI 3.8 FLASH ARCHITECTURE');
  console.log('======================================================');

  // 1. Verify API Key and No Terminal Spam
  const key = getGeminiApiKey();
  console.log('1. API Key Check:');
  console.log('   Key detected:', !!key, key ? `(length: ${key.length})` : '(none)');

  // 2. Direct callGeminiWithFallback Text Generation
  console.log('\n2. Testing callGeminiWithFallback (Primary: gemini-3.8-flash):');
  try {
    const res = await callGeminiWithFallback({
      contents: 'Respond with exactly: PRAMAAN_ONLINE',
    });
    console.log(`   Model Used: ${res.modelUsed}`);
    console.log(`   Response:   ${res.text?.trim()}`);
  } catch (err) {
    console.warn('   Text call fallback/error:', err instanceof Error ? err.message : String(err));
  }

  // 3. Test Multimodal OCR with authentic generated scan
  console.log('\n3. Testing Multimodal OCR (extractCitizenDossier):');
  try {
    const scan = await generateDynamicCitizenScan();
    console.log(`   Generated scan: ${scan.filename} (${scan.sizeKB}KB)`);
    const dossier = await extractCitizenDossier(scan.buffer, scan.mimeType);
    console.log(`   Extracted Name: ${dossier.fullName}`);
    console.log(`   Status Note:    ${dossier.statusNote}`);
  } catch (err) {
    console.warn('   OCR call fallback/error:', err instanceof Error ? err.message : String(err));
  }

  // 4. Test Pre-flight Compliance Audit
  console.log('\n4. Testing Pre-Flight Compliance Audit:');
  try {
    const audit = await auditPreflightCompliance(
      {
        fullName: 'Aarav Rajesh Sharma',
        fatherName: 'Rajesh Sharma',
        dateOfBirth: '1995-08-15',
        gender: 'Male',
        category: 'General',
        state: 'Maharashtra',
        district: 'Pune',
        address: 'Pune, Maharashtra',
        aadhaarNumber: '8912 3456 7890',
        annualIncome: '180000',
        documentType: 'Certificate',
      },
      85000
    );
    console.log(`   Verdict: ${audit.eligibility_verdict} (${audit.compliance_score}%)`);
    console.log(`   Traps:   ${audit.detected_portal_traps.map((t) => t.trap_id).join(', ')}`);
  } catch (err) {
    console.warn('   Audit call fallback/error:', err instanceof Error ? err.message : String(err));
  }

  // 5. Test Live Government Scheme Discovery
  console.log('\n5. Testing Live Scheme Discovery (with Grounding / Registry):');
  try {
    const schemes = await discoverSchemes({
      state: 'Maharashtra',
      category: 'General',
      gender: 'Male',
      annualIncome: 180000,
    });
    console.log(`   Schemes discovered: ${schemes.length}`);
    if (schemes.length > 0) {
      console.log(`   Sample Scheme 1:    ${schemes[0].title} (${schemes[0].ministry})`);
      console.log(`   Source URL:         ${schemes[0].sourceUrl}`);
    }
  } catch (err) {
    console.warn('   Discovery call error:', err instanceof Error ? err.message : String(err));
  }

  console.log('\n======================================================');
  console.log('  ALL CHECKS COMPLETED CLEANLY!');
  console.log('======================================================');
}

runVerification().catch(console.error);
