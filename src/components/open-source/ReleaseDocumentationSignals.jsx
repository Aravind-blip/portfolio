import RepositorySignal from "../ui/RepositorySignal";

// Sparse but truthful: signals are derived per-project from verified
// repository evidence, not forced to an equal count across every repo.
function ReleaseDocumentationSignals({ projects }) {
  return (
    <section className="section" aria-labelledby="signals-heading">
      <div className="section-header">
        <p className="eyebrow">Release and Documentation Signals</p>
        <h2 id="signals-heading">Repository maturity, at a glance</h2>
      </div>
      <div className="signals-grid">
        {projects.map((project) => (
          <div className="signals-card glass-panel" key={project.id}>
            <h3>{project.name}</h3>
            <div className="signals-list">
              <RepositorySignal
                label={project.packageUrl ? "Published package" : "No published package"}
                available={Boolean(project.packageUrl)}
              />
              <RepositorySignal
                label={project.release.published ? `Tagged releases (${project.release.latest})` : "Not released"}
                available={project.release.published}
              />
              <RepositorySignal
                label={project.license ? `${project.license} license` : "License not specified"}
                available={Boolean(project.license)}
              />
              <RepositorySignal label={project.ci.exists ? "CI workflow" : "No CI workflow"} available={project.ci.exists} />
              <RepositorySignal
                label={project.documentation.installation ? "Installation docs" : "No installation docs"}
                available={project.documentation.installation}
              />
              <RepositorySignal
                label={project.documentation.contributing ? "Contribution guide" : "No contribution guide"}
                available={project.documentation.contributing}
              />
              <RepositorySignal
                label={project.documentation.security ? "Security policy" : "No security policy"}
                available={project.documentation.security}
              />
              <RepositorySignal label={project.docker ? "Docker support" : "No Docker support"} available={project.docker} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReleaseDocumentationSignals;
