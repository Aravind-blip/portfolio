import SectionHeading from "./SectionHeading";

function ResultsSection({ id, results }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Results</SectionHeading>
      <p>{results.summary}</p>
      <ul className="detail-list">
        {results.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}

export default ResultsSection;
