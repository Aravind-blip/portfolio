// Single source of truth for building absolute URLs under the GitHub Pages
// base path, so canonical/OG/Twitter URLs can't drift from vite.config.js's
// base or the real deployed origin.
const SITE_ORIGIN = "https://aravind-blip.github.io";

export function buildSiteUrl(path = "") {
  const base = import.meta.env.BASE_URL; // "/portfolio/"
  const trimmed = path.replace(/^\//, "");
  return `${SITE_ORIGIN}${base}${trimmed}`;
}
