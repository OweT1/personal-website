import { IntroSection } from "@/components/home/intro-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { ProjectSection } from "@/components/home/project-section";
import { CCASection } from "@/components/home/cca-section";
import { SkillSection } from "@/components/home/skill-section";
import { FooterSection } from "@/components/generalComponents/footer-section";

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 space-y-24">
      <IntroSection />
      <ExperienceSection />
      <ProjectSection />
      <CCASection />
      <SkillSection />
      <FooterSection />
    </div>
  );
}
