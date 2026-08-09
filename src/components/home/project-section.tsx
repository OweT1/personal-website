import { projects } from "@/data/projects";
import { ExternalLink } from "lucide-react";

import { SectionHeader } from "@/components/section-components";

export function ProjectSection() {
  return (
    <section id="projects">
      <SectionHeader header="Selected Projects" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col transition-all duration-200 hover:border-red-200 hover:shadow-md"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {project.title}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6 flex-1">
              {project.description}
            </p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
            >
              View on GitHub <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}