import { portfolioRelationships } from "../data/portfolio-relationships";

export function getRelatedIds(selectedId) {
  const related = new Set();
  portfolioRelationships.forEach((relationship) => {
    if (relationship.sourceId === selectedId) related.add(relationship.targetId);
    if (relationship.targetId === selectedId) related.add(relationship.sourceId);
  });
  return related;
}
