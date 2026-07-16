import { FiExternalLink, FiGithub } from "react-icons/fi";
import StatusBadge from "../ui/StatusBadge";
import RepositoryBadge from "./RepositoryBadge";
import VersionBadge from "./VersionBadge";

function RepositoryCard({ id, repository }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`}>Repository</h2>
      <article className="repository-card">
        <div className="repository-card-facts">
          <StatusBadge status={repository.status} />
          {repository.license ? <RepositoryBadge label={repository.license} /> : null}
          {repository.packageManager ? <RepositoryBadge label={repository.packageManager} /> : null}
          {repository.latestRelease ? <VersionBadge version={repository.latestRelease} /> : null}
        </div>
        <div className="repository-card-links">
          {repository.githubUrl ? (
            <a className="button button-secondary" href={repository.githubUrl} target="_blank" rel="noopener noreferrer">
              <FiGithub aria-hidden="true" />
              View repository
            </a>
          ) : (
            <p className="todo-note">Source is private and not publicly linked.</p>
          )}
          {repository.docsUrl ? (
            <a className="button button-secondary" href={repository.docsUrl} target="_blank" rel="noopener noreferrer">
              <FiExternalLink aria-hidden="true" />
              Documentation
            </a>
          ) : null}
          {repository.demoUrl ? (
            <a className="button button-secondary" href={repository.demoUrl} target="_blank" rel="noopener noreferrer">
              <FiExternalLink aria-hidden="true" />
              View live demo
            </a>
          ) : null}
        </div>
        {repository.demoNote ? <p className="todo-note">{repository.demoNote}</p> : null}
      </article>
    </section>
  );
}

export default RepositoryCard;
