import StatusBadge from "../ui/StatusBadge";

const STATUSES = [
  { status: "Validated", meaning: "Implemented and backed by evidence in the repository (tests, CI, release notes)." },
  { status: "In progress", meaning: "Partially implemented; part of the investigation still has open questions." },
  { status: "Experimental", meaning: "Working but not yet proven at scale or under real conditions." },
  { status: "Planned", meaning: "Identified as worth doing; not started yet." },
  { status: "Paused", meaning: "Started, then set aside — not abandoned, just not active right now." },
  { status: "Superseded", meaning: "Replaced by a later decision or entry; kept for the record." },
];

function StatusLegend() {
  return (
    <section className="section" aria-labelledby="status-legend-heading">
      <div className="section-header">
        <p className="eyebrow">Status Legend</p>
        <h2 id="status-legend-heading">What each status means</h2>
      </div>
      <ul className="status-legend-list">
        {STATUSES.map(({ status, meaning }) => (
          <li key={status}>
            <StatusBadge status={status} />
            <span>{meaning}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default StatusLegend;
