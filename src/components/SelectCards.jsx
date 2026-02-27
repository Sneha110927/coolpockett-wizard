import React from "react";

export default function SelectCards({
  options,
  value,
  onChange,
  columns = 2,
  ariaLabel
}) {
  const cls = columns === 1 ? "cardsCol" : "cardsGrid";
  return (
    <div className={cls} role="group" aria-label={ariaLabel}>
      {options.map((opt) => {
        const pressed = value === opt.value;
        return (
          <button
            type="button"
            key={opt.value}
            className="cardChoice"
            aria-pressed={pressed}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}