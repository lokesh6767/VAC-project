# AI Insight — AI Competitor Intelligence & Comparison Platform

![AI Insight Banner](https://img.shields.io/badge/Status-Production%20Ready-059669?style=for-the-badge)
![Next.js 14](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=next.js)
![React 18](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vitest Tests](https://img.shields.io/badge/Tests-13%2F13%20Passing-059669?style=for-the-badge)

**AI Insight** is an enterprise-grade AI competitor intelligence, benchmarking, and decision-support platform designed for software engineers, students, educators, researchers, product managers, and enterprise decision-makers.

It delivers empirical, dated competitive intelligence on the world's frontier AI assistants:
1. **ChatGPT** (OpenAI)
2. **Gemini** (Google DeepMind)
3. **Microsoft Copilot** (Microsoft)
4. **Claude** (Anthropic)

---

## 🚀 Key Functional Modules

| Module | Route | Key Capabilities |
|---|---|---|
| **Executive Dashboard** | `/` | Macro metrics, verification rate, overview cards, relative capabilities matrix, dated research findings. |
| **Competitor Explorer** | `/competitors` | Detailed verified profiles, core model portfolios, pricing tiers, modalities, privacy policies, inline editable notes. |
| **Comparison Workspace** | `/compare` | Configurable 2-to-4 model side-by-side matrix, category filters, text search, "Show differences only", direct citation drawer. |
| **Evidence Library** | `/evidence` | Registry of primary vendor documentation with verification statuses (Verified, Needs Review, Outdated), manual claim/source entry. |
| **Benchmark Lab** | `/benchmarks` | Repeatable prompt evaluation tasks across 8 categories with 1–5 rubric scoring (Accuracy, Relevance, Clarity, Instruction Following, Sourcing, Completion). |
| **SWOT Analysis** | `/swot` | 4-quadrant strategic matrix (Strengths, Weaknesses, Opportunities, Threats) with confidence ratings and cross-competitor views. |
| **Recommendation Engine** | `/recommend` | Multi-criteria task matching (Coding, Student Learning, Research, Writing, Long Documents, Office) with transparent trade-offs and priority weighting. |
| **Report Builder & PDF Export** | `/reports/builder` | Modular dossier generator with cover page, executive summary, methodology, profiles, matrix, benchmarks, SWOT, and publication-grade PDF print stylesheet. |
| **Saved Reports Repository** | `/reports` | Persistent local archive to reopen, duplicate, re-export, and manage intelligence dossiers. |
| **Methodology & Settings** | `/methodology` | Mathematical rubric specifications, primary source audit policies, privacy terms, demo mode controls, and seed data reset. |

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.6 (Strict Mode)
- **Styling:** Tailwind CSS with custom enterprise navy theme (`#0B132B`, `#1C2541`)
- **Icons:** Lucide React
- **Persistence:** LocalStorage (Offline Demonstration Mode) + PostgreSQL / Supabase ready migrations
- **Document Generation:** High-fidelity CSS `@media print` stylesheet with automatic page-break management and PDF output
- **Testing:** Vitest v2.1 (Unit, Rubric Scoring, Recommendation Engine, and Seed Validation tests)

---

## 📦 Quickstart & Local Installation

### Prerequisites
- **Node.js:** v18.17.0+ (Tested on v22.14.0 LTS)
- **Package Manager:** npm or yarn

### 1. Clone & Navigate to Project
```bash
git clone <repository-url>
cd "VCA- project"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The application runs immediately in **Offline Demonstration Mode** with 100% verified seed data.

---

## 🧪 Automated Testing

AI Insight ships with automated test suites verifying mathematical rubric calculations, recommendation ranking logic, and seed data integrity:

```bash
npm test
```

### Verified Test Results (13 of 13 Passing):
```
 ✓ tests/unit/scoring.test.ts (3 tests)
 ✓ tests/unit/recommender.test.ts (4 tests)
 ✓ tests/unit/seed_validation.test.ts (6 tests)

Test Files  3 passed (3)
     Tests  13 passed (13)
```

---

## 🗄️ Relational Database Schema & Supabase Setup

For production deployments with multi-user authentication and cloud persistence, full PostgreSQL DDL and Row Level Security (RLS) migrations are provided in `supabase/migrations/20260225_initial_schema.sql`.

### Tables Included:
1. `competitors` — Provider profiles, core models, pricing plans, and privacy metadata.
2. `sources` — Registered primary vendor documentation URLs, publishers, and audit dates.
3. `capabilities` — Granular capability claims linked to primary sources with verification status.
4. `benchmark_tasks` — Standard and custom prompt specifications with expected criteria.
5. `benchmark_results` — Scored evaluations with 6-dimension rubric scores and evaluator notes.
6. `swot_items` — Categorized SWOT entries with confidence levels and empirical flags.
7. `reports` — Saved report configurations and section selections with user ownership.

To connect your Supabase instance, create `.env.local` using `.env.example`:
```bash
cp .env.example .env.local
```
Provide your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

---

## 🔒 Security & Privacy Guarantees

1. **Zero Client-Side Secret Leakage:** Provider API keys (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_AI_API_KEY`) are restricted exclusively to server-side execution. No keys are bundled into browser JavaScript.
2. **Local Storage Isolation:** In Demonstration Mode, all custom benchmark tasks, notes, and reports persist exclusively within the user's browser `localStorage`.
3. **No Fabricated Data:** Default capability claims and pricing information originate from verified primary vendor sources checked within 90 days. Unconfirmed metrics are explicitly marked as `Unverified`.

---

## 📄 License
MIT License. Developed for objective AI software comparison, competitor research, and decision intelligence.
