function RepositoryBadge({ label }) {
  if (!label) return null;
  return <span className="doc-badge doc-badge-repository">{label}</span>;
}

export default RepositoryBadge;
