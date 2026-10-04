import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { DURATION, EASE_OUT_EXPO, fadeUp, staggerContainer } from "./variants";

interface RevealProps {
  children: ReactNode;
  /** Vertical travel in pixels before settling. Set to 0 for a pure fade. */
  y?: number;
  delay?: number;
  duration?: number;
  className?: string;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
  /** Replay the animation every time it scrolls into view. */
  repeat?: boolean;
}

export function Reveal({
  children,
  y = 24,
  delay = 0,
  duration = DURATION,
  className,
  amount = 0.25,
  repeat = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: !repeat, amount }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Delay between each child's animation. */
  stagger?: number;
  delayChildren?: number;
  amount?: number;
}

export function RevealGroup({
  children,
  className,
  stagger,
  delayChildren = 0,
  amount = 0.15,
}: RevealGroupProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: ReactNode;
  y?: number;
  className?: string;
}

/**
 * Takes its timing from the enclosing RevealGroup's variants, so it needs no
 * props of its own beyond the travel distance.
 */
export function RevealItem({ children, y = 20, className }: RevealItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={fadeUp(y)}>
      {children}
    </motion.div>
  );
}
