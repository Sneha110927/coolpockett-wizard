import React from "react";
import { passwordScore, passwordStrengthLabel } from "../lib/validators.js";

export default function PasswordStrength({ password }) {
  const score = passwordScore(password);
  const pct = Math.min(100, Math.round((score / 5) * 100));
  const label = passwordStrengthLabel(score);
  return (
    <div>
      <div className="pwBar" aria-hidden="true">
        <div className="pwFill" style={{ width: `${pct}%` }} />
      </div>
      <div className="pwText">{label}</div>
    </div>
  );
}