# AI Insight — Test Plan & Quality Assurance Strategy

## 1. Test Objectives & Scope
The Quality Assurance Plan ensures that AI Insight delivers:
1. Accurate, reproducible mathematical score calculations across all benchmark rubrics.
2. Dynamic comparison filtering with 100% correct difference detection.
3. Resilient state persistence (local storage CRUD operations for reports, notes, benchmarks).
4. Flawless responsive layout and keyboard accessibility (WCAG 2.2 AA).
5. Defect-free, publication-grade print and PDF generation.

## 2. Test Suites
- **Unit Tests (`tests/unit/`):**
  - Scoring calculation formula (weighted arithmetic mean).
  - Missing criteria handling (no zero-score imputation).
  - Recommendation engine algorithm (ranking priority matrix).
  - Difference filter logic (isolating diverging capability rows).
- **Integration Tests (`tests/integration/`):**
  - Storage persistence layer (saving, loading, updating, deleting reports and benchmarks).
  - Data seeding validation (ensuring all 4 competitors and claims conform to schema).
- **Browser End-to-End Verification (`tests/e2e/`):**
  - Navigation between all 10 modules.
  - Interactive comparison competitor toggle (2, 3, 4 assistants).
  - Creating a custom benchmark and scoring via 1-5 sliders.
  - Configuring and exporting an intelligence report.
  - Mobile viewport responsiveness and sidebar drawer operation.
