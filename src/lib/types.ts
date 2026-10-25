export type VerificationStatus = 'verified' | 'needs_review' | 'outdated' | 'disputed' | 'unverified';

export type CapabilityCategory =
  | 'general_reasoning'
  | 'coding_debugging'
  | 'math_logic'
  | 'research_citations'
  | 'document_analysis'
  | 'multimodal'
  | 'file_handling'
  | 'context_window'
  | 'integrations_ecosystem'
  | 'developer_api'
  | 'pricing_limits'
  | 'privacy_security';

export interface ModelInfo {
  name: string;
  description: string;
  contextWindow: string;
  releaseDate: string;
  isDefault: boolean;
}

export interface PlanInfo {
  name: string;
  priceMonthlyUsd: number;
  billingPeriod: string;
  highlights: string[];
  usageLimits: string;
}

export interface Competitor {
  id: string; // 'chatgpt' | 'gemini' | 'copilot' | 'claude'
  name: string;
  provider: string;
  badge: string;
  color: string;
  tagline: string;
  description: string;
  officialWebsite: string;
  docsUrl: string;
  status: 'active' | 'archived';
  coreModels: ModelInfo[];
  plans: PlanInfo[];
  modalities: {
    input: string[];
    output: string[];
  };
  supportedUseCases: string[];
  advantages: string[];
  limitations: string[];
  privacyTerms: {
    trainOnUserDataDefault: boolean;
    optOutAvailable: boolean;
    enterpriseZeroRetention: boolean;
    complianceCertifications: string[];
    privacyPolicyUrl: string;
  };
  notes: string;
  lastVerifiedDate: string;
}

export interface EvidenceSource {
  id: string;
  title: string;
  url: string;
  publisher: string;
  publicationDate: string;
  lastCheckedDate: string;
  sourceType: 'vendor_docs' | 'technical_report' | 'official_pricing' | 'independent_benchmark' | 'terms_of_service';
  verificationStatus: VerificationStatus;
  notes?: string;
}

export interface CapabilityClaim {
  id: string;
  competitorId: string;
  category: CapabilityCategory;
  featureName: string;
  summary: string;
  details: string;
  planScope: 'all' | 'free' | 'paid_only' | 'enterprise_only';
  status: VerificationStatus;
  sourceId: string;
  lastCheckedDate: string;
  reviewerNotes?: string;
}

export type BenchmarkCategory =
  | 'student_learning'
  | 'coding_debugging'
  | 'math_logic'
  | 'research_sourcing'
  | 'document_analysis'
  | 'summarization'
  | 'instruction_following'
  | 'multimodal';

export interface BenchmarkTask {
  id: string;
  title: string;
  category: BenchmarkCategory;
  description: string;
  prompt: string;
  promptVersion: string;
  expectedCriteria: string[];
  inputFilesDescription?: string;
  isCustom: boolean;
  createdAt: string;
}

export interface RubricScores {
  accuracy: number; // 1-5
  relevance: number; // 1-5
  clarity: number; // 1-5
  instructionFollowing: number; // 1-5
  sourceReliability: number; // 1-5
  taskCompletion: number; // 1-5
}

export interface BenchmarkResult {
  id: string;
  taskId: string;
  competitorId: string;
  modelVersion: string;
  testDate: string;
  testMethod: 'manual_evaluation' | 'automated_api' | 'peer_review';
  outputSample: string;
  rubricScores: RubricScores;
  overallScore: number;
  evaluatorNotes: string;
  isVerified: boolean;
}

export type SwotQuadrant = 'strength' | 'weakness' | 'opportunity' | 'threat';

export interface SwotItem {
  id: string;
  competitorId: string;
  quadrant: SwotQuadrant;
  statement: string;
  rationale: string;
  confidence: 'high' | 'medium' | 'low';
  evidenceSourceId?: string;
  lastReviewedDate: string;
  isVerifiedObservation: boolean;
}

export interface ReportConfig {
  id: string;
  title: string;
  audience: string;
  author: string;
  organization?: string;
  reportDate: string;
  selectedCompetitorIds: string[];
  sections: {
    executiveSummary: boolean;
    scopeMethodology: boolean;
    competitorProfiles: boolean;
    comparisonMatrix: boolean;
    benchmarkFindings: boolean;
    swotAnalysis: boolean;
    recommendations: boolean;
    limitations: boolean;
    references: boolean;
  };
  recommendationTask?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecommendationPriority {
  accuracy: number; // 1-5 weight
  cost: number;
  easeOfUse: number;
  privacy: number;
  integrations: number;
  speed: number;
  fileSupport: number;
}
