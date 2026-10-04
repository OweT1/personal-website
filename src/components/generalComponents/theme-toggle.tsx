import { motion, useReducedMotion } from "motion/react";
import { Monitor, Moon, Sun } from "lucide-react";

import { useTheme, type Theme } from "@/hooks/use-theme";

const ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

const NEXT_LABEL: Record<Theme, string> = {
  light: "Dark",
  dark: "System",
  system: "Light",
};

export function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();

  // In system mode the icon reflects what is actually on screen.
  const activeTheme: Theme = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={`Switch to ${NEXT_LABEL[theme].toLowerCase()} theme`}
      aria-label={`Theme: ${theme}. Switch to ${NEXT_LABEL[theme].toLowerCase()} theme.`}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-line
                 bg-surface text-ink-muted hover:text-brand hover:border-brand/40
                 transition-colors duration-200 cursor-pointer"
    >
      {/* All three icons stay mounted and cross-fade in place. `mode="wait"`
          would unmount the outgoing icon before mounting the new one, leaving
          the button visibly blank between the two phases. */}
      <span className="relative grid place-items-center">
        {(["light", "dark", "system"] as Theme[]).map((option) => {
          const OptionIcon = ICONS[option];
          const isActive = activeTheme === option;
          return (
            <motion.span
              key={option}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                // Rotation and scaling are movement, so they are dropped under
                // reduced motion. Opacity is not, so the fade is kept.
                ...(reduceMotion
                  ? {}
                  : { rotate: isActive ? 0 : option === "system" ? 90 : -90,
                      scale: isActive ? 1 : 0.6 }),
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              aria-hidden={!isActive}
              className={
                isActive
                  ? "absolute grid place-items-center text-brand"
                  : "absolute grid place-items-center text-ink-subtle"
              }
            >
              <OptionIcon size={16} />
            </motion.span>
          );
        })}
      </span>
    </button>
  );
}