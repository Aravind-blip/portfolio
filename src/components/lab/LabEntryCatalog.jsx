import LabEntryCard from "./LabEntryCard";

// Six entries doesn't justify filters or search — sorted once by
// sortOrder and rendered plainly, same reasoning as the Open Source
// Hub's repository catalog.
function LabEntryCatalog({ entries }) {
  const sorted = [...entries].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="section" id="lab-catalog" aria-labelledby="lab-catalog-heading">
      <div className="section-header">
        <p className="eyebrow">Lab Entry Catalog</p>
        <h2 id="lab-catalog-heading">Notes, experiments, and investigations</h2>
      </div>
      <div className="lab-grid">
        {sorted.map((entry) => (
          <LabEntryCard entry={entry} key={entry.id} />
        ))}
      </div>
    </section>
  );
}

export default LabEntryCatalog;
