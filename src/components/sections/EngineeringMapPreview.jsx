import { FiArrowRight } from "react-icons/fi";
import Button from "../ui/Button";

// One concise entry point, not another full homepage section — the
// Engineering Map, Lab, Journal, and Open Source pages already carry the
// full content; this is a single doorway into how they connect.
function EngineeringMapPreview() {
  return (
    <section className="section open-source-cta" id="explore-map-preview" aria-labelledby="explore-map-preview-heading">
      <p className="eyebrow">Discover</p>
      <h2 id="explore-map-preview-heading">Explore the engineering behind the systems.</h2>
      <p className="hero-lead">
        Navigate projects, technical investigations, open-source repositories, and engineering articles through a
        connected portfolio map.
      </p>
      <Button to="/explore" variant="primary">
        Explore Engineering Map
        <FiArrowRight aria-hidden="true" />
      </Button>
    </section>
  );
}

export default EngineeringMapPreview;
