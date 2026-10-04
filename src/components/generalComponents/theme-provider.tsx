import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  ThemeContext,
  type Theme,
  type ThemeContextValue,
} from "@/hooks/use-theme";

const STORAGE_KEY = "owen-theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Marks <html> while the wipe overlay is on screen, to suspend the token
 * cross-fade so the sweep is the only thing moving. Without it the area the
 * edge has already cleared would be caught mid-fade.
 */
const SWITCHING_CLASS = "theme-switching";

/**
 * Length of the sweep. Kept in step with nothing in CSS - the edge is
 * animated imperatively - but it matches the softness stop so the ramp travels
 * about a third of the viewport.
 */
const WIPE_DURATION_MS = 600;

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" || stored === "system"
    ? stored
    : "system";
}

function prefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(DARK_QUERY).matches;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);

  // Track the OS preference so "system" stays live when the user flips it.
  const [systemIsDark, setSystemIsDark] = useState(prefersDark);

  // The wipe currently on screen, so a second click can cancel it.
  const activeWipeRef = useRef<{
    overlay: HTMLElement;
    animation: Animation;
  } | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_QUERY);
    const onChange = (event: MediaQueryListEvent) =>
      setSystemIsDark(event.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme: "light" | "dark" =
    theme === "system" ? (systemIsDark ? "dark" : "light") : theme;

  /**
   * Writes the theme to <html>. Deliberately a plain function rather than an
   * effect, so the class flip lands in the same frame as the click.
   */
  const writeDocumentTheme = useCallback((isDark: boolean) => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  }, []);

  const applyTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      writeDocumentTheme(next === "dark" || (next === "system" && prefersDark()));
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Private browsing / storage disabled - the in-memory theme still applies.
      }
    },
    [writeDocumentTheme],
  );

  // Keep <html> in step when the OS preference changes under "system", and on
  // first mount (before any user interaction).
  const hasAppliedRef = useRef(false);
  useEffect(() => {
    if (hasAppliedRef.current) {
      if (theme === "system") writeDocumentTheme(systemIsDark);
      return;
    }
    hasAppliedRef.current = true;
    writeDocumentTheme(resolvedTheme === "dark");
  }, [resolvedTheme, systemIsDark, theme, writeDocumentTheme]);

  /**
   * Applies `next` behind a soft edge sweeping from right to left.
   *
   * The registered `@property --theme-wipe` is animated from just past the
   * right edge to just past the left, and it masks a full-screen overlay holding
   * the *outgoing* canvas colour. Regions the edge has not reached stay covered;
   * once it passes, the new theme is already fully repainted underneath and is
   * revealed. That is what gives the change direction - a plain token
   * cross-fade changes every surface simultaneously and cannot travel.
   *
   * Under reduced motion the overlay is skipped entirely and the short token
   * fade in index.css takes over.
   */
  const commitTheme = useCallback(
    (next: Theme) => {
      const root = document.documentElement;

      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
        applyTheme(next);
        return;
      }

      // Outgoing canvas colour, sampled before the swap. The tokens are
      // registered as <color>, so this resolves to a usable colour string.
      const previousCanvas =
        getComputedStyle(root).getPropertyValue("--canvas").trim() || "#fafafa";

      // Cancel any in-flight wipe so repeated clicks don't stack overlays.
      // `cancel()` also settles the abandoned animation's `finished`, so its
      // cleanup runs instead of leaking the overlay and the active class.
      activeWipeRef.current?.animation.cancel();
      activeWipeRef.current?.overlay.remove();
      activeWipeRef.current = null;

      const overlay = document.createElement("div");
      overlay.setAttribute("aria-hidden", "true");
      overlay.className = "theme-wipe-overlay";
      overlay.style.background = previousCanvas;
      document.body.appendChild(overlay);

      // The overlay and the theme swap are created in the same task, so the
      // browser never paints an uncovered page before the edge starts moving.
      root.classList.add(SWITCHING_CLASS);
      applyTheme(next);

      const animation = overlay.animate(
        { "--theme-wipe": ["122%", "-26%"] },
        {
          duration: WIPE_DURATION_MS,
          // Strong ease-out: the edge leaves quickly so the new theme appears
          // almost at once, then settles. A symmetric ease reads as sluggish.
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        },
      );

      const wipe = { overlay, animation };
      activeWipeRef.current = wipe;

      const cleanup = () => {
        overlay.remove();
        if (activeWipeRef.current === wipe) {
          activeWipeRef.current = null;
          root.classList.remove(SWITCHING_CLASS);
        }
      };

      // Both arms handle the animation being cancelled mid-flight.
      void animation.finished.then(cleanup, cleanup);
    },
    [applyTheme],
  );

  const setTheme = useCallback(
    (next: Theme) => {
      commitTheme(next);
    },
    [commitTheme],
  );

  const toggleTheme = useCallback(() => {
    const order: Theme[] = ["light", "dark", "system"];
    const currentIndex = order.indexOf(theme);
    commitTheme(order[(currentIndex + 1) % order.length]);
  }, [commitTheme, theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}