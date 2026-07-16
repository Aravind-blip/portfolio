function MetadataBadge({ label, value }) {
  return (
    <span className="doc-badge">
      <span className="doc-badge-label">{label}</span>
      <span className="doc-badge-value">{value}</span>
    </span>
  );
}

export default MetadataBadge;
