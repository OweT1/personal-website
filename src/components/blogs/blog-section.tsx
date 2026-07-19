import { BlogPostPreview } from "@/components/blogs/blog-post-preview";
import { BlogPost } from "@/data/blogs";

interface BlogSectionProps {
  posts: BlogPost[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
        >
          <BlogPostPreview post={post} />
        </div>
      ))}
    </div>
  );
}
