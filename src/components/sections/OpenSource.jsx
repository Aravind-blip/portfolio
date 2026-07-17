import { FiArrowRight } from "react-icons/fi";
import Button from "../ui/Button";
import GitHubProfileCTA from "../ui/GitHubProfileCTA";
import StatusBadge from "../ui/StatusBadge";
import SectionHeader from "../ui/SectionHeader";
import { openSourceProjects } from "../../data/open-source-projects";

// A concise preview only — the full catalog, maintenance signals, and
// roadmap live on the Open Source Hub route, not duplicated here.
const previewProjects = [...openSourceProjects]
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .slice(0, 3);

function OpenSource() {
  return (
    <section className="section" id="open-source">
      <SectionHeader
        eyebrow="Open Source"
        title="Building tools, systems, and experiments in public"
        description="No star counts, no live badges — just what's actually true about each repository as of this page's last update."
      />
      <div className="opensource-list">
        {previewProjects.map((project) => (
          <article className="opensource-card glass-panel" key={project.id}>
            <div className="repository-entry-header">
              <h3>{project.name}</h3>
              <StatusBadge status={project.maturity} />
            </div>
            <p>{project.shortDescription}</p>
          </article>
        ))}
      </div>
      <div className="hero-actions">
        <Button to="/open-source" variant="primary">
          Explore the Open Source Hub
          <FiArrowRight aria-hidden="true" />
        </Button>
        <GitHubProfileCTA />
      </div>
    </section>
  );
}

export default OpenSource;
