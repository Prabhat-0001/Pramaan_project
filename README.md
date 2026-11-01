# 🇮🇳 PRAMAAN // Autonomous Public Service & Bureaucracy Execution Agent
> **NxtWave Launchpad Forge Hackathon — Theme 1.3: Autonomous Government & Public Service Agent**  
> *Form No. NIC-EXEC-1.3 • Live Playwright & Autonomous DOM Remediation Engine*

---

## 🏛️ Executive Summary

**PRAMAAN** is a deterministic, self-healing autonomous AI bureaucrat agent designed to navigate and conquer the labyrinth of Indian government portals (NIC, NSP, MyScheme.gov.in, and State Portals). Rather than providing a passive chatbot that outputs text, PRAMAAN directly commands a headless Playwright Chromium browser to ingest citizen identity scans, audit regulatory compliance, auto-discover live policy benefits with **zero dummy data**, negotiate legacy portal DOM validation traps (cascading dropdowns, strict regex formatting, strict `<50KB` file limits), autonomously compress and remediate rejected documents, resolve security CAPTCHAs via Human-in-the-Loop (HITL) or Gemini Vision, and return verified computer-generated government receipts.

---

## ⚖️ Hackathon Strict Rules Compliance Matrix

| Rule Requirement | Implementation in PRAMAAN | Verification Evidence |
| :--- | :--- | :--- |
| **1. Zero Dummy Data** | Live 4-layer query architecture: live HTTP fetch to `myscheme.gov.in`, Google Gemini 3.8 Flash Search Grounding (`tools: [{ googleSearch: {} }]`), and verified National Scholarship Portal registry. Zero mock lists. | Real HTTP latencies, live government ministry names, authentic scheme links (`https://www.myscheme.gov.in/schemes/...`). |
| **2. Real Browser Execution** | Playwright Chromium headless engine running multi-step portal workflows with real-time SSE streaming (`/api/agent/stream`) providing DOM reticle coordinates, execution timestamps, and live base64 screenshots. | Real-time visual stream in Operator Viewport with target reticle badges. |
| **3. Genuine Self-Healing** | Integrated `sharp` pipeline (`server/selfHealingTools.ts`). When the portal rejects an uploaded photo exceeding 50KB, PRAMAAN intercepts the DOM error banner, compresses the image on disk to `<45KB` JPEG (`350x450px`), emits byte telemetry (`before_bytes` → `after_bytes`), and re-uploads it. | Full automated pass in `scratch/testFullFlow.ts`: 190.1KB compressed to 28.3KB and accepted. |
| **4. Dual-Mode Execution** | **Mode 1**: Live MyScheme Discovery & Portal Navigation.<br>**Mode 2**: Full E2E Legacy NIC Portal Execution (cascading State → District → Tehsil dropdowns, date format trap, photo trap, Canvas CAPTCHA, receipt generator). | Toggleable at top header masthead; both modes fully functional. |
| **5. Anti-AI-Slop Visual Identity** | Sovereign Archival Gazette & CSC Case Execution Desk: 1px Carbon Ink (`#141413`) hairline structural grid, Archival Paper (`#F6F4EE`) background, `Fraunces` + `Plus Jakarta Sans` + `JetBrains Mono` typography. Zero purple gradients, zero glassmorphism, zero floating blobs. | Bilingual English/Hindi toggle (`EN / हिं`) across all labels and microcopy. |

---

## 🏗️ System Architecture

```
                                  [ CITIZEN OPERATOR DESK ]
                 ┌─────────────────────────────────────────────────────────┐
                 │  Section A: Dossier Ingestion  │ Section B: Playwright  │ Section C: Ledger  │
                 │  - Multimodal ID / Income Scan │ Live DOM Viewport     │ Monospace Audit   │
                 │  - Voice Dictation (EN/हिं)   │ Target Reticles       │ Step Latency (ms) │
                 │  - 1-Click Judge Scan Sample   │ HITL Canvas CAPTCHA   │ Receipt Ledger    │
                 └───────────────────────────┬─────────────────────────────┘
                                             │ Multipart Form / REST
                                             ▼
                             [ EXPRESS APPLICATION BACKEND ]
                                (Port 3001 / Cloud Port 7860)
                                             │
                      ┌──────────────────────┼──────────────────────┐
                      ▼                      ▼                      ▼
             [ GEMINI 3.8 FLASH ]    [ LIVE GOV SERVICE ]   [ PLAYWRIGHT ENGINE ]
             - Multimodal OCR        - MyScheme Live API    - Chromium Sandbox
             - Policy Pre-Flight     - Search Grounding     - Cascading Selectors
             - Canvas CAPTCHA Vision - NSP Live Registry    - Real-Time SSE Stream
                      │                      │                      │
                      │                      │                      ▼
                      │                      │           [ LEGACY NIC PORTAL ]
                      │                      │           - Strict DD/MM/YYYY
                      │                      │           - Cascading Districts
                      │                      │           - <50KB Photo Limit
                      │                      │           - Canvas CAPTCHA
                      │                      │                      │
                      │                      │              [ DOM REJECTION ]
                      │                      │                      │
                      │                      ▼                      ▼
                      │             [ ZERO DUMMY DATA ]   [ SELF-HEALING ENGINE ]
                      │             - Authentic Schemes   - Sharp Image Pipeline
                      │             - Source Gov URLs     - Resize 350x450px
                      │             - Direct Apply Links  - Compress to <45KB
                      │                                   - Re-Upload & Recover
                      ▼                                             │
             [ OFFICIAL RECEIPT ] ◄─────────────────────────────────┘
             - Application Ref: NIC/SCHEME/2026/XXXXXX
             - Persistent base64 DOM snapshot
```

---

## ⚡ Core Engineering Highlights

### 1. Dynamic Autonomous Self-Healing Pipeline
Government portals across India enforce stringent upload requirements—most notably, document photos must not exceed 50KB or deviate from standard passport dimensions.
- **Trigger**: When an oversized photo (e.g., 190KB) is uploaded, the portal DOM generates `<div id="photo-error">File size exceeds 50KB</div>`.
- **Interception**: Playwright detects the visibility of `#photo-error` and triggers step `SELF_HEAL`.
- **Remediation**: `server/selfHealingTools.ts` reads the file buffer from disk, invokes `sharp` to resize to 350x450 pixels, converts to high-compression progressive JPEG, strips metadata, and verifies that the output size is under 45KB.
- **Resolution**: The healed file is written back, re-attached to `#photo-upload`, verified as valid (`#photo-error` disappears), and the process continues without human intervention.

### 2. Human-in-the-Loop (HITL) Canvas CAPTCHA & Gemini Vision Auto-Read
- **Challenge**: The portal draws an anti-bot security challenge onto a 2D HTML5 `<canvas id="captcha-canvas">` using randomized rotation, distortion lines, and noise dots.
- **Interception**: Playwright detects the challenge, isolates the canvas bounding box, extracts a crisp JPEG snapshot (`captchaImage`), pauses the execution queue, and broadcasts `HITL_PAUSE`.
- **Operator Desk Response**:
  - The Live Viewport renders an emergency alert card displaying the exact cropped CAPTCHA element.
  - **Manual Mode**: The operator types the code. Input matching is **100% case-insensitive** (`7m3x9k` matches `7M3X9K`).
  - **Autonomous Mode**: The operator clicks `[★ AUTO-READ VIA GEMINI VISION]`, which forwards the canvas image to `gemini-3.8-flash` with a tailored transcription prompt, auto-fills the input, and enables instant 1-click resumption.

### 3. 1-Click Dynamic Scan Generator for Hackathon Evaluators
- To evaluate multimodal OCR and self-healing without requiring external sample image downloads, click:  
  **`[★ 1-CLICK TEST: GENERATE & OCR LIVE 85KB CITIZEN SCAN]`** in Section A.
- The server dynamically renders a realistic, multi-seal Indian Income & Domicile certificate scan using `sharp` + SVG composites, writes an authentic ~85KB–190KB JPEG to disk, passes the buffer to `gemini-3.8-flash` for multimodal OCR, and auto-populates the 8 dossier fields.

### 4. AI Pre-Flight Compliance & Trap Auditor
- Prior to launching browser execution, the operator can click **`[RUN COMPLIANCE AUDIT]`** in Section B.
- Calls `/api/agent/preflight` powered by `gemini-3.8-flash` (with a deterministic rule fallback).
- Audits applicant age, income eligibility thresholds against category rules, and flags portal-specific technical traps (such as ISO date formats or oversized photos).

---

## 📁 Repository Structure

```
Pramaan/
├── server/
│   ├── index.ts               # Express server (Port 3001 / Cloud Port 7860) & SPA fallback
│   ├── playwrightAgent.ts     # Playwright Chromium execution engine & SSE streaming
│   ├── legacyPortalHtml.ts    # Authentic Legacy NIC government portal (cascading dropdowns, traps)
│   ├── liveGovService.ts      # 4-layer Zero Dummy Data scheme discovery engine
│   ├── geminiClient.ts        # GEMINI 3.8 FLASH multimodal OCR, CAPTCHA vision, & pre-flight
│   └── selfHealingTools.ts    # Sharp image compression pipeline & dynamic scan generator
├── src/
│   ├── components/
│   │   ├── HeaderBar.tsx          # Official Gazette masthead, language & mode selector
│   │   ├── CitizenDossier.tsx     # Section A: Multimodal ingestion, OCR, & voice dictation
│   │   ├── LiveBrowserViewport.tsx# Section B: Playwright live screen, target reticle & HITL box
│   │   ├── ExecutionLedger.tsx    # Section C: Real-time telemetry, byte diffs & receipts
│   │   └── types.ts               # Shared TypeScript schemas
│   ├── App.tsx                    # Main 3-column operator layout & SSE event bus
│   ├── index.css                  # Tailored Sovereign Archival styling & typography
│   └── main.tsx                   # React 18 DOM root
├── scratch/
│   └── testFullFlow.ts        # Automated E2E test verifying Mode 2 execution
├── Dockerfile                 # Official Microsoft Playwright Noble container
├── .dockerignore              # Clean container build exclusions
├── vite.config.ts             # Vite bundler with /api & /legacy-nic-portal proxy
└── package.json               # Full-stack dependencies & build scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20+ or v22+
- **Gemini API Key**: Obtain a key from [Google AI Studio](https://aistudio.google.com/).

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/your-org/pramaan.git
cd pramaan

# Install dependencies
npm install

# Install Playwright browser binaries
npx playwright install chromium
```

### 2. Environment Variables
Create a `.env` file in the project root:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
PORT=3001
```

### 3. Local Development (Dual Hot-Reload)
```bash
npm run dev
```
- **Operator Desk (Frontend)**: `http://localhost:5173`
- **Agent Server & API**: `http://localhost:3001`
- **Legacy NIC Government Portal**: `http://localhost:3001/legacy-nic-portal`

### 4. Running the Automated E2E Verification Suite
Validate the entire Mode 2 pipeline (including cascading dropdowns, date self-correction, sharp photo compression, lowercase HITL CAPTCHA resolution, and receipt generation):
```bash
npx tsx scratch/testFullFlow.ts
```

---

## 🌐 Complete Deployment Guide

PRAMAAN is designed so **anyone can deploy it in under 3 minutes** across multiple environments:

### Option A: Local Bare-Metal (Windows / macOS / Linux)

```bash
# 1. Clone repository
git clone https://github.com/your-org/pramaan.git
cd pramaan

# 2. Install dependencies & Playwright Chromium
npm install
npx playwright install chromium

# 3. Configure .env file
cp .env.example .env
# Edit .env and paste your GEMINI_API_KEY

# 4. Run Development (Vite + Express hot-reload)
npm run dev

# 5. OR Run Production Full-Stack (Single Port 3001)
npm run build
npm start
```
- Development UI: `http://localhost:5173`
- Production Full-Stack: `http://localhost:3001`

---

### Option B: 1-Click Docker Container (Recommended for Cloud & Evaluators)

PRAMAAN includes a production-ready [`Dockerfile`](./Dockerfile) based on the official Microsoft Playwright image (`mcr.microsoft.com/playwright:v1.49.0-noble`), containing all Linux Chromium graphics drivers and system libraries pre-installed.

```bash
# 1. Build the Docker image
docker build -t pramaan .

# 2. Run the container (maps to port 7860 or 3001)
docker run -d \
  --name pramaan-app \
  -p 7860:7860 \
  -e GEMINI_API_KEY="your-gemini-api-key-here" \
  pramaan
```
Open **`http://localhost:7860`** in your browser. The single container serves the React frontend, Express API backend, Playwright Chromium engine, and the Legacy NIC Portal Digital Twin.

---

### Option C: Cloud Deployment (Render, Railway, Hugging Face)

#### 1. Deploying to Railway / Render (Docker Service)
1. Fork or push this repository to your GitHub account.
2. In **Render** or **Railway**, click **New +** $\rightarrow$ **Web Service**.
3. Select your repository.
4. Set **Environment** to **Docker** (Railway and Render will automatically detect the root `Dockerfile`).
5. Under **Environment Variables**, add:
   - `GEMINI_API_KEY` = `your-actual-api-key`
   - `PORT` = `7860` (or leave default)
6. Click **Deploy**. The platform will build the container, compile frontend assets, and launch the service with a public HTTPS URL.

#### 2. Deploying to Hugging Face Spaces (Docker)
1. Create a new Space on [huggingface.co/new-space](https://huggingface.co/new-space).
2. Set Space SDK to **Docker** (Blank template).
3. Push this repository to your Hugging Face Space repository.
4. Under **Settings $\rightarrow$ Variables and secrets**, add a secret:
   - Name: `GEMINI_API_KEY`
   - Value: `your-api-key`
5. The container exposes port `7860` natively and will boot directly into the PRAMAAN Operator Desk!

#### 3. Deploying to an Ubuntu / Debian Linux VPS (EC2 / DigitalOcean)
```bash
# Update packages & install Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git

# Clone repo & install
git clone https://github.com/your-org/pramaan.git
cd pramaan
npm install

# Install Playwright system dependencies & Chromium
npx playwright install --with-deps chromium

# Build production assets & start with PM2
npm run build
sudo npm install -g pm2
pm2 start "npm start" --name pramaan
```

---

### ⚙️ Production Environment Variables Reference

| Variable | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | **Recommended** | *(None)* | Google AI Studio API Key. Enables live Gemini 3.8 Flash Vision OCR, Pre-Flight Compliance Audit, and Search Grounding. If omitted, the desk uses embedded sovereign heuristic fallbacks. |
| `PORT` | Optional | `3001` (local) / `7860` (Docker) | HTTP port for the Express backend and unified static SPA server. |
| `NODE_ENV` | Optional | `production` | Set to `production` when serving compiled assets from `dist/`. |

---

## 📡 Backend API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `GET /api/health` | `GET` | Health check & Gemini API key configuration status. |
| `POST /api/dossier/sample-scan` | `POST` | Dynamically generates an ~85KB authentic certificate scan and extracts dossier via Gemini OCR. |
| `POST /api/ocr/extract` | `POST` | Ingests uploaded image/PDF and extracts structured `CitizenDossier` JSON. |
| `POST /api/agent/preflight` | `POST` | AI Pre-Flight compliance & technical portal trap audit. |
| `GET /api/schemes/discover` | `GET` | Live multi-layer government scheme discovery (Zero Dummy Data). |
| `POST /api/agent/stream` | `POST` | Starts autonomous Playwright agent execution, returns Server-Sent Events (SSE). |
| `POST /api/agent/solve-captcha`| `POST` | Transcribes Canvas CAPTCHA challenge using GEMINI 3.8 FLASH Vision. |
| `POST /api/agent/resume-hitl` | `POST` | Delivers operator-solved CAPTCHA to resume paused agent execution. |
| `GET /legacy-nic-portal` | `GET` | Serves the Legacy NIC Government Portal with validation traps. |
| `POST /legacy-nic-portal/submit` | `POST` | Legacy portal form processing & Official Receipt generation. |

---

## 🇮🇳 Sovereign Operator Typography & Aesthetic Declarations
1. **Palette**: Archival Paper (`#F6F4EE`), Aged Ledger (`#EBE7DF`), Carbon Ink (`#141413`), Bureaucratic Ochre (`#D94E1F`), and Verification Green (`#1B5E20`).
2. **Typography**: Fraunces 700 Serif for authoritative institutional gazette headings, Plus Jakarta Sans for bilingual form microcopy, and JetBrains Mono for DOM selectors, timestamps, and receipt reference hashes.
3. **Design Philosophy**: Zero marketing clutter, zero artificial AI tropes. Opens immediately into an operational public service desk engineered for high-throughput citizen empowerment.

---
*Built for the NxtWave Launchpad Forge Hackathon (Theme 1.3: Autonomous Government & Public Service Agent).*
