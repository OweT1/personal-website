import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { BLOG_URL, MODULE_URL } from "@/constants/paths";
import { buttonVariants } from "@/constants/themes";
import { ThemeToggle } from "@/components/generalComponents/theme-toggle";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

const sections = [
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
] as const;

const sectionIds = sections.map((section) => section.id);

/** Grouped so the mobile menu and the desktop bar cannot drift apart. */
interface NavItem {
  key: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  // `basename` is already stripped from location.pathname, so "/" is home.
  const isHome = location.pathname === "/";
  const activeId = useScrollSpy(sectionIds, isHome);

  const goToRoute = useCallback(
    (path: string) => {
      setMenuOpen(false);
      navigate(path);
    },
    [navigate],
  );

  const scrollToSection = useCallback(
    (id: string) => {
      setMenuOpen(false);

      const scroll = () => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      };

      if (isHome) {
        scroll();
      } else {
        navigate("/");
        // Wait for the home page to mount before measuring section offsets.
        requestAnimationFrame(() => requestAnimationFrame(scroll));
      }
    },
    [isHome, navigate, reduceMotion],
  );

  const navItems = useMemo<NavItem[]>(
    () => [
      ...sections.map((section) => ({
        key: section.id,
        label: section.label,
        isActive: isHome && activeId === section.id,
        onClick: () => scrollToSection(section.id),
      })),
      {
        key: MODULE_URL,
        label: "Module Reviews",
        isActive: location.pathname.startsWith(MODULE_URL),
        onClick: () => goToRoute(MODULE_URL),
      },
      {
        key: BLOG_URL,
        label: "Blog",
        isActive: location.pathname.startsWith(BLOG_URL),
        onClick: () => goToRoute(BLOG_URL),
      },
    ],
    [activeId, goToRoute, isHome, location.pathname, scrollToSection],
  );

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[var(--nav-bg)] border-b border-line">
      <nav className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="font-bold text-ink tracking-tight hover:text-brand transition-colors cursor-pointer"
        >
          Owen
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.key} item={item} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full
                       text-ink-muted hover:text-brand transition-colors cursor-pointer"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-line bg-[var(--nav-bg)] backdrop-blur-md"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.key}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.2 }}
                  onClick={item.onClick}
                  className={`text-left py-2 text-sm font-medium transition-colors cursor-pointer ${
                    item.isActive
                      ? buttonVariants.headerLinkActive
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const reduceMotion = useReducedMotion();

  return (
    <button
      onClick={item.onClick}
      className={`${buttonVariants.headerLink} ${
        item.isActive ? buttonVariants.headerLinkActive : ""
      }`}
    >
      {item.label}
      {item.isActive && (
        <motion.span
          layoutId={reduceMotion ? undefined : "nav-active-underline"}
          className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-brand"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
    </button>
  );
}
