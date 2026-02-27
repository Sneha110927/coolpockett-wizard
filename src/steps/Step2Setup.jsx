import React from "react";
import SelectCards from "../components/SelectCards.jsx";

export default function Step2Setup({ state, setSetup, onBack, onValidNext }) {
  const v = state.setup;

  const canContinue = Boolean(v.accountType) && Boolean(v.goal);

  return (
    <>
      <div className="field">
        <div className="labelRow">
          <div className="label">Account type</div>
        </div>
        <SelectCards
          ariaLabel="Account type"
          value={v.accountType}
          onChange={(val) => setSetup({ accountType: val })}
          options={[
            { value: "individual", label: "Individual" },
            { value: "business", label: "Business" }
          ]}
          columns={2}
        />
      </div>

      <div className="field" style={{ marginTop: 18 }}>
        <div className="labelRow">
          <div className="label">Product goal</div>
        </div>
        <SelectCards
          ariaLabel="Product goal"
          value={v.goal}
          onChange={(val) => setSetup({ goal: val })}
          options={[
            { value: "spend", label: "Spend" },
            { value: "save", label: "Save" },
            { value: "invest", label: "Invest" }
          ]}
          columns={1}
        />
      </div>

      <div className="sliderRow">
        <div className="labelRow">
          <div className="label">Monthly volume</div>
        </div>
        <input
          className="range"
          type="range"
          min="0"
          max="100"
          value={v.monthlyVolume}
          onChange={(e) => setSetup({ monthlyVolume: Number(e.target.value) })}
        />
        <div className="sliderTop">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      <div className="footer">
        <div className="footerInner">
          <div className="stepText">Step 2 of 4</div>
          <div className="navRow">
            <button type="button" className="btn btnHalf" onClick={onBack}>
              Back
            </button>
            <button
              type="button"
              className="btn btnPrimary btnHalf"
              disabled={!canContinue}
              onClick={() => canContinue && onValidNext()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}