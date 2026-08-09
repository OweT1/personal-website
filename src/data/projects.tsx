interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Job Finder",
    description:
      "Telegram bot that monitors job listings matching a user's profile and ranks them by relevance using LLM-based scoring, with run history persisted in Postgres.",
    link: "https://github.com/OweT1/jobs-are-the-way",
    tags: ["Telegram", "OpenRouter", "Postgres", "Alembic"],
  },
  {
    id: 2,
    title: "Personal Chatbot",
    description:
      "Local-first RAG assistant with a Streamlit UI, Ollama embeddings, and Tavily web retrieval so answers stay grounded in up-to-date sources.",
    link: "https://github.com/OweT1/personal-chatbot",
    tags: ["Streamlit", "Ollama", "Tavily Search", "RAG"],
  },
  {
    id: 3,
    title: "Resume Evaluator",
    description:
      "LLM pipeline that crawls a target role's requirements and scores a resume against them with LangGraph, surfacing gaps and a prioritised fix plan.",
    link: "https://github.com/OweT1/resume-evaluator",
    tags: ["Gradio", "LangChain", "LangGraph", "Crawl4AI"],
  },
  {
    id: 4,
    title: "Personal Website",
    description:
      "This portfolio — a React + TypeScript single-page app with markdown-driven module reviews and a responsive, accessible layout.",
    link: "https://github.com/OweT1/personal-website",
    tags: ["TypeScript", "React", "Tailwind CSS", "Vite"],
  },
];