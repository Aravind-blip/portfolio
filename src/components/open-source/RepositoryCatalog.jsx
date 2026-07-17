import RepositoryEntry from "./RepositoryEntry";

// A small, fixed catalog (4 repositories) doesn't justify search, filters,
// or sorting controls — it's sorted once by sortOrder and rendered plainly.
function RepositoryCatalog({ projects }) {
  const sorted = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="section" id="repository-catalog" aria-labelledby="catalog-heading">
      <div className="section-header">
        <p className="eyebrow">Repository Catalog</p>
        <h2 id="catalog-heading">What I have built publicly</h2>
      </div>
      <div className="repository-catalog-grid">
        {sorted.map((project) => (
          <RepositoryEntry project={project} key={project.id} />
        ))}
      </div>
    </section>
  );
}

export default RepositoryCatalog;
