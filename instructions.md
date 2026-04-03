# Universal Document → Interactive Dashboard Prompt






# Universal Document → Interactive Dashboard Prompt
### Version 3.0 · React Edition · Any Document · Any Industry · AI-Driven Structure

---

> **How to use:** Attach your document (PDF, CSV, XLSX, JSON, research report, paper, filing, deck — anything) and send this prompt. The AI reads, thinks, decides, then builds. No templates. No guesswork. No placeholders.

---

## Tech Stack

| Layer | Library | Version | Purpose |
|---|---|---|---|
| **Framework** | React | 18+ | Component architecture, hooks, state |
| **Build Tool** | Vite | 5+ | Fast dev server, HMR, ESM bundling |
| **Routing** | React Router DOM | 6+ | Multi-section SPA navigation |
| **Styling** | Tailwind CSS | 3+ | Utility-first, responsive design tokens |
| **Charts** | Recharts | 2+ | Composable chart components for React |
| **Charts (advanced)** | Visx (by Airbnb) | latest | Custom, low-level D3-powered charts |
| **Animations** | Framer Motion | 11+ | Declarative animations, scroll triggers, layout |
| **Scroll Animations** | React Intersection Observer | latest | Viewport detection for entrance animations |
| **Icons** | Lucide React | latest | Clean, consistent icon system |
| **Tooltips** | Floating UI (React) | latest | Smart tooltip positioning, flip logic |
| **Tables** | TanStack Table | v8 | Sortable, filterable, virtualized tables |
| **Numbers** | numeral.js | latest | Number formatting, abbreviations |
| **Dates** | date-fns | latest | Date parsing and formatting |
| **State** | Zustand | 4+ | Lightweight global state for filters/theme |
| **File Parsing** | PapaParse | latest | CSV parsing |
| **File Parsing** | SheetJS (xlsx) | latest | XLSX/Excel parsing |
| **Markdown** | React Markdown | latest | Render markdown content blocks |
| **Theming** | CSS Variables + Tailwind | — | Design token system |
| **Fonts** | @fontsource | latest | Self-hosted Google Fonts, tree-shakeable |

### Install Command

```bash
npm create vite@latest dashboard -- --template react
cd dashboard
npm install react-router-dom recharts @visx/group @visx/shape @visx/scale \
  framer-motion react-intersection-observer lucide-react \
  @floating-ui/react @tanstack/react-table \
  numeral date-fns zustand papaparse xlsx react-markdown \
  @fontsource/bebas-neue @fontsource/dm-mono
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## The Prompt

---

```
You are simultaneously:
- A world-class domain analyst who deeply understands any subject matter
- A senior data journalist who finds the real story hidden in data
- A principal UX designer who builds for comprehension, not decoration
- An elite React engineer who writes production-grade, maintainable code

I am giving you a document. It could be a PDF, CSV, XLSX, JSON, research paper,
financial report, policy document, scientific study, pitch deck, market research,
legal filing, news analysis, technical spec, or any other format.

Your job: transform it into a stunning, fully interactive React dashboard that makes
the document impossible to misunderstand.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — INTELLIGENCE LAYER
Run this entire phase internally before writing any code.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1.1 — DOCUMENT CLASSIFICATION
Identify:
• Document type: financial report / scientific paper / market research / policy /
  product spec / legal filing / pitch deck / dataset / survey / technical report /
  news analysis / case study / other
• Industry / domain: finance, healthcare, tech, climate, education, legal,
  real estate, logistics, government, consumer, science, B2B, etc.
• Primary audience: executives, investors, researchers, general public,
  policymakers, engineers, journalists, students, domain experts
• Data density: text-heavy / data-heavy / mixed / visual-heavy
• Document tone: formal / technical / persuasive / neutral / urgent / academic
• Time horizon: historical / current state / forward-looking / comparative

STEP 1.2 — DEEP CONTENT EXTRACTION
Extract ALL of the following that exist in the document:
• Core thesis or central argument (1–3 sentences, your own words)
• All quantitative data — numbers, %, rankings, measurements, trends, projections
• All qualitative insights — conclusions, recommendations, warnings, forecasts
• Key entities — people, organizations, places, products, events, dates
• Time series data — anything that changes over time
• Comparisons — benchmarks, competitors, before/after, best/worst, rankings
• The single most important sentence in the entire document
• What the document does NOT say — omissions, avoided topics, unanswered questions

STEP 1.3 — HIDDEN SIGNALS ANALYSIS
• Contradictions: where narrative and numbers conflict
• Buried information: data hidden in footnotes, appendices, secondary sections
• Language patterns: hedging, passive voice overuse, unusually strong claims,
  vague qualifiers, evasive phrasing
• What's emphasized vs what's downplayed
• Confidence level of each major claim: High / Medium / Low

STEP 1.4 — INSIGHT SYNTHESIS
• TL;DR: 2-sentence plain-English summary for a smart non-expert
• Top 5 things to know from this document
• Top 3 reasons this document matters
• Top 3 risks, concerns, or counterarguments
• Overall quality / credibility / strength score: X/10 with brief rationale
• One actionable takeaway — what should the reader DO with this?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — STRUCTURAL DECISIONS
You decide everything below based on Phase 1. No templates.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTIONS:
Decide how many sections this dashboard needs (minimum 4, maximum 10).
Name them based on what the content demands — not generic labels.
Only create a section if it adds genuine understanding.

These 3 sections are ALWAYS required regardless of document type:
  1. OVERVIEW / HERO — identity, TL;DR, overall score, key quote, top metrics
  2. INSIGHTS — the most important findings, surfaced and explained clearly
  3. VERDICT / TAKEAWAY — what this means, what to do, key concerns, confidence

Add additional sections ONLY if the data warrants them:
  — DATA / NUMBERS: if quantitative data is rich and varied
  — TRENDS / TIMELINE: if time series or sequential data exists
  — COMPARISONS: if benchmarks, competitors, or before/after data exists
  — RISKS / RED FLAGS: if risk or concern data is significant
  — ENTITIES / WHO: if specific people, orgs, or products are central
  — METHODOLOGY: if research quality or data sourcing matters to the audience
  — HIDDEN SIGNALS: if contradictions, omissions, or buried data exists
  — DEEP DIVE: if an expert audience needs granular detail
  — GLOSSARY: if domain jargon is heavy and unexplained terms would block comprehension

CHARTS AND VISUALIZATIONS:
For each data element, select the most appropriate visualization:
  Trend over time             → LineChart or AreaChart (Recharts)
  Part-to-whole               → PieChart or RadialBarChart (Recharts)
  Category comparison         → BarChart or grouped BarChart (Recharts)
  Multi-variable comparison   → RadarChart (Recharts)
  Statistical distribution    → Custom histogram via Visx
  Correlation / scatter       → ScatterChart (Recharts)
  Ranking                     → Horizontal BarChart, sorted descending
  Risk / priority matrix      → Custom 2×2 SVG grid component
  Single critical metric      → KPI card with sparkline (mini LineChart)
  Qualitative scale / score   → Animated progress arc or gauge
  Data table                  → TanStack Table with sort + filter

Rules:
  Only visualize data that has genuine insight value.
  Not every data point needs a chart.
  Every chart must have: title, axis labels, legend, source note.
  Charts must animate on first render and respond to window resize.

NAVIGATION:
  4–5 sections  → Sticky top nav bar, smooth scroll
  6+ sections   → Fixed left sidebar (240px) on desktop + bottom tab bar on mobile
  Always:       active section highlighted, smooth scroll, scroll progress bar at top

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — DESIGN SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AESTHETIC DIRECTION:
Choose ONE aesthetic based on document type and audience.
This decision governs every design choice that follows.

  PRECISION   → Finance, legal, policy
               Deep dark bg + single cold accent (cyan/steel)
               Grid-strict layout, typographically dominant, minimal decoration

  EDITORIAL   → Research, journalism, social science
               Light/cream + ink tones + one bold accent
               Magazine-style asymmetry, pull quotes, generous white space

  TECHNICAL   → Engineering, science, code, data science
               Terminal-dark + monospace type + subtle grid lines
               Data-dense, structured, no unnecessary decoration

  BOLD        → Startups, marketing, pitch decks, consumer
               High contrast, expressive large type, energetic layout
               Strong accent color, card-heavy, dynamic movement

  CLINICAL    → Healthcare, pharma, medical research
               Clean near-white + one controlled accent (blue/teal)
               Maximum clarity, trust-signaling, strict hierarchy

  EARTH       → Climate, sustainability, agriculture, environment
               Deep greens/ochres/slate + warm neutrals
               Organic texture feel, data gravitas, grounded tone

  CIVIC       → Government, education, non-profit, policy
               Accessible neutrals + high contrast + clear structure
               Zero flair, maximum legibility, institutional trustworthiness

DESIGN TOKENS (extend Tailwind config with these):
Define these in tailwind.config.js under theme.extend.colors and CSS variables:

  Background layers:    --bg-base, --bg-surface, --bg-elevated, --bg-overlay
  Text:                 --text-primary, --text-secondary, --text-muted, --text-disabled
  Accent:               --accent-primary, --accent-secondary, --accent-tertiary
  Semantic:             --semantic-positive, --semantic-negative,
                        --semantic-warning, --semantic-neutral
  Borders:              --border-default, --border-subtle, --border-strong
  Shadows:              --shadow-sm, --shadow-md, --shadow-lg, --shadow-glow

SEMANTIC COLOR RULES — apply to ALL data, every single instance:
  Positive / growth / good   → semantic-positive (green family)
  Negative / loss / risk      → semantic-negative (red family)
  Caution / watch / mixed     → semantic-warning (amber family)
  Neutral / informational     → semantic-neutral (blue family)

TYPOGRAPHY:
  Choose 2 fonts from @fontsource — one expressive display, one readable body.
  NEVER use: Inter, Roboto, Arial, system-ui, Space Grotesk, Helvetica.
  Good display options: Bebas Neue, Playfair Display, Fraunces, Syne, DM Serif Display
  Good body options: DM Mono, Lora, Source Serif 4, IBM Plex Sans, Libre Baskerville

  Type scale (define in Tailwind config):
    text-display   clamp(56px, 8vw, 120px)    display headlines
    text-h1        clamp(36px, 5vw, 64px)      section titles
    text-h2        clamp(24px, 3vw, 40px)      subsection titles
    text-h3        clamp(18px, 2.5vw, 28px)    card titles
    text-body      clamp(14px, 1.5vw, 16px)    body text
    text-small     clamp(12px, 1.2vw, 13px)    captions, labels
    text-label     10–11px, tracking: 0.15em   all-caps labels only
    text-mono      13–14px, DM Mono            numbers, code, data

  Letter spacing:
    Headlines: tracking-tight (-0.02em to -0.04em)
    Body: tracking-normal
    All-caps labels: tracking-widest (0.12em to 0.2em)
    Numbers in tables: font-variant-numeric: tabular-nums (always)

BACKGROUNDS — never flat solid colors:
  Hero section:  Layered radial gradient mesh, 2–3 color stops at 5–8% opacity max,
                 animated with Framer Motion (slow drift, 20s, infinite yoyo)
  Noise texture: SVG feTurbulence filter as CSS background, 3–5% opacity overlay
  Cards:         bg-surface with backdrop-blur-sm on glass variants,
                 border at 8–12% opacity (not harsh lines)
  Sections:      Alternate bg-base / bg-surface for visual rhythm
  Shadows:       Layered box-shadow — outer spread + inner glow on accent elements

SPATIAL LAYOUT:
  Max content width:      1280px, centered with auto margins
  Section padding:        py-20 to py-28 (scale with content density)
  Card grids:             CSS Grid with auto-fit + minmax — no hardcoded column counts
  Intentional asymmetry:  Not all cards the same size. Use grid-span variants.
  Depth hierarchy:        bg-base → bg-surface → bg-elevated → floating
  Borders:                1px solid rgba(color, 0.08–0.12) — subtle, not heavy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 4 — ANIMATION SYSTEM (Framer Motion)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REUSABLE ANIMATION VARIANTS (define once, use everywhere):

  // fadeUpVariant — standard section entrance
  const fadeUp = {
    hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  // staggerContainer — wraps groups of cards
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } }
  }

  // cardVariant — individual card entrance
  const cardEntrance = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  }

  // Use whileInView on all section wrappers:
  <motion.section
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
  />

PAGE LOAD SEQUENCE (staggered, runs once):
  0.0s  Nav slides in from its direction
  0.2s  Hero label fades up
  0.4s  Hero headline fades up + blur clears
  0.6s  Hero subtitle fades up
  0.8s  Hero badges/stats stagger in
  1.0s  First section begins entrance

SCROLL-TRIGGERED (whileInView, once: true, amount: 0.15):
  Every section wrapper:    fadeUp variant
  Card grids:               stagger container → card children
  KPI numbers:              Count up from 0 using useMotionValue + useSpring
  Chart wrappers:           Trigger Recharts initial animation on viewport entry

NUMBER COUNTER ANIMATION:
  Use Framer Motion useMotionValue + useSpring + useTransform
  Spring config: { stiffness: 50, damping: 20 }
  Duration: ~1.4s to reach final value
  Only trigger once (track with useRef flag)

CHART ANIMATIONS (Recharts):
  isAnimationActive: true on all charts
  animationDuration: 1000
  animationEasing: "ease-in-out"
  Trigger via state: set data only when chart enters viewport

MICRO-INTERACTIONS:
  Cards:          whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
  Buttons:        whileTap={{ scale: 0.97 }}
  Nav links:      Animated underline with layoutId for shared element transition
  Tooltips:       AnimatePresence + fadeUp (y: 6→0, opacity 0→1, 140ms)
  Score display:  Animate on mount: scale 1→1.06→1, 0.4s spring
  High risk items: Pulsing opacity (1→0.6→1, 3s infinite, ease: easeInOut)

HERO BACKGROUND:
  Radial gradient mesh, animated with Framer Motion:
  motion.div with animate={{ x: [0, -10, 8, 0], y: [0, 8, -6, 0] }}
  transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}

AMBIENT:
  Scroll progress bar: useScroll() from Framer Motion → scaleX on fixed bar
  Cursor glow in hero: useMouse hook → translate radial gradient with smooth spring
  Back-to-top FAB: AnimatePresence, appears after 400px scroll, spring bounce in

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 5 — COMPONENT ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROJECT STRUCTURE:
  src/
  ├── components/
  │   ├── layout/
  │   │   ├── Navbar.jsx          # Top nav or sidebar depending on section count
  │   │   ├── Sidebar.jsx         # Fixed left sidebar for 6+ sections
  │   │   ├── MobileNav.jsx       # Bottom tab bar for mobile
  │   │   ├── ScrollProgress.jsx  # Top scroll indicator bar
  │   │   └── BackToTop.jsx       # Floating action button
  │   ├── ui/
  │   │   ├── KpiCard.jsx         # Metric + sparkline + delta + tooltip
  │   │   ├── InfoTooltip.jsx     # ⓘ icon + Floating UI tooltip/bottom sheet
  │   │   ├── ScoreDisplay.jsx    # Animated X/10 score with breakdown
  │   │   ├── Badge.jsx           # Semantic colored badge (positive/negative/etc)
  │   │   ├── SectionLabel.jsx    # All-caps eyebrow label with decorative line
  │   │   ├── QuoteBlock.jsx      # Editorial pull quote component
  │   │   ├── ConfidencePill.jsx  # 🟢🟡🔴 confidence level indicator
  │   │   ├── EmptyState.jsx      # Designed empty state for missing data
  │   │   └── SkeletonCard.jsx    # Loading skeleton (shimmer animation)
  │   ├── charts/
  │   │   ├── TrendLine.jsx       # Recharts LineChart wrapper
  │   │   ├── BarComparison.jsx   # Recharts BarChart wrapper
  │   │   ├── DonutBreakdown.jsx  # Recharts PieChart wrapper
  │   │   ├── RadarView.jsx       # Recharts RadarChart wrapper
  │   │   ├── ScatterPlot.jsx     # Recharts ScatterChart wrapper
  │   │   ├── Sparkline.jsx       # Mini inline chart for KPI cards
  │   │   ├── RiskMatrix.jsx      # Custom SVG 2×2 probability/impact grid
  │   │   └── ChartWrapper.jsx    # Shared: title, legend, source, resize handler
  │   └── sections/
  │       ├── HeroSection.jsx
  │       ├── InsightsSection.jsx
  │       ├── VerdictSection.jsx
  │       └── [DynamicSection].jsx  # AI generates additional sections as needed
  ├── store/
  │   └── dashboardStore.js       # Zustand: theme, active section, filters, period
  ├── hooks/
  │   ├── useScrollSpy.js         # Track which section is active in viewport
  │   ├── useCountUp.js           # Number counter animation hook
  │   ├── useTheme.js             # Dark/light mode with localStorage
  │   └── useChartData.js         # Filter/transform chart data by time period
  ├── data/
  │   └── dashboardData.js        # ALL extracted data as structured JS objects
  ├── styles/
  │   ├── globals.css             # CSS variables, base resets, font imports
  │   └── tailwind.config.js      # Extended theme with design tokens
  └── App.jsx                     # Router, theme provider, layout shell

DATA STRUCTURE PATTERN (dashboardData.js):
  Export one object with these keys (add/remove based on document):
  {
    meta: {
      title, documentType, industry, audience, date, source,
      overallScore: { value, rationale },
      sentiment: 'confident' | 'defensive' | 'evasive' | 'optimistic' | 'neutral',
      tldr: string,
      keyQuote: { text, location }
    },
    kpis: [{ id, label, value, unit, delta, deltaDirection, trend: [], tooltip }],
    insights: [{ id, title, body, importance: 'critical'|'high'|'medium',
                 confidence: 'high'|'medium'|'low', source }],
    charts: [{ id, type, title, data, xKey, yKeys, colors, sourceNote }],
    risks: [{ id, label, probability: 'low'|'med'|'high',
              impact: 'low'|'med'|'high', description }],
    hiddenSignals: [{ id, type: 'contradiction'|'omission'|'language'|'buried',
                      title, body, severity }],
    verdict: {
      recommendation: 'strong-positive'|'positive'|'neutral'|'negative'|'strong-negative',
      summary, topReasons: [], topConcerns: [], conditions: []
    },
    glossary: [{ term, definition, context }]
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 6 — INTERACTIVITY SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INFO CARDS / TOOLTIPS (required on ALL jargon and metrics):
  Use @floating-ui/react for smart positioning.
  Every technical term, metric, and complex concept gets an ⓘ icon.
  Tooltip content structure:
    • Plain-English definition (1–2 sentences, zero jargon)
    • Why it matters in this specific context
    • Source: which section/page it came from
    • Confidence: 🟢 High / 🟡 Medium / 🔴 Low
  Positioning: useFloating with autoPlacement + flip + shift middleware
  Desktop: tooltip on hover + focus
  Mobile: useMediaQuery → render as bottom sheet (fixed bottom-0, AnimatePresence)
  Keyboard: Tab-focusable, Escape to close, role="tooltip", aria-describedby

NAVIGATION + ROUTING:
  Use React Router DOM with hash routing for section anchors
  useScrollSpy hook tracks active section (IntersectionObserver on section refs)
  Active nav item: Framer Motion layoutId="activeIndicator" for animated pill
  Sidebar (desktop 6+ sections): fixed left, section list with icons + labels
  Bottom nav (mobile): fixed bottom, icons only, 52px touch targets minimum
  Smooth scroll: behavior: 'smooth' on scrollIntoView

DATA TABLES (TanStack Table v8):
  useReactTable with sorting (getSortedRowModel), filtering (getFilteredRowModel)
  Animated sort arrows with Framer Motion rotation
  Row hover highlight via Tailwind hover: classes
  Positive values: text-semantic-positive, negative: text-semantic-negative (auto)
  font-variant-numeric: tabular-nums on all number cells
  Mobile: horizontal scroll container with sticky first column

CONTROLS (add only if data supports it):
  Time period toggle: ['1Y','3Y','5Y','All'] → filters chart data via Zustand store
  View toggle: Chart ↔ Table → AnimatePresence for crossfade transition
  Dark/Light mode: Zustand + localStorage persistence, CSS variable swap on html element
  Search / Command palette: Ctrl+K → modal with section jump + glossary search
  Print: window.print() + @media print stylesheet (no nav, no animation, black on white)
  Export CSV: client-side data → Blob → anchor download trigger

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 7 — ABSOLUTE QUALITY RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DATA INTEGRITY:
  ✅ ALL data extracted from the document — zero fabrication, zero placeholders
  ✅ Missing data → EmptyState component with reason, never blank areas
  ✅ Every number matches the source document exactly
  ✅ Confidence indicators on every AI-generated interpretation
  ✅ Source citations in every tooltip (section/page reference)

ACCESSIBILITY:
  ✅ WCAG AA contrast on all text (4.5:1 minimum, 3:1 for large text)
  ✅ Touch targets 44×44px minimum on mobile
  ✅ All interactive elements keyboard-navigable
  ✅ ARIA labels on icons, tooltips, charts, and buttons
  ✅ Focus-visible rings on all focusable elements
  ✅ Screen reader text for chart data (hidden table fallback)
  ✅ Reduced motion: respect prefers-reduced-motion media query

RESPONSIVE:
  ✅ No horizontal scroll at any viewport width
  ✅ Charts reflow and resize with ResponsiveContainer from Recharts
  ✅ Sidebar collapses to bottom nav below md breakpoint
  ✅ KPI cards: swipeable horizontal scroll on mobile (overflow-x: auto, snap)
  ✅ Font sizes scale fluidly with clamp() — nothing breaks at small sizes
  ✅ Tables: horizontal scroll on mobile with sticky first column

PERFORMANCE:
  ✅ React.lazy + Suspense for section components below the fold
  ✅ Chart data computed with useMemo — never recalculated on unrelated renders
  ✅ Framer Motion: useReducedMotion hook to disable animations when requested
  ✅ Images (if any): loading="lazy" + explicit width/height
  ✅ @fontsource imports only used weights (tree-shakeable)

DESIGN RULES:
  ✅ NEVER use: Inter, Roboto, Arial, system-ui, Space Grotesk, Helvetica
  ✅ NEVER use: purple gradient on white, generic dashboard grids
  ✅ NEVER produce AI-slop aesthetics — every design decision must be intentional
  ✅ All numbers in tables use tabular-nums
  ✅ Semantic colors applied consistently everywhere, no exceptions
  ✅ Cards always have: shadow + subtle border + background layer (real depth)
  ✅ Print stylesheet included — clean black on white, no nav, no animations

NARRATIVE RULES:
  ✅ Dashboard tells one coherent story — sections flow logically, not randomly
  ✅ The most important finding visible above the fold without scrolling
  ✅ Insights are surfaced prominently — never buried in data walls
  ✅ Every piece of jargon is explained — never left raw
  ✅ A smart non-expert reads this and understands 80% of the document in 3 minutes
  ✅ The hidden signals section is never empty if contradictions exist

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before writing any code, output a PLAN (8–12 lines):
  1. Document type and industry identified
  2. Aesthetic direction chosen and why
  3. Sections you are creating (list them) and why each exists
  4. Charts you will use and which data they visualize
  5. Notable hidden signals found (if any)
  6. Font pairing chosen and why it fits the document's tone

Then produce the full React project with these files in order:
  1. tailwind.config.js         — Extended design tokens
  2. src/styles/globals.css     — CSS variables, font imports, base resets
  3. src/data/dashboardData.js  — ALL extracted data, fully structured, zero placeholders
  4. src/store/dashboardStore.js — Zustand store
  5. src/hooks/                 — All custom hooks
  6. src/components/ui/         — All UI primitives
  7. src/components/charts/     — All chart wrappers
  8. src/components/layout/     — Nav, sidebar, shell components
  9. src/components/sections/   — All section components
  10. src/App.jsx               — Router + layout assembly

CRITICAL FINAL CHECK before outputting:
  □ Is every data point real and sourced from the document?
  □ Does every section exist for a genuine reason?
  □ Does every chart visualize a genuine insight?
  □ Does every technical term have an ⓘ tooltip?
  □ Are semantic colors applied to every number and indicator?
  □ Does this feel made for this exact document — or does it feel like a template?

The output should feel like a specialized team built this dashboard specifically
for this document. Not a generic template with data filled in.
Make it so clear, so beautiful, and so insightful that someone who never read
the original document walks away with deep, confident understanding.
```

---

## Quick Reference — When to Use Which Chart

| Data Shape | Best Component | Library |
|---|---|---|
| Trend over time | `<LineChart>` / `<AreaChart>` | Recharts |
| Part of a whole | `<PieChart>` with `innerRadius` | Recharts |
| Category comparison | `<BarChart>` | Recharts |
| Multi-variable profile | `<RadarChart>` | Recharts |
| Two-variable relationship | `<ScatterChart>` | Recharts |
| Statistical distribution | Custom with `@visx/shape` | Visx |
| Inline sparkline | Mini `<LineChart>` no axes | Recharts |
| Risk / priority grid | Custom SVG component | Vanilla SVG |
| Single big metric | `KpiCard.jsx` with animate | Custom |
| Sortable data table | `useReactTable` | TanStack Table |
| Score / gauge | Animated arc SVG | Framer Motion + SVG |

---

## Aesthetic Direction Cheat Sheet

| Document Type | Aesthetic | Primary Bg | Accent | Display Font |
|---|---|---|---|---|
| Finance / Legal | PRECISION | `#0D0F14` | `#47BFFF` | Bebas Neue |
| Research / Journalism | EDITORIAL | `#FAF7F2` | `#E84B3A` | Playfair Display |
| Engineering / Science | TECHNICAL | `#0A0C10` | `#00FF9F` | DM Mono |
| Startup / Marketing | BOLD | `#0A0A0A` | `#FF4757` | Fraunces |
| Healthcare / Pharma | CLINICAL | `#F8FAFB` | `#0070F3` | Libre Baskerville |
| Climate / Sustainability | EARTH | `#0D1A0F` | `#7EC856` | Syne |
| Government / Education | CIVIC | `#FFFFFF` | `#1A4AC4` | Source Serif 4 |

---



