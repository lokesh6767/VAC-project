# AI Insight — API Contracts & Provider Adapter Specification

## 1. Overview
AI Insight is architected with a decoupled service boundary separating frontend presentation from data management and external AI model providers.

## 2. Core Service Contracts

### 2.1 Competitor & Capability Query Service
```typescript
interface CompetitorService {
  getCompetitors(): Promise<Competitor[]>;
  getCompetitorById(id: string): Promise<Competitor | null>;
  updateCompetitorNotes(id: string, notes: string): Promise<void>;
  getCapabilities(filter?: { competitorId?: string; category?: string; status?: VerificationStatus }): Promise<CapabilityClaim[]>;
  updateCapabilityStatus(id: string, status: VerificationStatus, reviewerNotes?: string): Promise<void>;
  createCapabilityClaim(claim: Omit<CapabilityClaim, 'id' | 'lastCheckedDate'>): Promise<CapabilityClaim>;
}
```

### 2.2 Evidence & Source Registry Service
```typescript
interface EvidenceService {
  getSources(statusFilter?: VerificationStatus): Promise<EvidenceSource[]>;
  getSourceById(id: string): Promise<EvidenceSource | null>;
  createSource(source: Omit<EvidenceSource, 'id' | 'lastCheckedDate'>): Promise<EvidenceSource>;
  verifySource(id: string, status: VerificationStatus, auditNotes?: string): Promise<void>;
}
```

### 2.3 Benchmark Scoring & Execution Service
```typescript
interface BenchmarkService {
  getTasks(category?: BenchmarkCategory): Promise<BenchmarkTask[]>;
  createTask(task: Omit<BenchmarkTask, 'id' | 'createdAt'>): Promise<BenchmarkTask>;
  recordResult(result: Omit<BenchmarkResult, 'id' | 'testDate'>): Promise<BenchmarkResult>;
  calculateRubricScore(scores: RubricScores): number;
}
```

### 2.4 Recommendation Engine Service
```typescript
interface RecommendationService {
  generateFitRecommendations(
    taskId: string,
    weights: RecommendationPriority,
    competitors: Competitor[],
    capabilities: CapabilityClaim[],
    benchmarkResults: BenchmarkResult[]
  ): RecommendationMatch[];
}
```

### 2.5 Report Generation & Persistence Service
```typescript
interface ReportService {
  getReports(): Promise<ReportConfig[]>;
  saveReport(report: Omit<ReportConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>;
  updateReport(id: string, updates: Partial<ReportConfig>): Promise<void>;
  duplicateReport(id: string): Promise<string>;
  deleteReport(id: string): Promise<void>;
}
```

## 3. Optional Provider Adapter Interface (Server-Side)
When users supply API keys in `.env.local`, optional live evaluation adapters execute behind server-side routes:

```typescript
export interface AIProviderAdapter {
  providerId: 'openai' | 'google' | 'microsoft' | 'anthropic';
  sendPrompt(params: {
    prompt: string;
    modelName: string;
    temperature?: number;
    maxTokens?: number;
  }): Promise<{
    output: string;
    tokensUsed: { prompt: number; completion: number };
    latencyMs: number;
    error?: string;
  }>;
}
```
*Note: In accordance with security requirements, provider API calls execute server-side only; API keys are never bundled into client browser code.*
