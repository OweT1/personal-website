import { skills } from "@/data/skills";

export function SkillSection() {
  return (
    <section id="skills" className="section">
      <h2>Technical Skills & Frameworks</h2>
      <div className="skills-container">
        {skills.map((skill) => (
          <span key={skill} className="badge">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
