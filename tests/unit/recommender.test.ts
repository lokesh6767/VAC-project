import { describe, it, expect } from 'vitest';
import { generateRecommendations, TASK_PROFILES } from '../../src/lib/scoring/recommender';
import { SEED_COMPETITORS } from '../../src/lib/seed/competitors';
import { SEED_CAPABILITIES } from '../../src/lib/seed/capabilities';
import { SEED_BENCHMARK_RESULTS } from '../../src/lib/seed/benchmarks';

describe('Recommendation Engine', () => {
  it('correctly ranks Claude as top match for software engineering workflow', () => {
    const task = TASK_PROFILES.find((t) => t.id === 'coding_dev')!;
    const recs = generateRecommendations(
      task.id,
      task.defaultWeights,
      SEED_COMPETITORS,
      SEED_CAPABILITIES,
      SEED_BENCHMARK_RESULTS
    );

    expect(recs.length).toBe(4);
    expect(recs[0].competitor.id).toBe('claude');
    expect(recs[0].matchScore).toBeGreaterThan(80);
    expect(recs[0].decisiveFactors.length).toBeGreaterThan(0);
  });

  it('correctly ranks Gemini as top match for massive document and multimodal ingestion', () => {
    const task = TASK_PROFILES.find((t) => t.id === 'document_analysis')!;
    const recs = generateRecommendations(
      task.id,
      task.defaultWeights,
      SEED_COMPETITORS,
      SEED_CAPABILITIES,
      SEED_BENCHMARK_RESULTS
    );

    expect(recs[0].competitor.id).toBe('gemini');
    expect(recs[0].decisiveFactors.some((f) => f.includes('context window'))).toBe(true);
  });

  it('correctly ranks Copilot as top match for enterprise office productivity', () => {
    const task = TASK_PROFILES.find((t) => t.id === 'enterprise_office')!;
    const recs = generateRecommendations(
      task.id,
      task.defaultWeights,
      SEED_COMPETITORS,
      SEED_CAPABILITIES,
      SEED_BENCHMARK_RESULTS
    );

    expect(recs[0].competitor.id).toBe('copilot');
    expect(recs[0].decisiveFactors.some((f) => f.includes('Microsoft 365'))).toBe(true);
  });

  it('provides explicit trade-offs and residual limitations for all competitors', () => {
    const task = TASK_PROFILES[0];
    const recs = generateRecommendations(
      task.id,
      task.defaultWeights,
      SEED_COMPETITORS,
      SEED_CAPABILITIES,
      SEED_BENCHMARK_RESULTS
    );

    recs.forEach((rec) => {
      expect(rec.keyAdvantages.length).toBeGreaterThan(0);
      expect(rec.criticalLimitations.length).toBeGreaterThan(0);
      expect(rec.rationale.length).toBeGreaterThan(20);
    });
  });
});
