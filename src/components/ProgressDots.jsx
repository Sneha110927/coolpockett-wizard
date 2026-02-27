import React from "react";

export default function ProgressDots({ step, total }) {
  const dots = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="dots" aria-label={`Step ${step} of ${total}`}>
      <style>{`
        .dots{display:flex; gap:8px; align-items:center;}
        .dot{width:8px;height:8px;border-radius:999px;background:#d0d5dd;}
        .dot.active{background:#0b1220;}
      `}</style>
      {dots.map((n) => (
        <span
          key={n}
          className={`dot ${n === step ? "active" : ""}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}