import { projects } from "@/data/projects";

export function ProjectSection() {
  return (
    <section id="projects">
      <h2 className="text-3xl font-bold mb-10 text-center md:text-left flex items-center gap-3">
        <span className="w-10 h-1 bg-orange-500 rounded-full inline-block"></span>
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
          >
            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-orange-600 transition-colors">
              {proj.title}
            </h3>
            <p className="text-slate-600 flex-1 mb-4">{proj.description}</p>
            <a
              href={proj.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-center w-full py-2 rounded-lg bg-orange-50 text-orange-600 font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              View Code
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
