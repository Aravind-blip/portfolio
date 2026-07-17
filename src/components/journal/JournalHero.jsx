import { FiArrowRight } from "react-icons/fi";
import Button from "../ui/Button";

function JournalHero() {
  return (
    <section className="section open-source-hero" id="journal-hero">
      <p className="eyebrow">Engineering Journal</p>
      <h1>Architecture decisions, reliability, and lessons from building production software.</h1>
      <p className="hero-lead">
        Long-form engineering writing documenting implementation details, tradeoffs, failures, and production
        lessons.
      </p>
      <div className="hero-actions">
        <Button href="#journal-featured" variant="primary">
          Read Featured Article
          <FiArrowRight aria-hidden="true" />
        </Button>
        <Button to="/lab" variant="secondary">
          Explore Engineering Lab
        </Button>
      </div>
    </section>
  );
}

export default JournalHero;
