function ArchitectureNode({ label, detail }) {
  return (
    <div className="architecture-node">
      <p className="mini-label">{label}</p>
      <p>{detail}</p>
    </div>
  );
}

export default ArchitectureNode;
