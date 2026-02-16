export interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Job Finder",
    description:
      "Built primarily with Python and the use of various APIs and LLMs.",
    link: "https://github.com/OweT1/jobs-are-the-way",
  },
  {
    id: 2,
    title: "Chatbot",
    description:
      "Frontend: Streamlit Interface, Backend: Ollama, Tavily Search, Postgres, Docker",
    link: "https://github.com/OweT1/personal-chatbot",
  },
  {
    id: 3,
    title: "Resume Evaluator",
    description:
      "Frontend: Gradio Interface, Backend: Langchain, LangGraph, Crawl4AI",
    link: "https://github.com/OweT1/resume-evaluator",
  },
  {
    id: 4,
    title: "Personal Website",
    description: "Built with React, TypeScript, and Vite.",
    link: "https://github.com/OweT1/personal-website",
  },
];
