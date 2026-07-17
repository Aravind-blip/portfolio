import { FiExternalLink, FiGithub } from "react-icons/fi";
import { Navigate, useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import ExploreMapLink from "../components/ui/ExploreMapLink";
import Divider from "../components/case-study/Divider";
import ProjectLayout from "../components/case-study/ProjectLayout";
import RelatedProjects from "../components/case-study/RelatedProjects";
import SectionHeading from "../components/case-study/SectionHeading";
import LabEntryHero from "../components/lab/LabEntryHero";
import LabSection from "../components/lab/LabSection";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { labEntries } from "../data/lab-entries";
import { publishedArticles } from "../data/journal-articles";
import { openSourceProjects } from "../data/open-source-projects";

const SECTION_DEFS = [
  { id: "question", label: "Question", field: "question" },
  { id: "context", label: "Context", field: "context" },
  { id: "hypothesis", label: "Hypothesis", field: "hypothesis" },
  { id: "approach", label: "Approach", field: "approach" },
  { id: "evidence", label: "Evidence", field: "evidence" },
  { id: "findings", label: "Findings", field: "findings" },
  { id: "limitations", label: "Limitations", field: "limitations" },
  { id: "next-steps", label: "Next Steps", field: "nextSteps" },
];

function LabEntryPage() {
  const { slug } = useParams();
  const entry = labEntries.find((item) => item.slug === slug);

  usePageMetadata(
    entry
      ? {
          title: `${entry.title} | Engineering Lab | Aravind Bandipelli`,
          description: entry.summary,
          canonicalPath: `lab/${entry.slug}`,
        }
      : { title: "Not Found", noIndex: true }
  );

  if (!entry) {
    return <Navigate to="/lab" replace />;
  }

  const populatedSections = SECTION_DEFS.filter(({ field }) => {
    const value = entry[field];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  });
  const relatedOpenSourceProject = openSourceProjects.find((project) =>
    entry.relatedProjectIds.includes(project.id)
  );
  const relatedArticle = publishedArticles.find((article) => article.relatedLabEntries.includes(entry.slug));
  const hasReferences = Boolean(
    entry.relatedRepositoryUrl || entry.caseStudyUrl || relatedOpenSourceProject || relatedArticle
  );
  const tocSections = [
    ...populatedSections.map(({ id, label }) => ({ id, label })),
    ...(hasReferences ? [{ id: "references", label: "Repository & References" }] : []),
  ];

  return (
    <ProjectLayout sections={tocSections}>
      <LabEntryHero entry={entry} />
      <Divider />
      {populatedSections.map(({ id, label, field }) => (
        <LabSection id={id} heading={label} content={entry[field]} key={id} />
      ))}
      {hasReferences ? (
        <section id="references" aria-labelledby="references-heading">
          <SectionHeading id="references-heading">Repository &amp; References</SectionHeading>
          <div className="hero-actions">
            {entry.relatedRepositoryUrl ? (
              <Button href={entry.relatedRepositoryUrl} variant="secondary">
                <FiGithub aria-hidden="true" />
                View repository
              </Button>
            ) : null}
            {entry.caseStudyUrl ? (
              <Button to={entry.caseStudyUrl} variant="secondary">
                <FiExternalLink aria-hidden="true" />
                Read the case study
              </Button>
            ) : null}
            {relatedOpenSourceProject ? (
              <Button to="/open-source" variant="secondary">
                <FiExternalLink aria-hidden="true" />
                View in the Open Source Hub
              </Button>
            ) : null}
            {relatedArticle ? (
              <Button to={`/journal/${relatedArticle.slug}`} variant="secondary">
                <FiExternalLink aria-hidden="true" />
                Read the Journal article
              </Button>
            ) : null}
          </div>
        </section>
      ) : null}
      <Divider />
      <RelatedProjects id="related" slugs={entry.relatedProjectIds} heading="Related System" />
      <ExploreMapLink itemId={`lab-${entry.slug}`} />
    </ProjectLayout>
  );
}

export default LabEntryPage;
