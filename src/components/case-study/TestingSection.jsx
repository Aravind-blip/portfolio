import SectionHeading from "./SectionHeading";

function TestingSection({ id, testing }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Testing and evaluation</SectionHeading>
      <p>{testing.summary}</p>
      <ul className="detail-list">
        {testing.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}

export default TestingSection;
