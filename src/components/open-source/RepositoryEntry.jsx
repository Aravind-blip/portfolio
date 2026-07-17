import { FiExternalLink, FiGithub } from "react-icons/fi";
import Button from "../ui/Button";
import MaintenanceStatus from "../ui/MaintenanceStatus";
import RepositoryBadge from "../case-study/RepositoryBadge";
import StatusBadge from "../ui/StatusBadge";
import TechChip from "../ui/TechChip";
import VersionBadge from "../case-study/VersionBadge";

function RepositoryEntry({ project }) {
  return (
    <article className="repository-entry glass-panel">
      <div className="repository-entry-header">
        <h3>{project.name}</h3>
        <div className="repository-entry-badges">
          <StatusBadge status={project.maturity} />
          <MaintenanceStatus state={project.status} />
        </div>
      </div>
      <p className="mini-label">{project.category}</p>
      <p>{project.shortDescription}</p>
      <div className="chip-row">
        <TechChip>{project.primaryLanguage}</TechChip>
        {project.technologies
          .filter((tech) => tech !== project.primaryLanguage)
          .slice(0, 3)
          .map((tech) => (
            <TechChip key={tech}>{tech}</TechChip>
          ))}
      </div>
      <div className="repository-entry-badges">
        {project.license ? <RepositoryBadge label={project.license} /> : null}
        <VersionBadge version={project.version} />
      </div>
      <div className="repository-entry-links">
        <Button href={project.repositoryUrl} variant="secondary" aria-label={`View ${project.name} repository on GitHub`}>
          <FiGithub aria-hidden="true" />
          Repository
        </Button>
        {project.caseStudyUrl ? (
          <Button to={project.caseStudyUrl} variant="secondary" aria-label={`Read the ${project.name} case study`}>
            <FiExternalLink aria-hidden="true" />
            Case study
          </Button>
        ) : null}
      </div>
    </article>
  );
}

export default RepositoryEntry;
