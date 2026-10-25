# AI Insight — Security & Privacy Review

## 1. Threat Modeling & Attack Surface Review
AI Insight is designed with defensive security controls tailored for enterprise deployment and local demonstration:

| Threat Vector | Risk Description | Architectural Mitigation | Status |
|---|---|---|---|
| **API Secret Leakage** | Accidentally committing OpenAI, Anthropic, or Google API keys to client-side bundles or git. | Strictly enforce that keys reside in server-side environment variables (`.env.local`). Never expose provider secrets to client bundles. Provide `.env.example` with placeholders only. | Implemented & Enforced |
| **Cross-Site Scripting (XSS)** | Malicious HTML or scripts injected via custom benchmark prompts or user notes. | Automatic contextual encoding in React JSX, sanitization of external URLs before linking, `rel="noopener noreferrer"` on all external links. | Implemented & Enforced |
| **Fabricated Data Propagation** | Misrepresenting unverified or synthetic benchmark scores as genuine empirical science. | Strict taxonomy enforcement: Seed records must carry valid primary URLs and verification dates. Custom benchmark tasks are visibly tagged as `Manual Review` or `Demo Run`. | Implemented & Enforced |
| **Unauthorized Data Exposure** | Multi-tenant report bleeding or unauthorized access to draft evaluations. | Client-side isolation in demo mode; Row Level Security (RLS) policies prepared in Supabase/PostgreSQL migrations restricting user records to authenticated `auth.uid()`. | Implemented & Enforced |
| **Denial of Service / Heavy Payload** | Malformed large payloads in custom benchmarks or reports causing UI lockups. | Input length validation limits (prompts <= 10,000 chars; notes <= 2,000 chars), efficient client-side state caching with zero layout thrashing. | Implemented & Enforced |

## 2. Privacy Policy & Data Handling Disclosures
- **Zero Third-Party Tracking:** AI Insight does not embed marketing pixels, session replay scripts, or invasive trackers.
- **Provider API Disclosure:** When users configure optional live model API calls, a modal warning clearly states that prompts will be sent to the respective third-party vendor subject to their enterprise terms of service.
- **Local Persistence by Default:** In demonstration and local evaluation modes, all reports, notes, and custom benchmarks are stored in browser `localStorage`, keeping sensitive inputs entirely on the user's machine.
