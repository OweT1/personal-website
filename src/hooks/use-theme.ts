import { createContext, useContext } from "react";

/**
 * The order the toggle cycles through. A tuple rather than a plain array so
 * `(typeof THEME_ORDER)[number]` resolves to the literal union below instead
 * of `string`.
 */
export const THEME_ORDER = ["light", "dark", "system"] as const;

// Automatically creates: "light" | "dark" | "system"
export type Theme = (typeof THEME_ORDER)[number];

export interface ThemeContextValue {
  theme: Theme;
  /** The theme actually rendered on screen, with "system" already resolved. */
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  /** Cycles light -> dark -> system -> light. */
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
