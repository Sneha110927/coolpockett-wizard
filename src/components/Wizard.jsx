import React from "react";
import ProgressDots from "./ProgressDots.jsx";
import Step1Basics from "../steps/Step1Basics.jsx";
import Step2Setup from "../steps/Step2Setup.jsx";
import Step3Details from "../steps/Step3Details.jsx";
import Step4Review from "../steps/Step4Review.jsx";
import { loadWizardState, saveWizardState, clearWizardState } from "../lib/storage.js";

const TOTAL = 4;

const defaultState = {
  step: 1,
  basics: {
    fullName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
  },
  setup: {
    accountType: "individual", // individual | business
    goal: "spend", // spend | save | invest
    monthlyVolume: 35
  },
  details: {
    // individual
    dob: "",
    address1: "",
    city: "",
    postal: "",
    idType: "passport",
    idNumber: "",
    // business
    businessName: "",
    registrationCountry: "",
    role: "founder",
    // country-driven
    usState: "",
    ssnLast4: "",
    pan: "",
    nationalId: "",
    // upload
    documentFileName: ""
  },
  submitted: false
};

export default function Wizard() {
  const [state, setState] = React.useState(() => loadWizardState() || defaultState);

  React.useEffect(() => {
    saveWizardState(state);
  }, [state]);

  const step = state.step;

  function setBasics(patch) {
    setState((s) => ({ ...s, basics: { ...s.basics, ...patch } }));
  }
  function setSetup(patch) {
    setState((s) => ({ ...s, setup: { ...s.setup, ...patch } }));
  }
  function setDetails(patch) {
    setState((s) => ({ ...s, details: { ...s.details, ...patch } }));
  }

  function goNext() {
    setState((s) => ({ ...s, step: Math.min(TOTAL, s.step + 1) }));
  }
  function goBack() {
    setState((s) => ({ ...s, step: Math.max(1, s.step - 1) }));
  }

  function resetAll() {
    clearWizardState();
    setState(defaultState);
  }

  const commonProps = {
    state,
    setBasics,
    setSetup,
    setDetails
  };

  return (
    <div className="wizardFrame">
      <div className="wizardHeader">
        <div className="headerRow">
          <button
            className="backIcon"
            type="button"
            onClick={goBack}
            disabled={step === 1}
            aria-label="Back"
            title="Back"
          >
            ←
          </button>
          <div className="title">
            {step === 1 ? "Account basics" : step === 2 ? "Account setup" : step === 3 ? "Details" : "Review"}
          </div>
        </div>
      </div>

      <div className="centerBrand">
        <div className="progressWrap">
          <ProgressDots step={step} total={TOTAL} />
        </div>
        <div className="brandName">CoolPockett</div>
        <div className="brandSub">Let's get started</div>
      </div>

      <div className="content">
        <div className="formCard">
          {step === 1 && <Step1Basics {...commonProps} onValidNext={goNext} />}
          {step === 2 && <Step2Setup {...commonProps} onBack={goBack} onValidNext={goNext} />}
          {step === 3 && <Step3Details {...commonProps} onBack={goBack} onValidNext={goNext} />}
          {step === 4 && (
            <Step4Review
              {...commonProps}
              onBack={goBack}
              onSubmit={() => setState((s) => ({ ...s, submitted: true }))}
              onReset={resetAll}
            />
          )}
        </div>
      </div>

      {/* Footer is rendered per-step (to match wireframe button layout precisely) */}
    </div>
  );
}