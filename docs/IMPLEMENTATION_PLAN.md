# AI Insight — Implementation Plan
**Product:** AI Insight — AI Competitor Intelligence & Comparison Platform  
**Architecture:** Next.js / React / TypeScript / Tailwind CSS / Lucide Icons / Enterprise SaaS Dashboard  
**Status:** In Progress (Phase 1: Environment & Foundation)

---

## 1. Executive Summary & Core Mission
AI Insight is an enterprise-grade AI competitor intelligence, benchmarking, and decision-support platform designed for researchers, students, developers, product managers, and business analysts. It provides verified profiles, transparent feature matrices, 1–5 rubric-scored benchmark evaluations, 4-quadrant SWOT analyses, multi-criteria recommendation modeling, and multi-format report builders (with publication-grade PDF/print exports) for:
1. **ChatGPT** (OpenAI)
2. **Gemini** (Google)
3. **Microsoft Copilot** (Microsoft)
4. **Claude** (Anthropic)

---

## 2. Phased Execution Roadmap

### Phase 1: Environment Setup & Architecture Definition
- [x] Workspace inspection (empty workspace detected).
- [/] Runtime provisioning: Node.js 24 LTS via Winget, package manager configuration.
- [x] Architectural documentation: Requirements, User Stories, Acceptance Criteria, Data Model, API contracts, UI/UX specifications.
- [ ] Next.js + React + TypeScript + Tailwind CSS application initialization.

### Phase 2: UI Foundation & Design System
- [ ] Enterprise SaaS design system: Deep navy sidebar (`#0B132B`, `#1C2541`), slate/zinc light workspace, blue primary accent (`#2563EB`), emerald green verified badges, amber review tags, crimson alert badges.
- [ ] Responsive navigation shell: Collapsible sidebar, mobile header/drawer, top breadcrumbs bar, global search modal, verification status indicator, dark/light theme foundation.
- [ ] Core UI components: Modal dialogs, metric cards, tab switchers, rating rubric meters, status chips, confidence indicators, comparison table columns.

### Phase 3: Core Competitor Intelligence & Explorer
- [ ] Competitor Profiles module: ChatGPT, Gemini, Copilot, Claude.
- [ ] Rich profiles with provider information, documented capabilities, models (e.g., GPT-4o / o1 / o3-mini; Gemini 2.0 Flash / Pro; Claude 3.5 Sonnet / 3.7 Sonnet; Copilot GPT-4 / fine-tuned), plans (Free, Plus/Pro, Team/Enterprise), pricing tiers, context windows, multimodal support, APIs, and privacy terms.
- [ ] Inline note editor and claim verification status toggle (Verified, Needs review, Unknown, Outdated, Disputed).

### Phase 4: Side-by-Side Comparison Workspace
- [ ] Multi-selector: Compare 2, 3, or all 4 competitors simultaneously.
- [ ] Configurable dimensions: General reasoning, Coding & debugging, Math, Research & citation, Document analysis, Multimodal, File limits, Context limits, Pricing/limits, Privacy & enterprise compliance.
- [ ] Difference highlighter ("Show differences only"), category filtering, capability search.
- [ ] Source drawer linking claims directly to verified evidence.

### Phase 5: Evidence Library & Source Management
- [ ] Structured claims table with URL, publisher, publication date, last-checked timestamp, verification state, reviewer audit notes.
- [ ] Manual claim entry form with validation.
- [ ] Source refresh simulation & status filter (Verified, Needs review, Outdated, Disputed, Unverified).
- [ ] Direct citation linking throughout comparison and benchmark views.

### Phase 6: Benchmark Lab & Repeatable Rubric Testing
- [ ] Built-in benchmark suite across 8 distinct categories (Coding, Student Learning, Math, Research, Document Analysis, Summarization, Instruction Following, Multimodal).
- [ ] 1–5 scoring rubric with criteria: Accuracy, Relevance, Clarity, Instruction-following, Source reliability, Task completion.
- [ ] Custom benchmark creator with prompt editor, expected criteria, model version tag, and evaluator notes.
- [ ] Transparent calculation engine: Aggregated scores with category weighting, explicit handling of missing observations, and clear disclaimer that scores represent recorded test sets rather than universal AI intelligence.

### Phase 7: Strategic SWOT Analysis
- [ ] Four-quadrant interactive desktop matrix & mobile stacked cards for each competitor.
- [ ] Evidence-backed items with confidence ratings (High, Medium, Low) and reviewer audit log.
- [ ] Cross-competitor SWOT comparison view.

### Phase 8: Multi-Criteria Recommendation Engine
- [ ] Task selector (Coding, Student Learning, Academic Research, Content Writing, Document Analysis, Enterprise Office).
- [ ] Priority sliders/weights: Accuracy, Cost Efficiency, Ease of Use, Privacy & Compliance, Integrations, Latency/Speed, File & Document Support.
- [ ] Transparent algorithmic matching: Evaluates recorded evidence and benchmark scores, returns ranked fit with detailed rationale, decisive criteria, residual limitations, and missing evidence flags.

### Phase 9: Report Builder, Saved Reports & PDF Export
- [ ] Modular report configurator: Title, audience, author, selected competitors, inclusion toggles (Executive summary, Scope/methodology, Profiles, Comparison matrix, Benchmarks, SWOT, Recommendations, Limitations, References).
- [ ] Interactive live print/PDF layout preview with formatted page breaks, cover page, page numbers, clean typography, and professional tables.
- [ ] Saved Reports repository: Local persistence, reopen, duplicate, delete, and PDF download.

### Phase 10: Methodology, Settings & Security Review
- [ ] Evaluation criteria, data verification policies, privacy notice explaining third-party AI data policies.
- [ ] Local storage demo persistence + PostgreSQL/Supabase schema & migration scripts.
- [ ] Unit & browser test suites, security checks, accessibility verification (WCAG 2.2 AA).
- [ ] Complete setup documentation and delivery package.
