// Import all markdown files as raw strings from year/semester directories only
const modules = import.meta.glob("/src/data/reviews/*/*.md", {
  eager: true,
  query: "?raw",
}) as Record<string, { default: string }>;

export type ModuleReviewData = {
  id: string;
  moduleCode: string;
  moduleName: string;
  yearSemester: string; // e.g., y1s1
  content: string; // raw markdown
};

export const moduleReviewsData: ModuleReviewData[] = Object.entries(
  modules,
).map(([path, content]) => {
  // Example path: /src/data/reviews/y1s1/EC1101E Introduction to Economic Analysis.md
  // Remove leading slash
  const cleanPath = path.slice(1);
  const parts = cleanPath.split("/");
  // parts: ['src', 'data', 'reviews', 'y1s1', 'EC1101E Introduction to Economic Analysis.md']
  const yearSemester = parts[3]; // e.g., y1s1
  const fileNameWithExt = parts[4]; // e.g., EC1101E Introduction to Economic Analysis.md
  const fileName = fileNameWithExt.slice(0, -3); // remove .md
  // Split first space to get module code and name
  const firstSpace = fileName.indexOf(" ");
  const moduleCode = firstSpace > 0 ? fileName.slice(0, firstSpace) : fileName;
  const moduleName = firstSpace > 0 ? fileName.slice(firstSpace + 1) : "";
  // Generate a unique id
  const id = `${yearSemester}-${moduleCode}`;

  return {
    id,
    moduleCode,
    moduleName,
    yearSemester,
    content: content.default,
  };
});
