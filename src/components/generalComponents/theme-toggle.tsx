import { motion, useReducedMotion } from "motion/react";
import { Monitor, Moon, Sun } from "lucide-react";

import { THEME_ORDER, useTheme, type Theme } from "@/hooks/use-theme";

const ICONS: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

/** What each theme switches to next, i.e. the next entry in THEME_ORDER. */
const NEXT_LABEL = Object.fromEntries(
  THEME_ORDER.map((theme, index) => [
    theme,
    THEME_ORDER[(index + 1) % THEME_ORDER.length],
  ]),
) as Record<Theme, Theme>;

export function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();

  // In system mode the icon reflects what is actually on screen.
  const activeTheme: Theme = theme === "system" ? resolvedTheme : theme;
  const nextLabel = `switch to ${NEXT_LABEL[theme]} theme`;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={nextLabel}
      aria-label={`Theme: ${theme}. ${nextLabel}.`}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-line
                 bg-surface text-ink-muted hover:text-brand hover:border-brand/40
                 transition-colors duration-200 cursor-pointer"
    >
      {/* All three icons stay mounted and cross-fade in place. `mode="wait"`
          would unmount the outgoing icon before mounting the new one, leaving
          the button visibly blank between the two phases. */}
      <span className="relative grid place-items-center">
        {THEME_ORDER.map((option) => {
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
                  : {
                      rotate: isActive ? 0 : option === "system" ? 90 : -90,
                      scale: isActive ? 1 : 0.6,
                    }),
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              aria-hidden={!isActive}
              className={`absolute grid place-items-center ${
                isActive ? "text-brand" : "text-ink-subtle"
              }`}
            >
              <OptionIcon size={16} />
            </motion.span>
          );
        })}
      </span>
    </button>
  );
}
