// src/pages/blog-post.tsx
import { useParams } from "react-router-dom";
import { getBlogPosts } from "@/data/blogs";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { BlogButton } from "@/components/generalComponents/buttons";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const posts = getBlogPosts();
  const post = posts.find((p) => p.id === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <p className="text-red-500 text-center">Blog post not found.</p>
        <Link
          to="/blog"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <BlogButton />
      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
      <p className="mb-6 text-sm text-gray-500">{post.date}</p>
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}
