function ChallengeCard({ title, detail }) {
  return (
    <article className="highlight-card">
      <h3>{title}</h3>
      <p>{detail}</p>
    </article>
  );
}

export default ChallengeCard;
