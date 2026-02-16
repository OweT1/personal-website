import { projects } from "@/data/projects";

export function ProjectSection() {
  return (
    <section id="projects" className="section">
      <h2>Projects</h2>
      <div className="grid">
        {projects.map((proj) => (
          <div key={proj.id} className="card">
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            <a href={proj.link} target="_blank" rel="noreferrer">
              View Code
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
