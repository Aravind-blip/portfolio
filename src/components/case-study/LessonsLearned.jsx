import SectionHeading from "./SectionHeading";

function LessonsLearned({ id, lessons }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Lessons learned</SectionHeading>
      <ul className="detail-list">
        {lessons.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default LessonsLearned;
