import { BlogPost } from "@/data/blogs";
import { Link } from "react-router-dom";

function getPlainTextPreview(content: string, wordsCount: number = 30): string {
  // Remove markdown syntax for a plain preview
  let plain = content
    .replace(/#{1,6}\s*/g, "") // remove heading symbols
    .replace(/[*_~`]/g, "") // remove emphasis markers
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // remove links, keep text
    .replace(/[\n\r]+/g, " "); // replace newlines with space
  const words = plain.trim().split(/\s+/);
  if (words.length <= wordsCount) {
    return words.join(" ");
  }
  return words.slice(0, wordsCount).join(" ") + "...";
}

export function BlogPostPreview({ post }: { post: BlogPost }) {
  return (
    <Link to={`/blog/${post.id}`} className="block">
      <div className="border rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-4 hover:bg-gray-50 transition">
          <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{post.date}</p>
          <p className="text-base text-gray-700">
            {getPlainTextPreview(post.content, 30)}
          </p>
        </div>
      </div>
    </Link>
  );
}
