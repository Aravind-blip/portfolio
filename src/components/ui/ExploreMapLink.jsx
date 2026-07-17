import { FiShare2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { portfolioRelationships } from "../../data/portfolio-relationships";

// A single, restrained link — shown only when this item actually has a
// published relationship in the Engineering Map, never added by default to
// every page regardless of whether there's anything to show.
function ExploreMapLink({ itemId }) {
  const hasRelationships = portfolioRelationships.some(
    (relationship) => relationship.sourceId === itemId || relationship.targetId === itemId
  );
  if (!hasRelationships) return null;

  return (
    <Link className="explore-map-link" to={`/explore?item=${itemId}`}>
      <FiShare2 aria-hidden="true" />
      Open in Engineering Map
    </Link>
  );
}

export default ExploreMapLink;
