import { FiGithub } from "react-icons/fi";
import Button from "./Button";
import { profile } from "../../data/profile";

function GitHubProfileCTA({ label = "View GitHub Profile" }) {
  return (
    <Button href={profile.links.github} variant="secondary">
      <FiGithub aria-hidden="true" />
      {label}
    </Button>
  );
}

export default GitHubProfileCTA;
