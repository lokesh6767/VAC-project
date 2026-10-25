# AI Insight — Product Requirements Document (PRD)

## 1. Product Overview
**AI Insight** is an enterprise-grade AI competitor intelligence, benchmarking, and decision-support platform designed for researchers, students, developers, product managers, and business analysts.
It provides structured, verifiable competitive intelligence on the world's leading generative AI assistants:
1. **ChatGPT** (OpenAI)
2. **Gemini** (Google)
3. **Microsoft Copilot** (Microsoft)
4. **Claude** (Anthropic)

## 2. Target Personas
- **Students & Educators:** Evaluating concept explanation, writing feedback, study aids, and student pricing plans.
- **Software Engineers:** Comparing code generation, syntax debugging, context limits, terminal/IDE integrations, and developer API pricing.
- **Researchers & Analysts:** Evaluating source attribution, citation accuracy, document summarization, and data privacy policies.
- **Product Managers & Decision Makers:** Deciding enterprise tooling adoption based on total cost of ownership, compliance (SOC 2, GDPR, HIPAA), and ecosystem integrations.

## 3. Core Functional Modules

### 3.1 Executive Dashboard
- Macro metrics: Tracked competitors (4), verified capabilities count, completed benchmark runs, saved intelligence reports, and source verification audit rate.
- Overview cards for ChatGPT, Gemini, Copilot, and Claude with quick status indicators.
- Radar and bar capability distribution charts.
- Recent research findings and dated verification alerts.
- Quick action shortcuts (Start Comparison, Run Benchmark, Build Report).

### 3.2 Competitor Explorer & Verified Profiles
- Detailed profile for each AI assistant covering:
  - Provider, official website, docs URL, release timeline.
  - Core models (e.g. GPT-4o, o1, o3-mini; Gemini 2.0 Flash / Pro; Claude 3.5 / 3.7 Sonnet; Copilot GPT-4 / fine-tuned).
  - Subscription tiers (Free, Consumer Pro/Plus, Team, Enterprise).
  - Pricing, token context limits, file upload formats, and modality matrix.
  - Privacy and training data policies (opt-out mechanisms, enterprise zero-retention).
  - Documented advantages and known limitations.
  - Linked evidence claims with status (Verified, Needs Review, Outdated, Disputed).

### 3.3 Dynamic Comparison Workspace
- Multi-competitor side-by-side comparison (2, 3, or 4 competitors).
- Granular capability matrix across 10+ standard dimensions.
- Difference filter ("Show differences only") to isolate unique selling points.
- Category filters (Reasoning, Coding, Multimodal, File Support, Pricing, Privacy, Integrations).
- Direct link to supporting evidence sources for each cell in the matrix.
- Instant PDF/Print export of the customized comparison view.

### 3.4 Evidence Library & Source Management
- Central repository of all vendor claims, technical reports, pricing disclosures, and independent benchmark citations.
- Structured schema: Claim Text, Competitor, Category, Source URL, Publisher, Publication Date, Last Verified Date, Verification State, Reviewer Audit Notes.
- Support for filtering by verification status and manual claim addition/editing.
- Absolute prohibition against fabricated citations or non-existent URLs.

### 3.5 Benchmark Lab & Repeatable Rubric Testing
- Multi-category test suite: Student Learning, Coding, Math, Research & Sourcing, Document Analysis, Summarization, Instruction Following, Multimodal.
- Rigorous 1–5 scoring rubric covering:
  1. Accuracy (freedom from hallucinations or syntax errors)
  2. Relevance (direct adherence to user query)
  3. Clarity (structure, formatting, readability)
  4. Instruction Following (constraints, output format, edge cases)
  5. Source Reliability (hallucination resistance, reference validity)
  6. Task Completion (wholeness of the delivered solution)
- Weighted aggregate calculation engine with explicit treatment of missing data.
- User capability to run custom benchmarks with prompts, outputs, and evaluator notes.

### 3.6 Strategic SWOT Analysis
- Desktop 4-quadrant grid and mobile responsive cards for each competitor.
- Verified observations vs. strategic hypotheses clearly differentiated.
- Direct evidence linkage and confidence levels (High, Medium, Low).
- Comparative cross-competitor SWOT view.

### 3.7 Task-Oriented Recommendation Engine
- Persona/Task selector (Coding & Architecture, Student Learning, Academic Research, Content Writing, Document Synthesis, Office & Enterprise).
- Configurable priority weightings (Accuracy, Cost, Ease of Use, Privacy, Integrations, Speed, Document Handling).
- Transparent score derivation explaining why a model is ranked, critical trade-offs, and missing evaluation data.

### 3.8 Report Builder & Saved Reports Repository
- Configurable multi-section dossier builder: Cover Page, Executive Summary, Methodology, Competitor Profiles, Comparison Matrix, Benchmark Results, SWOT Analysis, Recommendations, Limitations & Ethical Guidelines, References.
- High-fidelity PDF/Print stylesheet with clean page breaks, page numbers, and corporate branding.
- Report persistence: Save, reopen, duplicate, re-export, and delete.

### 3.9 Methodology, Security & Privacy
- Full disclosure of testing methodologies, evaluation rubrics, and rating calculations.
- Comprehensive privacy notices outlining data flow and API handling.
- Local storage persistence for demonstration mode + PostgreSQL/Supabase ready migrations.
