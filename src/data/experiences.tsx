export interface Experience {
  id: number;
  role: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Quantitative Strategist Intern",
    company: "GIC",
    start_date: "Jan 2026",
    end_date: "Present",
    description: [
      "Architectured and optimised a high-fidelity data extraction pipeline converting PDFs to structured Markdown with extraction accuracy of more than 90% and reduced overall pipeline execution runtime by 50%",
      "Engineered 2 features for Linear Regression, Random Forest and XGBoost models to predict rent price of real estate assets in Korea",
    ],
  },
  {
    id: 2,
    role: "Machine Learning / Data Engineer Intern",
    company: "Temasek Holdings",
    start_date: "Aug 2025",
    end_date: "Dec 2025",
    description: [
      "Designed and deployed 2 production LLM tools: a slide-generation tool and an investment tool that retrieves structured financial metrics (such as EV, EBITDA, P/E) from Snowflake via dynamic SQL querying",
      "Reduced metadata extraction latency by more than 50% (20s to less than 10s) through prompt decomposition and asynchronous processing",
      "Benchmarked semantic retrieval solutions (OpenAI File Search, Snowflake Cortex, Azure AI Search) across latency, document retrieval recall (Recall@5), and cost for production use case",
      "Built a Neo4j-based knowledge graph POC to model entity relationships and enable multi-hop document retrieval",
    ],
  },
  {
    id: 3,
    role: "Data Science Intern",
    company: "DBS Bank",
    start_date: "May 2025",
    end_date: "Aug 2025",
    description: [
      "Designed LLM-based evaluation pipelines to audit call transcripts against regulatory guidelines, achieving more than 90% agreement with human reviewers",
      "Engineered 3 prompt workflows for Claude and Gemini, iterating on evaluation rubrics and negative sampling analysis",
      "Conducted multimodal Speech-to-Text experiments with Gemini, improving transcript quality for downstream NLP tasks",
    ],
  },
  {
    id: 4,
    role: "Data Scientist Intern",
    company: "SATS Ltd",
    start_date: "Aug 2024",
    end_date: "Dec 2024",
    description: [
      "Fine-tuned a DeBERTa-based text classification model to categorise text into 10 classes, achieving 85% accuracy",
      "Deployed an end-to-end workflow and implemented Genetic Algorithm in Python to automate optimisation of baggage allocation under 10+ hard and soft constraints, reducing planning time by more than 50%",
      "Built Microsoft Azure based document digitalisation pipelines (Databricks, Blob Storage, Logic Apps), reducing paper usage to 0% and operational costs by 20%",
    ],
  },
];
