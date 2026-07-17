import MaintenanceStatus from "../ui/MaintenanceStatus";

// Real repository activity (verified pushed_at dates), not a live feed —
// this is manually refreshed structured data, not a fake terminal ticker.
function CurrentMaintenance({ projects }) {
  return (
    <section className="section" aria-labelledby="maintenance-heading">
      <div className="section-header">
        <p className="eyebrow">Current Maintenance</p>
        <h2 id="maintenance-heading">What is actively being improved</h2>
        <p className="section-description">
          Verified activity as of each repository&rsquo;s last recorded push, not a live feed.
        </p>
      </div>
      <ul className="maintenance-list">
        {projects.map((project) => (
          <li className="maintenance-item" key={project.id}>
            <div className="maintenance-item-header">
              <h3>{project.name}</h3>
              <MaintenanceStatus state={project.status} />
            </div>
            <p>{project.maintenance.note}</p>
            <p className="mini-label">Last activity: {project.maintenance.lastActivity}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CurrentMaintenance;
