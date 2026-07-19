// src/data/blogs.ts
export interface BlogPost {
  id: string;
  title: string;
  date: string; // ISO date string or just year-month-day
  content: string; // raw markdown
  year: string; // extracted year for grouping
  month: string; // extracted month for grouping (optional)
}

/**
 * Load all markdown files from src/data/blogs and parse frontmatter.
 * Returns array of BlogPost sorted by date descending.
 */
export function getBlogPosts(): BlogPost[] {
  // Vite glob import
  const modules = import.meta.glob("/src/data/blogs/*.md", {
    eager: true,
    query: "?raw",
  }) as Record<string, { default: string }>;

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
      const titleMatch = frontmatter.match(/title:\s*"([^"]*)"|title:\s*([^\n]+)/);
      if (titleMatch) title = (titleMatch[1] || titleMatch[2]).trim();
      const dateMatch = frontmatter.match(/date:\s*"([^"]*)"|date:\s*([^\n]+)/);
      if (dateMatch) date = (dateMatch[1] || dateMatch[2]).trim();
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

  return posts;
}
