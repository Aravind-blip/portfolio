import { FiArrowRight, FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";
import StatusBadge from "../ui/StatusBadge";
import TechChip from "../ui/TechChip";

function ProjectCard({ project }) {
  return (
    <article className="project-card glass-panel">
      <div className="project-header">
        <div className="project-title-row">
          <h3>{project.name}</h3>
          <StatusBadge status={project.status} />
        </div>
        <p>{project.tagline}</p>
      </div>

      <p className="project-problem">{project.problem}</p>

      <div className="chip-row" aria-label={`${project.name} tech stack`}>
        {project.tech.slice(0, 6).map((item) => (
          <TechChip key={item}>{item}</TechChip>
        ))}
      </div>

      <div className="project-card-actions">
        <Link className="project-link" to={`/projects/${project.slug}`}>
          Read case study
          <FiArrowRight aria-hidden="true" />
        </Link>
        {project.githubUrl ? (
          <a
            className="project-link"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub aria-hidden="true" />
            Repository
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default ProjectCard;
