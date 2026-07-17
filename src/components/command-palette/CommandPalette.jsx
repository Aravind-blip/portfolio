import { useEffect, useMemo, useRef, useState } from "react";
import { FiCornerDownLeft, FiExternalLink, FiSearch, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import StatusBadge from "../ui/StatusBadge";
import { portfolioIndex } from "../../data/portfolio-index";
import { getDefaultResults, groupResults, searchPortfolio } from "../../utils/search";
import { navigateToPortfolioItem } from "../../utils/navigateToItem";

const RESULT_LIMIT = 30;

// A dialog-pattern command palette: a native <dialog> gives modality,
// background inertness, and Escape-to-close for free, so the ARIA and
// focus-management work here is limited to what <dialog> doesn't already
// handle — moving focus to the search input, an accessible combobox/listbox
// relationship (aria-activedescendant, not real DOM focus movement, so Tab
// still behaves normally), and result-count/no-result announcements.
function CommandPalette({ onClose }) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    if (!query.trim()) return getDefaultResults(portfolioIndex);
    return searchPortfolio(portfolioIndex, query, { limit: RESULT_LIMIT });
  }, [query]);

  const grouped = useMemo(() => groupResults(results), [results]);
  // Flattened in the exact same order the groups render in, not raw score
  // order — otherwise aria-activedescendant/Enter can activate a different
  // item than the one visually highlighted whenever two items tie on score
  // (e.g. a System and a Repository sharing the same title).
  const flatItems = useMemo(() => grouped.flatMap((group) => group.results.map((result) => result.item)), [grouped]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!dialog.open) dialog.showModal();
    inputRef.current?.focus();

    function handleNativeClose() {
      onClose();
    }
    dialog.addEventListener("close", handleNativeClose);
    return () => dialog.removeEventListener("close", handleNativeClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goToItem(item) {
    if (!item) return;
    dialogRef.current?.close();
    navigateToPortfolioItem(item, { navigate, location });
  }

  function handleInputKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, flatItems.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      goToItem(flatItems[activeIndex]);
    }
  }

  const activeItem = flatItems[activeIndex];
  const activeOptionId = activeItem ? `command-palette-option-${activeItem.id}` : undefined;
  const statusMessage = query.trim()
    ? results.length
      ? `${results.length} result${results.length === 1 ? "" : "s"} found.`
      : "No matching portfolio content found."
    : "Showing quick navigation and featured content.";

  let flatIndexCursor = -1;

  return (
    <dialog
      ref={dialogRef}
      className="command-palette"
      aria-label="Search the portfolio"
      onCancel={(event) => {
        // Let the native Escape-driven cancel proceed (dialog closes itself
        // and fires the "close" event handled above); nothing extra needed.
        event.stopPropagation();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      <div className="command-palette-panel">
        <div className="command-palette-search-row">
          <FiSearch aria-hidden="true" className="command-palette-search-icon" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-listbox"
            aria-autocomplete="list"
            aria-activedescendant={activeOptionId}
            data-command-palette-input="true"
            className="command-palette-input"
            placeholder="Search systems, repositories, Lab entries, articles…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            autoComplete="off"
            spellCheck="false"
          />
          <button
            type="button"
            className="command-palette-close"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close search"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>

        <div className="sr-only" role="status" aria-live="polite">
          {statusMessage}
        </div>

        {flatItems.length ? (
          <ul id="command-palette-listbox" role="listbox" aria-label="Search results" className="command-palette-results">
            {grouped.map((group) => (
              <li key={group.label} className="command-palette-group">
                <div className="command-palette-group-label" role="presentation">
                  {group.label}
                </div>
                <ul className="command-palette-group-list" role="presentation">
                  {group.results.map((result) => {
                    flatIndexCursor += 1;
                    const index = flatIndexCursor;
                    const item = result.item;
                    const isActive = index === activeIndex;
                    return (
                      <li key={item.id} role="presentation">
                        <div
                          id={`command-palette-option-${item.id}`}
                          role="option"
                          aria-selected={isActive}
                          className={`command-palette-option${isActive ? " command-palette-option-active" : ""}`}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => goToItem(item)}
                        >
                          <div className="command-palette-option-main">
                            <span className="command-palette-option-type">{item.type}</span>
                            <span className="command-palette-option-title">
                              {item.title}
                              {item.external ? <FiExternalLink aria-hidden="true" className="command-palette-external-icon" /> : null}
                            </span>
                          </div>
                          {item.description ? (
                            <p className="command-palette-option-description">{item.description}</p>
                          ) : null}
                          {item.status ? <StatusBadge status={item.status} /> : null}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <div className="command-palette-empty" role="status">
            <p>No matching portfolio content found.</p>
            <div className="command-palette-empty-actions">
              <button type="button" onClick={() => goToItem({ id: "fallback-systems", route: "/", sectionId: "systems" })}>
                View Systems
              </button>
              <button type="button" onClick={() => goToItem({ id: "fallback-explore", route: "/explore" })}>
                Explore Engineering Map
              </button>
              <button type="button" onClick={() => goToItem({ id: "fallback-contact", route: "/", sectionId: "contact" })}>
                Open Contact
              </button>
            </div>
          </div>
        )}

        <div className="command-palette-footer">
          <span>
            <FiCornerDownLeft aria-hidden="true" /> to open
          </span>
          <span>Esc to close</span>
        </div>
      </div>
    </dialog>
  );
}

export default CommandPalette;
