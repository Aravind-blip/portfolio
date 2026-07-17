import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import StatusBadge from "../ui/StatusBadge";
import { labEntries } from "../../data/lab-entries";

// Only rendered when a case study actually has related lab entries — no
// forced section, no circular link for its own sake.
function RelatedEngineeringNotes({ id, projectSlug }) {
  const related = labEntries.filter((entry) => entry.caseStudyUrl === `/systems/${projectSlug}`);

  if (!related.length) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Related Engineering Notes</SectionHeading>
      <div className="related-projects-list">
        {related.map((entry) => (
          <Link className="project-link" to={`/lab/${entry.slug}`} key={entry.id}>
            {entry.title}
            <StatusBadge status={entry.status} />
            <FiArrowRight aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedEngineeringNotes;
