import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import MetadataBadge from "../case-study/MetadataBadge";
import MaintenanceStatus from "../ui/MaintenanceStatus";
import { draftArticles, featuredArticle } from "../../data/journal-articles";

// A compact preview only — featured article plus a single indicator that
// more writing is in progress, not the full article list or draft registry.
function EngineeringJournal() {
  return (
    <section className="section" id="journal">
      <SectionHeader
        eyebrow="Engineering Journal"
        title="Long-form writing on architecture, reliability, and lessons learned"
        description="Documented engineering, not content marketing — every claim traces back to real, running code."
      />
      <article className="lab-card lab-card-featured glass-panel">
        <div className="lab-card-header">
          <h3>{featuredArticle.title}</h3>
          <MetadataBadge label="Reading time" value={featuredArticle.readingTime} />
        </div>
        <p>{featuredArticle.summary}</p>
      </article>
      {draftArticles.length ? (
        <p className="mini-label">
          <MaintenanceStatus state="Planned" /> {draftArticles.length} more article{draftArticles.length === 1 ? "" : "s"} in
          progress
        </p>
      ) : null}
      <div className="hero-actions">
        <Link className="button button-primary" to="/journal">
          View Journal
          <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default EngineeringJournal;
