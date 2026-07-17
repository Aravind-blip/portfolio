import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import SectionHeading from "./SectionHeading";

function RelatedProjects({ id, slugs, heading = "Related systems" }) {
  const related = slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean);

  if (!related.length) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>{heading}</SectionHeading>
      <div className="related-projects-list">
        {related.map((project) => (
          <Link className="project-link" to={`/systems/${project.slug}`} key={project.slug}>
            {project.name}
            <FiArrowRight aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedProjects;
