import "./App.css";

import { IntroSection } from "./components/intro-section";
import { ExperienceSection } from "./components/experience-section";
import { ProjectSection } from "./components/project-section";
import { CCASection } from "./components/cca-section";
import { SkillSection } from "./components/skill-section";
import { FooterSection } from "./components/footer-section";

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
