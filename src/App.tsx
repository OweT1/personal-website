import "./App.css";

import { IntroSection } from "./components/intro-section";
import { ExperienceSection } from "./components/experience-section";
import { ProjectSection } from "./components/project-section";
import { CCASection } from "./components/cca-section";
import { SkillSection } from "./components/skill-section";
import { FooterSection } from "./components/footer-section";

function App() {
  return (
    <div className="portfolio-container">
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
