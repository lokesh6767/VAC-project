'use client';

import { useState, useEffect } from 'react';
import {
  Competitor,
  CapabilityClaim,
  EvidenceSource,
  BenchmarkTask,
  BenchmarkResult,
  SwotItem,
  ReportConfig,
  VerificationStatus,
} from '../types';
import { SEED_COMPETITORS } from '../seed/competitors';
import { SEED_CAPABILITIES } from '../seed/capabilities';
import { SEED_EVIDENCE_SOURCES } from '../seed/evidence';
import { SEED_BENCHMARK_TASKS, SEED_BENCHMARK_RESULTS } from '../seed/benchmarks';
import { SEED_SWOT_ITEMS } from '../seed/swot';

const STORAGE_KEYS = {
  COMPETITORS: 'ai_insight_competitors_v1',
  CAPABILITIES: 'ai_insight_capabilities_v1',
  EVIDENCE: 'ai_insight_evidence_v1',
  TASKS: 'ai_insight_tasks_v1',
  RESULTS: 'ai_insight_results_v1',
  SWOT: 'ai_insight_swot_v1',
  REPORTS: 'ai_insight_reports_v1',
};

// Seed default sample report
const DEFAULT_SAVED_REPORTS: ReportConfig[] = [
  {
    id: 'rep-default-q1-2026',
    title: 'Enterprise AI Assistant Comparative Intelligence Dossier',
    audience: 'Executive Engineering Leadership & Product Strategy',
    author: 'Principal AI Intelligence Specialist',
    organization: 'AI Insight Research Labs',
    reportDate: '2026-02-25',
    selectedCompetitorIds: ['chatgpt', 'gemini', 'copilot', 'claude'],
    sections: {
      executiveSummary: true,
      scopeMethodology: true,
      competitorProfiles: true,
      comparisonMatrix: true,
      benchmarkFindings: true,
      swotAnalysis: true,
      recommendations: true,
      limitations: true,
      references: true,
    },
    recommendationTask: 'coding_dev',
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-02-25T14:30:00Z',
  },
];

export interface AppStore {
  competitors: Competitor[];
  capabilities: CapabilityClaim[];
  evidenceSources: EvidenceSource[];
  benchmarkTasks: BenchmarkTask[];
  benchmarkResults: BenchmarkResult[];
  swotItems: SwotItem[];
  reports: ReportConfig[];
  isLoaded: boolean;

  // Actions
  updateCompetitorNotes: (id: string, notes: string) => void;
  updateCapabilityStatus: (id: string, status: VerificationStatus, reviewerNotes?: string) => void;
  addCapabilityClaim: (claim: Omit<CapabilityClaim, 'id' | 'lastCheckedDate'>) => void;
  addEvidenceSource: (source: Omit<EvidenceSource, 'id' | 'lastCheckedDate'>) => void;
  addBenchmarkTask: (task: Omit<BenchmarkTask, 'id' | 'createdAt'>) => void;
  addBenchmarkResult: (result: Omit<BenchmarkResult, 'id' | 'testDate'>) => void;
  addSwotItem: (item: Omit<SwotItem, 'id' | 'lastReviewedDate'>) => void;
  deleteSwotItem: (id: string) => void;
  saveReport: (report: Omit<ReportConfig, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateReport: (id: string, updates: Partial<ReportConfig>) => void;
  duplicateReport: (id: string) => string;
  deleteReport: (id: string) => void;
  resetToDefaultSeed: () => void;
}

export function useAppStore(): AppStore {
  const [isLoaded, setIsLoaded] = useState(false);
  const [competitors, setCompetitors] = useState<Competitor[]>(SEED_COMPETITORS);
  const [capabilities, setCapabilities] = useState<CapabilityClaim[]>(SEED_CAPABILITIES);
  const [evidenceSources, setEvidenceSources] = useState<EvidenceSource[]>(SEED_EVIDENCE_SOURCES);
  const [benchmarkTasks, setBenchmarkTasks] = useState<BenchmarkTask[]>(SEED_BENCHMARK_TASKS);
  const [benchmarkResults, setBenchmarkResults] = useState<BenchmarkResult[]>(SEED_BENCHMARK_RESULTS);
  const [swotItems, setSwotItems] = useState<SwotItem[]>(SEED_SWOT_ITEMS);
  const [reports, setReports] = useState<ReportConfig[]>(DEFAULT_SAVED_REPORTS);

  // Initialize from LocalStorage on mount
  useEffect(() => {
    try {
      const storedComp = localStorage.getItem(STORAGE_KEYS.COMPETITORS);
      if (storedComp) setCompetitors(JSON.parse(storedComp));

      const storedCap = localStorage.getItem(STORAGE_KEYS.CAPABILITIES);
      if (storedCap) setCapabilities(JSON.parse(storedCap));

      const storedEvidence = localStorage.getItem(STORAGE_KEYS.EVIDENCE);
      if (storedEvidence) setEvidenceSources(JSON.parse(storedEvidence));

      const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (storedTasks) setBenchmarkTasks(JSON.parse(storedTasks));

      const storedResults = localStorage.getItem(STORAGE_KEYS.RESULTS);
      if (storedResults) setBenchmarkResults(JSON.parse(storedResults));

      const storedSwot = localStorage.getItem(STORAGE_KEYS.SWOT);
      if (storedSwot) setSwotItems(JSON.parse(storedSwot));

      const storedReports = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (storedReports) setReports(JSON.parse(storedReports));
    } catch (e) {
      console.warn('LocalStorage unavailable or parse error; using seed state.', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync state changes to LocalStorage helper
  const saveKey = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const updateCompetitorNotes = (id: string, notes: string) => {
    setCompetitors((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, notes } : c));
      saveKey(STORAGE_KEYS.COMPETITORS, next);
      return next;
    });
  };

  const updateCapabilityStatus = (id: string, status: VerificationStatus, reviewerNotes?: string) => {
    setCapabilities((prev) => {
      const next = prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              reviewerNotes: reviewerNotes ?? c.reviewerNotes,
              lastCheckedDate: new Date().toISOString().split('T')[0],
            }
          : c
      );
      saveKey(STORAGE_KEYS.CAPABILITIES, next);
      return next;
    });
  };

  const addCapabilityClaim = (claim: Omit<CapabilityClaim, 'id' | 'lastCheckedDate'>) => {
    const newClaim: CapabilityClaim = {
      ...claim,
      id: `cap-custom-${Date.now()}`,
      lastCheckedDate: new Date().toISOString().split('T')[0],
    };
    setCapabilities((prev) => {
      const next = [newClaim, ...prev];
      saveKey(STORAGE_KEYS.CAPABILITIES, next);
      return next;
    });
  };

  const addEvidenceSource = (source: Omit<EvidenceSource, 'id' | 'lastCheckedDate'>) => {
    const newSource: EvidenceSource = {
      ...source,
      id: `src-custom-${Date.now()}`,
      lastCheckedDate: new Date().toISOString().split('T')[0],
    };
    setEvidenceSources((prev) => {
      const next = [newSource, ...prev];
      saveKey(STORAGE_KEYS.EVIDENCE, next);
      return next;
    });
  };

  const addBenchmarkTask = (task: Omit<BenchmarkTask, 'id' | 'createdAt'>) => {
    const newTask: BenchmarkTask = {
      ...task,
      id: `task-custom-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBenchmarkTasks((prev) => {
      const next = [newTask, ...prev];
      saveKey(STORAGE_KEYS.TASKS, next);
      return next;
    });
  };

  const addBenchmarkResult = (result: Omit<BenchmarkResult, 'id' | 'testDate'>) => {
    const newResult: BenchmarkResult = {
      ...result,
      id: `res-custom-${Date.now()}`,
      testDate: new Date().toISOString().split('T')[0],
    };
    setBenchmarkResults((prev) => {
      const next = [newResult, ...prev];
      saveKey(STORAGE_KEYS.RESULTS, next);
      return next;
    });
  };

  const addSwotItem = (item: Omit<SwotItem, 'id' | 'lastReviewedDate'>) => {
    const newItem: SwotItem = {
      ...item,
      id: `swot-custom-${Date.now()}`,
      lastReviewedDate: new Date().toISOString().split('T')[0],
    };
    setSwotItems((prev) => {
      const next = [newItem, ...prev];
      saveKey(STORAGE_KEYS.SWOT, next);
      return next;
    });
  };

  const deleteSwotItem = (id: string) => {
    setSwotItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      saveKey(STORAGE_KEYS.SWOT, next);
      return next;
    });
  };

  const saveReport = (report: Omit<ReportConfig, 'id' | 'createdAt' | 'updatedAt'>): string => {
    const id = `rep-${Date.now()}`;
    const newReport: ReportConfig = {
      ...report,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setReports((prev) => {
      const next = [newReport, ...prev];
      saveKey(STORAGE_KEYS.REPORTS, next);
      return next;
    });
    return id;
  };

  const updateReport = (id: string, updates: Partial<ReportConfig>) => {
    setReports((prev) => {
      const next = prev.map((r) =>
        r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
      );
      saveKey(STORAGE_KEYS.REPORTS, next);
      return next;
    });
  };

  const duplicateReport = (id: string): string => {
    const target = reports.find((r) => r.id === id);
    if (!target) return '';
    const newId = `rep-${Date.now()}`;
    const duplicated: ReportConfig = {
      ...target,
      id: newId,
      title: `${target.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setReports((prev) => {
      const next = [duplicated, ...prev];
      saveKey(STORAGE_KEYS.REPORTS, next);
      return next;
    });
    return newId;
  };

  const deleteReport = (id: string) => {
    setReports((prev) => {
      const next = prev.filter((r) => r.id !== id);
      saveKey(STORAGE_KEYS.REPORTS, next);
      return next;
    });
  };

  const resetToDefaultSeed = () => {
    localStorage.removeItem(STORAGE_KEYS.COMPETITORS);
    localStorage.removeItem(STORAGE_KEYS.CAPABILITIES);
    localStorage.removeItem(STORAGE_KEYS.EVIDENCE);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.RESULTS);
    localStorage.removeItem(STORAGE_KEYS.SWOT);
    localStorage.removeItem(STORAGE_KEYS.REPORTS);

    setCompetitors(SEED_COMPETITORS);
    setCapabilities(SEED_CAPABILITIES);
    setEvidenceSources(SEED_EVIDENCE_SOURCES);
    setBenchmarkTasks(SEED_BENCHMARK_TASKS);
    setBenchmarkResults(SEED_BENCHMARK_RESULTS);
    setSwotItems(SEED_SWOT_ITEMS);
    setReports(DEFAULT_SAVED_REPORTS);
  };

  return {
    competitors,
    capabilities,
    evidenceSources,
    benchmarkTasks,
    benchmarkResults,
    swotItems,
    reports,
    isLoaded,
    updateCompetitorNotes,
    updateCapabilityStatus,
    addCapabilityClaim,
    addEvidenceSource,
    addBenchmarkTask,
    addBenchmarkResult,
    addSwotItem,
    deleteSwotItem,
    saveReport,
    updateReport,
    duplicateReport,
    deleteReport,
    resetToDefaultSeed,
  };
}
