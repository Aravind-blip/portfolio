import TechChip from "../ui/TechChip";

function JournalTopics({ articles }) {
  const topics = [...new Set(articles.flatMap((article) => article.topics))];
  if (!topics.length) return null;

  return (
    <section className="section" aria-labelledby="journal-topics-heading">
      <div className="section-header">
        <p className="eyebrow">Topics</p>
        <h2 id="journal-topics-heading">What this Journal covers</h2>
      </div>
      <div className="chip-row">
        {topics.map((topic) => (
          <TechChip key={topic}>{topic}</TechChip>
        ))}
      </div>
    </section>
  );
}

export default JournalTopics;
