import SocialLinks from "../ui/SocialLinks";
import { profile } from "../../data/profile";

function Footer() {
  return (
    <footer className="site-footer">
      <p>
        &copy; {new Date().getFullYear()} {profile.name}. Built with React and Vite.
      </p>
      <SocialLinks className="inline-links footer-links" />
    </footer>
  );
}

export default Footer;
