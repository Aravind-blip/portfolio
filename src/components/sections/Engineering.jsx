import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import { engineeringPrinciples } from "../../data/engineering";
import { projects } from "../../data/projects";

function Engineering() {
  return (
    <section className="section" id="engineering">
      <SectionHeader
        eyebrow="Engineering"
        title="How decisions get made, not just which tools were touched"
        description="Each principle is stated with real evidence and a link to the system that demonstrates it, rather than a self-assessed skill level."
      />
      <div className="principles-list">
        {engineeringPrinciples.map((item) => {
          const project = projects.find((p) => p.slug === item.projectSlug);
          return (
            <article className="principle-card" key={item.principle}>
              <h3>{item.principle}</h3>
              <p className="principle-statement">{item.statement}</p>
              <p className="principle-evidence">{item.evidence}</p>
              {project ? (
                <Link className="project-link" to={`/systems/${project.slug}`}>
                  {project.name}
                  <FiArrowRight aria-hidden="true" />
                </Link>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Engineering;
