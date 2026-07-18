import { BASE_URL } from "@/constants/paths";
import { buttonVariants } from "@/constants/themes";

export function HomeButton() {
  return (
    <button
      onClick={() => (window.location.href = BASE_URL)}
      className={`mb-8 ${buttonVariants.gradualRedOrange}`}
    >
      ← Back to Home
    </button>
  );
}
