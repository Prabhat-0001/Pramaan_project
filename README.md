# PRAMAAN (प्रमाण)
### Automated Public Service & Government Scheme Assistance Desk

[![Node.js Version](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-Chromium-orange.svg)](https://playwright.dev/)
[![License](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)

**PRAMAAN** is an open-source automation desk designed to help citizens, field workers, and kiosk operators navigate complex government portals. Instead of simply listing welfare schemes like a conventional chatbot, PRAMAAN assists with the entire application workflow: extracting details from physical documents, matching citizens with official welfare programs, pre-checking submissions for errors, and automating form filling in a real browser while recovering from common portal rejections.

---

## The Real-World Problem

Governments offer hundreds of welfare, scholarship, and financial assistance schemes, yet millions of eligible beneficiaries never receive them. The barrier is rarely eligibility—it is **bureaucratic friction**:

1. **Unforgiving Portal Requirements:** Many public service websites enforce rigid validation rules built decades ago. Uploading a smartphone photograph that is even slightly over 50KB, or typing a date as `YYYY-MM-DD` instead of `DD/MM/YYYY`, frequently causes the entire application to fail without clear explanations.
2. **The Kiosk Bottleneck:** Rural citizens often must visit local Common Service Centres (CSCs) or internet cyber-cafes, stand in long lines, and pay private fees simply to have their documents typed into an online form.
3. **Information Overload:** Standard chatbots can tell someone about a scheme in text, but they cannot compress documents, navigate cascading state-district dropdowns, or help submit the application.

PRAMAAN addresses these issues by automating the tedious parts of the process while keeping human operators in control for key security steps.

---

## How It Works

```
  [Citizen's Documents / Voice]
               │
               ▼
   1. Document Extraction ─────► Scans certificates or IDs to populate citizen details.
               │
               ▼
   2. Scheme Discovery     ─────► Queries official government registries (e.g., MyScheme.gov.in).
               │
               ▼
   3. Pre-Flight Check     ─────► Audits the application against portal rules before submission.
               │
               ▼
   4. Browser Automation   ─────► Opens a browser and fills multi-step government portal forms.
               │
               ▼
   5. Automatic Recovery   ─────► Fixes formatting rejections and compresses files on the fly.
               │
               ▼
   6. CAPTCHA Verification ─────► Pauses for Human-in-the-Loop review to solve security challenges.
               │
               ▼
   7. Official Receipt     ─────► Generates a verifiable tracking receipt with reference numbers.
```

---

## Key Features

### 1. Document Extraction & Voice Input
- **Certificate & ID Ingestion:** Reads income certificates, caste certificates, and domicile documents directly from photos or PDF scans using multimodal vision OCR.
- **Voice Dictation:** Supports hands-free input in English and Hindi for citizens who prefer speaking their details rather than typing.
- **Bilingual Interface:** Toggle the operator desk between English and Hindi (`EN / हिं`) at any time.

### 2. Live Welfare Scheme Matching
- Matches a citizen’s state, category, gender, and income against live official government repositories (such as `myscheme.gov.in` and ministry registries).
- Displays official ministry names, criteria breakdowns, and direct links to official `.gov.in` portals.

### 3. Pre-Submission Compliance Audit
- Analyzes the citizen’s dossier against known portal rules before launching the browser.
- Identifies missing fields, checks whether income is within required ceilings, and flags potential technical issues (such as an oversized photo or wrong date format) so they can be addressed early.

### 4. Automated Portal Navigation
- Uses Playwright to drive a real browser session through complex, multi-page government portals.
- Handles cascading dropdowns automatically (e.g., selecting a State, waiting for dynamic districts to load, then selecting the correct Tehsil/Taluka).
- Streams live progress, field-by-field updates, and screenshots directly to the operator desk.

### 5. Automatic Error Recovery (Self-Healing)
- **Photo Compression:** If a portal rejects an uploaded passport photo for exceeding a strict size limit (e.g., *Rule 4.2: Maximum 50KB*), PRAMAAN intercepts the error, resizes and compresses the image to under 45KB using `sharp`, and re-uploads it automatically.
- **Date Format Correction:** If a portal rejects an ISO date (`1995-08-15`) and demands `DD/MM/YYYY`, PRAMAAN detects the validation banner, converts the date to `15/08/1995`, and re-enters it without human intervention.
- **Input Sanitization:** Automatically cleans currency strings (`₹1,80,000` $\rightarrow$ `180000`) and postal codes to prevent numeric input exceptions.

### 6. Human-in-the-Loop (HITL) Security Handling
- Government portals use CAPTCHAs to ensure applications are submitted with human oversight.
- When a CAPTCHA challenge appears, PRAMAAN safely pauses the browser session, extracts the challenge area, and alerts the operator.
- The operator can either type the code or use AI-assisted vision to read the characters, then resume the submission with a single click.

### 7. Verifiable Application Receipts
- Once the portal confirms submission, PRAMAAN extracts the official government Application Reference Number (e.g., `NIC/SCHEME/2026/719168`).
- Generates a printable, standardized receipt containing submission timestamps, applicant details, and tracking metadata for the citizen's records.

---

## Practical Use Cases

- **Common Service Centres (CSCs) & Village Kiosks:** Helps operators process citizen applications in minutes rather than spending half an hour re-typing fields and resizing photos.
- **Gram Panchayats & Local Administration:** Enables village administrative staff to organize welfare camps and process bulk applications efficiently.
- **NGOs & Social Field Workers:** Equips non-profit volunteers working in rural communities to verify eligibility and file claims on-site using a laptop or tablet.
- **Citizen Self-Service Desks:** Can be deployed in public libraries, municipal offices, or community centres as a self-help kiosk.

---

## Architecture & Technology Stack

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite | Responsive operator desk with live Server-Sent Events (SSE) telemetry. |
| **Backend** | Node.js, Express, Multer | REST API, SSE streaming pipeline, and session orchestrator. |
| **Automation** | Playwright (Chromium) | Browser automation for multi-step portal form submissions. |
| **Image Pipeline** | Sharp | Real-time image resizing and progressive JPEG compression. |
| **AI Integration** | Google Gemini 3.8 Flash (`@google/genai`) | Multimodal document OCR, pre-submission checks, and CAPTCHA assistance. |

---

## Getting Started

### Prerequisites
- **Node.js**: Version 20.x or higher
- **Gemini API Key**: A key from [Google AI Studio](https://aistudio.google.com/) (used for document OCR and pre-submission validation)

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/pramaan.git
cd pramaan

# Install dependencies
npm install

# Install Playwright browser binaries
npx playwright install chromium
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

*(You can copy `.env.example` as a starting point).*

### 3. Run Locally

```bash
npm run dev
```

This starts both the backend server and frontend development server concurrently:
- **Operator Desk:** `http://localhost:5173`
- **Backend API:** `http://localhost:3001`
- **Legacy Portal (Digital Twin Harness):** `http://localhost:3001/legacy-nic-portal`

### 4. Build for Production

```bash
# Build frontend assets
npm run build

# Start production server (serves both API and frontend on port 3001)
npm start
```

---

## Deployment Options

### Docker Deployment (Recommended)

PRAMAAN includes a Dockerfile based on the official Microsoft Playwright image with all required Chromium browser dependencies pre-installed:

```bash
# Build the Docker image
docker build -t pramaan .

# Run container
docker run -d \
  -p 7860:7860 \
  -e GEMINI_API_KEY="your_api_key_here" \
  --name pramaan-app \
  pramaan
```

Open `http://localhost:7860` in your browser.

### Cloud Deployment (Railway / Render / Hugging Face Spaces)

- **Railway / Render:** Connect your GitHub repository, choose **Docker** as the runtime environment, set the `GEMINI_API_KEY` environment variable, and deploy.
- **Hugging Face Spaces:** Create a new Space with the **Docker SDK**, add `GEMINI_API_KEY` under Settings $\rightarrow$ Secrets, and push the repository. Port 7860 is mapped automatically.

---

## Project Structure

```
Pramaan/
├── server/
│   ├── index.ts               # Express application and SSE streaming routes
│   ├── playwrightAgent.ts     # Playwright automation engine and DOM handlers
│   ├── legacyPortalHtml.ts    # High-fidelity digital twin of legacy government portals
│   ├── liveGovService.ts      # Live government scheme discovery service
│   ├── geminiClient.ts        # Gemini 3.8 Flash OCR and validation client
│   └── selfHealingTools.ts    # Sharp image compression and file utilities
├── src/
│   ├── components/
│   │   ├── HeaderBar.tsx          # Operator desk masthead and language toggle
│   │   ├── CitizenDossier.tsx     # Document ingestion, OCR, and citizen ledger
│   │   ├── LiveBrowserViewport.tsx# Real-time browser stream, reticles, and HITL panel
│   │   └── ExecutionLedger.tsx    # Telemetry logs, recovery metrics, and receipts
│   ├── App.tsx                    # Main application layout
│   └── main.tsx                   # Frontend entry point
├── Dockerfile                 # Playwright container configuration
├── package.json               # Project scripts and dependencies
└── README.md                  # Project documentation
```

---

## Contributing

Contributions, bug reports, and suggestions are welcome! Please open an issue or submit a pull request if you would like to help expand support for additional state portals or language options.

---

## License

This project is licensed under the [MIT License](LICENSE).
