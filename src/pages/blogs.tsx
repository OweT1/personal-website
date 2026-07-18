// src/pages/blogs.tsx
import { SectionHeader } from "@/components/section-components";
import { getBlogPosts } from "@/data/blogs";
import { BlogSection } from "@/components/blogs/blog-section";
import { HomeButton } from "@/components/generalComponents/buttons";

export function BlogPage() {
  const posts = getBlogPosts();

  // Group posts by year
  const groupedByYear: Record<string, typeof posts> = {};
  posts.forEach((post) => {
    if (!groupedByYear[post.year]) {
      groupedByYear[post.year] = [];
    }
    groupedByYear[post.year].push(post);
  });

  const years = Object.keys(groupedByYear).sort((a, b) => b.localeCompare(a)); // descending

  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 space-y-12">
      <HomeButton />
      <SectionHeader header="Blog" />
      <div className="space-y-8">
        {years.map((year) => (
          <BlogSection key={year} year={year} posts={groupedByYear[year]} />
        ))}
      </div>
    </div>
  );
}
