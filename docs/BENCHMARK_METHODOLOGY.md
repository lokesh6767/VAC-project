# AI Insight — Benchmark Methodology & Scoring Rubric

## 1. Testing Framework Overview
The Benchmark Lab provides a transparent, repeatable framework for evaluating AI assistants on identical tasks under controlled conditions.

## 2. Standard Benchmark Categories
1. **Student Learning & Concept Explanation:** Evaluates ability to break down complex topics (e.g. quantum tunneling, supply/demand curves) using analogies, progressive depth, and clear pedagogical pacing.
2. **Programming & Debugging:** Tests code generation, syntax correctness, algorithmic complexity, error diagnosis, and edge-case handling across Python, TypeScript, and SQL.
3. **Mathematical Problem-Solving:** Measures multi-step deductive reasoning, algebraic manipulation, proof verification, and resistance to arithmetic slips.
4. **Research & Source Verification:** Evaluates factual accuracy, resistance to hallucinations, citation formatting, and synthesis of conflicting viewpoints.
5. **Document Analysis & Synthesis:** Tests extraction of key facts, contract clause identification, tabular data parsing, and executive summarization from long context inputs.
6. **Writing & Summarization:** Evaluates stylistic versatility, conciseness, tone modulation, and structural coherence without repetitive filler.
7. **Instruction Following & Constraint Adherence:** Evaluates strict compliance with negative constraints (e.g., "do not use the letter 'e'", "output only valid JSON with keys x, y, z").
8. **Multimodal Interpretation:** Evaluates diagram comprehension, UI screenshot analysis, optical character recognition (OCR), and visual reasoning.

## 3. Rubric Dimensions (1–5 Scale)
Each task output is evaluated across six discrete criteria:
- **Accuracy (Weight: 25%):** Correctness of facts, logic, syntax, calculations, and freedom from fabricated claims.
- **Relevance (Weight: 15%):** Direct responsiveness to the user's intent without wandering or irrelevant padding.
- **Clarity (Weight: 15%):** Structural layout, readability, appropriate terminology, and formatting polish.
- **Instruction Following (Weight: 20%):** Strict adherence to format, length limits, schema constraints, and edge rules.
- **Source Reliability (Weight: 10%):** Accuracy of citations, verification of claims, and avoidance of hallucinated links.
- **Task Completion (Weight: 15%):** Wholeness and immediate usability of the deliverable without requiring secondary prompting.

### Scoring Level Definitions
- **5 (Exemplary):** Flawless execution; exceeds criteria; zero errors; immediately production-ready.
- **4 (Strong):** High quality with minor cosmetic or inconsequential omissions; logically sound.
- **3 (Satisfactory):** Generally useful but has noticeable limitations, minor syntax bugs, or requires manual editing.
- **2 (Substantial Errors):** Contains significant hallucinations, syntax errors, or missed core instructions; needs major rework.
- **1 (Failed):** Completely incorrect, catastrophic hallucination, refused valid task, or corrupted format.

## 4. Aggregate Score Calculation
Overall score $S$ is computed via weighted arithmetic mean:
$$S = \frac{\sum_{i=1}^{n} w_i \cdot s_i}{\sum_{i=1}^{n} w_i}$$
Where $w_i$ represents the criterion weight and $s_i$ represents the 1–5 score.
Missing criteria or incomplete runs are explicitly flagged and excluded from the numerator/denominator; they are NEVER imputed as zero.

**Scientific Disclaimer:** Benchmark scores reflect performance on specific recorded test suites and do not imply universal, immutable AI intelligence.
