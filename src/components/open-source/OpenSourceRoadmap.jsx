const COLUMNS = [
  { key: "inProgress", label: "In Progress" },
  { key: "next", label: "Next" },
  { key: "exploring", label: "Exploring" },
];

// A simple 3-column render, not broken into a separate RoadmapColumn file —
// it has no reuse case outside this one aggregation of every project's
// roadmap arrays.
function OpenSourceRoadmap({ projects }) {
  return (
    <section className="section" aria-labelledby="roadmap-heading">
      <div className="section-header">
        <p className="eyebrow">Current Roadmap</p>
        <h2 id="roadmap-heading">What comes next, honestly</h2>
      </div>
      <div className="open-source-roadmap-grid">
        {COLUMNS.map((column) => {
          const entries = projects.flatMap((project) =>
            project.roadmap[column.key].map((item) => ({ project: project.name, item }))
          );
          return (
            <div className="open-source-roadmap-column" key={column.key}>
              <h3>{column.label}</h3>
              {entries.length ? (
                <ul className="detail-list">
                  {entries.map(({ project, item }) => (
                    <li key={`${project}-${item}`}>
                      <strong>{project}: </strong>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mini-label">Nothing here right now.</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default OpenSourceRoadmap;
