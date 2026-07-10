import { Link, useLocation } from "react-router-dom";
import { navigation } from "../../data/navigation";
import { profile } from "../../data/profile";

function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="topbar glass-panel">
      <Link className="brand-mark" to="/" aria-label={`${profile.name} home`}>
        <span className="brand-dot" aria-hidden="true" />
        <span>{profile.name}</span>
      </Link>
      <nav aria-label="Primary navigation">
        <ul className="nav-list">
          {navigation.map((item) =>
            isHome ? (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ) : (
              <li key={item.href}>
                <a href={`${import.meta.env.BASE_URL}${item.href}`}>{item.label}</a>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
