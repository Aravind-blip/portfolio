import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";

function RelatedProjects({ id, slugs }) {
  const related = slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean);

  if (!related.length) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`}>Related systems</h2>
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
