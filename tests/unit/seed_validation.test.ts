import { describe, it, expect } from 'vitest';
import { SEED_COMPETITORS } from '../../src/lib/seed/competitors';
import { SEED_CAPABILITIES } from '../../src/lib/seed/capabilities';
import { SEED_EVIDENCE_SOURCES } from '../../src/lib/seed/evidence';
import { SEED_BENCHMARK_TASKS, SEED_BENCHMARK_RESULTS } from '../../src/lib/seed/benchmarks';
import { SEED_SWOT_ITEMS } from '../../src/lib/seed/swot';

describe('Seed Data Integrity & Empirical Grounding', () => {
  it('contains all four required competitors: ChatGPT, Gemini, Copilot, Claude', () => {
    const ids = SEED_COMPETITORS.map((c) => c.id);
    expect(ids).toContain('chatgpt');
    expect(ids).toContain('gemini');
    expect(ids).toContain('copilot');
    expect(ids).toContain('claude');
    expect(SEED_COMPETITORS.length).toBe(4);
  });

  it('validates each competitor has documented models, plans, and privacy terms', () => {
    SEED_COMPETITORS.forEach((comp) => {
      expect(comp.officialWebsite).toMatch(/^https?:\/\//);
      expect(comp.docsUrl).toMatch(/^https?:\/\//);
      expect(comp.coreModels.length).toBeGreaterThan(0);
      expect(comp.plans.length).toBeGreaterThan(0);
      expect(comp.advantages.length).toBeGreaterThan(0);
      expect(comp.limitations.length).toBeGreaterThan(0);
      expect(comp.privacyTerms.privacyPolicyUrl).toMatch(/^https?:\/\//);
      expect(comp.lastVerifiedDate).toBeDefined();
    });
  });

  it('ensures all capability claims link to valid, registered evidence sources', () => {
    const sourceIds = new Set(SEED_EVIDENCE_SOURCES.map((s) => s.id));
    SEED_CAPABILITIES.forEach((claim) => {
      expect(sourceIds.has(claim.sourceId)).toBe(true);
      expect(claim.featureName.length).toBeGreaterThan(3);
      expect(claim.summary.length).toBeGreaterThan(10);
      expect(claim.details.length).toBeGreaterThan(15);
      expect(['verified', 'needs_review', 'outdated', 'disputed', 'unverified']).toContain(
        claim.status
      );
    });
  });

  it('ensures all primary sources have genuine https vendor links and publishers', () => {
    SEED_EVIDENCE_SOURCES.forEach((source) => {
      expect(source.url.startsWith('https://')).toBe(true);
      expect(source.publisher.length).toBeGreaterThan(1);
      expect(source.lastCheckedDate).toBeDefined();
    });
  });

  it('validates benchmark results follow strict 1-5 rubric bounds and weighting', () => {
    SEED_BENCHMARK_RESULTS.forEach((run) => {
      expect(run.rubricScores.accuracy).toBeGreaterThanOrEqual(1);
      expect(run.rubricScores.accuracy).toBeLessThanOrEqual(5);
      expect(run.rubricScores.instructionFollowing).toBeGreaterThanOrEqual(1);
      expect(run.rubricScores.instructionFollowing).toBeLessThanOrEqual(5);
      expect(run.overallScore).toBeGreaterThanOrEqual(1.0);
      expect(run.overallScore).toBeLessThanOrEqual(5.0);
      expect(run.evaluatorNotes.length).toBeGreaterThan(10);
    });
  });

  it('validates SWOT items contain statement, rationale, and confidence level', () => {
    SEED_SWOT_ITEMS.forEach((item) => {
      expect(['strength', 'weakness', 'opportunity', 'threat']).toContain(item.quadrant);
      expect(item.statement.length).toBeGreaterThan(5);
      expect(item.rationale.length).toBeGreaterThan(15);
      expect(['high', 'medium', 'low']).toContain(item.confidence);
    });
  });
});
