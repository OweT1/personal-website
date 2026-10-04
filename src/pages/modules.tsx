import { useState, useMemo, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { HomeButton } from "@/components/generalComponents/buttons";
import { Reveal } from "@/components/motion/reveal";
import { moduleReviewsData } from "@/data/reviews-data";

/** Chevron used by both collapsible levels. */
function Chevron({ rotated }: { rotated: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      animate={reduceMotion ? undefined : { rotate: rotated ? 180 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="inline-block text-ink-subtle"
      aria-hidden="true"
    >
      ▾
    </motion.span>
  );
}

export function ModulePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasFocus, setHasFocus] = useState(false);
  const [openSections, setOpenSections] = useState(new Set<string>()); // Set of yearsemester keys that are open
  const [openModules, setOpenModules] = useState(new Set<string>()); // Set of module ids that are open
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const getFilteredModules = (term: string) => {
    const termLower = term.toLowerCase();
    return moduleReviewsData
      .filter(
        (module) =>
          module.moduleCode.toLowerCase().includes(termLower) ||
          module.moduleName.toLowerCase().includes(termLower),
      )
      .sort((a, b) => a.moduleCode.localeCompare(b.moduleCode));
  };

  const filteredModules = useMemo(
    () => getFilteredModules(searchTerm),
    [searchTerm],
  );

  // Group filtered modules by yearSemester
  const grouped = filteredModules.reduce(
    (acc, module) => {
      if (!acc[module.yearSemester]) {
        acc[module.yearSemester] = [];
      }
      acc[module.yearSemester].push(module);
      return acc;
    },
    {} as Record<string, typeof moduleReviewsData>,
  );

  // Get sorted yearsemesters (e.g., y1s1, y1s2, ...)
  const yearsemesters = Object.keys(grouped).sort();

  const toggleSection = (ys: string) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ys)) {
        newSet.delete(ys);
      } else {
        newSet.add(ys);
      }
      return newSet;
    });
  };

  const onClickModule = (moduleCode: string) => {
    setSearchTerm(moduleCode);
    setHasFocus(false);
  };

  const onChangeSearchTerm = (target: string) => {
    setSearchTerm(target);
    setHasFocus(true);
  };

  const toggleModule = (id: string) => {
    setOpenModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Update highlighted index when filteredModules changes
  useEffect(() => {
    if (filteredModules.length > 0) {
      setHighlightedIndex(0);
    } else {
      setHighlightedIndex(-1);
    }
  }, [filteredModules]);

  // Reset highlighted index when search results window closes
  useEffect(() => {
    if (!hasFocus) {
      setHighlightedIndex(-1);
    }
  }, [hasFocus]);

  return (
    <div className="max-w-4xl mx-auto px-6 pt-20">
      <HomeButton />

      <h1 className="text-4xl font-bold mb-6 text-ink">NUS Module Reviews</h1>
      {/* Top body */}
      <div className="mb-2 text-ink-muted">
        <div>
          Honest reviews of the modules I have taken at NUS, covering workload,
          assessments, and whether they are worth your time.
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6 relative">
        <div className="flex justify-center items-center">
          {/* Search input bar */}
          <input
            type="text" // type="search" gives a native HTML clear, but is not customisable
            placeholder="Search by module code or name..."
            value={searchTerm}
            onChange={(e) => onChangeSearchTerm(e.target.value)}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            onKeyDown={(e) => {
              if (!hasFocus || filteredModules.length === 0) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                // Limit to first 5 results (indices 0-4) or fewer if less than 5 results
                const maxIndex = Math.min(4, filteredModules.length - 1);
                setHighlightedIndex((prev) => Math.min(prev + 1, maxIndex));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlightedIndex((prev) => Math.max(prev - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                if (
                  highlightedIndex >= 0 &&
                  highlightedIndex < filteredModules.length
                ) {
                  onClickModule(filteredModules[highlightedIndex].moduleCode);
                }
              } else if (e.key === "Escape") {
                e.preventDefault();
                setHasFocus(false);
                setHighlightedIndex(-1);
              }
            }}
            className="w-full px-4 py-2 border border-line-strong rounded-md bg-surface
                       text-ink placeholder:text-ink-subtle
                       focus:outline-none focus:ring-2 focus:ring-brand"
          />
          {/* Clear Search Results button */}
          {searchTerm !== "" && (
            <button
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-ink-subtle
                         hover:text-ink hover:cursor-pointer transition-colors p-1
                         rounded hover:bg-surface-muted"
            >
              ×
            </button>
          )}
        </div>
        {/* Search Results Window */}
        {hasFocus && searchTerm !== "" && filteredModules.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-10 w-full mt-1 border border-line-strong rounded
                       bg-surface shadow-lg overflow-hidden"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {/* Search Results */}
            {filteredModules.slice(0, 5).map((module, index) => (
              <div
                key={module.id}
                onClick={() => onClickModule(module.moduleCode)}
                className={`w-full px-4 py-2 text-left hover:bg-surface-hover cursor-pointer ${
                  index === highlightedIndex ? "bg-brand-soft" : ""
                }`}
              >
                <div className="font-semibold text-ink">{module.moduleCode}</div>
                <div className="text-sm text-ink-subtle">{module.moduleName}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Display grouped modules */}
      {yearsemesters.length === 0 ? (
        <p className="text-center text-ink-subtle">No modules found.</p>
      ) : (
        <>
          {yearsemesters.map((ys) => {
            const modulesInYear = grouped[ys];
            // Format year/semester for display (e.g., y1s1 -> Year 1 Semester 1)
            const [year, semester] = ys.split("s");
            const displayName = `Year ${year.charAt(year.length - 1)} Semester ${semester}`;
            const isOpen = openSections.has(ys);
            return (
              <Reveal key={ys} y={16} className="mb-6">
                <div className="border border-line rounded-lg overflow-hidden shadow-sm bg-surface">
                  {/* Header for collapsible section */}
                  <button
                    onClick={() => toggleSection(ys)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between px-6 py-4
                               bg-surface-muted text-ink cursor-pointer
                               hover:bg-surface-hover transition-colors"
                  >
                    <span className="font-semibold">{displayName}</span>
                    <Chevron rotated={isOpen} />
                  </button>

                  {/* Content area - animates open/closed height */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="divide-y divide-line">
                          {modulesInYear.map((module) => {
                            const moduleOpen = openModules.has(module.id);
                            return (
                              <div
                                key={module.id}
                                className="m-2 border border-line rounded overflow-hidden
                                           shadow-sm bg-surface w-9/10 mx-auto"
                              >
                                <button
                                  onClick={() => toggleModule(module.id)}
                                  aria-expanded={moduleOpen}
                                  className="w-full flex items-center justify-between px-4
                                             py-3 text-left bg-surface-hover hover:bg-surface-muted
                                             transition-colors focus:outline-none
                                             focus:ring-2 focus:ring-brand inset-ring-0
                                             hover:cursor-pointer"
                                >
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-ink">
                                      {module.moduleCode} {module.moduleName}
                                    </h3>
                                  </div>
                                  <Chevron rotated={moduleOpen} />
                                </button>

                                <AnimatePresence initial={false}>
                                  {moduleOpen && (
                                    <motion.div
                                      key="review"
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{
                                        duration: 0.28,
                                        ease: "easeInOut",
                                      }}
                                      className="overflow-hidden"
                                    >
                                      <div className="border-t border-line bg-surface">
                                        <div className="p-4 prose prose-sm max-w-none markdown">
                                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {module.content}
                                          </ReactMarkdown>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </>
      )}
    </div>
  );
}
