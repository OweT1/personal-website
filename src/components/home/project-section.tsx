import { projects } from "@/data/projects";
import { motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";

import { SectionHeader } from "@/components/section-components";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cardVariants } from "@/constants/themes";

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`${cardVariants.base} ${cardVariants.interactive} p-6 flex flex-col h-full`}
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-widest bg-surface-muted
                       text-ink-subtle px-2 py-1 rounded transition-colors duration-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-xl font-bold text-ink mb-3">{project.title}</h3>

      <p className="text-ink-muted leading-relaxed mb-6 flex-1">
        {project.description}
      </p>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover self-start"
      >
        View on GitHub
        <motion.span
          animate={reduceMotion ? undefined : { x: [0, 3, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex"
        >
          <ExternalLink size={14} />
        </motion.span>
      </a>
    </div>
  );
}

export function ProjectSection() {
  return (
    <section id="projects">
      <SectionHeader header="Selected Projects" />

      <RevealGroup
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        stagger={0.1}
      >
        {projects.map((project) => (
          <RevealItem key={project.id} className="h-full">
            <ProjectCard project={project} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
