export interface SkillSubCategory {
  skillSubCategory: string;
  skillSubNames: string[];
}

export interface Skill {
  id: number;
  skillCategory: string;
  skillNames: SkillSubCategory[];
}

export const skills: Skill[] = [
  {
    id: 1,
    skillCategory: "Programming Languages",
    skillNames: [
      {
        skillSubCategory: "Programming",
        skillSubNames: [
          "Python",
          "Java",
          "JavaScript",
          "TypeScript",
          "CSS",
          "Go",
          "R",
        ],
      },
      {
        skillSubCategory: "Database",
        skillSubNames: ["SQL", "Cypher"],
      },
    ],
  },
  {
    id: 2,
    skillCategory: "Libraries / Frameworks",
    skillNames: [
      {
        skillSubCategory: "Machine Learning & Optimisation",
        skillSubNames: [
          "Scikit-learn",
          "XGBoost",
          "PyTorch",
          "Tensorflow",
          "Keras",
          "Pymoo",
        ],
      },
      {
        skillSubCategory: "Large Language Models (LLM)",
        skillSubNames: [
          "Transformers",
          "HuggingFace",
          "OpenRouter",
          "LiteLLM",
          "Ollama",
          "LangChain",
          "LangGraph",
        ],
      },
      {
        skillSubCategory: "Data Visualisation",
        skillSubNames: ["Matplotlib", "Seaborn"],
      },
      {
        skillSubCategory: "Frontend",
        skillSubNames: ["Streamlit", "Gradio", "React", "Vite"],
      },
      {
        skillSubCategory: "Testing",
        skillSubNames: ["Pytest", "DeepEval"],
      },
    ],
  },
  {
    id: 3,
    skillCategory: "Data Engineering",
    skillNames: [
      {
        skillSubCategory: "Databases",
        skillSubNames: [
          "Postgres",
          "SQLAlchemy",
          "Alembic",
          "MongoDB",
          "Neo4j",
          "Graphiti",
        ],
      },
      {
        skillSubCategory: "Data Manipulation",
        skillSubNames: ["NumPy", "Pandas", "PySpark", "GeoPandas"],
      },
    ],
  },
  {
    id: 4,
    skillCategory: "Software Engineering",
    skillNames: [
      {
        skillSubCategory: "Version Control",
        skillSubNames: ["Git"],
      },
      {
        skillSubCategory: "Containerisation",
        skillSubNames: ["Docker", "Kubernetes"],
      },
    ],
  },
];
