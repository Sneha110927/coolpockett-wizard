# CoolPockett — 4-Step Account Opening Wizard

A mobile-first, responsive 4-step account opening wizard for a fictional fintech app called **CoolPockett**.  
Built with **React + Vite** and custom UI components (inputs, selectable cards, progress dots) to demonstrate fundamentals.

---

## Links (Deliverables)

- **GitHub Repo:** <PASTE_YOUR_GITHUB_REPO_LINK_HERE>
- **Deployed App (Vercel/Netlify):** <PASTE_YOUR_DEPLOYED_LINK_HERE>

---

## Features (Requirement Coverage)

### Core Wizard
- **Exactly 4 steps** with **Next / Back** navigation
- **Progress indicator** (carousel dots)
- **Step-level validation**:
  - Errors displayed at field level
  - **Cannot proceed** until the current step is valid
- **Resume after reload**:
  - Wizard step + form data persist using `localStorage`
  - Refresh returns to the same step with previous entries intact
- **Mobile-first + responsive**:
  - Mobile layout is the baseline
  - Desktop centers content and maintains readable widths similar to the wireframes

---

## Step Breakdown

### Step 1 — Account basics
Fields:
- Full name
- Email
- Phone
- Country of residency
- Password

Widget:
- **Password show/hide**
- **Password strength indicator** (simple scoring)

Validation examples:
- Email format
- Phone length/format (permissive)
- Password strength (minimum score threshold)

---

### Step 2 — Account setup
Selections (touch-friendly cards/chips):
- Account type: **Individual | Business**
- Product goal: **Spend | Save | Invest**
- Monthly volume slider (mock)

Validation:
- Must select account type + product goal

---

### Step 3 — Details (Conditional)
This step changes based on:
1) **Account type** (from Step 2)
2) **Country** (from Step 1)

**Individual path**
- DOB
- Address line 1
- City
- Postal code
- ID type + ID number

**Business path**
- Business legal name
- Registration country
- Role

**Country-driven conditional**
- **US → State + SSN last 4**
- **IN → PAN**
- **Else → National ID**

Widget:
- **Mock document upload** showing selected filename

Validation:
- Path-specific required fields
- Country-specific required fields (SSN last 4 / PAN / National ID)
- Document upload required (mock)

---

### Step 4 — Review & submit
- Review summary of entered data
- “Account preview” widget changes by:
  - Account type (Individual/Business)
  - Product goal (Spend/Save/Invest)
- Submit shows confirmation state
- Reset clears persisted state and restarts the flow

---

## Tech Stack

- **React 18**
- **Vite**
- CSS (custom styling to match wireframes)
- No form library used (validation handled manually) to show fundamentals

---

## Project Structure

```text
src/
  components/
    Wizard.jsx
    ProgressDots.jsx
    Field.jsx
    SelectCards.jsx
    PasswordField.jsx
    PasswordStrength.jsx
    FileUpload.jsx
    ReviewTable.jsx
    AccountPreview.jsx
  steps/
    Step1Basics.jsx
    Step2Setup.jsx
    Step3Details.jsx
    Step4Review.jsx
  lib/
    storage.js
    validators.js
    countries.js
  styles/
    globals.css
    wizard.css
