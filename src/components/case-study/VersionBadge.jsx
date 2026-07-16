function VersionBadge({ version }) {
  if (!version) return null;
  return <span className="doc-badge doc-badge-version">{version}</span>;
}

export default VersionBadge;
