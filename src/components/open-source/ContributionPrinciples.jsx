const principles = [
  "Clear documentation — every public repo ships a README that explains setup before it explains internals.",
  "Reproducible setup — Docker or a documented local-run path, not tribal knowledge.",
  "Honest limitations — known gaps are written down in the repo itself, not discovered by a user.",
  "CI before release — every public repo has a GitHub Actions workflow, not a manual pre-release checklist.",
  "Security-aware defaults — secrets via environment variables, never committed; a security policy where it matters.",
];

function ContributionPrinciples() {
  return (
    <section className="section" aria-labelledby="principles-heading">
      <div className="section-header">
        <p className="eyebrow">Contribution Philosophy</p>
        <h2 id="principles-heading">How I approach public engineering work</h2>
      </div>
      <ul className="detail-list">
        {principles.map((principle) => (
          <li key={principle}>{principle}</li>
        ))}
      </ul>
    </section>
  );
}

export default ContributionPrinciples;
