import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  THEME_ORDER,
  ThemeContext,
  type Theme,
  type ThemeContextValue,
} from "@/hooks/use-theme";

const STORAGE_KEY = "owen-theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Marks <html> for the duration of a theme change, so descendant colour
 * transitions stop competing with the token fade on <html>. Without it, each
 * element that transitions background-color chases the moving token value and
 * arrives on its own schedule, so the change reads as a dozen components
 * popping instead of one page fading.
 */
const SWITCHING_CLASS = "theme-switching";

/** Marks <html> only while a View Transition is capturing. See index.css. */
const CAPTURING_CLASS = "theme-capturing";

/**
 * Roughly the token fade in index.css. Used to release the suppression: the
 * class has to outlive the animation, or elements start transitioning again
 * mid-fade and desync, but leaving it on is only a cosmetic cost (hovers stop
 * animating for a moment), so erring long is safe.
 */
const SWITCHING_HOLD_MS = 450;

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

  // The transition currently on screen, so a second click can take over
  // without the first one's cleanup clearing state the second one needs.
  const activeTransitionRef = useRef<ViewTransition | null>(null);

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
   * Applies `next` as a cross-fade between the two rendered themes.
   *
   * `document.startViewTransition` snapshots the page before and after the swap
   * and animates between the two bitmaps. Both snapshots are textures the
   * compositor blends, so nothing repaints per frame - which is the whole
   * reason this is not done with an overlay. An overlay holding the outgoing
   * canvas colour has to re-rasterise a full-viewport gradient on every frame
   * (it animates a registered custom property that feeds `mask-image`), and it
   * flattens the page to a single colour for the duration, so the layout pops
   * back in behind the edge. A snapshot keeps the real content on screen
   * throughout and simply dissolves between the two colour schemes.
   *
   * Three paths:
   *   - reduced motion: no snapshot, the short token fade in index.css runs
   *   - no View Transitions support: same, at the full token-fade duration
   *   - otherwise: the snapshot cross-fade
   */
  const commitTheme = useCallback(
    (next: Theme) => {
      const root = document.documentElement;
      root.classList.add(SWITCHING_CLASS);

      if (
        window.matchMedia(REDUCED_MOTION_QUERY).matches ||
        !document.startViewTransition
      ) {
        applyTheme(next);
        window.setTimeout(
          () => root.classList.remove(SWITCHING_CLASS),
          SWITCHING_HOLD_MS,
        );
        return;
      }

      // Only the View Transition path needs the tokens frozen: the new snapshot
      // is captured one frame later, and a fade still in flight would be caught
      // part-way. The fallback path above relies on that fade.
      root.classList.add(CAPTURING_CLASS);

      // Starting a transition implicitly skips any that is already running, so
      // rapid clicks advance the cycle instead of queueing up.
      const transition = document.startViewTransition(() => applyTheme(next));
      activeTransitionRef.current = transition;

      const cleanup = () => {
        if (activeTransitionRef.current === transition) {
          activeTransitionRef.current = null;
          root.classList.remove(SWITCHING_CLASS);
          root.classList.remove(CAPTURING_CLASS);
        }
      };

      // Both arms handle the update callback throwing.
      void transition.finished.then(cleanup, cleanup);
    },
    [applyTheme],
  );

  // Mirrors `theme` synchronously. `toggleTheme` reads this rather than the
  // state value because two clicks in the same task would each close over the
  // same rendered `theme` and compute the same next value, so the cycle would
  // stall instead of advancing.
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const toggleTheme = useCallback(() => {
    const currentIndex = THEME_ORDER.indexOf(themeRef.current);
    const next = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
    // Advance the mirror before committing, so a following click in the same
    // task reads the new value even though React has not re-rendered yet.
    themeRef.current = next;
    commitTheme(next);
  }, [commitTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme: commitTheme, toggleTheme }),
    [theme, resolvedTheme, commitTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
