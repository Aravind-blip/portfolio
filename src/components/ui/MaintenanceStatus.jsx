// Distinct vocabulary from StatusBadge's maturity labels (Stable/Active/
// Experimental/...) — this communicates current engagement level
// (Maintained/In development/Paused/Complete/Planned), reusing the same
// visual language so the two badges read consistently side by side.
const STATE_CLASS = {
  Maintained: "status-active",
  "In development": "status-experimental",
  Paused: "status-planned",
  Complete: "status-stable",
  Planned: "status-planned",
};

function MaintenanceStatus({ state }) {
  const className = STATE_CLASS[state] || "status-planned";
  return <span className={`status-badge ${className}`}>{state}</span>;
}

export default MaintenanceStatus;
