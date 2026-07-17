import { FiExternalLink, FiGithub } from "react-icons/fi";
import Button from "../ui/Button";
import MaintenanceStatus from "../ui/MaintenanceStatus";
import RepositoryBadge from "../case-study/RepositoryBadge";
import RepositorySignal from "../ui/RepositorySignal";
import StatusBadge from "../ui/StatusBadge";
import TechChip from "../ui/TechChip";
import VersionBadge from "../case-study/VersionBadge";

function FlagshipRepository({ project }) {
  return (
    <section className="section" aria-labelledby="flagship-heading">
      <div className="section-header">
        <p className="eyebrow">Flagship Project</p>
        <h2 id="flagship-heading">{project.name}</h2>
      </div>
      <article className="flagship-repository glass-panel">
        <div className="flagship-repository-main">
          <p className="hero-lead">{project.shortDescription}</p>
          <div className="flagship-repository-badges">
            <StatusBadge status={project.maturity} />
            <MaintenanceStatus state={project.status} />
            <VersionBadge version={project.version} />
            {project.license ? <RepositoryBadge label={project.license} /> : null}
          </div>
          <div className="chip-row">
            <TechChip>{project.primaryLanguage}</TechChip>
            {project.technologies
              .filter((tech) => tech !== project.primaryLanguage)
              .slice(0, 5)
              .map((tech) => (
                <TechChip key={tech}>{tech}</TechChip>
              ))}
          </div>
          <div className="flagship-repository-signals">
            <RepositorySignal label={project.ci.exists ? "CI configured" : "No CI"} available={project.ci.exists} />
            <RepositorySignal
              label={project.documentation.installation ? "Installation docs" : "No installation docs"}
              available={project.documentation.installation}
            />
            <RepositorySignal
              label={project.packageUrl ? "Published package" : "No published package"}
              available={Boolean(project.packageUrl)}
            />
          </div>
          <div className="hero-actions">
            <Button href={project.repositoryUrl} variant="primary" aria-label={`View ${project.name} repository on GitHub`}>
              <FiGithub aria-hidden="true" />
              View repository
            </Button>
            {project.caseStudyUrl ? (
              <Button to={project.caseStudyUrl} variant="secondary" aria-label={`Read the ${project.name} case study`}>
                <FiExternalLink aria-hidden="true" />
                Read the case study
              </Button>
            ) : null}
          </div>
        </div>
      </article>
    </section>
  );
}

export default FlagshipRepository;
