// Shared navigation for anything driven by a portfolioIndexItem — the
// command palette, the Engineering Map, and contextual related-content
// links all need the identical "external link vs. internal route vs.
// same-page anchor" resolution, so it lives in one place instead of being
// copied per consumer.
export function prefersReducedMotion() {
  return typeof window !== "undefined" && (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
}

export function navigateToPortfolioItem(item, { navigate, location }) {
  if (!item) return;

  if (item.external) {
    window.open(item.route, "_blank", "noopener,noreferrer");
    return;
  }

  const scrollToSection = () => {
    if (!item.sectionId) return;
    document.getElementById(item.sectionId)?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  if (location.pathname === item.route) {
    scrollToSection();
  } else {
    navigate(item.route);
    if (item.sectionId) setTimeout(scrollToSection, 120);
  }
}
