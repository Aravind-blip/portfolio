import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import StatusBadge from "../ui/StatusBadge";
import MetadataBadge from "../case-study/MetadataBadge";
import { featuredLabEntry, labEntries } from "../../data/lab-entries";

// A concise preview only — the full catalog, status legend, and current
// questions live on the Engineering Lab route, not duplicated here.
const previewEntries = labEntries.filter((entry) => entry.id !== featuredLabEntry.id).slice(0, 2);

function EngineeringLab() {
  return (
    <section className="section" id="lab">
      <SectionHeader
        eyebrow="Engineering Lab"
        title="What I am currently investigating"
        description="Experiments, architecture notes, and technical questions — not finished work presented as done."
      />
      <article className="lab-card lab-card-featured glass-panel">
        <div className="lab-card-header">
          <h3>{featuredLabEntry.title}</h3>
          <StatusBadge status={featuredLabEntry.status} />
        </div>
        <MetadataBadge label="Type" value={featuredLabEntry.type} />
        <p>{featuredLabEntry.summary}</p>
      </article>
      <div className="lab-grid">
        {previewEntries.map((entry) => (
          <article className="lab-card glass-panel" key={entry.id}>
            <div className="lab-card-header">
              <h3>{entry.title}</h3>
              <StatusBadge status={entry.status} />
            </div>
            <MetadataBadge label="Type" value={entry.type} />
            <p>{entry.summary}</p>
          </article>
        ))}
      </div>
      <div className="hero-actions">
        <Link className="button button-primary" to="/lab">
          View Engineering Lab
          <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default EngineeringLab;
