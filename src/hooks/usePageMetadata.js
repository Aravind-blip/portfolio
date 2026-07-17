import { useEffect } from "react";
import { buildSiteUrl } from "../utils/siteUrl";

const DEFAULT_IMAGE = buildSiteUrl("social-preview.png");
const DEFAULT_IMAGE_ALT = "Aravind Bandipelli — AI Engineer, Software Engineer";

// Finds an existing meta/link tag by attribute, or creates one. Returns a
// setter and a restore function so every route can change these tags and
// have the previous (site-default) values come back on unmount — the same
// pattern the Phase 7 title hook used, just generalized across every tag
// Open Graph/Twitter/canonical needs.
function bindTag(selector, createTag) {
  let tag = document.querySelector(selector);
  let created = false;
  if (!tag) {
    tag = createTag();
    document.head.appendChild(tag);
    created = true;
  }
  const previousContent = tag.getAttribute("content") ?? tag.getAttribute("href");

  return {
    set(value) {
      if (value === undefined || value === null) return;
      if (tag.tagName === "LINK") {
        tag.setAttribute("href", value);
      } else {
        tag.setAttribute("content", value);
      }
    },
    restore() {
      if (created) {
        tag.remove();
        return;
      }
      if (previousContent === null) return;
      if (tag.tagName === "LINK") {
        tag.setAttribute("href", previousContent);
      } else {
        tag.setAttribute("content", previousContent);
      }
    },
  };
}

// A single reusable metadata system — document title, meta description,
// canonical URL, Open Graph, and Twitter card tags — instead of scattering
// tag mutations across components. Every route calls this once; unmounting
// restores whatever the previous route (or the site-wide default in
// index.html) had set.
export function usePageMetadata({
  title,
  description,
  canonicalPath,
  image,
  imageAlt,
  type = "website",
  noIndex = false,
}) {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = title;

    const canonicalUrl = canonicalPath !== undefined ? buildSiteUrl(canonicalPath) : undefined;
    const resolvedImage = image ?? DEFAULT_IMAGE;
    const resolvedImageAlt = imageAlt ?? DEFAULT_IMAGE_ALT;

    const bindings = [
      bindTag('meta[name="description"]', () => {
        const el = document.createElement("meta");
        el.setAttribute("name", "description");
        return el;
      }),
      bindTag('link[rel="canonical"]', () => {
        const el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        return el;
      }),
      bindTag('meta[property="og:type"]', () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:type");
        return el;
      }),
      bindTag('meta[property="og:title"]', () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:title");
        return el;
      }),
      bindTag('meta[property="og:description"]', () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:description");
        return el;
      }),
      bindTag('meta[property="og:url"]', () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:url");
        return el;
      }),
      bindTag('meta[property="og:image"]', () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:image");
        return el;
      }),
      bindTag('meta[property="og:image:alt"]', () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:image:alt");
        return el;
      }),
      bindTag('meta[name="twitter:card"]', () => {
        const el = document.createElement("meta");
        el.setAttribute("name", "twitter:card");
        return el;
      }),
      bindTag('meta[name="twitter:title"]', () => {
        const el = document.createElement("meta");
        el.setAttribute("name", "twitter:title");
        return el;
      }),
      bindTag('meta[name="twitter:description"]', () => {
        const el = document.createElement("meta");
        el.setAttribute("name", "twitter:description");
        return el;
      }),
      bindTag('meta[name="twitter:image"]', () => {
        const el = document.createElement("meta");
        el.setAttribute("name", "twitter:image");
        return el;
      }),
      bindTag('meta[name="twitter:image:alt"]', () => {
        const el = document.createElement("meta");
        el.setAttribute("name", "twitter:image:alt");
        return el;
      }),
      bindTag('meta[name="robots"]', () => {
        const el = document.createElement("meta");
        el.setAttribute("name", "robots");
        return el;
      }),
    ];

    const [
      descriptionTag,
      canonicalTag,
      ogTypeTag,
      ogTitleTag,
      ogDescriptionTag,
      ogUrlTag,
      ogImageTag,
      ogImageAltTag,
      twitterCardTag,
      twitterTitleTag,
      twitterDescriptionTag,
      twitterImageTag,
      twitterImageAltTag,
      robotsTag,
    ] = bindings;

    if (description) descriptionTag.set(description);
    if (canonicalUrl) canonicalTag.set(canonicalUrl);
    ogTypeTag.set(type);
    if (title) ogTitleTag.set(title);
    if (description) ogDescriptionTag.set(description);
    if (canonicalUrl) ogUrlTag.set(canonicalUrl);
    ogImageTag.set(resolvedImage);
    ogImageAltTag.set(resolvedImageAlt);
    twitterCardTag.set("summary_large_image");
    if (title) twitterTitleTag.set(title);
    if (description) twitterDescriptionTag.set(description);
    twitterImageTag.set(resolvedImage);
    twitterImageAltTag.set(resolvedImageAlt);
    robotsTag.set(noIndex ? "noindex, nofollow" : "index, follow");

    return () => {
      document.title = previousTitle;
      bindings.forEach((binding) => binding.restore());
    };
  }, [title, description, canonicalPath, image, imageAlt, type, noIndex]);
}
