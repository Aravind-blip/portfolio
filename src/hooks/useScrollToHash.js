import { useEffect } from "react";

// Handles ONLY the fresh-page-load case: a URL like
// /systems/rag-agent-audit#testing where the browser's own native
// fragment-scroll already failed, because the #testing element didn't
// exist yet at parse time (it's rendered by React after JS executes).
// Runs once on mount, not on every hash change — an in-page click on a
// table-of-contents link is a same-page anchor navigation the browser
// already handles natively (and smoothly, via the sitewide
// scroll-behavior: smooth rule), so it must be left alone here.
export function useScrollToHash() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return undefined;

    // A couple of retries covers late layout shift (e.g. a web font swap)
    // without fighting an in-flight smooth-scroll animation — the jump
    // itself is intentionally instant, since animating from the very top
    // of a fresh page load reads as a glitch, not a scroll.
    const delays = [0, 150, 400];
    const timers = delays.map((delay) =>
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "auto" });
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);
}
