import React from "react";

function bulletsFor(goal) {
  if (goal === "spend") {
    return ["Instant spending notifications", "Budgeting tools included", "No monthly fees"];
  }
  if (goal === "save") {
    return ["Auto-savings rules", "Goal buckets", "Flexible withdrawals"];
  }
  return ["Portfolio tracking", "Recurring buys", "Risk profile guidance (mock)"];
}

export default function AccountPreview({ accountType, goal }) {
  const labelType = accountType === "business" ? "Business" : "Individual";
  const labelGoal =
    goal === "spend" ? "Spend" : goal === "save" ? "Save" : "Invest";

  const bullets = bulletsFor(goal);

  return (
    <div className="previewBox">
      <div style={{ fontWeight: 800 }}>Account preview</div>
      <div style={{ marginTop: 8, fontSize: 13, color: "#344054" }}>
        CoolPockett {labelGoal} ({labelType})
      </div>
      <ul className="bullets">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}