import { getBlogPosts } from "@/data/blogs";
import { BlogSection } from "@/components/blogs/blog-section";
import { HomeButton } from "@/components/generalComponents/buttons";

export function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 space-y-6">
      <HomeButton />
      <h1 className="text-4xl font-bold mb-6">✍️ Personal Blog</h1>
      <BlogSection posts={posts} />
    </div>
  );
}
