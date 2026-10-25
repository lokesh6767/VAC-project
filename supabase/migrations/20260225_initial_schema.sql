-- AI Insight: Enterprise Relational Database Schema
-- Compatible with PostgreSQL 15+ and Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. COMPETITORS TABLE
CREATE TABLE IF NOT EXISTS competitors (
    id VARCHAR(50) PRIMARY KEY, -- 'chatgpt', 'gemini', 'copilot', 'claude'
    name VARCHAR(100) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    badge VARCHAR(150),
    color VARCHAR(20) NOT NULL,
    tagline TEXT,
    description TEXT,
    official_website VARCHAR(255) NOT NULL,
    docs_url VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    core_models JSONB NOT NULL DEFAULT '[]'::jsonb,
    plans JSONB NOT NULL DEFAULT '[]'::jsonb,
    modalities JSONB NOT NULL DEFAULT '{"input": [], "output": []}'::jsonb,
    supported_use_cases JSONB NOT NULL DEFAULT '[]'::jsonb,
    advantages JSONB NOT NULL DEFAULT '[]'::jsonb,
    limitations JSONB NOT NULL DEFAULT '[]'::jsonb,
    privacy_terms JSONB NOT NULL DEFAULT '{}'::jsonb,
    notes TEXT,
    last_verified_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SOURCES TABLE
CREATE TABLE IF NOT EXISTS sources (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    publisher VARCHAR(150) NOT NULL,
    publication_date DATE,
    last_checked_date DATE NOT NULL DEFAULT CURRENT_DATE,
    source_type VARCHAR(50) NOT NULL CHECK (source_type IN ('vendor_docs', 'technical_report', 'official_pricing', 'independent_benchmark', 'terms_of_service')),
    verification_status VARCHAR(30) NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'needs_review', 'outdated', 'disputed', 'unverified')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CAPABILITIES TABLE
CREATE TABLE IF NOT EXISTS capabilities (
    id VARCHAR(100) PRIMARY KEY,
    competitor_id VARCHAR(50) NOT NULL REFERENCES competitors(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL CHECK (category IN (
        'general_reasoning', 'coding_debugging', 'math_logic', 'research_citations',
        'document_analysis', 'multimodal', 'file_handling', 'context_window',
        'integrations_ecosystem', 'developer_api', 'pricing_limits', 'privacy_security'
    )),
    feature_name VARCHAR(200) NOT NULL,
    summary TEXT NOT NULL,
    details TEXT NOT NULL,
    plan_scope VARCHAR(30) DEFAULT 'all' CHECK (plan_scope IN ('all', 'free', 'paid_only', 'enterprise_only')),
    status VARCHAR(30) NOT NULL DEFAULT 'verified' CHECK (status IN ('verified', 'needs_review', 'outdated', 'disputed', 'unverified')),
    source_id VARCHAR(100) REFERENCES sources(id) ON DELETE SET NULL,
    last_checked_date DATE NOT NULL DEFAULT CURRENT_DATE,
    reviewer_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. BENCHMARK TASKS TABLE
CREATE TABLE IF NOT EXISTS benchmark_tasks (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    prompt TEXT NOT NULL,
    prompt_version VARCHAR(20) DEFAULT '1.0.0',
    expected_criteria JSONB NOT NULL DEFAULT '[]'::jsonb,
    input_files_description TEXT,
    is_custom BOOLEAN DEFAULT FALSE,
    created_by UUID, -- REFERENCES auth.users(id) in Supabase
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. BENCHMARK RESULTS TABLE
CREATE TABLE IF NOT EXISTS benchmark_results (
    id VARCHAR(100) PRIMARY KEY,
    task_id VARCHAR(100) NOT NULL REFERENCES benchmark_tasks(id) ON DELETE CASCADE,
    competitor_id VARCHAR(50) NOT NULL REFERENCES competitors(id) ON DELETE CASCADE,
    model_version VARCHAR(100) NOT NULL,
    test_date DATE NOT NULL DEFAULT CURRENT_DATE,
    test_method VARCHAR(50) NOT NULL DEFAULT 'peer_review' CHECK (test_method IN ('manual_evaluation', 'automated_api', 'peer_review')),
    output_sample TEXT,
    rubric_scores JSONB NOT NULL, -- {accuracy, relevance, clarity, instructionFollowing, sourceReliability, taskCompletion}
    overall_score NUMERIC(3, 2) NOT NULL,
    evaluator_notes TEXT,
    is_verified BOOLEAN DEFAULT TRUE,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. SWOT ITEMS TABLE
CREATE TABLE IF NOT EXISTS swot_items (
    id VARCHAR(100) PRIMARY KEY,
    competitor_id VARCHAR(50) NOT NULL REFERENCES competitors(id) ON DELETE CASCADE,
    quadrant VARCHAR(20) NOT NULL CHECK (quadrant IN ('strength', 'weakness', 'opportunity', 'threat')),
    statement VARCHAR(255) NOT NULL,
    rationale TEXT NOT NULL,
    confidence VARCHAR(20) NOT NULL DEFAULT 'high' CHECK (confidence IN ('high', 'medium', 'low')),
    evidence_source_id VARCHAR(100) REFERENCES sources(id) ON DELETE SET NULL,
    last_reviewed_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_verified_observation BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. SAVED REPORTS TABLE
CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    audience VARCHAR(255) NOT NULL,
    author VARCHAR(150) NOT NULL,
    organization VARCHAR(150),
    report_date DATE NOT NULL DEFAULT CURRENT_DATE,
    selected_competitor_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    sections JSONB NOT NULL,
    recommendation_task VARCHAR(50),
    owner_id UUID, -- REFERENCES auth.users(id)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES FOR HIGH-PERFORMANCE QUERIES
CREATE INDEX IF NOT EXISTS idx_capabilities_competitor ON capabilities(competitor_id);
CREATE INDEX IF NOT EXISTS idx_capabilities_category ON capabilities(category);
CREATE INDEX IF NOT EXISTS idx_capabilities_status ON capabilities(status);
CREATE INDEX IF NOT EXISTS idx_benchmark_results_task ON benchmark_results(task_id);
CREATE INDEX IF NOT EXISTS idx_benchmark_results_comp ON benchmark_results(competitor_id);
CREATE INDEX IF NOT EXISTS idx_swot_competitor_quadrant ON swot_items(competitor_id, quadrant);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE benchmark_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE benchmark_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE swot_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Public read access for standard intelligence
CREATE POLICY "Public Read Access on Competitors" ON competitors FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Sources" ON sources FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Capabilities" ON capabilities FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Benchmark Tasks" ON benchmark_tasks FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Benchmark Results" ON benchmark_results FOR SELECT USING (true);
CREATE POLICY "Public Read Access on SWOT" ON swot_items FOR SELECT USING (true);

-- User-scoped report access
CREATE POLICY "User Manage Own Reports" ON reports
    FOR ALL
    USING (auth.uid() = owner_id OR owner_id IS NULL)
    WITH CHECK (auth.uid() = owner_id OR owner_id IS NULL);
