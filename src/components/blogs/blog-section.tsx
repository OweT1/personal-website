// src/components/blogs/blog-section.tsx
import { BlogPost } from "@/data/blogs";
import { BlogPostPreview } from "./blog-post-preview";

interface BlogSectionProps {
  year: string;
  posts: BlogPost[];
}

export function BlogSection({ year, posts }: BlogSectionProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow bg-white">
      <div className="px-6 py-4 bg-gray-50 font-semibold text-lg">
        Year {year}
      </div>
      <div className="divide-y divide-gray-200">
        {posts.map((post) => (
          <BlogPostPreview key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}