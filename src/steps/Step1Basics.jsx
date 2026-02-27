import React from "react";
import Field from "../components/Field.jsx";
import PasswordField from "../components/PasswordField.jsx";
import { COUNTRIES } from "../lib/countries.js";
import { isEmail, isNonEmpty, isPhone, passwordScore } from "../lib/validators.js";

export default function Step1Basics({ state, setBasics, onValidNext }) {
  const v = state.basics;

  const [touched, setTouched] = React.useState({});
  const errors = validate(v);

  const canContinue = Object.keys(errors).length === 0;

  function onNext() {
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      country: true,
      password: true
    });
    if (Object.keys(errors).length === 0) onValidNext();
  }

  return (
    <>
      <Field label="Full name" error={touched.fullName ? errors.fullName : ""}>
        <input
          className="input"
          value={v.fullName}
          onChange={(e) => setBasics({ fullName: e.target.value })}
          onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
          placeholder="Enter name"
        />
      </Field>

      <Field label="Email" error={touched.email ? errors.email : ""}>
        <input
          className="input"
          value={v.email}
          onChange={(e) => setBasics({ email: e.target.value })}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          placeholder="Enter email"
          inputMode="email"
        />
      </Field>

      <Field label="Phone" error={touched.phone ? errors.phone : ""}>
        <input
          className="input"
          value={v.phone}
          onChange={(e) => setBasics({ phone: e.target.value })}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          placeholder="Enter phone"
          inputMode="tel"
        />
      </Field>

      <Field label="Country of residency" error={touched.country ? errors.country : ""}>
        <select
          className="select"
          value={v.country}
          onChange={(e) => setBasics({ country: e.target.value })}
          onBlur={() => setTouched((t) => ({ ...t, country: true }))}
        >
          <option value="">Select country</option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>

      <PasswordField
        value={v.password}
        onChange={(pw) => setBasics({ password: pw })}
        error={touched.password ? errors.password : ""}
      />

      <div className="footer">
        <div className="footerInner">
          <div className="stepText">Step 1 of 4</div>
          <button
            type="button"
            className="btn btnPrimary btnWide"
            onClick={onNext}
            disabled={!canContinue}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

function validate(v) {
  const e = {};
  if (!isNonEmpty(v.fullName)) e.fullName = "Full name is required.";
  if (!isEmail(v.email)) e.email = "Enter a valid email.";
  if (!isPhone(v.phone)) e.phone = "Enter a valid phone number.";
  if (!isNonEmpty(v.country)) e.country = "Select your country.";
  const score = passwordScore(v.password);
  if (score < 2) e.password = "Password is too weak (use 8+ chars and mix types).";
  return e;
}