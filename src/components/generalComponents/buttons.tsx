import { useNavigate } from "react-router-dom";

import { BLOG_URL } from "@/constants/paths";
import { buttonVariants } from "@/constants/themes";

export function HomeButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")} className={`mb-8 ${buttonVariants.primary}`}>
      ← Back to Home
    </button>
  );
}

export function BlogButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(BLOG_URL)}
      className={`mb-8 ${buttonVariants.primary}`}
    >
      ← Back to Blog
    </button>
  );
}
