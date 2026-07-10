const STATUS_CLASS = {
  Active: "status-active",
  Stable: "status-stable",
  Prototype: "status-prototype",
  Experimental: "status-experimental",
  Planned: "status-planned",
  "Production support": "status-stable",
};

function StatusBadge({ status }) {
  const className = STATUS_CLASS[status] || "status-planned";
  return <span className={`status-badge ${className}`}>{status}</span>;
}

export default StatusBadge;
