/**
 * legacyPortalHtml.ts
 *
 * Exports a function that returns a complete, self-contained HTML string
 * for a Legacy NIC Government Portal scholarship form page.
 * Served at GET /legacy-nic-portal.
 */

export function getLegacyPortalHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>National Scholarship Portal – Legacy Submission Gateway | Government of India</title>
  <style>
    /* ===== RESET & BASE ===== */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Arial', 'Helvetica Neue', Helvetica, sans-serif;
      font-size: 13px;
      color: #333;
      background: #e8e8e8;
      line-height: 1.5;
    }
    a { color: #034b8a; text-decoration: none; }
    a:hover { text-decoration: underline; }

    /* ===== TOP GOVERNMENT BAND ===== */
    .gov-top-band {
      background: #06357a;
      color: #fff;
      padding: 4px 0;
      font-size: 11px;
      text-align: right;
    }
    .gov-top-band .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 15px;
    }
    .gov-top-band a { color: #ffd700; margin-left: 12px; font-size: 11px; }
    .gov-top-band span.separator { color: #6b8fc7; margin: 0 4px; }

    /* ===== HEADER ===== */
    .gov-header {
      background: linear-gradient(to bottom, #ffffff 0%, #f0f4f8 100%);
      border-bottom: 3px solid #f47920;
      padding: 10px 0;
    }
    .gov-header .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 15px;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .gov-emblem {
      font-size: 48px;
      line-height: 1;
      flex-shrink: 0;
    }
    .gov-header-text h1 {
      font-size: 14px;
      color: #06357a;
      font-weight: bold;
      margin-bottom: 2px;
    }
    .gov-header-text h2 {
      font-size: 18px;
      color: #06357a;
      font-weight: bold;
      margin-bottom: 2px;
    }
    .gov-header-text h3 {
      font-size: 13px;
      color: #c0392b;
      font-weight: normal;
      font-style: italic;
    }
    .gov-header-text .hindi-text {
      font-size: 13px;
      color: #555;
    }

    /* ===== NAV BAR ===== */
    .gov-navbar {
      background: #034b8a;
      border-bottom: 2px solid #f47920;
    }
    .gov-navbar .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 15px;
    }
    .gov-navbar ul {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
    }
    .gov-navbar ul li a {
      display: block;
      color: #fff;
      padding: 8px 16px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-right: 1px solid #0a5a9e;
      transition: background 0.2s;
    }
    .gov-navbar ul li:first-child a { border-left: 1px solid #0a5a9e; }
    .gov-navbar ul li a:hover,
    .gov-navbar ul li a.active {
      background: #f47920;
      text-decoration: none;
    }

    /* ===== BREADCRUMB ===== */
    .breadcrumb-bar {
      background: #f5f5f5;
      border-bottom: 1px solid #ddd;
      padding: 6px 0;
      font-size: 11px;
    }
    .breadcrumb-bar .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 15px;
      color: #666;
    }
    .breadcrumb-bar a { color: #034b8a; font-size: 11px; }
    .breadcrumb-bar .sep { margin: 0 5px; color: #999; }

    /* ===== MAIN CONTENT ===== */
    .main-content {
      max-width: 1100px;
      margin: 15px auto;
      padding: 0 15px;
      display: flex;
      gap: 15px;
    }
    .content-area {
      flex: 1;
      background: #fff;
      border: 1px solid #bbb;
      border-radius: 3px;
    }
    .content-header {
      background: linear-gradient(to bottom, #06357a, #034b8a);
      color: #fff;
      padding: 10px 15px;
      font-size: 15px;
      font-weight: bold;
      border-bottom: 2px solid #f47920;
    }
    .content-body {
      padding: 20px;
    }

    /* ===== SIDEBAR ===== */
    .sidebar {
      width: 260px;
      flex-shrink: 0;
    }
    .sidebar-box {
      background: #fff;
      border: 1px solid #bbb;
      border-radius: 3px;
      margin-bottom: 15px;
    }
    .sidebar-box .sb-header {
      background: #06357a;
      color: #fff;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
    }
    .sidebar-box .sb-body {
      padding: 10px 12px;
      font-size: 12px;
      color: #444;
      line-height: 1.6;
    }
    .sidebar-box .sb-body ul { padding-left: 16px; }
    .sidebar-box .sb-body ul li { margin-bottom: 4px; }

    /* ===== FORM STYLES ===== */
    .form-section {
      border: 1px solid #c0c0c0;
      margin-bottom: 18px;
      border-radius: 2px;
    }
    .form-section-header {
      background: linear-gradient(to bottom, #e8eef5, #d4dde9);
      padding: 8px 12px;
      font-size: 13px;
      font-weight: bold;
      color: #06357a;
      border-bottom: 1px solid #b0b0b0;
    }
    .form-section-body {
      padding: 12px 15px;
    }
    .form-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 12px;
    }
    .form-group {
      flex: 1;
      min-width: 200px;
    }
    .form-group label {
      display: block;
      font-size: 12px;
      font-weight: bold;
      color: #333;
      margin-bottom: 4px;
    }
    .form-group label .required {
      color: #c0392b;
      font-weight: bold;
    }
    .form-group input[type="text"],
    .form-group input[type="number"],
    .form-group input[type="file"],
    .form-group select {
      width: 100%;
      padding: 6px 8px;
      border: 1px solid #999;
      border-radius: 2px;
      font-size: 12px;
      background: #fffff5;
    }
    .form-group input:focus,
    .form-group select:focus {
      border-color: #06357a;
      outline: none;
      box-shadow: 0 0 3px rgba(6, 53, 122, 0.3);
    }
    .form-group select { background: #fffff5; }
    .form-group .field-hint {
      font-size: 10px;
      color: #888;
      margin-top: 2px;
    }

    /* ===== ERROR / SUCCESS BANNERS ===== */
    .error-banner {
      background: #fce4e4;
      border: 1px solid #c0392b;
      color: #c0392b;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: bold;
      margin: 8px 0;
      border-radius: 2px;
    }
    .success-banner {
      background: #e8f5e9;
      border: 1px solid #27ae60;
      color: #27ae60;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: bold;
      margin: 8px 0;
      border-radius: 2px;
    }
    .validation-error-list {
      background: #fce4e4;
      border: 1px solid #c0392b;
      color: #c0392b;
      padding: 10px 15px;
      margin-bottom: 15px;
      border-radius: 2px;
      display: none;
    }
    .validation-error-list h4 {
      margin-bottom: 6px;
      font-size: 13px;
    }
    .validation-error-list ul {
      padding-left: 18px;
      font-size: 12px;
    }
    .validation-error-list ul li { margin-bottom: 3px; }

    /* ===== CAPTCHA ===== */
    .captcha-container {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      flex-wrap: wrap;
    }
    .captcha-canvas-wrap {
      border: 2px solid #999;
      background: #fff;
      padding: 2px;
    }
    #captcha-canvas { display: block; }
    .captcha-refresh-btn {
      background: #06357a;
      color: #fff;
      border: none;
      padding: 6px 14px;
      font-size: 11px;
      cursor: pointer;
      border-radius: 2px;
      margin-top: 4px;
    }
    .captcha-refresh-btn:hover { background: #034b8a; }

    /* ===== DECLARATION ===== */
    .declaration-box {
      background: #fffff5;
      border: 1px solid #c0c0c0;
      padding: 12px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 1.6;
    }
    .declaration-box label { font-weight: normal; cursor: pointer; }
    .declaration-box input[type="checkbox"] { margin-right: 8px; }

    /* ===== SUBMIT BUTTON ===== */
    .btn-submit {
      background: linear-gradient(to bottom, #27ae60, #1e8449);
      color: #fff;
      border: 1px solid #196f3d;
      padding: 10px 35px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .btn-submit:hover { background: linear-gradient(to bottom, #2ecc71, #27ae60); }
    .btn-submit:disabled {
      background: #bbb;
      border-color: #999;
      cursor: not-allowed;
    }
    .btn-reset {
      background: linear-gradient(to bottom, #e74c3c, #c0392b);
      color: #fff;
      border: 1px solid #a93226;
      padding: 10px 25px;
      font-size: 13px;
      cursor: pointer;
      border-radius: 3px;
      margin-left: 10px;
    }
    .btn-reset:hover { background: linear-gradient(to bottom, #ff6b6b, #e74c3c); }

    /* ===== PHOTO PREVIEW ===== */
    #photo-preview {
      max-width: 140px;
      max-height: 180px;
      border: 1px solid #999;
      margin-top: 8px;
      display: none;
    }

    /* ===== SUCCESS PAGE ===== */
    .submission-result {
      display: none;
    }
    .result-success-banner {
      background: #d4edda;
      border: 2px solid #27ae60;
      color: #155724;
      padding: 20px;
      text-align: center;
      margin-bottom: 20px;
      border-radius: 3px;
    }
    .result-success-banner h2 { color: #155724; font-size: 18px; margin-bottom: 5px; }
    .result-success-banner .checkmark { font-size: 36px; }
    .result-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 12px;
    }
    .result-table th {
      background: #06357a;
      color: #fff;
      padding: 8px 12px;
      text-align: left;
      font-size: 12px;
    }
    .result-table td {
      padding: 6px 12px;
      border: 1px solid #ddd;
    }
    .result-table tr:nth-child(even) { background: #f9f9f9; }
    .btn-print {
      background: #06357a;
      color: #fff;
      border: none;
      padding: 10px 25px;
      font-size: 13px;
      cursor: pointer;
      border-radius: 3px;
      margin-top: 10px;
    }
    .btn-print:hover { background: #034b8a; }

    /* ===== FOOTER ===== */
    .gov-footer {
      background: #06357a;
      color: #ccc;
      text-align: center;
      padding: 12px;
      font-size: 11px;
      margin-top: 20px;
      border-top: 3px solid #f47920;
    }
    .gov-footer a { color: #ffd700; }

    /* ===== MARQUEE-STYLE NOTICE ===== */
    .notice-bar {
      background: #fff3cd;
      border-bottom: 1px solid #ffc107;
      padding: 5px 0;
      font-size: 12px;
      color: #856404;
      overflow: hidden;
    }
    .notice-bar .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 15px;
    }
    .notice-bar strong { color: #c0392b; }
  </style>
</head>
<body>

  <!-- ===== TOP GOVERNMENT BAND ===== -->
  <div class="gov-top-band">
    <div class="container">
      <a href="#">Screen Reader Access</a>
      <span class="separator">|</span>
      <a href="#">Skip to Main Content</a>
      <span class="separator">|</span>
      <a href="#">A-</a> <a href="#">A</a> <a href="#">A+</a>
      <span class="separator">|</span>
      <a href="#">हिन्दी</a>
      <span class="separator">|</span>
      <a href="#">English</a>
    </div>
  </div>

  <!-- ===== HEADER ===== -->
  <div class="gov-header">
    <div class="container">
      <div class="gov-emblem" title="Government of India Emblem">🇮🇳</div>
      <div class="gov-header-text">
        <div class="hindi-text">भारत सरकार / Government of India</div>
        <h2>Ministry of Social Justice &amp; Empowerment</h2>
        <h3>National Scholarship Portal – Legacy Submission Gateway</h3>
      </div>
    </div>
  </div>

  <!-- ===== NAV BAR ===== -->
  <nav class="gov-navbar">
    <div class="container">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#" class="active">Apply Online</a></li>
        <li><a href="#">Check Status</a></li>
        <li><a href="#">Schemes</a></li>
        <li><a href="#">Guidelines</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#">FAQ</a></li>
      </ul>
    </div>
  </nav>

  <!-- ===== NOTICE BAR ===== -->
  <div class="notice-bar">
    <div class="container">
      <strong>⚠ NOTICE:</strong> This is the legacy submission gateway. Applicants are advised to fill all mandatory fields marked with (<span style="color:#c0392b">*</span>) carefully. Incomplete applications will be rejected. Last date for submission: 31/03/2025.
    </div>
  </div>

  <!-- ===== BREADCRUMB ===== -->
  <div class="breadcrumb-bar">
    <div class="container">
      <a href="#">Home</a><span class="sep">»</span>
      <a href="#">Scholarships</a><span class="sep">»</span>
      <a href="#">Legacy Portal</a><span class="sep">»</span>
      <strong>New Application</strong>
    </div>
  </div>

  <!-- ===== MAIN CONTENT ===== -->
  <div class="main-content">

    <!-- ===== FORM AREA ===== -->
    <div class="content-area">
      <div class="content-header">
        📝 Scholarship Application Form – Legacy Submission (Academic Year 2024-25)
      </div>
      <div class="content-body">

        <!-- Validation error summary -->
        <div class="validation-error-list" id="validation-summary">
          <h4>⛔ Please correct the following errors before submitting:</h4>
          <ul id="error-list"></ul>
        </div>

        <form id="nic-application-form" enctype="multipart/form-data" novalidate>

          <!-- ===== 1. PERSONAL DETAILS ===== -->
          <div class="form-section">
            <div class="form-section-header">
              Section I – Personal Details of Applicant
            </div>
            <div class="form-section-body">
              <div class="form-row">
                <div class="form-group">
                  <label for="applicant-name">Full Name (as per Aadhaar) <span class="required">*</span></label>
                  <input type="text" id="applicant-name" name="applicant-name" required placeholder="Enter full name" maxlength="100">
                </div>
                <div class="form-group">
                  <label for="father-name">Father's / Guardian's Name <span class="required">*</span></label>
                  <input type="text" id="father-name" name="father-name" required placeholder="Enter father/guardian name" maxlength="100">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="dob">Date of Birth <span class="required">*</span></label>
                  <input type="text" id="dob" name="dob" required placeholder="DD/MM/YYYY" maxlength="10">
                  <div class="field-hint">Format: DD/MM/YYYY (e.g., 15/08/1995)</div>
                  <div id="dob-error" class="error-banner" style="display:none">Invalid Date Format! Must be DD/MM/YYYY (e.g., 15/08/1995). Format YYYY-MM-DD is NOT accepted.</div>
                </div>
                <div class="form-group">
                  <label for="gender">Gender <span class="required">*</span></label>
                  <select id="gender" name="gender" required>
                    <option value="">-- Select Gender --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="category">Category <span class="required">*</span></label>
                  <select id="category" name="category" required>
                    <option value="">-- Select Category --</option>
                    <option value="General">General</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="OBC">OBC (Other Backward Class)</option>
                    <option value="EWS">EWS (Economically Weaker Section)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 2. ADDRESS SECTION ===== -->
          <div class="form-section">
            <div class="form-section-header">
              Section II – Permanent Address Details
            </div>
            <div class="form-section-body">
              <div class="form-row">
                <div class="form-group">
                  <label for="state">State / Union Territory <span class="required">*</span></label>
                  <select id="state" name="state" required>
                    <option value="">-- Select State --</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="district">District <span class="required">*</span></label>
                  <select id="district" name="district" required disabled>
                    <option value="">-- Select District --</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="tehsil">Tehsil / Taluka <span class="required">*</span></label>
                  <select id="tehsil" name="tehsil" required disabled>
                    <option value="">-- Select Tehsil/Taluka --</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="pincode">PIN Code <span class="required">*</span></label>
                  <input type="text" id="pincode" name="pincode" required pattern="[0-9]{6}" placeholder="6-digit PIN Code" maxlength="6">
                  <div class="field-hint">Enter 6-digit postal PIN code</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 3. INCOME & SCHEME ===== -->
          <div class="form-section">
            <div class="form-section-header">
              Section III – Income Details &amp; Scheme Information
            </div>
            <div class="form-section-body">
              <div class="form-row">
                <div class="form-group">
                  <label for="annual-income">Annual Family Income (₹) <span class="required">*</span></label>
                  <input type="number" id="annual-income" name="annual-income" required placeholder="e.g., 250000" min="0" max="10000000">
                  <div class="field-hint">Enter total annual family income in Rupees</div>
                </div>
                <div class="form-group">
                  <label for="scheme-name">Scheme Applied For <span class="required">*</span></label>
                  <input type="text" id="scheme-name" name="scheme-name" required placeholder="Enter scheme name" maxlength="200">
                  <div class="field-hint">e.g., Post Matric Scholarship for SC Students</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 4. DOCUMENT UPLOAD ===== -->
          <div class="form-section">
            <div class="form-section-header">
              Section IV – Upload Documents
            </div>
            <div class="form-section-body">
              <div class="form-row">
                <div class="form-group">
                  <label for="photo-upload">Applicant Passport Size Photograph <span class="required">*</span></label>
                  <input type="file" id="photo-upload" name="photo-upload" accept="image/*" required>
                  <div class="field-hint">JPEG format only. Max size: 50KB. Dimensions: 350×450 pixels.</div>
                  <div id="photo-error" class="error-banner" style="display:none"></div>
                  <div id="photo-success" class="success-banner" style="display:none"></div>
                  <img id="photo-preview" alt="Photo Preview">
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 5. CAPTCHA SECTION ===== -->
          <div class="form-section">
            <div class="form-section-header">
              Section V – Security Verification (CAPTCHA)
            </div>
            <div class="form-section-body">
              <div class="captcha-container">
                <div>
                  <div class="captcha-canvas-wrap">
                    <canvas id="captcha-canvas" width="220" height="64"></canvas>
                  </div>
                  <button type="button" class="captcha-refresh-btn" id="refresh-captcha">🔄 Refresh CAPTCHA</button>
                  <input type="hidden" id="captcha-value" name="captcha-value">
                  <input type="hidden" id="captcha-expected" name="captcha-expected">
                </div>
                <div class="form-group" style="max-width:220px">
                  <label for="captcha-input">Enter CAPTCHA Code <span class="required">*</span></label>
                  <input type="text" id="captcha-input" name="captcha-input" required placeholder="Enter code shown above" maxlength="6" autocomplete="off">
                  <div class="field-hint">Type the 6 characters shown in the image</div>
                  <div id="captcha-error" class="error-banner" style="display:none">Incorrect CAPTCHA. Please try again.</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 6. DECLARATION ===== -->
          <div class="declaration-box">
            <label>
              <input type="checkbox" id="declaration" name="declaration" required>
              I hereby declare that all the information furnished in this application form is true, complete, and correct to the best of my knowledge and belief. I understand that in the event of any information being found false or incorrect at any stage, my candidature/scholarship shall be cancelled/terminated without any notice. I also authorize the concerned authorities to verify the documents and information provided herein.
            </label>
          </div>

          <!-- ===== SUBMIT & RESET ===== -->
          <div style="text-align:center; padding: 10px 0;">
            <button type="submit" id="submit-btn" class="btn-submit">📤 Submit Application</button>
            <button type="reset" class="btn-reset" onclick="resetForm()">🔄 Reset Form</button>
          </div>

        </form>

        <!-- ===== SUBMISSION RESULT (hidden until submit) ===== -->
        <div class="submission-result" id="submission-result">
          <div class="result-success-banner">
            <div class="checkmark">✅</div>
            <h2>Application Submitted Successfully!</h2>
            <p>Your scholarship application has been received and is under processing.</p>
          </div>
          <table class="result-table">
            <tr>
              <th colspan="2">Application Receipt – Reference Details</th>
            </tr>
            <tr>
              <td><strong>Application Reference Number</strong></td>
              <td id="result-ref-number" style="color:#c0392b; font-weight:bold; font-size:14px;"></td>
            </tr>
            <tr>
              <td><strong>Date &amp; Time of Submission</strong></td>
              <td id="result-timestamp"></td>
            </tr>
            <tr>
              <td><strong>Applicant Name</strong></td>
              <td id="result-name"></td>
            </tr>
            <tr>
              <td><strong>Father's / Guardian's Name</strong></td>
              <td id="result-father"></td>
            </tr>
            <tr>
              <td><strong>Date of Birth</strong></td>
              <td id="result-dob"></td>
            </tr>
            <tr>
              <td><strong>Gender</strong></td>
              <td id="result-gender"></td>
            </tr>
            <tr>
              <td><strong>Category</strong></td>
              <td id="result-category"></td>
            </tr>
            <tr>
              <td><strong>State</strong></td>
              <td id="result-state"></td>
            </tr>
            <tr>
              <td><strong>District</strong></td>
              <td id="result-district"></td>
            </tr>
            <tr>
              <td><strong>Tehsil / Taluka</strong></td>
              <td id="result-tehsil"></td>
            </tr>
            <tr>
              <td><strong>PIN Code</strong></td>
              <td id="result-pincode"></td>
            </tr>
            <tr>
              <td><strong>Annual Family Income</strong></td>
              <td id="result-income"></td>
            </tr>
            <tr>
              <td><strong>Scheme Applied For</strong></td>
              <td id="result-scheme"></td>
            </tr>
          </table>
          <div style="text-align:center; margin-top:15px;">
            <button type="button" class="btn-print" onclick="window.print()">🖨️ Print Receipt</button>
          </div>
        </div>

      </div>
    </div>

    <!-- ===== SIDEBAR ===== -->
    <div class="sidebar">
      <div class="sidebar-box">
        <div class="sb-header">📋 Instructions</div>
        <div class="sb-body">
          <ul>
            <li>Fields marked with <span style="color:#c0392b">*</span> are mandatory.</li>
            <li>Date of Birth must be in <strong>DD/MM/YYYY</strong> format.</li>
            <li>Photograph must be under <strong>50KB</strong> in JPEG format.</li>
            <li>Enter CAPTCHA correctly to submit.</li>
            <li>Keep your Reference Number for future tracking.</li>
          </ul>
        </div>
      </div>
      <div class="sidebar-box">
        <div class="sb-header">📞 Helpdesk</div>
        <div class="sb-body">
          <p><strong>Toll-Free:</strong> 1800-233-3944</p>
          <p><strong>Email:</strong> helpdesk@nsp.gov.in</p>
          <p><strong>Timings:</strong> Mon–Fri, 9:30 AM – 5:30 PM</p>
        </div>
      </div>
      <div class="sidebar-box">
        <div class="sb-header">⚠ Important Dates</div>
        <div class="sb-body">
          <p><strong>Portal Open:</strong> 01/04/2024</p>
          <p><strong>Last Date:</strong> 31/03/2025</p>
          <p><strong>Defective Verification:</strong> 15/04/2025</p>
        </div>
      </div>
    </div>

  </div>

  <!-- ===== FOOTER ===== -->
  <div class="gov-footer">
    Content Owned by Ministry of Social Justice &amp; Empowerment, Government of India.<br>
    Designed, Developed and Hosted by <a href="#">National Informatics Centre (NIC)</a>, Ministry of Electronics &amp; Information Technology, Government of India.<br>
    © 2024 National Scholarship Portal. All rights reserved. | <a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a> | <a href="#">Disclaimer</a>
  </div>

  <!-- ===== JAVASCRIPT ===== -->
  <script>
    (function() {
      'use strict';

      // =============================================
      // CASCADING DROPDOWN DATA
      // =============================================
      var stateDistrictTehsilData = {
        "Andhra Pradesh": {
          "Anantapur": ["Anantapur", "Dharmavaram", "Kadiri"],
          "Guntur": ["Guntur", "Tenali", "Narasaraopet"],
          "Visakhapatnam": ["Visakhapatnam", "Anakapalli", "Bheemunipatnam"],
          "Vijayawada": ["Vijayawada", "Nuzvid", "Gannavaram"]
        },
        "Bihar": {
          "Patna": ["Patna Sadar", "Danapur", "Masaurhi"],
          "Gaya": ["Gaya Sadar", "Bodh Gaya", "Sherghati"],
          "Muzaffarpur": ["Muzaffarpur Sadar", "Kanti", "Sahebganj"],
          "Bhagalpur": ["Bhagalpur Sadar", "Kahalgaon", "Naugachhia"]
        },
        "Delhi": {
          "New Delhi": ["New Delhi", "Chanakya Puri", "Parliament Street"],
          "Central Delhi": ["Daryaganj", "Karol Bagh", "Paharganj"],
          "South Delhi": ["Saket", "Hauz Khas", "Mehrauli"],
          "East Delhi": ["Preet Vihar", "Laxmi Nagar", "Mayur Vihar"]
        },
        "Gujarat": {
          "Ahmedabad": ["Ahmedabad City", "Daskroi", "Sanand"],
          "Surat": ["Surat City", "Choryasi", "Kamrej"],
          "Vadodara": ["Vadodara City", "Padra", "Savli"],
          "Rajkot": ["Rajkot", "Kotda Sangani", "Lodhika"]
        },
        "Karnataka": {
          "Bengaluru Urban": ["Bengaluru North", "Bengaluru South", "Anekal"],
          "Mysuru": ["Mysuru", "Nanjangud", "T. Narasipura"],
          "Dharwad": ["Dharwad", "Hubli", "Kalghatgi"],
          "Belagavi": ["Belagavi", "Chikkodi", "Gokak"]
        },
        "Kerala": {
          "Thiruvananthapuram": ["Thiruvananthapuram", "Neyyattinkara", "Nedumangad"],
          "Ernakulam": ["Ernakulam", "Aluva", "Muvattupuzha"],
          "Kozhikode": ["Kozhikode", "Koyilandy", "Vatakara"],
          "Thrissur": ["Thrissur", "Chalakudy", "Kodungallur"]
        },
        "Madhya Pradesh": {
          "Bhopal": ["Bhopal", "Huzur", "Berasia"],
          "Indore": ["Indore", "Mhow", "Depalpur"],
          "Jabalpur": ["Jabalpur", "Sihora", "Patan"],
          "Gwalior": ["Gwalior", "Morar", "Dabra"]
        },
        "Maharashtra": {
          "Mumbai": ["Mumbai City", "Andheri", "Borivali"],
          "Pune": ["Pune City", "Haveli", "Maval"],
          "Nagpur": ["Nagpur Urban", "Hingna", "Kamptee"],
          "Nashik": ["Nashik", "Igatpuri", "Sinnar"]
        },
        "Rajasthan": {
          "Jaipur": ["Jaipur", "Amber", "Sanganer"],
          "Jodhpur": ["Jodhpur", "Bilara", "Shergarh"],
          "Udaipur": ["Udaipur", "Salumbar", "Vallabhnagar"],
          "Ajmer": ["Ajmer", "Kishangarh", "Beawar"]
        },
        "Tamil Nadu": {
          "Chennai": ["Chennai North", "Chennai South", "Tambaram"],
          "Coimbatore": ["Coimbatore North", "Coimbatore South", "Pollachi"],
          "Madurai": ["Madurai North", "Madurai South", "Melur"],
          "Salem": ["Salem", "Attur", "Mettur"]
        },
        "Telangana": {
          "Hyderabad": ["Hyderabad", "Secunderabad", "Golconda"],
          "Rangareddy": ["Rangareddy", "Chevella", "Ibrahimpatnam"],
          "Warangal": ["Warangal", "Hanamkonda", "Jangaon"],
          "Karimnagar": ["Karimnagar", "Huzurabad", "Jagtial"]
        },
        "Uttar Pradesh": {
          "Lucknow": ["Lucknow", "Mohanlalganj", "Bakshi Ka Talab"],
          "Varanasi": ["Varanasi", "Pindra", "Cholapur"],
          "Agra": ["Agra", "Fatehabad", "Kheragarh"],
          "Kanpur": ["Kanpur Nagar", "Ghatampur", "Bilhaur"]
        },
        "West Bengal": {
          "Kolkata": ["Kolkata North", "Kolkata South", "Kolkata Central"],
          "Howrah": ["Howrah Sadar", "Uluberia", "Shyampur"],
          "North 24 Parganas": ["Barasat", "Basirhat", "Barrackpore"],
          "Darjeeling": ["Darjeeling Sadar", "Siliguri", "Kurseong"]
        }
      };

      // =============================================
      // POPULATE STATE DROPDOWN
      // =============================================
      var stateSelect = document.getElementById('state');
      var districtSelect = document.getElementById('district');
      var tehsilSelect = document.getElementById('tehsil');

      Object.keys(stateDistrictTehsilData).sort().forEach(function(stateName) {
        var opt = document.createElement('option');
        opt.value = stateName;
        opt.textContent = stateName;
        stateSelect.appendChild(opt);
      });

      // =============================================
      // CASCADING: STATE -> DISTRICT
      // =============================================
      stateSelect.addEventListener('change', function() {
        // Reset district and tehsil
        districtSelect.innerHTML = '<option value="">-- Select District --</option>';
        tehsilSelect.innerHTML = '<option value="">-- Select Tehsil/Taluka --</option>';
        tehsilSelect.disabled = true;

        var selectedState = this.value;
        if (selectedState && stateDistrictTehsilData[selectedState]) {
          districtSelect.disabled = false;
          Object.keys(stateDistrictTehsilData[selectedState]).sort().forEach(function(districtName) {
            var opt = document.createElement('option');
            opt.value = districtName;
            opt.textContent = districtName;
            districtSelect.appendChild(opt);
          });
        } else {
          districtSelect.disabled = true;
        }
      });

      // =============================================
      // CASCADING: DISTRICT -> TEHSIL
      // =============================================
      districtSelect.addEventListener('change', function() {
        tehsilSelect.innerHTML = '<option value="">-- Select Tehsil/Taluka --</option>';

        var selectedState = stateSelect.value;
        var selectedDistrict = this.value;
        if (selectedState && selectedDistrict && stateDistrictTehsilData[selectedState][selectedDistrict]) {
          tehsilSelect.disabled = false;
          stateDistrictTehsilData[selectedState][selectedDistrict].forEach(function(tehsilName) {
            var opt = document.createElement('option');
            opt.value = tehsilName;
            opt.textContent = tehsilName;
            tehsilSelect.appendChild(opt);
          });
        } else {
          tehsilSelect.disabled = true;
        }
      });

      // =============================================
      // DOB VALIDATION
      // =============================================
      var dobInput = document.getElementById('dob');
      var dobError = document.getElementById('dob-error');

      function validateDob() {
        var val = dobInput.value.trim();
        if (val.length === 0) {
          dobError.style.display = 'none';
          return true; // empty is handled by required attribute
        }
        var regex = /^\\d{2}\\/\\d{2}\\/\\d{4}$/;
        if (!regex.test(val)) {
          dobError.style.display = 'block';
          return false;
        } else {
          dobError.style.display = 'none';
          return true;
        }
      }

      dobInput.addEventListener('blur', validateDob);

      // =============================================
      // PHOTO UPLOAD VALIDATION
      // =============================================
      var photoInput = document.getElementById('photo-upload');
      var photoError = document.getElementById('photo-error');
      var photoSuccess = document.getElementById('photo-success');
      var photoPreview = document.getElementById('photo-preview');

      photoInput.addEventListener('change', function() {
        photoError.style.display = 'none';
        photoSuccess.style.display = 'none';
        photoPreview.style.display = 'none';

        if (this.files && this.files[0]) {
          var file = this.files[0];
          var fileSizeKB = (file.size / 1024).toFixed(1);

          if (file.size > 51200) { // 50KB = 51200 bytes
            photoError.textContent = 'ERROR: Photograph file size exceeds 50KB limit! Current size: ' + fileSizeKB + 'KB. Please compress your photograph to under 50KB in JPEG format (350x450 pixels).';
            photoError.style.display = 'block';
            photoPreview.style.display = 'none';
            // Clear the input so the invalid file isn't submitted
            // (but keep it for the agent to see the error)
          } else {
            photoSuccess.textContent = '✅ Photo accepted. File size: ' + fileSizeKB + 'KB (within 50KB limit).';
            photoSuccess.style.display = 'block';

            // Show preview
            var reader = new FileReader();
            reader.onload = function(e) {
              photoPreview.src = e.target.result;
              photoPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
          }
        }
      });

      // =============================================
      // CAPTCHA GENERATION
      // =============================================
      var captchaCanvas = document.getElementById('captcha-canvas');
      var captchaCtx = captchaCanvas ? captchaCanvas.getContext('2d') : null;
      var captchaHidden = document.getElementById('captcha-value');
      var captchaExpected = document.getElementById('captcha-expected');
      var captchaInput = document.getElementById('captcha-input');
      var captchaError = document.getElementById('captcha-error');

      function generateCaptcha() {
        if (!captchaCanvas || !captchaCtx) return;

        // Unambiguous uppercase alphanumeric characters only (excludes 0/O, 1/I/l)
        var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        var captchaCode = '';
        for (var i = 0; i < 6; i++) {
          captchaCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Store ground truth in multiple inspectable DOM anchors
        if (captchaHidden) captchaHidden.value = captchaCode;
        if (captchaExpected) captchaExpected.value = captchaCode;
        captchaCanvas.dataset.captcha = captchaCode;
        window.__currentCaptcha = captchaCode;

        // Ensure canvas backing dimensions match layout
        captchaCanvas.width = 220;
        captchaCanvas.height = 64;

        // Clear canvas
        captchaCtx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height);

        // High-contrast archival cream background
        captchaCtx.fillStyle = '#f4f4ea';
        captchaCtx.fillRect(0, 0, captchaCanvas.width, captchaCanvas.height);

        // Security border
        captchaCtx.strokeStyle = '#c5c5b5';
        captchaCtx.lineWidth = 1;
        captchaCtx.strokeRect(0, 0, captchaCanvas.width, captchaCanvas.height);

        // Noise: random lines
        for (var i = 0; i < 7; i++) {
          captchaCtx.beginPath();
          captchaCtx.moveTo(Math.random() * 220, Math.random() * 64);
          captchaCtx.lineTo(Math.random() * 220, Math.random() * 64);
          captchaCtx.strokeStyle = 'rgba(' + Math.floor(Math.random()*120) + ',' + Math.floor(Math.random()*120) + ',' + Math.floor(Math.random()*120) + ',0.35)';
          captchaCtx.lineWidth = 1.2;
          captchaCtx.stroke();
        }

        // Noise: random dots
        for (var i = 0; i < 40; i++) {
          captchaCtx.beginPath();
          captchaCtx.arc(Math.random() * 220, Math.random() * 64, 1.2, 0, Math.PI * 2);
          captchaCtx.fillStyle = 'rgba(' + Math.floor(Math.random()*120) + ',' + Math.floor(Math.random()*120) + ',' + Math.floor(Math.random()*120) + ',0.4)';
          captchaCtx.fill();
        }

        // Draw characters with high contrast and explicit baseline
        var colors = ['#1a365d', '#991b1b', '#166534', '#075985', '#6b21a8', '#9a3412'];
        captchaCtx.textBaseline = 'middle';
        for (var i = 0; i < captchaCode.length; i++) {
          captchaCtx.save();
          var x = 24 + i * 30;
          var y = 32 + (Math.random() * 6 - 3);
          var angle = (Math.random() - 0.5) * 0.35; // gentle rotation
          captchaCtx.translate(x, y);
          captchaCtx.rotate(angle);
          captchaCtx.font = '900 ' + (22 + Math.floor(Math.random() * 4)) + 'px Courier New, monospace, Georgia, serif';
          captchaCtx.fillStyle = colors[i % colors.length];
          captchaCtx.fillText(captchaCode[i], -8, 0);
          captchaCtx.restore();
        }

        // Reset captcha input and hide error
        if (captchaInput) captchaInput.value = '';
        if (captchaError) captchaError.style.display = 'none';
      }

      // Expose globally for headless automation guarantees
      window.__drawCaptcha = generateCaptcha;

      // Generate initial CAPTCHA
      generateCaptcha();

      // Refresh CAPTCHA button
      document.getElementById('refresh-captcha').addEventListener('click', function() {
        generateCaptcha();
      });

      // =============================================
      // FORM SUBMISSION HANDLER
      // =============================================
      var form = document.getElementById('nic-application-form');

      form.addEventListener('submit', function(e) {
        e.preventDefault();

        var errors = [];

        // 1. Validate Full Name
        var applicantName = document.getElementById('applicant-name').value.trim();
        if (!applicantName) {
          errors.push('Full Name is required.');
        }

        // 2. Validate Father's Name
        var fatherName = document.getElementById('father-name').value.trim();
        if (!fatherName) {
          errors.push("Father's / Guardian's Name is required.");
        }

        // 3. Validate DOB
        var dobVal = dobInput.value.trim();
        if (!dobVal) {
          errors.push('Date of Birth is required.');
        } else {
          var dobRegex = /^\\d{2}\\/\\d{2}\\/\\d{4}$/;
          if (!dobRegex.test(dobVal)) {
            errors.push('Date of Birth must be in DD/MM/YYYY format.');
            dobError.style.display = 'block';
          }
        }

        // 4. Validate Gender
        var genderVal = document.getElementById('gender').value;
        if (!genderVal) {
          errors.push('Gender selection is required.');
        }

        // 5. Validate Category
        var categoryVal = document.getElementById('category').value;
        if (!categoryVal) {
          errors.push('Category selection is required.');
        }

        // 6. Validate State
        var stateVal = stateSelect.value;
        if (!stateVal) {
          errors.push('State / Union Territory selection is required.');
        }

        // 7. Validate District
        var districtVal = districtSelect.value;
        if (!districtVal) {
          errors.push('District selection is required.');
        }

        // 8. Validate Tehsil
        var tehsilVal = tehsilSelect.value;
        if (!tehsilVal) {
          errors.push('Tehsil / Taluka selection is required.');
        }

        // 9. Validate PIN Code
        var pincodeVal = document.getElementById('pincode').value.trim();
        if (!pincodeVal) {
          errors.push('PIN Code is required.');
        } else if (!/^[0-9]{6}$/.test(pincodeVal)) {
          errors.push('PIN Code must be exactly 6 digits.');
        }

        // 10. Validate Income
        var incomeVal = document.getElementById('annual-income').value;
        if (!incomeVal || Number(incomeVal) <= 0) {
          errors.push('Annual Family Income is required and must be greater than 0.');
        }

        // 11. Validate Scheme
        var schemeVal = document.getElementById('scheme-name').value.trim();
        if (!schemeVal) {
          errors.push('Scheme Applied For is required.');
        }

        // 12. Validate Photo
        var photoFiles = photoInput.files;
        if (!photoFiles || photoFiles.length === 0) {
          errors.push('Applicant photograph is required.');
        } else if (photoFiles[0].size > 51200) {
          errors.push('Photograph file size exceeds 50KB limit. Please compress and re-upload.');
        }

        // 13. Validate CAPTCHA (100% Case-Insensitive)
        var captchaInputVal = captchaInput.value.trim();
        var captchaCorrect = captchaHidden.value.trim();
        if (!captchaInputVal) {
          errors.push('CAPTCHA verification is required.');
          captchaError.style.display = 'block';
          captchaError.textContent = 'Please enter the CAPTCHA code.';
        } else if (captchaInputVal.toUpperCase() !== captchaCorrect.toUpperCase()) {
          errors.push('CAPTCHA code is incorrect. Please enter the correct code.');
          captchaError.style.display = 'block';
          captchaError.textContent = 'Incorrect CAPTCHA. Please try again.';
          generateCaptcha();
        }

        // 14. Validate Declaration
        var declCheck = document.getElementById('declaration') || document.getElementById('declaration-check');
        if (!declCheck || !declCheck.checked) {
          errors.push('You must accept the declaration to proceed.');
        }

        // Show errors or submit
        var errorSummary = document.getElementById('validation-summary');
        var errorList = document.getElementById('error-list');

        if (errors.length > 0) {
          errorList.innerHTML = '';
          errors.forEach(function(err) {
            var li = document.createElement('li');
            li.textContent = err;
            errorList.appendChild(li);
          });
          errorSummary.style.display = 'block';
          errorSummary.scrollIntoView({ behavior: 'smooth' });
          return;
        }

        // All valid — hide error summary
        errorSummary.style.display = 'none';

        // Build FormData and POST to /legacy-nic-portal/submit
        var formData = new FormData(form);

        // Disable submit button during submission
        var submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Submitting...';

        fetch('/legacy-nic-portal/submit', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        })
        .then(function(response) {
          var ct = response.headers.get('content-type') || '';
          if (ct.indexOf('application/json') !== -1) {
            return response.json();
          } else {
            return response.text().then(function(html) {
              var match = new RegExp('NIC/SCHEME/[0-9]{4}/[0-9]{6}').exec(html);
              return { referenceNumber: match ? match[0] : null };
            });
          }
        })
        .then(function(data) {
          // Show the success page
          showResult({
            referenceNumber: data.referenceNumber || generateRefNumber(),
            timestamp: data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            name: applicantName,
            father: fatherName,
            dob: dobVal,
            gender: genderVal,
            category: categoryVal,
            state: stateVal,
            district: districtVal,
            tehsil: tehsilVal,
            pincode: pincodeVal,
            income: incomeVal,
            scheme: schemeVal
          });
        })
        .catch(function(err) {
          // Even on network error, show success with generated ref number (for demo)
          showResult({
            referenceNumber: generateRefNumber(),
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            name: applicantName,
            father: fatherName,
            dob: dobVal,
            gender: genderVal,
            category: categoryVal,
            state: stateVal,
            district: districtVal,
            tehsil: tehsilVal,
            pincode: pincodeVal,
            income: incomeVal,
            scheme: schemeVal
          });
        });
      });

      function generateRefNumber() {
        var digits = '';
        for (var i = 0; i < 6; i++) {
          digits += Math.floor(Math.random() * 10);
        }
        return 'NIC/SCHEME/2024/' + digits;
      }

      function showResult(data) {
        // Hide the form
        form.style.display = 'none';

        // Populate result fields
        document.getElementById('result-ref-number').textContent = data.referenceNumber;
        document.getElementById('result-timestamp').textContent = data.timestamp;
        document.getElementById('result-name').textContent = data.name;
        document.getElementById('result-father').textContent = data.father;
        document.getElementById('result-dob').textContent = data.dob;
        document.getElementById('result-gender').textContent = data.gender;
        document.getElementById('result-category').textContent = data.category;
        document.getElementById('result-state').textContent = data.state;
        document.getElementById('result-district').textContent = data.district;
        document.getElementById('result-tehsil').textContent = data.tehsil;
        document.getElementById('result-pincode').textContent = data.pincode;
        document.getElementById('result-income').textContent = '\\u20B9 ' + Number(data.income).toLocaleString('en-IN');
        document.getElementById('result-scheme').textContent = data.scheme;

        // Show result section
        document.getElementById('submission-result').style.display = 'block';
        document.getElementById('submission-result').scrollIntoView({ behavior: 'smooth' });
      }

      // =============================================
      // FORM RESET HANDLER
      // =============================================
      window.resetForm = function() {
        dobError.style.display = 'none';
        photoError.style.display = 'none';
        photoSuccess.style.display = 'none';
        photoPreview.style.display = 'none';
        captchaError.style.display = 'none';
        document.getElementById('validation-summary').style.display = 'none';
        districtSelect.innerHTML = '<option value="">-- Select District --</option>';
        districtSelect.disabled = true;
        tehsilSelect.innerHTML = '<option value="">-- Select Tehsil/Taluka --</option>';
        tehsilSelect.disabled = true;
        generateCaptcha();
      };

    })();
  </script>
</body>
</html>`;
}
