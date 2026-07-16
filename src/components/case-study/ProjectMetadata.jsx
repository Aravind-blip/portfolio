import StatusBadge from "../ui/StatusBadge";
import MetadataBadge from "./MetadataBadge";
import VersionBadge from "./VersionBadge";
import RepositoryBadge from "./RepositoryBadge";

function ProjectMetadata({ status, category, repository }) {
  return (
    <div className="doc-metadata-row">
      <StatusBadge status={status} />
      {category ? <MetadataBadge label="Category" value={category} /> : null}
      {repository?.latestRelease ? <VersionBadge version={repository.latestRelease} /> : null}
      {repository?.license ? <RepositoryBadge label={repository.license} /> : null}
      {repository?.packageManager ? <RepositoryBadge label={repository.packageManager} /> : null}
    </div>
  );
}

export default ProjectMetadata;
