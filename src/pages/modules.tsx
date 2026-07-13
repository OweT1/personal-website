import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { moduleReviewsData } from "@/data/reviews-data";

export function ModulePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openSections, setOpenSections] = useState(new Set<string>()); // Set of yearsemester keys that are open

  // Filter modules based on search term (module code or name)
  const filteredModules = moduleReviewsData.filter((module) => {
    const term = searchTerm.toLowerCase();
    return (
      module.moduleCode.toLowerCase().includes(term) ||
      module.moduleName.toLowerCase().includes(term)
    );
  });

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

  return (
    <div className="max-w-4xl mx-auto px-6 pt-20">
      <button
        onClick={() => (window.location.href = "/")}
        className="mb-8 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 hover:cursor-pointer transition"
      >
        ← Back to Home
      </button>

      <h1 className="text-4xl font-bold mb-6">NUS Module Reviews</h1>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by module code or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
            console.log(modulesInYear);
            return (
              <div
                key={ys}
                className="mb-6 border rounded-lg overflow-hidden shadow"
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
                      <div key={module.id} className="p-4 hover:bg-gray-50">
                        <h2 className="text-lg font-semibold mb-2">
                          {module.moduleCode} {module.moduleName}
                        </h2>
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {module.content}
                          </ReactMarkdown>
                        </div>
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
