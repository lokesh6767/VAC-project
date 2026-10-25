# AI Insight — UI/UX Design System Specification

## 1. Visual Hierarchy & Theme Principles
AI Insight embodies an authoritative, enterprise SaaS aesthetic inspired by modern analytics suites (such as Datadog, Stripe Dashboard, and Linear). It strikes a deliberate balance: clean, high-contrast, clutter-free, and hyper-legible.

### 1.1 Color Palette
- **Sidebar & Chrome (Deep Navy):**
  - Background: `#0B132B` (deep midnight navy)
  - Secondary/Border: `#1C2541`
  - Active Nav Highlight: `#1E293B` with border accent `#3B82F6`
- **Main Canvas (Clean SaaS Light Workspace):**
  - Background: `#F8FAFC` (Slate 50)
  - Card Surfaces: `#FFFFFF` with borders in `#E2E8F0` (Slate 200)
  - Hover states: `#F1F5F9` (Slate 100)
- **Primary Accent:**
  - Standard: `#2563EB` (Blue 600)
  - Hover: `#1D4ED8` (Blue 700)
  - Light Tint: `#EFF6FF` (Blue 50)
- **Status & Semantic Colors (Restrained):**
  - **Verified / Success:** `#059669` (Emerald 600) / `#ECFDF5` (Emerald 50)
  - **Needs Review / Warning:** `#D97706` (Amber 600) / `#FFFBEB` (Amber 50)
  - **Outdated / Disputed / Danger:** `#DC2626` (Red 600) / `#FEF2F2` (Red 50)
  - **Unknown / Unverified:** `#64748B` (Slate 500) / `#F8FAFC` (Slate 50)
- **Typography:**
  - Font Family: `Inter`, system-ui, -apple-system, sans-serif
  - Heading 1: `text-2xl font-bold tracking-tight text-slate-900`
  - Body: `text-sm text-slate-600 leading-relaxed`
  - Data / Badges: `text-xs font-medium tracking-wide uppercase`

## 2. Layout Structure
- **Left Navigation Sidebar (Collapsible):**
  - Fixed on desktop (260px wide).
  - Brand header with AI Insight logo and version chip.
  - Grouped navigation links with Lucide icons (Dashboard, Competitor Explorer, Comparison Workspace, Evidence Library, Benchmark Lab, SWOT Analysis, Recommendations, Reports, Methodology & Settings).
  - Footer with data freshness badge and demo mode toggle.
- **Top Header Bar:**
  - Breadcrumbs reflecting the active path.
  - Quick Search dialog trigger (`Ctrl+K`).
  - Active Competitor Filter pills.
  - Notifications & verification alert indicator.
- **Responsive Viewports:**
  - Desktop (>1024px): Multi-column grids, comprehensive 4-competitor comparison matrix, 4-quadrant SWOT.
  - Tablet (768px - 1023px): Two-column grids, horizontally scrolling comparison matrix with sticky left category labels.
  - Mobile (<768px): Hamburger drawer menu, stacked SWOT cards, touch-optimized tabs, zero unmanaged horizontal overflows.

## 3. Interaction & Micro-Animation Standards
- Hover elevation on competitor cards (`transition-all duration-200 hover:shadow-md hover:border-blue-300`).
- Interactive tooltips on verification status badges revealing source URL and audit date.
- Smooth modal transitions for claim editing and report configuration.
- Real-time search highlighting matching terms in tables.

## 4. Accessibility (WCAG 2.2 AA Compliance)
- Contrast ratio exceeding 4.5:1 on all text elements against backgrounds.
- Explicit keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none`).
- ARIA landmarks (`role="navigation"`, `role="main"`, `aria-expanded`, `aria-label`).
- High-legibility status indicators using both color AND distinct geometric icons (CheckCircle, AlertTriangle, HelpCircle, XCircle).
