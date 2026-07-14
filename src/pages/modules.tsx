import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { moduleReviewsData } from "@/data/reviews-data";

export function ModulePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasFocus, setHasFocus] = useState(false);
  const [openSections, setOpenSections] = useState(new Set<string>()); // Set of yearsemester keys that are open
  const [openModules, setOpenModules] = useState(new Set<string>()); // Set of module ids that are open

  // Filter modules based on search term (module code or name) and sort by module code
  const filteredModules = moduleReviewsData
    .filter((module) => {
      const term = searchTerm.toLowerCase();
      return (
        module.moduleCode.toLowerCase().includes(term) ||
        module.moduleName.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => a.moduleCode.localeCompare(b.moduleCode));

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

  return (
    <div className="max-w-4xl mx-auto px-6 pt-20">
      <button
        onClick={() => (window.location.href = "/")}
        className="mb-8 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 hover:cursor-pointer transition transition-all duration-300"
      >
        ← Back to Home
      </button>

      <h1 className="text-4xl font-bold mb-6">NUS Module Reviews</h1>

      {/* Search bar */}
      <div className="mb-6 relative">
        <div className="flex justify-center items-center">
          {/* Search input bar */}
          <input
            type="text" // type="search" gives a native HTML clear, but is not customisable
            placeholder="🔍 Search by module code or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            className="w-full px-4 py-2 border border-black-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          {/* Clear Search Results button */}
          {searchTerm !== "" && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:cursor-pointer transition-colors p-1 rounded hover:bg-gray-100"
            >
              ×
            </button>
          )}
        </div>
        {/* Search Results Window */}
        {hasFocus && searchTerm !== "" && filteredModules.length > 0 && (
          <div
            className="absolute z-10 w-full mt-1 border border-gray-300 rounded bg-white shadow-md"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {/* Search Results */}
            {filteredModules.slice(0, 5).map((module) => (
              <div
                key={module.id}
                onClick={() => setSearchTerm(module.moduleCode)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
              >
                <div className="font-semibold">{module.moduleCode}</div>
                <div className="text-sm text-gray-500">{module.moduleName}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display grouped modules */}
      {yearsemesters.length === 0 ? (
        <p className="text-center text-gray-500">No modules found.</p>
      ) : (
        <>
          {yearsemesters.map((ys) => {
            const modulesInYear = grouped[ys];
            // Format year/semester for display (e.g., y1s1 -> Year 1 Semester 1)
            const [year, semester] = ys.split("s");
            const displayName = `Year ${year.charAt(year.length - 1)} Semester ${semester}`;
            const isOpen = openSections.has(ys);
            return (
              <div
                key={ys}
                className="mb-6 border border-1.5 rounded-lg overflow-hidden shadow bg-white"
              >
                {/* Header for collapsible section */}
                <div
                  onClick={() => toggleSection(ys)}
                  className="flex w-full items-center justify-between px-6 py-4 bg-gray-100 cursor-pointer hover:bg-gray-200"
                >
                  <span className="font-semibold">{displayName}</span>
                  {/* Chevron icon that rotates when open */}
                  <span
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                </div>
                {/* Content area */}
                {!isOpen ? null : (
                  <div className="divide-y divide-gray-200">
                    {modulesInYear.map((module) => (
                      <div
                        key={module.id}
                        className="mb-2 mt-2 border border-gray-300 rounded overflow-hidden shadow-sm bg-white w-9/10 mx-auto"
                      >
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                              {module.moduleCode} {module.moduleName}
                            </h3>
                          </div>
                          <span
                            className={`transition-transform duration-200 ${openModules.has(module.id) ? "rotate-180" : ""}`}
                          >
                            ▾
                          </span>
                        </button>
                        {openModules.has(module.id) && (
                          <div className="border-t border-gray-200 bg-white">
                            <div className="p-4 prose prose-sm max-w-none">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {module.content}
                              </ReactMarkdown>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
