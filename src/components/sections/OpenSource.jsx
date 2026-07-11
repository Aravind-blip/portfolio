import { FiGithub } from "react-icons/fi";
import SectionHeader from "../ui/SectionHeader";
import { openSourceRepos } from "../../data/opensource";

function OpenSource() {
  return (
    <section className="section" id="open-source">
      <SectionHeader
        eyebrow="Open Source"
        title="Real repositories, verifiable right now"
        description="No star counts, no live badges — just what's actually true about each repository as of this page's last update."
      />
      <div className="opensource-list">
        {openSourceRepos.map((repo) => (
          <article className="opensource-card glass-panel" key={repo.slug}>
            <h3>{repo.name}</h3>
            <p className="opensource-identity">{repo.identity}</p>
            <ul className="detail-list">
              {repo.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <p className="opensource-next">
              <strong>Next: </strong>
              {repo.nextNote}
            </p>
            <a
              className="project-link"
              href={repo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub aria-hidden="true" />
              View on GitHub
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OpenSource;
