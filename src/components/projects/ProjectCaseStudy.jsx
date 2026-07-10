import { FiArrowRight, FiExternalLink, FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";
import ArchitectureDiagram from "./ArchitectureDiagram";
import StatusBadge from "../ui/StatusBadge";
import TechChip from "../ui/TechChip";

function ProjectCaseStudy({ project }) {
  return (
    <article className="case-study">
      <Link className="back-link" to="/">
        <FiArrowRight className="back-arrow" aria-hidden="true" />
        Back to projects
      </Link>

      <header className="case-study-header">
        <div className="project-title-row">
          <h1>{project.name}</h1>
          <StatusBadge status={project.status} />
        </div>
        <p className="hero-lead">{project.tagline}</p>
      </header>

      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading">Overview</h2>
        <p>{project.whatIBuilt}</p>
      </section>

      <section aria-labelledby="problem-heading">
        <h2 id="problem-heading">Problem</h2>
        <p>{project.problem}</p>
        <p>{project.whyItMatters}</p>
      </section>

      <section aria-labelledby="architecture-heading">
        <h2 id="architecture-heading">System architecture</h2>
        <ArchitectureDiagram steps={project.architecture} />
      </section>

      <section aria-labelledby="contribution-heading">
        <h2 id="contribution-heading">My contribution</h2>
        <p>{project.whatIBuilt}</p>
      </section>

      <section aria-labelledby="decisions-heading">
        <h2 id="decisions-heading">Key engineering decisions</h2>
        <ul className="detail-list">
          {project.decisions.map((decision) => (
            <li key={decision}>{decision}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="stack-heading">
        <h2 id="stack-heading">Technology stack</h2>
        <div className="chip-row">
          {project.tech.map((item) => (
            <TechChip key={item}>{item}</TechChip>
          ))}
        </div>
      </section>

      <section aria-labelledby="testing-heading">
        <h2 id="testing-heading">Testing and evaluation</h2>
        <p>{project.testing}</p>
      </section>

      <section aria-labelledby="limitations-heading">
        <h2 id="limitations-heading">Failure modes and limitations</h2>
        <p>{project.limitations}</p>
      </section>

      <section aria-labelledby="results-heading">
        <h2 id="results-heading">Results</h2>
        <p>{project.reliability}</p>
      </section>

      <section aria-labelledby="links-heading">
        <h2 id="links-heading">Repository or demo</h2>
        <div className="case-study-links">
          {project.githubUrl ? (
            <a className="button button-secondary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <FiGithub aria-hidden="true" />
              View repository
            </a>
          ) : (
            <p className="todo-note">
              {project.isProfessionalExperience
                ? "Professional work — source is confidential and not publicly linked."
                : "Private repository — not publicly linked. See the summary above for what can be disclosed."}
            </p>
          )}
          {project.demoUrl ? (
            <a className="button button-secondary" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <FiExternalLink aria-hidden="true" />
              View live demo
            </a>
          ) : null}
        </div>
        {project.demoNote ? <p className="todo-note">{project.demoNote}</p> : null}
      </section>

      <section aria-labelledby="next-heading">
        <h2 id="next-heading">Next iteration</h2>
        <p>{project.nextIteration}</p>
      </section>
    </article>
  );
}

export default ProjectCaseStudy;
