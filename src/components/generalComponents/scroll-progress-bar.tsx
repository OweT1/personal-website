import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Thin reading-progress indicator pinned to the bottom of the viewport.
 * Springs on the raw scroll value so the bar glides instead of snapping.
 */
export function ScrollProgressBar() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 bottom-0 z-50 h-0.5 origin-left bg-gradient-to-r from-brand via-brand to-brand-hover"
    />
  );
}
