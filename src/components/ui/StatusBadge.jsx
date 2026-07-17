const STATUS_CLASS = {
  Active: "status-active",
  Stable: "status-stable",
  Prototype: "status-prototype",
  Experimental: "status-experimental",
  Planned: "status-planned",
  Learning: "status-prototype",
  Archived: "status-archived",
  Validated: "status-stable",
  "In progress": "status-experimental",
  Paused: "status-planned",
  Superseded: "status-archived",
  "Production support": "status-stable",
};

function StatusBadge({ status }) {
  const className = STATUS_CLASS[status] || "status-planned";
  return <span className={`status-badge ${className}`}>{status}</span>;
}

export default StatusBadge;
