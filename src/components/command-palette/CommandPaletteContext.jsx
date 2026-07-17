import { createContext, lazy, Suspense, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const CommandPaletteContext = createContext(null);

const CommandPalette = lazy(() => import("./CommandPalette"));

// A single provider owns open/close state and the global Cmd/Ctrl+K
// listener, so the visible nav trigger and the keyboard shortcut both open
// the same instance. The dialog itself is lazy-loaded (Part 15) since most
// visits never open it.
export function CommandPaletteProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerElementRef = useRef(null);

  const open = useCallback(() => {
    triggerElementRef.current = document.activeElement;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Return focus to whatever opened the palette — the visible trigger
    // button, or wherever focus was when Cmd/Ctrl+K was pressed.
    triggerElementRef.current?.focus?.();
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      const isCommandK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (!isCommandK) return;

      // Defensive guard: never hijack the shortcut out of a text field that
      // isn't the palette's own search input (the site currently has no
      // other text inputs, but this keeps that guarantee if one is added).
      const active = document.activeElement;
      const isTypingElsewhere =
        active &&
        (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable) &&
        active.dataset.commandPaletteInput !== "true";
      if (isTypingElsewhere) return;

      event.preventDefault();
      setIsOpen((wasOpen) => {
        if (!wasOpen) triggerElementRef.current = document.activeElement;
        return !wasOpen;
      });
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      {isOpen ? (
        <Suspense fallback={null}>
          <CommandPalette onClose={close} />
        </Suspense>
      ) : null}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error("useCommandPalette must be used within a CommandPaletteProvider");
  }
  return context;
}
