import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import ProjectMetadata from "./ProjectMetadata";

function ProjectHero({ title, subtitle, status, category, repository }) {
  return (
    <header className="doc-hero">
      <Link className="back-link" to="/">
        <FiArrowRight className="back-arrow" aria-hidden="true" />
        Back to systems
      </Link>
      <h1>{title}</h1>
      <p className="hero-lead">{subtitle}</p>
      <ProjectMetadata status={status} category={category} repository={repository} />
    </header>
  );
}

export default ProjectHero;
