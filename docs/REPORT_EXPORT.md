# AI Insight — Report Builder & PDF Export Specification

## 1. Overview
The Report Builder transforms filtered competitor profiles, empirical comparison matrices, 1–5 rubric benchmark results, and strategic SWOT observations into publication-quality intelligence dossiers.

## 2. Dossier Section Architecture
A fully configured report compiles the following sections in strict sequence:
1. **Cover Page:**
   - Platform branding (`AI Insight — Competitive Intelligence`)
   - Document Title (e.g., "Enterprise Generative AI Evaluation Q1 2026")
   - Target Audience & Author Metadata (e.g. Prepared for: Engineering Leadership; Author: AI Research Group)
   - Publication Timestamp & Verification Badge
2. **Executive Summary:** High-level comparative overview, core strengths of ChatGPT, Gemini, Copilot, and Claude, and key strategic takeaways.
3. **Scope & Methodology:** Explanation of data collection, verification requirements (90-day review cycle), benchmark criteria, and rubrics.
4. **Competitor Detailed Profiles:** Standardized dossiers detailing core models, context windows, pricing tiers, API availability, and compliance certifications.
5. **Side-by-Side Comparison Matrix:** High-density tabular layout comparing capabilities across reasoning, code, math, research, multimodal, and privacy.
6. **Empirical Benchmark Findings:** Summary tables and breakdown charts across evaluated test categories with 1–5 rubric scores.
7. **Strategic SWOT Quadrants:** Consolidated SWOT grids highlighting internal capabilities and external risks.
8. **Task-Specific Recommendations:** Recommended AI assistant for specific organizational needs (e.g. Coding vs. Student Learning vs. Research) with clear justification and residual limitations.
9. **Ethical Guidelines & Responsible Use:** Enterprise privacy policies, data opt-out notices, and responsible disclosure.
10. **Evidence & Complete References:** Academic-style bibliography listing full primary URLs, publishers, and verification dates.

## 3. High-Fidelity Print & PDF Stylesheet
- Page Break Management: `@media print { .page-break-before { break-before: page; } .no-break-inside { break-inside: avoid; } }`
- Page Headers & Footers: Running document title and page numbering ("Page X of Y").
- Clean Typography: Crisp borders, high-contrast monochrome/navy print palette, removal of interactive UI chrome (navbars, buttons, sliders).
- Print-to-PDF Fallback: Direct invocation of `window.print()` formatted for A4 and US Letter layouts, ensuring zero client-side dependencies fail.
