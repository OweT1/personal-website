import type { Variants } from "motion/react";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Shared timing, so every reveal on the site reads as one system. */
export const DURATION = 0.6;

/** Parent that releases its children one after another. */
export function staggerContainer(
  stagger = 0.08,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/** Child that fades up into place. */
export function fadeUp(y = 20, duration = 0.55): Variants {
  return {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT_EXPO } },
  };
}
