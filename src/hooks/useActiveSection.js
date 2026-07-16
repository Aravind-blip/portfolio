import { useEffect, useState } from "react";

// Tracks which section id is currently most visible so the sticky table of
// contents can highlight it. Queries the DOM directly rather than requiring
// every section component to forward a ref.
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        // The section that most recently crossed into the top of the
        // trigger zone is the active one — that's the last (lowest) entry
        // once sorted top-to-bottom, not the first (a section mostly
        // scrolled past, with only a sliver still poking above y=0, would
        // otherwise win).
        if (visible.length > 0) {
          setActiveId(visible[visible.length - 1].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
