import SATSCompanyLogo from "@/assets/SATS_Company_Logo.jpeg";
import ShopeeCompanyLogo from "@/assets/Shopee_Company_Logo.png";
import DBSCompanyLogo from "@/assets/DBS_Company_Logo.jpg";
import TemasekCompanyLogo from "@/assets/Temasek_Holdings_Company_Logo.png";
import GICCompanyLogo from "@/assets/GIC_Company_Logo.png";

interface Experience {
  id: number;
  role: string;
  company: string;
  company_logo: string;
  start_date: string;
  end_date: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Quantitative Strategist Intern",
    company: "GIC",
    company_logo: GICCompanyLogo,
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
    company_logo: TemasekCompanyLogo,
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
    company_logo: DBSCompanyLogo,
    start_date: "May 2025",
    end_date: "Aug 2025",
    description: [
      "Designed LLM-based evaluation pipelines to audit call transcripts against regulatory guidelines, achieving more than 90% agreement with human reviewers",
      "Engineered 3 prompt workflows for Claude and Gemini models, iterating on evaluation rubrics and negative sampling analysis",
      "Conducted multimodal Speech-to-Text experiments with Gemini, improving transcript quality for downstream NLP tasks",
    ],
  },
  {
    id: 4,
    role: "Business Analyst Intern",
    company: "Shopee",
    company_logo: ShopeeCompanyLogo,
    start_date: "Jan 2025",
    end_date: "Apr 2025",
    description: [
      "Engineered complex SQL queries for downstream data dashboards using window functions and CTEs",
      "Created a text similarity scoring based algorithm to detect similar product names",
    ],
  },
  {
    id: 5,
    role: "Data Scientist Intern",
    company: "SATS Ltd",
    company_logo: SATSCompanyLogo,
    start_date: "Aug 2024",
    end_date: "Dec 2024",
    description: [
      "Fine-tuned a DeBERTa-based text classification model to categorise text into 10 classes, achieving 85% accuracy",
      "Deployed an end-to-end workflow and implemented Genetic Algorithm in Python to automate optimisation of baggage allocation under 10+ hard and soft constraints, reducing planning time by more than 50%",
      "Built Microsoft Azure based document digitalisation pipelines (Databricks, Blob Storage, Logic Apps), reducing paper usage to 0% and operational costs by 20%",
    ],
  },
];
