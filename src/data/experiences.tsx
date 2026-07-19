import SATSCompanyLogo from "@/assets/companies/SATS_Company_Logo.jpeg";
import ShopeeCompanyLogo from "@/assets/companies/Shopee_Company_Logo.png";
import DBSCompanyLogo from "@/assets/companies/DBS_Company_Logo.jpg";
import TemasekCompanyLogo from "@/assets/companies/Temasek_Holdings_Company_Logo.png";
import GICCompanyLogo from "@/assets/companies/GIC_Company_Logo.png";

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
    end_date: "May 2026",
    description: [
      "Architected a high-fidelity PDF-to-Markdown extraction pipeline achieving >90% extraction accuracy and cutting end-to-end pipeline runtime by 50%, enabling downstream Q&A use cases for the investment team",
      "Automated manual labelling of investment documents using a LangGraph multi-agent workflow, achieving >90% classification accuracy and eliminating hours of analyst labelling effort",
      "Evaluated RAG performance on the department's internal LLM chatbot using LLM-as-a-judge methodology (Atomic Facts + Context Retrieval), surfacing actionable gaps in retrieval quality",
      "Contributed to department's internal Analytics Library, delivering features adopted across 10 team members; supported Databricks migration to consolidate team workflows",
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
      "Designed and shipped 2 production LLM tools serving ~1,000 internal users: a slide-generation tool (~700 users) and a financial metrics retrieval tool (~300 users) querying EV, EBITDA, and P/E ratios from Snowflake via dynamic SQL generation",
      "Reduced metadata extraction latency by >50% (20s → <10s) through prompt decomposition and async processing, improving responsiveness for production workloads",
      "Benchmarked 3 semantic retrieval systems (OpenAI File Search, Snowflake Cortex, Azure AI Search) across latency, Recall@5, and cost, producing a decision framework for production adoption",
      "Built a Neo4j knowledge graph POC to model entity relationships and enable multi-hop document retrieval, extending the retrieval system beyond flat vector search",
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
      "Built LLM-based evaluation pipelines to audit call centre transcripts against regulatory compliance guidelines at scale (thousands of transcripts), achieving >90% agreement with human reviewers and reducing manual audit burden",
      "Engineered 3 structured prompt workflows for Claude and Gemini, iterating on evaluation rubrics and negative sampling to improve recall on non-compliant transcript detection",
      "Conducted multimodal Speech-to-Text experiments with Gemini to improve upstream transcript quality, reducing transcription error rate for downstream NLP evaluation pipelines",
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
      "Fine-tuned a DeBERTa-based text classification model to categorise operational text across 10 classes, achieving 85% accuracy on an imbalanced production dataset",
      "Engineered an end-to-end baggage allocation optimisation system using Genetic Algorithms in Python, handling 10+ hard and soft constraints across hundreds of bags per flight and reducing manual planning time by >50%",
      "Built Azure-based document digitalisation pipelines (Databricks, Blob Storage, Logic Apps), eliminating paper-based processes entirely and reducing operational costs by 20%",
    ],
  },
];
