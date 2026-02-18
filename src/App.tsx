import "./App.css";

import { IntroSection } from "./components/sections/intro-section";
import { ExperienceSection } from "./components/sections/experience-section";
import { ProjectSection } from "./components/sections/project-section";
import { CCASection } from "./components/sections/cca-section";
import { SkillSection } from "./components/sections/skill-section";
import { FooterSection } from "./components/sections/footer-section";

function App() {
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

export default App;
