import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import CommandPaletteTrigger from "../command-palette/CommandPaletteTrigger";
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

      <div className="topbar-actions">
        <CommandPaletteTrigger />
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
      </div>

      <nav
        aria-label="Primary navigation"
        id="primary-nav"
        className={menuOpen ? "nav-open" : undefined}
      >
        <ul className="nav-list">
          {navigation.map((item) => (
            <li key={item.href}>
              {item.type === "route" ? (
                <Link
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={location.pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ) : isHome ? (
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ) : (
                <a
                  href={`${import.meta.env.BASE_URL}${item.href}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
