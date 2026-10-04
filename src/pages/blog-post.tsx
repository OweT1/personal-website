// src/pages/blog-post.tsx
import { useParams } from "react-router-dom";
import { getBlogPosts } from "@/data/blogs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaTwitter, FaLinkedin, FaEnvelope, FaLink } from "react-icons/fa";
import { BlogButton } from "@/components/generalComponents/buttons";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ImgHTMLAttributes } from "react";

// Calculate reading time based on average reading speed of 200 words per minute
function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const posts = getBlogPosts();
  const post = posts.find((p) => p.id === slug);
  // Hooks must run before the early return below.
  const [isCopied, setIsCopied] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <p className="text-brand text-center">Blog post not found.</p>
        <BlogButton />
      </div>
    );
  }

  const readingTime = getReadingTime(post.content);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      post.title,
    )}&url=${encodeURIComponent(`${import.meta.env.BASE_URL}blog/${post.id}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      `${import.meta.env.BASE_URL}blog/${post.id}`,
    )}`,
    email: `mailto:?subject=${encodeURIComponent(
      post.title,
    )}&body=${encodeURIComponent(
      `${post.title} - ${import.meta.env.BASE_URL}blog/${post.id}`,
    )}`,
  };

  const customComponents = {
    img: ({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
      // If src is null or undefined, return null to avoid rendering an invalid image
      if (src == null) {
        return null;
      }
      // Modify relative paths if needed, add lazy loading, or use Next.js Image
      const isLocal = src.startsWith("/");
      const baseUrl = import.meta.env.BASE_URL;

      return (
        <img
          src={isLocal ? `${baseUrl}${src}` : src}
          alt={alt ?? ""}
          loading="lazy"
          style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
          {...props}
        />
      );
    },
  };

  return (
    <article className="prose lg:prose-xl mx-auto py-12 px-6 max-w-3xl">
      {/* Blog top part */}
      <div>
        {/* Back to blog button */}
        <div className="mb-8">
          <BlogButton />
        </div>

        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-ink">
            {post.title}
          </h1>
          <div className="flex justify-center gap-10 sm:flex-row sm:justify-center sm:space-x-6 text-sm text-ink-subtle">
            <time dateTime={post.date}>{post.date}</time>
            <span>{readingTime} min read</span>
          </div>
        </header>
      </div>

      {/* Article body */}
      <section className="mb-10">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={customComponents}
        >
          {post.content}
        </ReactMarkdown>
      </section>

      {/* Share section */}
      <section className="border-y border-line py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <p className="text-sm text-ink-muted mb-2 sm:mb-0">
          Share this article:
        </p>
        <div className="flex space-x-4">
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-subtle hover:text-brand transition-colors"
            aria-label="Share on Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-subtle hover:text-brand transition-colors"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={shareLinks.email}
            className="text-ink-subtle hover:text-ink transition-colors"
            aria-label="Share via Email"
          >
            <FaEnvelope size={20} />
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${post.title} ${import.meta.env.BASE_URL}blog/${post.id}`,
              );
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            }}
            className="text-ink-subtle hover:text-brand cursor-pointer transition-colors flex items-center space-x-1"
            aria-label="Copy link"
          >
            <FaLink size={20} />
          </button>
        </div>
        <AnimatePresence>
          {isCopied && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="mt-2 text-xs text-brand text-center"
            >
              Link copied!
            </motion.p>
          )}
        </AnimatePresence>
      </section>
    </article>
  );
}
