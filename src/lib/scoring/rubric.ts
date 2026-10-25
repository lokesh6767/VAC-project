import { RubricScores, BenchmarkResult } from '../types';

export const RUBRIC_CRITERIA_WEIGHTS = {
  accuracy: 0.25,
  relevance: 0.15,
  clarity: 0.15,
  instructionFollowing: 0.20,
  sourceReliability: 0.10,
  taskCompletion: 0.15,
} as const;

/**
 * Calculates weighted arithmetic score from discrete 1-5 rubric dimensions.
 * Treats missing scores explicitly without zero imputation.
 */
export function calculateWeightedRubricScore(scores: Partial<RubricScores>): number {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const [criterion, weight] of Object.entries(RUBRIC_CRITERIA_WEIGHTS)) {
    const scoreVal = scores[criterion as keyof RubricScores];
    if (typeof scoreVal === 'number' && scoreVal >= 1 && scoreVal <= 5) {
      weightedSum += scoreVal * weight;
      totalWeight += weight;
    }
  }

  if (totalWeight === 0) return 0;
  const finalScore = weightedSum / totalWeight;
  return Math.round(finalScore * 100) / 100;
}

/**
 * Computes average benchmark performance for a competitor across all recorded runs.
 */
export function computeCompetitorBenchmarkStats(
  competitorId: string,
  results: BenchmarkResult[]
): {
  averageScore: number;
  totalEvaluations: number;
  dimensionAverages: Record<keyof RubricScores, number>;
} {
  const competitorRuns = results.filter((r) => r.competitorId === competitorId);
  if (competitorRuns.length === 0) {
    return {
      averageScore: 0,
      totalEvaluations: 0,
      dimensionAverages: {
        accuracy: 0,
        relevance: 0,
        clarity: 0,
        instructionFollowing: 0,
        sourceReliability: 0,
        taskCompletion: 0,
      },
    };
  }

  const dimensionTotals: Record<keyof RubricScores, number> = {
    accuracy: 0,
    relevance: 0,
    clarity: 0,
    instructionFollowing: 0,
    sourceReliability: 0,
    taskCompletion: 0,
  };

  let totalScoreSum = 0;

  competitorRuns.forEach((run) => {
    totalScoreSum += run.overallScore;
    dimensionTotals.accuracy += run.rubricScores.accuracy;
    dimensionTotals.relevance += run.rubricScores.relevance;
    dimensionTotals.clarity += run.rubricScores.clarity;
    dimensionTotals.instructionFollowing += run.rubricScores.instructionFollowing;
    dimensionTotals.sourceReliability += run.rubricScores.sourceReliability;
    dimensionTotals.taskCompletion += run.rubricScores.taskCompletion;
  });

  const count = competitorRuns.length;
  return {
    averageScore: Math.round((totalScoreSum / count) * 100) / 100,
    totalEvaluations: count,
    dimensionAverages: {
      accuracy: Math.round((dimensionTotals.accuracy / count) * 10) / 10,
      relevance: Math.round((dimensionTotals.relevance / count) * 10) / 10,
      clarity: Math.round((dimensionTotals.clarity / count) * 10) / 10,
      instructionFollowing: Math.round((dimensionTotals.instructionFollowing / count) * 10) / 10,
      sourceReliability: Math.round((dimensionTotals.sourceReliability / count) * 10) / 10,
      taskCompletion: Math.round((dimensionTotals.taskCompletion / count) * 10) / 10,
    },
  };
}
