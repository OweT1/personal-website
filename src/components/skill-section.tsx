import { skills } from "@/data/skills";

export function SkillSection() {
  return (
    <section id="skills">
      <h2 className="text-3xl font-bold mb-10 text-center md:text-left flex items-center gap-3">
        <span className="w-10 h-1 bg-orange-500 rounded-full inline-block"></span>
        Skills
      </h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-5 py-2 bg-white text-slate-700 rounded-full shadow-sm border border-slate-200 font-medium hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
