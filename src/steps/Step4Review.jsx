import React from "react";
import ReviewTable from "../components/ReviewTable.jsx";
import AccountPreview from "../components/AccountPreview.jsx";

export default function Step4Review({ state, onBack, onSubmit, onReset }) {
  const { basics, setup, details, submitted } = state;

  if (submitted) {
    return (
      <>
        <div className="panel">
          <div className="panelTitle">Confirmation</div>
          <div style={{ fontSize: 13, color: "#344054", lineHeight: 1.55 }}>
            Your CoolPockett application was submitted successfully (mock).
            <br />
            You can refresh and the confirmation will persist until you reset.
          </div>
        </div>

        <div className="footer">
          <div className="footerInner">
            <div className="stepText">Step 4 of 4</div>
            <button type="button" className="btn btnPrimary btnWide" onClick={onReset}>
              Start over
            </button>
          </div>
        </div>
      </>
    );
  }

  const isBusiness = setup.accountType === "business";
  const country = basics.country;

  return (
    <>
      <div className="reviewPanels">
        <ReviewTable
          title="Account basics"
          items={[
            { key: "name", label: "Name:", value: basics.fullName },
            { key: "email", label: "Email:", value: basics.email },
            { key: "phone", label: "Phone:", value: basics.phone },
            { key: "country", label: "Country:", value: country }
          ]}
        />

        <ReviewTable
          title="Account setup"
          items={[
            { key: "type", label: "Type:", value: setup.accountType === "business" ? "Business" : "Individual" },
            { key: "goal", label: "Goal:", value: setup.goal.charAt(0).toUpperCase() + setup.goal.slice(1) }
          ]}
        />

        <ReviewTable
          title="Details"
          items={[
            ...(isBusiness
              ? [
                  { key: "bn", label: "Business:", value: details.businessName },
                  { key: "rc", label: "Reg. country:", value: details.registrationCountry },
                  { key: "role", label: "Role:", value: details.role }
                ]
              : [
                  { key: "dob", label: "DOB:", value: details.dob },
                  { key: "city", label: "City:", value: details.city }
                ]),
            ...(country === "US"
              ? [
                  { key: "state", label: "State:", value: details.usState },
                  { key: "ssn", label: "SSN:", value: details.ssnLast4 ? `•••• ${details.ssnLast4}` : "" }
                ]
              : country === "IN"
              ? [{ key: "pan", label: "PAN:", value: details.pan }]
              : [{ key: "nid", label: "National ID:", value: details.nationalId }])
          ]}
        />

        <AccountPreview accountType={setup.accountType} goal={setup.goal} />
      </div>

      <div className="footer">
        <div className="footerInner">
          <div className="stepText">Step 4 of 4</div>
          <div className="navRow">
            <button type="button" className="btn btnHalf" onClick={onBack}>
              Back
            </button>
            <button type="button" className="btn btnPrimary btnHalf" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}