import React from "react";
import Field from "./Field.jsx";

export default function FileUpload({ label, value, onChange, error }) {
  return (
    <Field label={label} hint="Mock upload" error={error}>
      <input
        className="input"
        type="file"
        onChange={(e) => {
          const f = e.target.files?.[0];
          onChange(f ? f.name : "");
        }}
      />
      <div className="hint" style={{ marginTop: 8 }}>
        Selected: {value ? value : "None"}
      </div>
    </Field>
  );
}