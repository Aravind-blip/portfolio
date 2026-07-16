import SectionHeading from "./SectionHeading";

function ProjectOverview({ id, overview }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Overview</SectionHeading>
      <p>{overview}</p>
    </section>
  );
}

export default ProjectOverview;
