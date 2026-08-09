import { useNavigate } from "react-router-dom";

import { BASE_URL, MODULE_URL } from "@/constants/paths";
import { buttonVariants } from "@/constants/themes";

const sections = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

export function NavBar() {
  const navigate = useNavigate();

  const goToHomeSection = (href: string) => {
    if (window.location.pathname !== BASE_URL) {
      navigate("/");
    }
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
      <nav className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="font-bold text-slate-900 tracking-tight hover:text-red-600 transition-colors cursor-pointer"
        >
          Owen Tan
        </button>

        <div className="flex items-center gap-6">
          {sections.map((section) => (
            <button
              key={section.href}
              onClick={() => goToHomeSection(section.href)}
              className={buttonVariants.headerLink}
            >
              {section.label}
            </button>
          ))}
          <button
            onClick={() => navigate(MODULE_URL)}
            className={buttonVariants.headerLink}
          >
            Module Reviews
          </button>
        </div>
      </nav>
    </header>
  );
}