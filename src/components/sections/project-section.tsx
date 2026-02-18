import { useState } from "react";
import { projects } from "@/data/projects";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"; // Optional: npm install lucide-react

import { SectionHeader } from "@/components/section-components";

export function ProjectSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header stays at the top */}
      <SectionHeader header="Project Experience" />

      {/* Main Container: relative so we can position buttons absolutely inside it */}
      <div className="relative group">
        {/* Left Button */}
        <button
          onClick={prevProject}
          className="absolute left-[-20px] md:left-[-30px] top-1/2 -translate-y-1/2 z-20 
                     cursor-pointer p-3 rounded-full border border-zinc-200 bg-white shadow-lg 
                     transition-all duration-300 hover:bg-orange-500 hover:text-white hover:border-orange-600
                     dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-orange-500"
          aria-label="Previous Project"
        >
          <ChevronLeft size={24} />
        </button>

        {/* The "Panel" Container */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                // className="w-full shrink-0 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center" // set default to flex-row
                className="w-full shrink-0 p-8 md:p-12 flex flex-row gap-8 items-center"
              >
                {/* Visual Placeholder (Left Side) */}
                <div className="w-full md:w-1/2 aspect-video rounded-lg flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={`${project.attribution.title}: ${project.attribution.description} | ${project.attribution.href}`}
                    className="relative w-64 h-64 md:w-72 md:h-72"
                  />
                </div>

                {/* Content (Right Side) */}
                <div className="w-full md:w-1/2">
                  <div className="flex gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:underline"
                  >
                    View Project <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={nextProject}
          className="absolute right-[-20px] md:right-[-30px] top-1/2 -translate-y-1/2 z-20 
                     cursor-pointer p-3 rounded-full border border-zinc-200 bg-white shadow-lg 
                     transition-all duration-300 hover:bg-orange-500 hover:text-white hover:border-orange-600
                     dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-orange-500"
          aria-label="Next Project"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
              currentIndex === index
                ? "w-8 bg-orange-500"
                : "w-2 bg-zinc-300 dark:bg-zinc-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
