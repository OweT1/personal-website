import { createContext, useContext } from "react";

export type Theme = "light" | "dark" | "system";

/** The order the toggle cycles through. */
export const THEME_ORDER: Theme[] = ["light", "dark", "system"];

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
