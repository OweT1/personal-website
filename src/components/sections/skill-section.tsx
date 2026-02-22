import { useState } from "react";
import { Skill, skills } from "@/data/skills";
import { SectionHeader } from "@/components/section-components";

function SkillTab({ id, skillCategory, skillNames }: Skill) {
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);

  const toggleCategory = () => {
    setCategoryIsOpen((openCat) => !openCat);
  };

  return (
    <div
      key={id}
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
    >
      {/* Clickable Header */}
      <button
        onClick={() => toggleCategory()}
        className="w-full px-6 py-4 flex items-center justify-between 
        hover:bg-slate-50 hover:cursor-pointer transition-colors focus:outline-none"
      >
        <span
          className={`font-semibold transition-colors ${categoryIsOpen ? "text-orange-500" : "text-slate-700"}`}
        >
          {skillCategory}
        </span>

        {/* Chevron Icon that rotates when open */}
        <svg
          className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
            categoryIsOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Expandable Content - Uses CSS Grid for smooth auto-height animation */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          categoryIsOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        {/* overflow-hidden is required here for the grid animation to work */}
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pt-2 border-t border-slate-100 flex flex-col gap-2">
            {skillNames.map((skillName, index) => (
              <div key={index}>
                {/* Render each subcategory as newlines */}
                <h4 className="text-sm font-semibold text-slate-500 mb-2">
                  {skillName.skillSubCategory}:
                </h4>
                {/* Render the individual skills as small pills */}
                <div className="flex flex-wrap gap-2">
                  {skillName.skillSubNames.map((skillSub, subIndex) => (
                    <span
                      key={subIndex}
                      className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-orange-500 hover:text-white transition-colors cursor-default"
                    >
                      {skillSub}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillSection() {
  return (
    <section id="skills">
      <SectionHeader header="Technical Skills" />
      <div className="flex flex-col gap-3 w-full">
        {skills.map((skill) => {
          return <SkillTab {...skill} />;
        })}
      </div>
    </section>
  );
}
