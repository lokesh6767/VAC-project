import { Competitor, CapabilityClaim, BenchmarkResult, RecommendationPriority } from '../types';

export interface TaskProfile {
  id: string;
  name: string;
  description: string;
  defaultWeights: RecommendationPriority;
  criticalCapabilityCategories: string[];
}

export const TASK_PROFILES: TaskProfile[] = [
  {
    id: 'coding_dev',
    name: 'Software Engineering & Architecture',
    description: 'Writing full-stack code, debugging intricate race conditions, refactoring, and test generation.',
    defaultWeights: {
      accuracy: 5,
      cost: 3,
      easeOfUse: 4,
      privacy: 4,
      integrations: 5,
      speed: 4,
      fileSupport: 4,
    },
    criticalCapabilityCategories: ['coding_debugging', 'general_reasoning', 'developer_api'],
  },
  {
    id: 'student_learning',
    name: 'Student Learning & Concept Explanation',
    description: 'Pedagogical breakdowns, intuitive analogies, step-by-step math, and study assistance.',
    defaultWeights: {
      accuracy: 4,
      cost: 5,
      easeOfUse: 5,
      privacy: 3,
      integrations: 2,
      speed: 4,
      fileSupport: 4,
    },
    criticalCapabilityCategories: ['general_reasoning', 'math_logic', 'pricing_limits'],
  },
  {
    id: 'academic_research',
    name: 'Academic Research & Literature Review',
    description: 'Factual source synthesis, citation checking, PDF extraction, and comparative analysis.',
    defaultWeights: {
      accuracy: 5,
      cost: 3,
      easeOfUse: 4,
      privacy: 4,
      integrations: 3,
      speed: 3,
      fileSupport: 5,
    },
    criticalCapabilityCategories: ['research_citations', 'document_analysis', 'context_window'],
  },
  {
    id: 'writing_content',
    name: 'Prose Writing, Editorial & Synthesis',
    description: 'Drafting essays, marketing copy, executive summaries, and nuanced prose without robotic clichés.',
    defaultWeights: {
      accuracy: 4,
      cost: 4,
      easeOfUse: 5,
      privacy: 3,
      integrations: 3,
      speed: 4,
      fileSupport: 3,
    },
    criticalCapabilityCategories: ['general_reasoning', 'document_analysis'],
  },
  {
    id: 'document_analysis',
    name: 'Massive Document & Multimodal Ingestion',
    description: 'Analyzing 500+ page PDFs, financial prospectuses, technical manuals, audio, and video.',
    defaultWeights: {
      accuracy: 4,
      cost: 3,
      easeOfUse: 4,
      privacy: 4,
      integrations: 4,
      speed: 4,
      fileSupport: 5,
    },
    criticalCapabilityCategories: ['context_window', 'multimodal', 'document_analysis'],
  },
  {
    id: 'enterprise_office',
    name: 'Enterprise Productivity & Office Ecosystem',
    description: 'Spreadsheet formulas in Excel, meeting minutes in Teams, email drafting, and tenant compliance.',
    defaultWeights: {
      accuracy: 4,
      cost: 2,
      easeOfUse: 4,
      privacy: 5,
      integrations: 5,
      speed: 4,
      fileSupport: 4,
    },
    criticalCapabilityCategories: ['integrations_ecosystem', 'privacy_security', 'pricing_limits'],
  },
];

export interface RecommendationMatch {
  competitor: Competitor;
  matchScore: number; // 0 - 100
  rank: number;
  decisiveFactors: string[];
  keyAdvantages: string[];
  criticalLimitations: string[];
  missingEvidenceNotice?: string;
  rationale: string;
}

/**
 * Deterministic multi-criteria recommendation engine using verified facts and benchmark evaluations.
 */
export function generateRecommendations(
  taskId: string,
  userWeights: RecommendationPriority,
  competitors: Competitor[],
  capabilities: CapabilityClaim[],
  benchmarkResults: BenchmarkResult[]
): RecommendationMatch[] {
  const task = TASK_PROFILES.find((t) => t.id === taskId) || TASK_PROFILES[0];

  const results: RecommendationMatch[] = competitors.map((competitor) => {
    let score = 50; // baseline
    const decisiveFactors: string[] = [];
    const advantages: string[] = [...competitor.advantages.slice(0, 3)];
    const limitations: string[] = [...competitor.limitations.slice(0, 2)];
    let rationale = '';

    // 1. Task-Specific Affinity
    if (task.id === 'coding_dev') {
      if (competitor.id === 'claude') {
        score += 32;
        decisiveFactors.push('Leading SWE-bench architecture performance & interactive Artifacts');
        rationale = 'Claude 3.5 Sonnet demonstrates industry-leading code synthesis, clean architectural separation, and live React/SVG rendering in Artifacts.';
      } else if (competitor.id === 'chatgpt') {
        score += 26;
        decisiveFactors.push('o1/o3-mini deductive algorithmic problem solving & live Python execution');
        rationale = 'ChatGPT provides exceptional algorithmic reasoning and a native Python execution sandbox for running scripts and data analysis.';
      } else if (competitor.id === 'gemini') {
        score += 18;
        decisiveFactors.push('Massive 1M-2M token window allows ingesting entire multi-file code repositories');
        rationale = 'Gemini excels when you need to drop an entire codebase into context at once to locate race conditions across modules.';
      } else {
        score += 14;
        decisiveFactors.push('Native integration with Microsoft developer tooling');
        rationale = 'Copilot provides convenient integration with Microsoft developer tools and PowerShell scripting.';
      }
    } else if (task.id === 'student_learning') {
      if (competitor.id === 'chatgpt') {
        score += 28;
        decisiveFactors.push('Balanced STEM explanation, step-by-step tutoring, and generous free tier');
        rationale = 'ChatGPT is highly versatile for undergraduate coursework, homework troubleshooting, and interactive concept explanations.';
      } else if (competitor.id === 'claude') {
        score += 26;
        decisiveFactors.push('High pedagogical clarity and patient, nuanced conceptual exposition');
        rationale = 'Claude shines in nuanced, non-robotic conceptual explanations with LaTeX formulas and structured derivations.';
      } else if (competitor.id === 'gemini') {
        score += 24;
        decisiveFactors.push('Google Search grounding, YouTube video explanations, and Google Docs integration');
        rationale = 'Gemini is ideal for students already organized in Google Docs and Drive who want verified search grounding.';
      } else {
        score += 16;
        decisiveFactors.push('Bing search citations and Office app accessibility');
        rationale = 'Copilot provides cited answers backed by Bing search, useful for high school and general study.';
      }
    } else if (task.id === 'document_analysis') {
      if (competitor.id === 'gemini') {
        score += 36;
        decisiveFactors.push('Unrivaled 1M-2M token native context window and multi-hour video/audio ingestion');
        rationale = 'Gemini 1.5/2.0 Pro can ingest massive 1,000-page PDFs, hours of audio, or extensive spreadsheets in a single pass without vector loss.';
      } else if (competitor.id === 'claude') {
        score += 22;
        decisiveFactors.push('200k token context with exceptional needle-in-a-haystack nuance');
        rationale = 'Claude offers 200k tokens with top-tier comprehension of complex contractual clauses and technical documentation.';
      } else if (competitor.id === 'chatgpt') {
        score += 18;
        decisiveFactors.push('Advanced Data Analysis file processing sandbox');
        rationale = 'ChatGPT can parse CSVs and spreadsheets via Python, but is constrained to 128k context.';
      } else {
        score += 16;
        decisiveFactors.push('Direct retrieval over SharePoint and OneDrive enterprise documents');
        rationale = 'Copilot searches corporate documents through Microsoft Graph semantic indexing.';
      }
    } else if (task.id === 'enterprise_office') {
      if (competitor.id === 'copilot') {
        score += 38;
        decisiveFactors.push('Native Microsoft 365 integration (Word, Excel, Teams, Outlook) & Commercial Data Protection');
        rationale = 'Copilot is unbeatable if your enterprise operates on Microsoft 365, automating meeting notes in Teams, email drafting, and Excel modeling.';
      } else if (competitor.id === 'gemini') {
        score += 22;
        decisiveFactors.push('Google Workspace business integration with zero enterprise data training');
        rationale = 'A natural choice for organizations standardizing on Google Workspace, Docs, and Gmail.';
      } else if (competitor.id === 'chatgpt') {
        score += 18;
        decisiveFactors.push('Team/Enterprise shared custom GPT workspaces');
        rationale = 'Strong for agile teams requiring custom GPTs, but lacks native deep Microsoft Office desktop integration.';
      } else {
        score += 16;
        decisiveFactors.push('Enterprise Claude with GitHub syncing and strict privacy guarantees');
        rationale = 'Great for technical teams prioritizing code and legal review, but requires standalone enterprise licensing.';
      }
    } else {
      // General writing / research
      if (competitor.id === 'claude') {
        score += 26;
        decisiveFactors.push('Articulate, natural tone and strict adherence to negative constraints');
        rationale = 'Claude writes without clunky AI tropes, delivering publication-ready prose and well-structured research digests.';
      } else if (competitor.id === 'chatgpt') {
        score += 24;
        decisiveFactors.push('Live SearchGPT web browsing and versatile formatting');
        rationale = 'ChatGPT provides live web browsing and rapid drafting with custom tone controls.';
      } else if (competitor.id === 'gemini') {
        score += 22;
        decisiveFactors.push('Google Search index grounding with Double-Check verification');
        rationale = 'Gemini allows immediate fact-checking against Google Search results.';
      } else {
        score += 16;
        decisiveFactors.push('Direct Bing footnote citations');
        rationale = 'Copilot cites reference websites directly with numbered footnotes.';
      }
    }

    // 2. Adjust for user priority weightings
    // Privacy weighting
    if (userWeights.privacy >= 4) {
      if (competitor.privacyTerms.enterpriseZeroRetention && !competitor.privacyTerms.trainOnUserDataDefault) {
        score += 8;
        decisiveFactors.push('Default zero-retention / no training policy');
      } else if (competitor.privacyTerms.optOutAvailable) {
        score += 2;
      }
    }

    // Cost weighting
    if (userWeights.cost >= 4) {
      const freePlan = competitor.plans.find((p) => p.priceMonthlyUsd === 0);
      if (freePlan) {
        score += 6;
        decisiveFactors.push('Robust, fully featured free tier available');
      }
    }

    // Benchmark empirical bump
    const compRuns = benchmarkResults.filter((r) => r.competitorId === competitor.id);
    if (compRuns.length > 0) {
      const avg = compRuns.reduce((acc, r) => acc + r.overallScore, 0) / compRuns.length;
      if (avg >= 4.5) {
        score += 5;
        decisiveFactors.push(`High verified benchmark score (${avg.toFixed(2)}/5.0 across recorded test runs)`);
      }
    }

    // Clamp score to 99 max
    const finalScore = Math.min(99, Math.max(35, Math.round(score)));

    return {
      competitor,
      matchScore: finalScore,
      rank: 1, // Will be sorted
      decisiveFactors: decisiveFactors.slice(0, 4),
      keyAdvantages: advantages,
      criticalLimitations: limitations,
      rationale,
      missingEvidenceNotice:
        competitor.lastVerifiedDate < '2026-01-01'
          ? 'Notice: Some pricing terms for this competitor are currently due for quarterly re-audit.'
          : undefined,
    };
  });

  // Sort descending by score
  results.sort((a, b) => b.matchScore - a.matchScore);
  results.forEach((item, idx) => {
    item.rank = idx + 1;
  });

  return results;
}
