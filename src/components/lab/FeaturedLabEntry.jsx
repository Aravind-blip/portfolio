import { FiArrowRight } from "react-icons/fi";
import Button from "../ui/Button";
import MetadataBadge from "../case-study/MetadataBadge";
import StatusBadge from "../ui/StatusBadge";
import { projects } from "../../data/projects";

function FeaturedLabEntry({ entry }) {
  const relatedProject = projects.find((project) => project.slug === entry.relatedProjectIds[0]);

  return (
    <section className="section" aria-labelledby="featured-lab-heading">
      <div className="section-header">
        <p className="eyebrow">Featured Investigation</p>
        <h2 id="featured-lab-heading">{entry.title}</h2>
      </div>
      <article className="flagship-repository glass-panel">
        <div className="flagship-repository-main">
          <div className="flagship-repository-badges">
            <MetadataBadge label="Type" value={entry.type} />
            <StatusBadge status={entry.status} />
            {relatedProject ? <MetadataBadge label="Related System" value={relatedProject.name} /> : null}
          </div>
          <p className="hero-lead">{entry.question}</p>
          {entry.status === "Validated" && entry.findings ? (
            <p>
              <strong>Key finding: </strong>
              {entry.findings}
            </p>
          ) : null}
          <div className="hero-actions">
            <Button to={`/lab/${entry.slug}`} variant="primary">
              Read entry
              <FiArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default FeaturedLabEntry;
