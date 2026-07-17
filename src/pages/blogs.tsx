import { SectionHeader } from "@/components/section-components";

export function BlogPage() {
  // Load all markdown files from src/data/blogs
  const modules = import.meta.glob("/src/data/blogs/*.md", {
    eager: true,
    query: "?raw",
  }) as Record<string, { default: string }>;

  interface BlogPost {
    id: string;
    title: string;
    date: string; // ISO date string or just year-month-day
    content: string; // raw markdown
    year: string; // extracted year for grouping
    month: string; // extracted month for grouping (optional)
  }

  const posts: BlogPost[] = Object.entries(modules).map(([path, content]) => {
    const raw = content.default;
    const fileName = path.split("/").pop()?.replace(".md", "") || "";

    // Parse frontmatter
    let title = fileName;
    let date = "";
    let contentBody = raw;

    const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const titleMatch = frontmatter.match(/title:\s*"([^"]*)"/);
      if (titleMatch) title = titleMatch[1];
      const dateMatch = frontmatter.match(/date:\s*"([^"]*)"/);
      if (dateMatch) date = dateMatch[1];
      // Remove frontmatter from content
      contentBody = raw.replace(/^---\n[\s\S]*?\n---\n/, "");
    }

    // If no date in frontmatter, try to extract from filename (YYYY-MM-DD-...)
    if (!date) {
      const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
      if (dateMatch) date = dateMatch[1];
    }

    // If still no date, use a default
    if (!date) date = "1970-01-01";

    // Extract year and month from date (YYYY-MM-DD)
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);

    return {
      id: fileName,
      title,
      date,
      content: contentBody.trim(),
      year,
      month,
    };
  });

  // Sort by date descending
  posts.sort((a, b) => (b.date > a.date ? 1 : -1));

  // Group by year
  const groupedByYear: Record<string, BlogPost[]> = {};
  posts.forEach((post) => {
    if (!groupedByYear[post.year]) {
      groupedByYear[post.year] = [];
    }
    groupedByYear[post.year].push(post);
  });

  const years = Object.keys(groupedByYear).sort((a, b) => b.localeCompare(a)); // descending

  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 space-y-12">
      <SectionHeader header="Blog" />
      <div className="space-y-8">
        {years.map((year) => {
          const postsInYear = groupedByYear[year];
          return (
            <div key={year} className="border rounded-lg overflow-hidden shadow bg-white">
              <div className="px-6 py-4 bg-gray-50 font-semibold text-lg">
                Year {year}
              </div>
              <div className="divide-y divide-gray-200">
                {postsInYear.map((post) => (
                  <div key={post.id} className="p-4 hover:bg-gray-50 transition">
                    <h3 className="mb-2 text-xl font-semibold">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {post.date}
                    </p>
                    <p className="text-base text-gray-700 line-clamp-3">
                      {/* Plain text preview: remove markdown syntax */}
                      {post.content
                        .replace(/#/g, "") // remove heading symbols
                        .replace(/[\n\r]+/g, " ") // replace newlines with space
                        .slice(0, 200)}{" "}
                      {post.content.length > 200 ? "..." : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}