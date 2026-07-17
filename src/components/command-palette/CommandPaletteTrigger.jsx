import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useCommandPalette } from "./CommandPaletteContext";

function detectShortcutLabel() {
  if (typeof navigator === "undefined") return "Ctrl K";
  const platform = navigator.platform || navigator.userAgentData?.platform || "";
  return /mac/i.test(platform) ? "⌘K" : "Ctrl K";
}

// The always-visible trigger required alongside the keyboard shortcut —
// restrained enough to sit in the existing nav without competing with it.
function CommandPaletteTrigger() {
  const { open } = useCommandPalette();
  const [shortcutLabel, setShortcutLabel] = useState("Ctrl K");

  useEffect(() => {
    setShortcutLabel(detectShortcutLabel());
  }, []);

  return (
    <button type="button" className="command-palette-trigger" onClick={open}>
      <FiSearch aria-hidden="true" />
      <span className="command-palette-trigger-label">Search or jump…</span>
      <kbd className="command-palette-trigger-kbd" aria-hidden="true">
        {shortcutLabel}
      </kbd>
      <span className="sr-only">Search the portfolio</span>
    </button>
  );
}

export default CommandPaletteTrigger;
