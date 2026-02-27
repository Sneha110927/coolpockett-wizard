import React from "react";
import Field from "./Field.jsx";
import PasswordStrength from "./PasswordStrength.jsx";

export default function PasswordField({
  value,
  onChange,
  error
}) {
  const [show, setShow] = React.useState(false);

  return (
    <Field label="Password" error={error}>
      <div className="pwRow">
        <input
          className="input"
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=""
          autoComplete="new-password"
        />
        <button
          type="button"
          className="pwToggle"
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow((s) => !s)}
        >
          {show ? "🙈" : "👁"}
        </button>
      </div>
      <PasswordStrength password={value} />
    </Field>
  );
}