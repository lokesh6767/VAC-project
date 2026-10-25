import { describe, it, expect } from 'vitest';
import {
  calculateWeightedRubricScore,
  computeCompetitorBenchmarkStats,
  RUBRIC_CRITERIA_WEIGHTS,
} from '../../src/lib/scoring/rubric';
import { BenchmarkResult } from '../../src/lib/types';

describe('Rubric Scoring Engine', () => {
  it('correctly calculates weighted arithmetic score from complete rubric', () => {
    // Rubric: Accuracy (25%), Relevance (15%), Clarity (15%), Instruction (20%), Sourcing (10%), Completion (15%)
    // All 5.0 -> should yield 5.0
    const perfectScore = calculateWeightedRubricScore({
      accuracy: 5,
      relevance: 5,
      clarity: 5,
      instructionFollowing: 5,
      sourceReliability: 5,
      taskCompletion: 5,
    });
    expect(perfectScore).toBe(5.0);

    // Varied scores
    // Acc=4 (1.0), Rel=4 (0.6), Clar=5 (0.75), Inst=3 (0.6), Source=4 (0.4), Comp=4 (0.6)
    // Sum = 1.0 + 0.6 + 0.75 + 0.6 + 0.4 + 0.6 = 3.95
    const variedScore = calculateWeightedRubricScore({
      accuracy: 4,
      relevance: 4,
      clarity: 5,
      instructionFollowing: 3,
      sourceReliability: 4,
      taskCompletion: 4,
    });
    expect(variedScore).toBe(3.95);
  });

  it('handles missing criteria explicitly without zero imputation', () => {
    // If sourceReliability is not applicable / missing, total weight is 0.90
    // Acc=5 (1.25), Rel=5 (0.75), Clar=5 (0.75), Inst=5 (1.0), Comp=5 (0.75)
    // Sum = 4.5 / 0.9 = 5.0
    const partialScore = calculateWeightedRubricScore({
      accuracy: 5,
      relevance: 5,
      clarity: 5,
      instructionFollowing: 5,
      taskCompletion: 5,
      // sourceReliability omitted
    });
    expect(partialScore).toBe(5.0);
  });

  it('aggregates competitor benchmark runs accurately', () => {
    const mockRuns: BenchmarkResult[] = [
      {
        id: 'r1',
        taskId: 't1',
        competitorId: 'claude',
        modelVersion: 'Claude 3.5 Sonnet',
        testDate: '2026-02-10',
        testMethod: 'peer_review',
        outputSample: 'sample 1',
        rubricScores: {
          accuracy: 5,
          relevance: 5,
          clarity: 5,
          instructionFollowing: 5,
          sourceReliability: 5,
          taskCompletion: 5,
        },
        overallScore: 5.0,
        evaluatorNotes: 'Notes 1',
        isVerified: true,
      },
      {
        id: 'r2',
        taskId: 't2',
        competitorId: 'claude',
        modelVersion: 'Claude 3.5 Sonnet',
        testDate: '2026-02-12',
        testMethod: 'peer_review',
        outputSample: 'sample 2',
        rubricScores: {
          accuracy: 4,
          relevance: 4,
          clarity: 5,
          instructionFollowing: 4,
          sourceReliability: 4,
          taskCompletion: 4,
        },
        overallScore: 4.15,
        evaluatorNotes: 'Notes 2',
        isVerified: true,
      },
    ];

    const stats = computeCompetitorBenchmarkStats('claude', mockRuns);
    expect(stats.totalEvaluations).toBe(2);
    expect(stats.averageScore).toBe(4.58);
    expect(stats.dimensionAverages.accuracy).toBe(4.5);
    expect(stats.dimensionAverages.clarity).toBe(5.0);
  });
});
