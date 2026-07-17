import { useEffect } from "react";

// Restores the previous title/description on unmount so navigating away
// (including back to a route that doesn't set its own) never leaves stale
// metadata behind.
export function useDocumentTitle(title, description) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const descriptionTag = description ? document.querySelector('meta[name="description"]') : null;
    const previousDescription = descriptionTag?.getAttribute("content");

    if (descriptionTag && description) {
      descriptionTag.setAttribute("content", description);
    }

    return () => {
      document.title = previousTitle;
      if (descriptionTag && previousDescription !== undefined) {
        descriptionTag.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);
}
