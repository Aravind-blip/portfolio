import { FiArrowRight, FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import StatusBadge from "../ui/StatusBadge";
import TechChip from "../ui/TechChip";
import ArchitectureDiagram from "../projects/ArchitectureDiagram";
import { featuredProjects } from "../../data/projects";

function FeaturedSystem() {
  const [flagship] = featuredProjects;

  return (
    <section className="section" id="featured-system">
      <SectionHeader
        eyebrow="Featured System"
        title="One project, at full depth, before asking for trust in breadth"
        description="The strongest evidence on this site, shown first and in full — the rest of the systems below prove this wasn't a one-off."
      />
      <article className="featured-system glass-panel">
        <div className="project-header">
          <div className="project-title-row">
            <h3>{flagship.name}</h3>
            <StatusBadge status={flagship.status} />
          </div>
          <p>{flagship.tagline}</p>
        </div>

        <p className="project-problem">{flagship.problem}</p>

        <ArchitectureDiagram steps={flagship.architecture} />

        <div className="chip-row" aria-label={`${flagship.name} tech stack`}>
          {flagship.tech.slice(0, 6).map((item) => (
            <TechChip key={item}>{item}</TechChip>
          ))}
        </div>

        <div className="project-card-actions">
          <Link className="button button-primary" to={`/systems/${flagship.slug}`}>
            Read case study
            <FiArrowRight aria-hidden="true" />
          </Link>
          {flagship.githubUrl ? (
            <a
              className="button button-secondary"
              href={flagship.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub aria-hidden="true" />
              Repository
            </a>
          ) : null}
        </div>
      </article>
    </section>
  );
}

export default FeaturedSystem;
