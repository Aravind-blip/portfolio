import { FiArrowRight } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import SectionHeading from "../case-study/SectionHeading";
import { portfolioIndex } from "../../data/portfolio-index";
import { explorationPaths } from "../../data/portfolio-relationships";
import { navigateToPortfolioItem } from "../../utils/navigateToItem";

// Curated, ordered walks through content that already exists — no path
// step is invented to fill a gap (see Phase 10 audit / final report).
function ExplorationPaths() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <section id="exploration-paths" aria-labelledby="exploration-paths-heading">
      <SectionHeading id="exploration-paths-heading">Suggested Exploration Paths</SectionHeading>
      <div className="exploration-paths-list">
        {explorationPaths.map((path) => {
          const steps = path.steps.map((id) => portfolioIndex.find((item) => item.id === id)).filter(Boolean);
          return (
            <article className="exploration-path glass-panel" key={path.id}>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <ol className="architecture-diagram exploration-path-steps">
                {steps.map((step, index) => (
                  <li className="architecture-step" key={step.id}>
                    <button
                      type="button"
                      className="architecture-node exploration-path-node"
                      onClick={() => navigateToPortfolioItem(step, { navigate, location })}
                    >
                      <span className="mini-label">{step.type}</span>
                      <span>{step.title}</span>
                    </button>
                    {index < steps.length - 1 ? <FiArrowRight aria-hidden="true" className="architecture-arrow" /> : null}
                  </li>
                ))}
              </ol>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ExplorationPaths;
