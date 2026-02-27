import React from "react";

function row(label, value) {
  return (
    <>
      <div className="k">{label}</div>
      <div className="v">{value || "-"}</div>
    </>
  );
}

export default function ReviewTable({ title, items }) {
  return (
    <div className="panel">
      <div className="panelTitle">{title}</div>
      <div className="kv">
        {items.map((it) => (
          <React.Fragment key={it.key}>
            {row(it.label, it.value)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}