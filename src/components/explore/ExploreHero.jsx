import { FiArrowRight, FiSearch } from "react-icons/fi";
import Button from "../ui/Button";
import { useCommandPalette } from "../command-palette/CommandPaletteContext";

function ExploreHero() {
  const { open } = useCommandPalette();

  return (
    <section className="open-source-hero">
      <p className="eyebrow">Engineering Map</p>
      <h1>How the systems, repositories, Lab entries, and articles connect</h1>
      <p className="hero-lead">
        This is a structured relationship view of the portfolio, not a network diagram to decode — select any item
        below to see what it implements, evaluates, documents, or extends, backed by real cross-references in the
        underlying data, never guessed at from matching words.
      </p>
      <div className="hero-actions">
        <Button href="#relationship-explorer" variant="primary">
          Explore relationships
          <FiArrowRight aria-hidden="true" />
        </Button>
        <button type="button" className="button button-secondary" onClick={open}>
          <FiSearch aria-hidden="true" />
          Search the portfolio
        </button>
      </div>
    </section>
  );
}

export default ExploreHero;
