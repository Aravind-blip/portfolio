import { FiArrowRight } from "react-icons/fi";
import Button from "../components/ui/Button";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { routeMetadata } from "../data/route-metadata";

function NotFound() {
  usePageMetadata(routeMetadata.notFound);

  return (
    <section className="section not-found">
      <p className="eyebrow">404</p>
      <h1>This page does not exist.</h1>
      <p className="hero-lead">
        The link may be outdated, or the page may have moved. Head back to the homepage to find what you are
        looking for.
      </p>
      <div className="hero-actions">
        <Button to="/" variant="primary">
          Back to homepage
          <FiArrowRight aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}

export default NotFound;
