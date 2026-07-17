import SectionHeading from "../case-study/SectionHeading";

const LAYERS = [
  {
    name: "Systems",
    description: "The engineering case studies — problem, architecture, decisions, and results for each project.",
  },
  {
    name: "Open Source",
    description: "The public repositories behind those systems, with real CI, release, and maintenance status.",
  },
  {
    name: "Engineering Lab",
    description: "Focused technical investigations — a question, a hypothesis, evidence, and findings.",
  },
  {
    name: "Engineering Journal",
    description: "Long-form writing on the architecture decisions and tradeoffs behind a system.",
  },
  {
    name: "Engineering Experience",
    description: "Professional experience and capabilities the systems and case studies are drawn from.",
  },
];

function LayerExplanation() {
  return (
    <section id="layers" aria-labelledby="layers-heading">
      <SectionHeading id="layers-heading">Four layers, one set of systems</SectionHeading>
      <p className="hero-lead">
        Every layer below describes the same underlying engineering work from a different angle. None of them
        duplicate each other&rsquo;s content — a Lab entry evaluates a decision, an article documents it at length, a
        repository implements it.
      </p>
      <div className="highlight-list">
        {LAYERS.map((layer) => (
          <article className="highlight-card" key={layer.name}>
            <h3>{layer.name}</h3>
            <p>{layer.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LayerExplanation;
