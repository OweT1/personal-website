import { useState } from "react";

import { Skill, skills } from "@/data/skills";
import { SectionHeader } from "@/components/section-components";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { pillVariants } from "@/constants/themes";

function SkillTab({ skillCategory, skillNames }: Skill) {
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);

  const toggleCategory = () => {
    setCategoryIsOpen((openCat) => !openCat);
  };

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-line overflow-hidden transition-colors duration-300 hover:border-brand/30">
      <button
        onClick={toggleCategory}
        aria-expanded={categoryIsOpen}
        className="w-full px-6 py-4 flex items-center justify-between
                   hover:bg-surface-hover cursor-pointer transition-colors focus:outline-none"
      >
        <span
          className={`font-semibold transition-colors ${
            categoryIsOpen ? "text-brand" : "text-ink"
          }`}
        >
          {skillCategory}
        </span>

        <svg
          className={`w-5 h-5 text-ink-subtle transition-transform duration-300 ${
            categoryIsOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Uses the CSS grid 0fr->1fr trick so the panel animates to its
          natural height without measuring it in JS. */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          categoryIsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pt-4 border-t border-line flex flex-col gap-4">
            {skillNames.map((skillName, index) => (
              <div key={index}>
                <h4 className="text-sm font-semibold text-ink-subtle mb-2">
                  {skillName.skillSubCategory}:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillName.skillSubNames.map((skillSub, subIndex) => (
                    <span
                      key={subIndex}
                      className={`${pillVariants.base} ${pillVariants.hover}`}
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

      <RevealGroup className="flex flex-col gap-3 w-full" stagger={0.07}>
        {skills.map((skill) => (
          <RevealItem key={skill.id}>
            <SkillTab {...skill} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
