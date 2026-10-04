import { Link } from "react-router-dom";

import { BlogPost } from "@/data/blogs";

function getPlainTextPreview(content: string, wordsCount: number = 30): string {
  // Remove markdown syntax for a plain preview
  const plain = content
    .replace(/#{1,6}\s*/g, "") // remove heading symbols
    .replace(/[*_~`]/g, "") // remove emphasis markers
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "") // remove images entirely
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // remove links, keep text
    .replace(/[\n\r]+/g, " "); // replace newlines with space
  const words = plain.trim().split(/\s+/);
  if (words.length <= wordsCount) {
    return words.join(" ");
  }
  return words.slice(0, wordsCount).join(" ") + "...";
}

export function BlogPostPreview({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.id}`}
      className="group block rounded-xl border border-line bg-surface shadow-sm
                 transition-all duration-300 hover:border-brand/30 hover:shadow-lg
                 hover:-translate-y-1 overflow-hidden"
    >
      <article className="p-5 transition-colors duration-300 group-hover:bg-surface-hover">
        <h3 className="mb-2 text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-brand">
          {post.title}
        </h3>
        <p className="text-sm text-ink-subtle mb-3">{post.date}</p>
        <p className="text-base text-ink-muted leading-relaxed">
          {getPlainTextPreview(post.content, 30)}
        </p>
      </article>
    </Link>
  );
}
