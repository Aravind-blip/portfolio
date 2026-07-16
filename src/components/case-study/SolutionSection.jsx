import SectionHeading from "./SectionHeading";

function SolutionSection({ id, solution }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Solution</SectionHeading>
      <p>{solution.summary}</p>
      <ul className="detail-list">
        {solution.approach.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}

export default SolutionSection;
