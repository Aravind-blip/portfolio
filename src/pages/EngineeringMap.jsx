import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import ExploreHero from "../components/explore/ExploreHero";
import LayerExplanation from "../components/explore/LayerExplanation";
import RelationshipExplorer from "../components/explore/RelationshipExplorer";
import SelectedItemDetails from "../components/explore/SelectedItemDetails";
import ExplorationPaths from "../components/explore/ExplorationPaths";
import Button from "../components/ui/Button";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { buildSiteUrl } from "../utils/siteUrl";
import { routeMetadata } from "../data/route-metadata";
import { portfolioIndex } from "../data/portfolio-index";

const MAP_ITEM_TYPES = new Set(["System", "Repository", "Lab Entry", "Journal Article"]);

function EngineeringMap() {
  const [searchParams] = useSearchParams();
  const requestedId = searchParams.get("item");
  const initialId =
    requestedId && portfolioIndex.some((item) => item.id === requestedId) ? requestedId : "system-rag-agent-audit";
  const [selectedId, setSelectedId] = useState(initialId);

  usePageMetadata({
    ...routeMetadata.explore,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Engineering Map",
      description: routeMetadata.explore.description,
      url: buildSiteUrl("explore"),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: portfolioIndex
          .filter((item) => MAP_ITEM_TYPES.has(item.type))
          .map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.title,
            url: item.external ? item.route : buildSiteUrl(item.route.replace(/^\//, "")),
          })),
      },
    },
  });

  return (
    <div className="open-source-hub">
      <ExploreHero />
      <LayerExplanation />
      <RelationshipExplorer selectedId={selectedId} onSelect={setSelectedId} />
      <SelectedItemDetails selectedId={selectedId} />
      <ExplorationPaths />
      <section className="section open-source-cta" aria-labelledby="explore-cta-heading">
        <h2 id="explore-cta-heading">Ready to see the systems themselves?</h2>
        <p className="hero-lead">
          The map shows how everything connects — the Systems index has the full engineering detail.
        </p>
        <Button href={`${import.meta.env.BASE_URL}#systems`} variant="primary">
          Browse Systems
          <FiArrowRight aria-hidden="true" />
        </Button>
      </section>
    </div>
  );
}

export default EngineeringMap;
