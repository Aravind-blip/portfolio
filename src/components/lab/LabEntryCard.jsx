import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import MetadataBadge from "../case-study/MetadataBadge";
import StatusBadge from "../ui/StatusBadge";
import { projects } from "../../data/projects";

function LabEntryCard({ entry }) {
  const relatedProject = projects.find((project) => project.slug === entry.relatedProjectIds[0]);

  return (
    <article className="lab-card glass-panel">
      <div className="lab-card-header">
        <h3>{entry.title}</h3>
        <StatusBadge status={entry.status} />
      </div>
      <div className="repository-entry-badges">
        <MetadataBadge label="Type" value={entry.type} />
        {relatedProject ? <MetadataBadge label="System" value={relatedProject.name} /> : null}
      </div>
      <p>{entry.summary}</p>
      <p className="mini-label">
        Updated <time dateTime={entry.updatedAt}>{entry.updatedAt}</time>
      </p>
      <Link className="project-link" to={`/lab/${entry.slug}`}>
        Read entry
        <FiArrowRight aria-hidden="true" />
      </Link>
    </article>
  );
}

export default LabEntryCard;
