// src/components/blogs/blog-post-preview.tsx
import { BlogPost } from "@/data/blogs";

interface BlogPostPreviewProps {
  post: BlogPost;
}

export function BlogPostPreview({ post }: BlogPostPreviewProps) {
  return (
    <div className="p-4 hover:bg-gray-50 transition">
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
  );
}