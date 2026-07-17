import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import SectionHeading from "../case-study/SectionHeading";
import StatusBadge from "../ui/StatusBadge";
import { portfolioIndex } from "../../data/portfolio-index";
import { portfolioRelationships } from "../../data/portfolio-relationships";
import { navigateToPortfolioItem } from "../../utils/navigateToItem";

function SelectedItemDetails({ selectedId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const selected = portfolioIndex.find((item) => item.id === selectedId);

  if (!selected) return null;

  const relationships = portfolioRelationships
    .filter((relationship) => relationship.sourceId === selectedId || relationship.targetId === selectedId)
    .map((relationship) => {
      const isSource = relationship.sourceId === selectedId;
      const otherId = isSource ? relationship.targetId : relationship.sourceId;
      const otherItem = portfolioIndex.find((item) => item.id === otherId);
      return { relationship, otherItem };
    })
    .filter((entry) => entry.otherItem);

  return (
    <section id="selected-item" aria-labelledby="selected-item-heading">
      <SectionHeading id="selected-item-heading">Selected Item</SectionHeading>
      <div className="explore-details glass-panel">
        <div className="explore-details-header">
          <span className="command-palette-option-type">{selected.type}</span>
          {selected.status ? <StatusBadge status={selected.status} /> : null}
        </div>
        <h3>{selected.title}</h3>
        <p>{selected.description}</p>
        <button
          type="button"
          className="button button-secondary"
          onClick={() => navigateToPortfolioItem(selected, { navigate, location })}
        >
          Open {selected.type}
          {selected.external ? <FiExternalLink aria-hidden="true" /> : <FiArrowRight aria-hidden="true" />}
        </button>

        <div className="explore-relationships">
          <h4>Related artifacts</h4>
          {relationships.length ? (
            <ul className="detail-list">
              {relationships.map(({ relationship, otherItem }) => (
                <li key={`${relationship.sourceId}-${relationship.targetId}-${relationship.relationshipType}`}>
                  <strong>{relationship.label}:</strong> {relationship.description}{" "}
                  <button
                    type="button"
                    className="explore-related-link"
                    onClick={() => navigateToPortfolioItem(otherItem, { navigate, location })}
                  >
                    {otherItem.title}
                    <FiArrowRight aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="explore-no-relationships">
              No direct related artifacts are currently published for this item.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default SelectedItemDetails;
