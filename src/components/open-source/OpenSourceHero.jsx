import { FiArrowRight } from "react-icons/fi";
import Button from "../ui/Button";
import GitHubProfileCTA from "../ui/GitHubProfileCTA";

function OpenSourceHero() {
  return (
    <section className="section open-source-hero" id="open-source-hero">
      <p className="eyebrow">Open Source</p>
      <h1>Building tools, systems, and experiments in public.</h1>
      <p className="hero-lead">
        A curated view of the repositories I maintain, the engineering problems they address, and the
        decisions behind them.
      </p>
      <div className="hero-actions">
        <Button href="#repository-catalog" variant="primary">
          Explore Repositories
          <FiArrowRight aria-hidden="true" />
        </Button>
        <GitHubProfileCTA label="View GitHub" />
      </div>
    </section>
  );
}

export default OpenSourceHero;
