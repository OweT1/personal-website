import { BlogPost } from "@/data/blogs";
import { BlogPostPreview } from "@/components/blogs/blog-post-preview";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

interface BlogSectionProps {
  posts: BlogPost[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  if (posts.length === 0) {
    return (
      <p className="text-center text-ink-subtle py-12">
        No posts yet. Check back soon!
      </p>
    );
  }

  return (
    <RevealGroup className="space-y-6" stagger={0.08}>
      {posts.map((post) => (
        <RevealItem key={post.id}>
          <BlogPostPreview post={post} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
