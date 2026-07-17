import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import { labEntries } from "../../data/lab-entries";

// Mirrors RelatedProjects exactly, sourced from lab-entries.js instead of
// projects.js — kept as a separate small component rather than forcing
// RelatedProjects to take a generic data source, since the two already
// serve distinct, clear purposes (Phase 8 precedent: RelatedEngineeringNotes).
function RelatedLabEntries({ id, slugs, heading = "Related Lab Entries" }) {
  const related = slugs
    .map((slug) => labEntries.find((entry) => entry.slug === slug))
    .filter(Boolean);

  if (!related.length) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>{heading}</SectionHeading>
      <div className="related-projects-list">
        {related.map((entry) => (
          <Link className="project-link" to={`/lab/${entry.slug}`} key={entry.slug}>
            {entry.title}
            <FiArrowRight aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedLabEntries;
