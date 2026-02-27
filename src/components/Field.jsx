import React from "react";

export default function Field({
  label,
  hint,
  error,
  children,
}) {
  return (
    <div className="field">
      <div className="labelRow">
        <div className="label">{label}</div>
        {hint ? <div className="hint">{hint}</div> : null}
      </div>
      {children}
      {error ? <div className="error">{error}</div> : null}
    </div>
  );
}