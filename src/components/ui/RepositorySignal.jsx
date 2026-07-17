// One reusable primitive for every "does this repo have X" signal (CI,
// docs, package, Docker, license, tests...) instead of a separate
// ReleaseSignal/DocumentationSignal component per signal type — they're
// structurally identical: a label plus a present/absent state.
function RepositorySignal({ label, available, detail }) {
  return (
    <span className={`repo-signal${available ? " repo-signal-available" : " repo-signal-unavailable"}`}>
      <span className="repo-signal-dot" aria-hidden="true" />
      {label}
      {available && detail ? <span className="repo-signal-detail">{detail}</span> : null}
    </span>
  );
}

export default RepositorySignal;
