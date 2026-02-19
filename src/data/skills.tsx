interface Skill {
  id: number;
  skillCategory: string;
  skillNames: string[];
}

export const skills: Skill[] = [
  {
    id: 1,
    skillCategory: "Programming Languages",
    skillNames: [
      "Python",
      "SQL",
      "Cypher",
      "Java",
      "JavaScript",
      "TypeScript",
      "CSS",
      "Go",
      "R",
    ],
  },
  {
    id: 2,
    skillCategory: "ML & Optimisation Libraries / Frameworks",
    skillNames: ["Scikit-learn", "XGBoost", "PyTorch", "Pymoo"],
  },
  {
    id: 3,
    skillCategory: "LLM Libraries / Frameworks",
    skillNames: [
      "Transformers",
      "HuggingFace",
      "OpenRouter",
      "LiteLLM",
      "LangChain",
      "LangGraph",
      "DeepEval",
    ],
  },
  {
    id: 4,
    skillCategory: "Databases",
    skillNames: [
      "Postgres",
      "SQLAlchemy",
      "Alembic",
      "MongoDB",
      "Neo4j",
      "Graphiti",
    ],
  },
  {
    id: 5,
    skillCategory: "Data Manipulation & Data Engineering",
    skillNames: ["NumPy", "Pandas", "PySpark", "GeoPandas"],
  },
  {
    id: 6,
    skillCategory: "Frontend Libraries / Frameworks",
    skillNames: ["React", "Streamlit", "Gradio"],
  },
  {
    id: 7,
    skillCategory: "Data Visualisation Libraries / Frameworks",
    skillNames: ["Matplotlib", "Seaborn"],
  },
  {
    id: 8,
    skillCategory: "Version Control & Containerisation",
    skillNames: ["Git", "Docker", "Kubernetes"],
  },
];
