import { createContext, useContext } from "react";

/**
 * Every theme the app understands.
 *
 * "system" is intentionally absent from THEME_OPTIONS: it is not a choice the
 * user makes, it is the state a visitor starts in before choosing one, and it
 * keeps tracking the OS until they do. It still has to be part of the type
 * because it is what a first-time visitor resolves to and what earlier
 * versions wrote to localStorage.
 */
export type Theme = "light" | "dark" | "system";

/** The modes offered in the toggle, in display order. */
export const THEME_OPTIONS = ["light", "dark"] as const;

export type ThemeOption = (typeof THEME_OPTIONS)[number];

export interface ThemeContextValue {
  theme: Theme;
  /** The theme actually rendered on screen, with "system" already resolved. */
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
