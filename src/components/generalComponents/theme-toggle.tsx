import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Moon, Sun, type LucideIcon } from "lucide-react";

import {
  THEME_OPTIONS,
  useTheme,
  type ThemeOption,
} from "@/hooks/use-theme";

const ICONS: Record<ThemeOption, LucideIcon> = {
  light: Sun,
  dark: Moon,
};

const LABELS: Record<ThemeOption, string> = {
  light: "Light",
  dark: "Dark",
};

/**
 * Shows both modes side by side rather than cycling through them.
 *
 * Cycling had a step that appeared to do nothing: with the OS in light mode,
 * `system` and `light` render identically, so one click did nothing visible and
 * dark took two. There was no way to tell you were on `system` either, since the
 * icon showed the resolved theme. `system` is now simply the starting state for
 * a visitor who has not chosen yet, so the two visible modes are also the only
 * two things a click can do.
 */
export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Until a mode is chosen, `system` follows the OS, so highlight whichever mode
  // is actually on screen rather than inventing a third position the visitor
  // never asked for.
  const activeIndex =
    theme === "system"
      ? resolvedTheme === "dark"
        ? 1
        : 0
      : THEME_OPTIONS.indexOf(theme);

  /**
   * Roving tabindex, per the radiogroup pattern: one stop for the whole group,
   * arrows to move within it. Without this the group is two tab stops and arrow
   * keys do nothing.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (step === 0) return;

    event.preventDefault();
    const next =
      (activeIndex + step + THEME_OPTIONS.length) % THEME_OPTIONS.length;
    const option = THEME_OPTIONS[next];
    setTheme(option);
    buttonRefs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center gap-1 p-1 rounded-full border border-line bg-surface"
    >
      {THEME_OPTIONS.map((option, index) => {
        const Icon = ICONS[option];
        const isActive = index === activeIndex;

        return (
          <button
            key={option}
            ref={(node) => {
              buttonRefs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={LABELS[option]}
            tabIndex={isActive ? 0 : -1}
            title={LABELS[option]}
            onClick={() => setTheme(option)}
            onKeyDown={handleKeyDown}
            className={`relative grid place-items-center size-8 rounded-full cursor-pointer
                        transition-colors duration-200
                        ${isActive ? "text-brand-ink" : "text-ink-muted hover:text-brand"}`}
          >
            {isActive && (
              <motion.span
                layoutId="theme-thumb"
                className="absolute inset-0 rounded-full bg-brand"
                transition={{
                  // Sliding is movement, so it is dropped under reduced motion;
                  // the thumb appears in place instead.
                  duration: reduceMotion ? 0 : 0.25,
                  ease: "easeOut",
                }}
              />
            )}
            {/* `relative z-10` is load-bearing, not decoration: positioned
                descendants paint above in-flow content, so the static icon would
                otherwise sit *under* the thumb and be hidden by it. */}
            <Icon size={16} className="relative z-10" aria-hidden />
          </button>
        );
      })}
    </div>
  );
}