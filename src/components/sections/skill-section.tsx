import { skills } from "@/data/skills";
import { SectionHeader } from "@/components/section-components";

export function SkillSection() {
  return (
    <section id="skills">
      <SectionHeader header="Skills" />
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
