import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import StatusBadge from "../ui/StatusBadge";
import { labEntries } from "../../data/lab-entries";
import { publishedArticles } from "../../data/journal-articles";

// Only rendered when a case study actually has related lab entries or
// journal articles — no forced section, no circular link for its own sake.
// Both content types are "engineering notes" about the same system, so
// they share one section rather than two near-identical ones.
function RelatedEngineeringNotes({ id, projectSlug }) {
  const relatedLabEntries = labEntries
    .filter((entry) => entry.caseStudyUrl === `/systems/${projectSlug}`)
    .map((entry) => ({ key: entry.id, to: `/lab/${entry.slug}`, title: entry.title, status: entry.status }));
  const relatedArticles = publishedArticles
    .filter((article) => article.relatedProjects.includes(projectSlug))
    .map((article) => ({ key: article.id, to: `/journal/${article.slug}`, title: article.title, status: null }));
  const related = [...relatedLabEntries, ...relatedArticles];

  if (!related.length) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Related Engineering Notes</SectionHeading>
      <div className="related-projects-list">
        {related.map((item) => (
          <Link className="project-link" to={item.to} key={item.key}>
            {item.title}
            {item.status ? <StatusBadge status={item.status} /> : null}
            <FiArrowRight aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedEngineeringNotes;
