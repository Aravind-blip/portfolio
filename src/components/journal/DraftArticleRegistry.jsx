import MaintenanceStatus from "../ui/MaintenanceStatus";

// Draft articles have metadata only — no content exists yet, so these are
// intentionally not links. Listing the titles is honest about what's in
// progress without presenting unfinished writing as published work.
function DraftArticleRegistry({ drafts }) {
  if (!drafts.length) return null;

  return (
    <section className="section" aria-labelledby="draft-registry-heading">
      <div className="section-header">
        <p className="eyebrow">In Progress</p>
        <h2 id="draft-registry-heading">More articles being written</h2>
        <p className="section-description">
          Metadata only — these are not yet published, and there is no page to link to until they are.
        </p>
      </div>
      <ul className="maintenance-list">
        {drafts.map((draft) => (
          <li className="maintenance-item" key={draft.id}>
            <div className="maintenance-item-header">
              <h3>{draft.title}</h3>
              <MaintenanceStatus state="Planned" />
            </div>
            <p>{draft.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DraftArticleRegistry;
