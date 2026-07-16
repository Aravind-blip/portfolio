import { Navigate, useParams } from "react-router-dom";
import ProjectDocPage from "../components/case-study/ProjectDocPage";
import { caseStudies } from "../data/case-studies";

function SystemDetail() {
  const { slug } = useParams();
  const caseStudy = caseStudies[slug];

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
