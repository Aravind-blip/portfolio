const OPEN_STATUSES = new Set(["In progress", "Experimental", "Planned"]);

// The questions that do not have a validated answer yet — a distinct,
// shorter list from the full catalog, so a visitor can see what is
// genuinely still open without re-reading every entry.
function CurrentQuestions({ entries }) {
  const open = entries.filter((entry) => OPEN_STATUSES.has(entry.status));

  if (!open.length) return null;

  return (
    <section className="section" aria-labelledby="questions-heading">
      <div className="section-header">
        <p className="eyebrow">Current Questions</p>
        <h2 id="questions-heading">What is still unresolved</h2>
      </div>
      <ul className="detail-list">
        {open.map((entry) => (
          <li key={entry.id}>{entry.question}</li>
        ))}
      </ul>
    </section>
  );
}

export default CurrentQuestions;
