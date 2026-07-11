import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { navigation } from "../../data/navigation";
import { profile } from "../../data/profile";

function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar glass-panel">
      <Link className="brand-mark" to="/" aria-label={`${profile.name} home`}>
        <span className="brand-dot" aria-hidden="true" />
        <span>{profile.name}</span>
      </Link>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={menuOpen}
        aria-controls="primary-nav"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
      </button>

      <nav
        aria-label="Primary navigation"
        id="primary-nav"
        className={menuOpen ? "nav-open" : undefined}
      >
        <ul className="nav-list">
          {navigation.map((item) =>
            isHome ? (
              <li key={item.href}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ) : (
              <li key={item.href}>
                <a
                  href={`${import.meta.env.BASE_URL}${item.href}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
