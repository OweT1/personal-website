import { motion, useReducedMotion } from "motion/react";

interface SectionHeaderInterface {
  header: string;
}

export function SectionHeader({ header }: SectionHeaderInterface) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.h2
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-3xl font-bold mb-10 text-center md:text-left flex items-center gap-3 text-ink"
    >
      <span className="w-10 h-1 rounded-full inline-block overflow-hidden flex-shrink-0">
        <motion.span
          className="block h-full w-full bg-brand origin-left"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />
      </span>
      {header}
    </motion.h2>
  );
}
