import { experiences } from "@/data/experiences";

export function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <h2>Work Experience</h2>
      {experiences.map((job) => (
        <div key={job.id} className="card">
          <h3>
            {job.role} @ {job.company}
          </h3>
          <span className="date">
            {job.start_date} - {job.end_date}
          </span>
          <ul>
            {job.description.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
