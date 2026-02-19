import { skills } from "@/data/skills";
import { SectionHeader } from "@/components/section-components";

export function SkillSection() {
  return (
    <section id="skills">
      <SectionHeader header="Technical Skills" />
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="relative group transition-all duration-300 hover:-translate-y-1"
          >
            {/* Tooltip Bubble */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 pointer-events-none">
              <div className="bg-slate-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap relative">
                {skill.skillNames.join(", ")}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border- border-transparent border-t-slate-800"></div>
              </div>
            </div>

            {/* 3. Your original span, updated to use "group-hover:" */}
            <span className="block px-5 py-2 bg-white text-slate-700 rounded-full shadow-sm border border-slate-200 font-medium group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 group-hover:shadow-lg transition-all duration-300 cursor-default">
              {skill.skillCategory}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
