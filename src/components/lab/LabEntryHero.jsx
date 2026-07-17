import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import MetadataBadge from "../case-study/MetadataBadge";
import StatusBadge from "../ui/StatusBadge";

function LabEntryHero({ entry }) {
  return (
    <header className="doc-hero">
      <Link className="back-link" to="/lab">
        <FiArrowRight className="back-arrow" aria-hidden="true" />
        Back to the Lab
      </Link>
      <h1>{entry.title}</h1>
      <p className="hero-lead">{entry.summary}</p>
      <div className="doc-metadata-row">
        <StatusBadge status={entry.status} />
        <MetadataBadge label="Type" value={entry.type} />
        <MetadataBadge label="Recorded" value={<time dateTime={entry.date}>{entry.date}</time>} />
        <MetadataBadge label="Updated" value={<time dateTime={entry.updatedAt}>{entry.updatedAt}</time>} />
      </div>
    </header>
  );
}

export default LabEntryHero;
