import JobFinder from "@/assets/Job_Finder.png";
import Chatbot from "@/assets/Chatbot.png";
import PersonalWebsite from "@/assets/Personal_Website.png";
import ResumeEvaluator from "@/assets/Resume_Evaluator.png";

interface Attribution {
  href: string;
  title: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  tags: string[];
  image: string;
  attribution: Attribution;
}

const projectImageAttributions = {
  job_finder: {
    href: "https://www.flaticon.com/free-icons/job",
    title: "job icons",
    description: "Job icons created by Freepik - Flaticon",
  },
  chatbot: {
    href: "https://www.flaticon.com/free-icons/chatbot",
    title: "chatbot icons",
    description: "Chatbot icons created by Flat Icons - Flaticon",
  },
  resume_evaluator: {
    href: "https://www.flaticon.com/free-icons/headhunting",
    title: "headhunting icons",
    description: "Headhunting icons created by itim2101 - Flaticon",
  },
  personal_website: {
    href: "https://www.flaticon.com/free-icons/personal-website",
    title: "personal website icons",
    description:
      "Personal website icons created by Prosymbols Premium - Flaticon",
  },
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Job Finder",
    description:
      "Built primarily with Python and the use of various APIs and LLMs.",
    link: "https://github.com/OweT1/jobs-are-the-way",
    tags: ["Telegram", "OpenRouter", "Postgres", "Alembic"],
    image: JobFinder,
    attribution: projectImageAttributions.job_finder,
  },
  {
    id: 2,
    title: "Chatbot",
    description:
      "Frontend: Streamlit | Backend: Ollama, Tavily Search, Postgres, Docker",
    link: "https://github.com/OweT1/personal-chatbot",
    tags: ["Streamlit", "Ollama", "Tavily Search", "RAG"],
    image: Chatbot,
    attribution: projectImageAttributions.chatbot,
  },
  {
    id: 3,
    title: "Resume Evaluator",
    description: "Frontend: Gradio | Backend: Langchain, LangGraph, Crawl4AI",
    link: "https://github.com/OweT1/resume-evaluator",
    tags: ["Gradio", "LangChain", "LangGraph", "Crawl4AI"],
    image: ResumeEvaluator,
    attribution: projectImageAttributions.resume_evaluator,
  },
  {
    id: 4,
    title: "Personal Website",
    description: "Built with TypeScript, React, Tailwind CSS and Vite.",
    link: "https://github.com/OweT1/personal-website",
    tags: ["TypeScript", "React", "Tailwind CSS", "Vite"],
    image: PersonalWebsite,
    attribution: projectImageAttributions.personal_website,
  },
];
