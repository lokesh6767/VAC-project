# AI Insight — Architecture Specification

## 1. System Topology
AI Insight is structured as a modern, responsive web application delivering zero-latency client-side exploration with robust local persistence, clear separation of concerns, and full readiness for cloud database synchronisation (PostgreSQL/Supabase).

```
+------------------------------------------------------------------------+
|                            USER INTERFACE                              |
|   +----------------------------------------------------------------+   |
|   | Global Navigation Shell (Collapsible Sidebar, Search, Breadcrumbs)|  |
|   +----------------------------------------------------------------+   |
|   | Dashboard | Explorer | Comparison | Benchmarks | SWOT | Reports |   |
+------------------------------------------------------------------------+
                                |
                                v
+------------------------------------------------------------------------+
|                          APPLICATION LAYER                             |
|   +-------------------+  +--------------------+  +------------------+  |
|   | Comparison Engine |  | Benchmark Scoring  |  | Recommendation   |  |
|   | & Diff Filter     |  | 1-5 Rubric Model   |  | Weighted Matcher |  |
|   +-------------------+  +--------------------+  +------------------+  |
|   | Evidence Registry |  | SWOT Matrix Core   |  | PDF Export Engine|  |
+------------------------------------------------------------------------+
                                |
                                v
+------------------------------------------------------------------------+
|                         DATA & STORAGE LAYER                           |
|   +----------------------------------+  +---------------------------+  |
|   | Local Persistence (Indexed/Local)|  | PostgreSQL / Supabase Mig |  |
|   | Offline-Ready Demo Mode          |  | Production Relational DB  |  |
+------------------------------------------------------------------------+
```

## 2. Directory Structure
```
ai-insight/
├── docs/                     # Specifications, methodologies, architecture docs
├── public/                   # Static icons, brand assets, logos
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Dashboard view
│   │   ├── competitors/      # Competitor Explorer & Profiles
│   │   ├── compare/          # Side-by-Side Comparison Workspace
│   │   ├── evidence/         # Evidence Library & Verification Manager
│   │   ├── benchmarks/       # Benchmark Lab & Rubric Testing
│   │   ├── swot/             # Strategic SWOT Analysis
│   │   ├── recommend/        # Task-Oriented Recommendation Engine
│   │   ├── reports/          # Report Builder & Saved Dossiers
│   │   ├── methodology/      # Testing Rubrics & Methodology
│   │   └── settings/         # Preferences, Data Management, API Keys
│   ├── components/
│   │   ├── ui/               # Design system primitives (Button, Card, Badge, etc.)
│   │   ├── layout/           # Sidebar, Header, MobileNav, Breadcrumbs
│   │   ├── competitors/      # Profile components, verified capability cards
│   │   ├── compare/          # Comparison table, difference filter, category chips
│   │   ├── benchmarks/       # Rubric slider, task runner, score breakdown
│   │   ├── swot/             # 4-quadrant interactive grid
│   │   ├── recommend/        # Priority weight sliders, fit breakdown
│   │   └── reports/          # Live report previewer, print layout, PDF generator
│   ├── lib/
│   │   ├── seed/             # Real, verified competitor data & citations
│   │   ├── storage/          # LocalStorage persistence & migration sync
│   │   ├── scoring/          # Mathematical rubric calculation & aggregations
│   │   ├── pdf/              # Print/PDF formatting engine
│   │   └── types.ts          # Core TypeScript domain entities
│   └── styles/
│       └── globals.css       # Tailwind directives & print media queries
├── tests/                    # Unit, integration, and UI test suites
├── supabase/                 # PostgreSQL migrations and seed scripts
└── package.json
```

## 3. Core Architectural Guarantees
1. **Zero Fabricated Evidence:** All default seed records are derived from official OpenAI, Google, Microsoft, and Anthropic developer and product documentation with exact URLs and verification dates.
2. **Transparent Scoring:** All benchmark and recommendation calculations execute deterministically with explicit weighting and zero black-box scoring.
3. **Resilient Local Demonstration Mode:** Full CRUD capability operates completely client-side without requiring database credentials, while migration scripts allow seamless attachment to PostgreSQL.
4. **Publication-Grade Print/PDF Rendering:** High-fidelity print styles cleanly separate pages, avoid orphan tables, format running headers/footers, and produce clean PDF downloads.
