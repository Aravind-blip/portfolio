import { FiArrowRight } from "react-icons/fi";
import Button from "../ui/Button";

function EngineeringLabHero() {
  return (
    <section className="section open-source-hero" id="lab-hero">
      <p className="eyebrow">Engineering Lab</p>
      <h1>Experiments, architecture notes, and technical investigations.</h1>
      <p className="hero-lead">
        A working record of the questions I test, the decisions I revisit, and the lessons that shape the systems
        I build.
      </p>
      <div className="hero-actions">
        <Button href="#lab-catalog" variant="primary">
          Explore the Lab
          <FiArrowRight aria-hidden="true" />
        </Button>
        <Button to="/#systems" variant="secondary">
          View Systems
        </Button>
      </div>
    </section>
  );
}

export default EngineeringLabHero;
