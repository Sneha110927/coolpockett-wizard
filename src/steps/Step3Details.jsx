import React from "react";
import Field from "../components/Field.jsx";
import FileUpload from "../components/Fileupload.jsx";
import {
  BUSINESS_ROLES,
  COUNTRIES,
  ID_TYPES_INDIVIDUAL,
  US_STATES,
} from "../lib/countries.js";
import {
  isDateMMDDYYYY,
  isNonEmpty,
  isPAN,
  isSSNLast4,
  isZipLike,
} from "../lib/validators.js";

export default function Step3Details({ state, setDetails, onBack, onValidNext }) {
  const { setup, basics, details } = state;
  const isBusiness = setup.accountType === "business";
  const country = basics.country;

  const [touched, setTouched] = React.useState({});
  const errors = validate({ isBusiness, country, details });
  const canContinue = Object.keys(errors).length === 0;

  function touchAll() {
    const all = {};
    Object.keys(errors).forEach((k) => (all[k] = true));

    const extra = isBusiness
      ? ["businessName", "registrationCountry", "role"]
      : ["dob", "address1", "idType", "idNumber", "city", "postal"];
    extra.forEach((k) => (all[k] = true));

    if (country === "US") ["usState", "ssnLast4"].forEach((k) => (all[k] = true));
    else if (country === "IN") ["pan"].forEach((k) => (all[k] = true));
    else ["nationalId"].forEach((k) => (all[k] = true));

    all.documentFileName = true;
    setTouched(all);
  }

  function onNext() {
    touchAll();
    const fresh = validate({ isBusiness, country, details });
    if (Object.keys(fresh).length === 0) onValidNext();
  }

  const countrySectionTitle =
    country === "US" ? "US-specific" : country === "IN" ? "IN-specific" : "Country-specific";

  return (
    <>
      <div className="panel" style={{ borderRadius: 2 }}>
        <div className="hint" style={{ fontSize: 13, color: "#344054" }}>
          Based on: {isBusiness ? "Business" : "Individual"} + {country || "—"}
        </div>
      </div>

      {!isBusiness ? (
        <>
          <Field label="Date of birth" error={touched.dob ? errors.dob : ""}>
            <input
              className="input"
              value={details.dob}
              onChange={(e) => setDetails({ dob: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, dob: true }))}
              placeholder="MM/DD/YYYY"
              inputMode="numeric"
            />
          </Field>

          <Field label="Address line 1" error={touched.address1 ? errors.address1 : ""}>
            <input
              className="input"
              value={details.address1}
              onChange={(e) => setDetails({ address1: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, address1: true }))}
              placeholder="Enter address"
            />
          </Field>

          <Field label="City" error={touched.city ? errors.city : ""}>
            <input
              className="input"
              value={details.city}
              onChange={(e) => setDetails({ city: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, city: true }))}
              placeholder="Enter city"
            />
          </Field>

          <Field label="Postal code" error={touched.postal ? errors.postal : ""}>
            <input
              className="input"
              value={details.postal}
              onChange={(e) => setDetails({ postal: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, postal: true }))}
              placeholder={country === "US" ? "Enter ZIP" : "Enter postal"}
            />
          </Field>

          <Field label="ID type" error={touched.idType ? errors.idType : ""}>
            <select
              className="select"
              value={details.idType}
              onChange={(e) => setDetails({ idType: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, idType: true }))}
            >
              {ID_TYPES_INDIVIDUAL.map((it) => (
                <option key={it.value} value={it.value}>
                  {it.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="ID number" error={touched.idNumber ? errors.idNumber : ""}>
            <input
              className="input"
              value={details.idNumber}
              onChange={(e) => setDetails({ idNumber: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, idNumber: true }))}
              placeholder="Enter ID number"
            />
          </Field>
        </>
      ) : (
        <>
          <Field label="Business legal name" error={touched.businessName ? errors.businessName : ""}>
            <input
              className="input"
              value={details.businessName}
              onChange={(e) => setDetails({ businessName: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, businessName: true }))}
              placeholder="Enter business name"
            />
          </Field>

          <Field
            label="Registration country"
            error={touched.registrationCountry ? errors.registrationCountry : ""}
          >
            <select
              className="select"
              value={details.registrationCountry}
              onChange={(e) => setDetails({ registrationCountry: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, registrationCountry: true }))}
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Role" error={touched.role ? errors.role : ""}>
            <select
              className="select"
              value={details.role}
              onChange={(e) => setDetails({ role: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, role: true }))}
            >
              {BUSINESS_ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </Field>
        </>
      )}

      {/* Country-driven conditional (title now matches the wireframe intent) */}
      <div style={{ marginTop: 18 }}>
        <div className="label" style={{ marginBottom: 8 }}>
          {countrySectionTitle}
        </div>

        {country === "US" ? (
          <>
            <Field label="State" error={touched.usState ? errors.usState : ""}>
              <select
                className="select"
                value={details.usState}
                onChange={(e) => setDetails({ usState: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, usState: true }))}
              >
                <option value="">Select state</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="SSN last 4" error={touched.ssnLast4 ? errors.ssnLast4 : ""}>
              <input
                className="input"
                value={details.ssnLast4}
                onChange={(e) => setDetails({ ssnLast4: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, ssnLast4: true }))}
                placeholder="••••"
                inputMode="numeric"
              />
            </Field>
          </>
        ) : country === "IN" ? (
          <Field label="PAN" error={touched.pan ? errors.pan : ""}>
            <input
              className="input"
              value={details.pan}
              onChange={(e) => setDetails({ pan: e.target.value.toUpperCase() })}
              onBlur={() => setTouched((t) => ({ ...t, pan: true }))}
              placeholder="ABCDE1234F"
              autoCapitalize="characters"
            />
          </Field>
        ) : (
          <Field label="National ID" error={touched.nationalId ? errors.nationalId : ""}>
            <input
              className="input"
              value={details.nationalId}
              onChange={(e) => setDetails({ nationalId: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, nationalId: true }))}
              placeholder="Enter National ID"
            />
          </Field>
        )}
      </div>

      <FileUpload
        label="Document upload"
        value={details.documentFileName}
        onChange={(name) => setDetails({ documentFileName: name })}
        error={touched.documentFileName ? errors.documentFileName : ""}
      />

      <div className="footer">
        <div className="footerInner">
          <div className="stepText">Step 3 of 4</div>
          <div className="navRow">
            <button type="button" className="btn btnHalf" onClick={onBack}>
              Back
            </button>
            <button
              type="button"
              className="btn btnPrimary btnHalf"
              disabled={!canContinue}
              onClick={onNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function validate({ isBusiness, country, details }) {
  const e = {};

  if (isBusiness) {
    if (!isNonEmpty(details.businessName)) e.businessName = "Business legal name is required.";
    if (!isNonEmpty(details.registrationCountry))
      e.registrationCountry = "Select registration country.";
    if (!isNonEmpty(details.role)) e.role = "Select your role.";
  } else {
    if (!isDateMMDDYYYY(details.dob)) e.dob = "Enter DOB as MM/DD/YYYY.";
    if (!isNonEmpty(details.address1)) e.address1 = "Address is required.";
    if (!isNonEmpty(details.city)) e.city = "City is required.";
    if (!isZipLike(details.postal)) e.postal = "Enter a valid postal code.";
    if (!isNonEmpty(details.idType)) e.idType = "Select ID type.";
    if (!isNonEmpty(details.idNumber)) e.idNumber = "ID number is required.";
  }

  if (country === "US") {
    if (!isNonEmpty(details.usState)) e.usState = "Select a state.";
    if (!isSSNLast4(details.ssnLast4)) e.ssnLast4 = "Enter last 4 digits.";
  } else if (country === "IN") {
    if (!isPAN(details.pan)) e.pan = "Enter a valid PAN (ABCDE1234F).";
  } else {
    if (!isNonEmpty(details.nationalId)) e.nationalId = "National ID is required.";
  }

  if (!isNonEmpty(details.documentFileName))
    e.documentFileName = "Please choose a file (mock).";

  return e;
}