import SectionHeading from "./SectionHeading";

function ProblemSection({ id, problem }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Problem</SectionHeading>
      <p>{problem.statement}</p>
      <p>{problem.context}</p>
    </section>
  );
}

export default ProblemSection;
