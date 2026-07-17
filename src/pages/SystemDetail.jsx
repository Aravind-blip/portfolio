import { Navigate, useParams } from "react-router-dom";
import ProjectDocPage from "../components/case-study/ProjectDocPage";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { caseStudies } from "../data/case-studies";

function SystemDetail() {
  const { slug } = useParams();
  const caseStudy = caseStudies[slug];

  usePageMetadata(
    caseStudy
      ? {
          title: `${caseStudy.title} | Aravind Bandipelli`,
          description: caseStudy.metaDescription,
          canonicalPath: `systems/${caseStudy.slug}`,
        }
      : { title: "Not Found", noIndex: true }
  );

  if (!caseStudy) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="section case-study-section">
      <ProjectDocPage caseStudy={caseStudy} />
    </section>
  );
}

export default SystemDetail;
