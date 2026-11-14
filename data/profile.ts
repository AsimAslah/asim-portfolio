export type ProjectTone = 'indigo' | 'amber' | 'sage' | 'blue';

export type ProjectEvidence = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type ProjectVisualKind =
  | 'evallens'
  | 'quality-lab'
  | 'image-to-3d'
  | 'dataveil'
  | 'shopify'
  | 'keyboard';

export type Project = {
  slug: string;
  visualKind: ProjectVisualKind;
  featured?: boolean;
  title: string;
  shortTitle: string;
  label: string;
  tagline?: string;
  status?: string;
  summary: string;
  build: string;
  contribution: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  workflow: string[];
  challenges: string[];
  keyDecisions?: string[];
  testing?: string[];
  limitations?: string[];
  outcome: string;
  tone: ProjectTone;
  githubUrl: string | null;
  demoUrl: string | null;
  screenshot: string | null;
  screenshotAlt: string | null;
  screenshotSize: { width: number; height: number } | null;
  evidence?: ProjectEvidence[];
  releaseUrl?: string;
  program?: string;
  adVideo?: { src: string; poster: string };
};

export const profile = {
  name: 'Asim Aslah P M',
  shortName: 'Asim',
  role: 'AI Evaluation Engineer | AI/ML & Generative AI Developer | AI Research | Full-Stack Engineer',
  location: 'Palakkad, Kerala, India',
  email: 'asimaslu7@gmail.com',
  whatsappUrl:
    'https://wa.me/919207900426?text=Hi%20Asim%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect.',
  githubUrl: 'https://github.com/AsimAslah',
  linkedinUrl: 'https://www.linkedin.com/in/asim-aslah-pm-05906a222',
  resumeUrl: '/Asim_Aslah_GenAI_AIResearch_FullStack_Resume.pdf',
  siteUrl: 'https://asim-portfolio.asimaslu7.workers.dev',
  headline: 'Building explainable AI evaluation systems, privacy-aware research, and full-stack products from evidence to deployment.',
  intro:
    'I build evaluation platforms and full-stack AI systems that make model quality, evidence, privacy, and execution behavior easier to inspect. My work spans LLM evaluation, privacy-preserving AI, retrieval-augmented generation research, Python APIs, React applications, and Cloudflare deployments.',
  about:
    'I am a computer science graduate pursuing an M.Tech in Artificial Intelligence & Data Science at Government Engineering College, Palakkad. I design reproducible AI evaluation workflows, build privacy-aware full-stack systems, and research conformal privacy-risk routing for retrieval-augmented generation under PII distribution shift. This evaluation experience comes from completed engineering projects, not professional AI-evaluation employment.',
};

export const navigation = [
  { label: 'Home', href: '/#home' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export const projects: Project[] = [
  {
    slug: 'evallens',
    visualKind: 'evallens',
    featured: true,
    title: 'EvalLens — AI Response Evaluation & Analytics Platform',
    shortTitle: 'EvalLens',
    label: 'Human-centered AI evaluation · v1.0.0',
    tagline: 'Evaluate Intelligence. Improve Quality.',
    status: 'Production release v1.0.0',
    summary:
      'Compares AI responses with weighted rubrics, independent scoring, evidence-backed human preference, reproducible snapshots, and cautious analytics.',
    build:
      'A production full-stack evaluation platform with protected Cloudflare D1 persistence, default and custom rubrics, pairwise review, public showcases, analytics, and safe exports.',
    contribution:
      'Designed and implemented the evaluation methodology, App Router interface, Zod validation, D1 schema and migrations, protected APIs, analytics, exports, test suites, CI workflow, release documentation, and Cloudflare deployment.',
    description:
      'A human-centered workspace for preserving the original request, comparing two supplied AI responses, scoring each response independently, recording criterion-level evidence, and separating explicit evaluator preference from calculated rubric summaries.',
    problem:
      'AI response reviews are often reduced to a single score or undocumented preference, which makes disagreements, changing rubrics, and historical comparisons difficult to inspect or reproduce.',
    solution:
      'EvalLens keeps prompt context, independent A/B scores, N/A decisions, evidence, preference, rationale, rubric versions, and analytics in one reviewable record. Server validation resolves the selected rubric and snapshots its criteria when the evaluation is saved.',
    features: [
      'Pairwise comparison with exact prompt, context, and response preservation',
      'Seven-criterion default rubric plus 1–20 criterion custom weighted rubrics',
      'Independent A/B scoring and per-response N/A criterion handling',
      'Human A/B/tie preference kept independent from numerical score ordering',
      'Immutable rubric snapshots for reproducible historical evaluations',
      'D1-backed history, editing, analytics, public showcases, and JSON/CSV export',
      'Error-category tags and source-attributed GPT-1 versus GPT-2 case study',
    ],
    technologies: ['React 19', 'TypeScript', 'Vinext', 'Tailwind CSS', 'Cloudflare Workers', 'Cloudflare D1', 'Zod', 'Recharts', 'Vitest', 'Playwright'],
    workflow: ['Prompt and context', 'Responses A and B', 'Rubric selection', 'Independent scoring', 'Preference and evidence', 'Validated D1 storage', 'Analytics and exports'],
    challenges: [
      'Keeping explicit human preference independent from calculated weighted scores',
      'Preserving rubric meaning after a custom rubric changes',
      'Enforcing exact criterion coverage, N/A semantics, publication boundaries, and export safety on the server',
    ],
    keyDecisions: [
      'Scores summarize the stated rubric; they are not calibrated probabilities or proof of general model superiority',
      'Historical evaluations read immutable criterion snapshots rather than the current rubric definition',
      'The application evaluates supplied responses and does not generate responses or retrain models',
    ],
    testing: [
      '20/20 Vitest unit tests passed across scoring, validation, rubrics, HTTP, export, and authorization',
      '5/5 Playwright flows passed, including authenticated D1 integration, accessibility semantics, and mobile overflow checks',
      'TypeScript validation, ESLint, dependency audit, migration, production build, and GitHub Actions CI passed for v1.0.0',
    ],
    limitations: [
      'Single-owner bearer authentication is not multi-tenant identity or role-based access control',
      'Analytics describe the recorded sample and do not establish population-level model quality',
      'Multi-evaluator agreement, blinded labels, audit logs, and large R2 evidence uploads remain future work',
    ],
    outcome:
      'A verified v1.0.0 Cloudflare Workers release that demonstrates reproducible human-centered AI evaluation, secure persistence, evidence-aware preference ranking, and production quality gates.',
    tone: 'indigo',
    githubUrl: 'https://github.com/AsimAslah/evallens',
    demoUrl: 'https://evallens.asimaslu7.workers.dev/',
    releaseUrl: 'https://github.com/AsimAslah/evallens/releases/tag/v1.0.0',
    screenshot: '/images/projects/evallens-response-comparison.png',
    screenshotAlt: 'EvalLens response comparison workspace with two AI responses and weighted rubric scoring controls',
    screenshotSize: { width: 1440, height: 3460 },
    evidence: [
      { src: '/images/projects/evallens-response-comparison.png', alt: 'EvalLens pairwise response comparison workspace', width: 1440, height: 3460, caption: 'Core comparison workspace with independent criterion scoring, evidence fields, and explicit human preference.' },
      { src: '/images/projects/evallens-analytics.png', alt: 'EvalLens evaluation analytics dashboard', width: 1440, height: 1000, caption: 'Aggregate analytics over stored evaluations, presented with cautious sample-level interpretation.' },
      { src: '/images/projects/evallens-rubric-library.png', alt: 'EvalLens reusable rubric library', width: 1440, height: 1184, caption: 'Default and custom weighted rubric versions used to produce reproducible evaluation snapshots.' },
      { src: '/images/projects/evallens-evaluation-result.png', alt: 'EvalLens calculated evaluation result panel', width: 1116, height: 312, caption: 'Calculated result and explicit preference remain visibly distinct.' },
      { src: '/images/projects/evallens-mobile-view.png', alt: 'EvalLens mobile evaluation interface', width: 390, height: 5779, caption: 'Responsive evaluation workflow at a 390-pixel mobile viewport.' },
      { src: '/images/projects/evallens-dark-mode.png', alt: 'EvalLens interface in dark mode', width: 1440, height: 2875, caption: 'The production interface preserves evaluation controls and contrast in dark mode.' },
    ],
  },
  {
    slug: 'ai-quality-lab',
    visualKind: 'quality-lab',
    featured: true,
    title: 'AI Quality Lab — Explainable AI Evaluation Platform',
    shortTitle: 'AI Quality Lab',
    label: 'Explainable AI evaluation · Completed',
    tagline: 'Evaluate AI responses. Understand every decision.',
    status: 'Implementation complete · Public deployment pending',
    program: 'Handshake Replit Internship Challenge — Build an App that Shows Its Work',
    summary:
      'Evaluates responses against weighted rubrics while exposing eight real backend stages through persisted events, SSE, measured durations, and replay.',
    build:
      'A FastAPI and React evaluation workspace with deterministic and labeled heuristic checks, privacy gating, persistent execution events, recovery-aware provider calls, and report exports.',
    contribution:
      'Designed and built the FastAPI pipeline, evaluation engine, PII scanner, SQLAlchemy persistence, owner isolation, SSE event stream, React Flow execution graph, replay controls, exports, failure recovery, test suites, and Replit deployment runbook.',
    description:
      'An explainable evaluation workspace that makes the server’s actual execution inspectable. The interface reconstructs eight stages from ordered persisted events rather than presenting a simulated frontend animation.',
    problem:
      'Automated evaluation can produce an opaque score without revealing which checks ran, what failed, whether external model access occurred, or how the system recovered from provider errors.',
    solution:
      'AI Quality Lab records running and terminal events for every pipeline stage, streams newer database events over SSE, labels deterministic, heuristic, and optional model-assisted methods, and replays the original event sequence without altering timestamps or durations.',
    features: [
      'Weighted 1–12 criterion response evaluation with labeled evaluation methods',
      'Deterministic phrase, length, structure, and potential PII checks',
      'Eight-stage React Flow diagram driven by persisted backend events over SSE',
      'Authentic server timestamps, monotonic execution durations, and safe stage metadata',
      'Persistent history and event replay with Play, Pause, Restart, and 0.5×–4× controls',
      'Optional provider timeout, bounded retries, deterministic fallback, and visible recovery events',
      'Privacy gate for external model access plus JSON and Markdown exports',
    ],
    technologies: ['Python', 'FastAPI', 'React 19', 'TypeScript', 'Vite', 'React Flow', 'PostgreSQL', 'SQLite', 'SQLAlchemy', 'Server-Sent Events', 'pytest', 'Vitest'],
    workflow: ['Receive and validate', 'Save request', 'Analyze response', 'Check potential PII', 'Evaluate rubric', 'Optional AI evaluation', 'Aggregate results', 'Store and present report'],
    challenges: [
      'Making visualization state reflect durable backend events rather than animation timing',
      'Preserving ordered event recovery across refreshes and SSE reconnects',
      'Bounding optional provider timeouts and retries while making fallback behavior explicit',
    ],
    keyDecisions: [
      'Replay changes presentation speed only; original timestamps and durations remain immutable',
      'Event metadata excludes raw prompts, raw PII matches, credentials, and database connection values',
      'Potential PII blocks external model calls by default unless an operator explicitly changes policy',
    ],
    testing: [
      '16/16 pytest backend tests passed with 87% application statement coverage in the recorded release report',
      '5/5 Vitest frontend tests passed for replay reconstruction and workspace access behavior',
      'TypeScript build, Vite production build, dependency audit, and real-server health/submission/restore smoke checks passed',
    ],
    limitations: [
      'No verified public Replit URL or production PostgreSQL instance is claimed yet',
      'Anonymous workspace keys are demo recovery credentials, not full identity, revocation, or account management',
      'Heuristic overlap cannot verify truth, and a durable worker queue would be appropriate at higher volume',
    ],
    outcome:
      'An implementation-complete challenge project that demonstrates observable server execution, reproducible replay, privacy-aware model access, and explicit failure recovery without presenting simulated UI motion as backend work.',
    tone: 'blue',
    githubUrl: 'https://github.com/AsimAslah/AI-Quality-Lab',
    demoUrl: null,
    screenshot: '/images/projects/ai-quality-lab-architecture.png',
    screenshotAlt: 'AI Quality Lab architecture page showing React, FastAPI, PostgreSQL, optional AI, and observable execution principles',
    screenshotSize: { width: 1440, height: 1000 },
    evidence: [
      { src: '/images/projects/ai-quality-lab-architecture.png', alt: 'AI Quality Lab architecture page showing the real application layers and execution principles', width: 1440, height: 1000, caption: 'Authentic local application capture: React and resumable SSE connect to FastAPI, persisted PostgreSQL events, and privacy-gated optional AI.' },
    ],
  },
  {
    slug: 'image-to-3d-ar',
    visualKind: 'image-to-3d',
    title: 'Furniture Image-to-3D & AR Studio',
    shortTitle: 'Image-to-3D',
    label: '3D reconstruction',
    summary:
      'Converts a furniture image into downloadable 3D assets with browser previews and mobile AR viewing.',
    build:
      'A FastAPI product studio and PWA for TripoSR generation, validated OBJ/GLB/USDZ exports, on-demand previews, mobile AR, and Supabase-backed product records.',
    contribution:
      'Built the FastAPI workflow around TripoSR, including image upload, inference, model generation, asset downloads, Supabase persistence, browser previews, and mobile AR delivery.',
    description:
      'An end-to-end application layer around TripoSR that turns a furniture photo into validated assets for browser preview, download, product records, and supported mobile AR experiences.',
    problem:
      'Creating a 3D asset for every product is expensive, while customers still benefit from spatial previews before making a purchase decision.',
    solution:
      'The application preprocesses a single image, runs TripoSR inference, prepares validated model assets, and exposes them through on-demand browser previews, downloads, Supabase records, Apple Quick Look, and Android Scene Viewer.',
    features: [
      'Single-image 3D reconstruction with TripoSR',
      'Validated OBJ, GLB, and USDZ asset generation',
      'On-demand browser-based 3D previews',
      'Apple Quick Look and Android Scene Viewer AR paths',
      'Bounded uploads and sanitized Supabase error handling',
    ],
    technologies: ['Python', 'FastAPI', 'TripoSR', 'PyTorch', 'Supabase', 'JavaScript', 'OpenUSD', 'PWA'],
    workflow: ['Image upload', 'Pre-processing', 'TripoSR inference', 'Asset validation', 'Preview, AR, and export'],
    challenges: [
      'Producing usable geometry from a single limited viewpoint',
      'Preserving usable materials and textures across GLB and USDZ',
      'Delivering reliable device-specific AR while keeping generation responsive',
    ],
    outcome:
      'A working image-to-3D product flow with downloadable assets, browser previews, Supabase persistence, and AR delivery for supported iPhone and Android devices.',
    tone: 'amber',
    githubUrl: 'https://github.com/AsimAslah/Image-to-3D',
    demoUrl: null,
    screenshot: null,
    screenshotAlt: null,
    screenshotSize: null,
    adVideo: {
      src: '/media/image-to-3d-ar-ad.mp4',
      poster: '/media/image-to-3d-ar-ad-poster.webp',
    },
  },
  {
    slug: 'dataveil',
    visualKind: 'dataveil',
    title: 'DataVeil — Privacy-Preserving AI Middleware',
    shortTitle: 'DataVeil',
    label: 'Privacy-preserving AI',
    summary:
      'Masks sensitive text, documents, and images locally before they reach external AI systems, then restores protected content afterward.',
    build:
      'A local-first FastAPI application with document anonymization, image-region masking, reversible recovery kits, and two browser interfaces.',
    contribution:
      'Designed a unified FastAPI application that combines document and image masking, local detection, selectable privacy effects, recovery packages, and post-AI restoration in one workflow.',
    description:
      'A local-first privacy application designed to reduce exposure when people use generative AI services with sensitive text, PDF, DOCX, PPTX, or image content.',
    problem:
      'Using external AI tools can expose names, identifiers, documents, and visual information that users did not intend to share with a third party.',
    solution:
      'DataVeil detects sensitive entities and visual regions locally, replaces them with reversible masks, and restores protected content after the external AI response is received.',
    features: [
      'Text, PDF, DOCX, and PPTX anonymization with Presidio and spaCy',
      'Local image masking with YOLOv8, OpenCV, and BiSeNet',
      'Eight selectable privacy effects for sensitive image regions',
      'Recovery-kit restoration with ORB/ECC alignment',
      'Pytest coverage and bounded privacy-sensitive requests',
    ],
    technologies: ['Python', 'FastAPI', 'Presidio', 'spaCy', 'YOLO', 'OpenCV', 'BiSeNet', 'pytest'],
    workflow: ['Input inspection', 'Entity detection', 'Local masking', 'External AI request', 'Protected restoration'],
    challenges: [
      'Preserving enough semantic context for useful AI responses',
      'Handling sensitive information consistently across text and images',
      'Keeping the privacy-critical portion of the workflow local-first',
    ],
    outcome:
      'A working local-first privacy application that processes content on the user’s machine, stores no uploads, and supports reversible text and image protection workflows.',
    tone: 'indigo',
    githubUrl: 'https://github.com/AsimAslah/Dataveil',
    demoUrl: null,
    screenshot: '/images/projects/dataveil-home.png',
    screenshotAlt: 'DataVeil home screen presenting local document and image privacy workflows',
    screenshotSize: { width: 1387, height: 953 },
  },
  {
    slug: 'shopify-fashion-store',
    visualKind: 'shopify',
    title: 'ASIMON Fashion Studio — Shopify E-commerce Project',
    shortTitle: 'ASIMON Fashion Studio',
    label: 'Shopify / E-commerce · Completed',
    summary:
      'A fashion-led Shopify storefront with custom collection storytelling, responsive shopping flows, and a self-modelled campaign.',
    build:
      'A responsive Shopify storefront that combines custom Liquid sections, product-led editorial layouts, collection discovery, and a streamlined path to cart.',
    contribution:
      'Designed and developed the storefront experience, shaped the campaign art direction, and modelled for the featured product photography.',
    description:
      'A Shopify commerce project that treats the storefront as both a practical shopping experience and a focused fashion campaign, using my own portrait as the lead visual.',
    problem:
      'Template-led stores can feel interchangeable, making it difficult for a small fashion collection to establish a clear identity while keeping products easy to discover.',
    solution:
      'The storefront pairs flexible Shopify sections with strong campaign imagery, clear collection navigation, responsive product layouts, and an uncluttered route from discovery to cart.',
    features: [
      'Custom Shopify theme sections built with Liquid',
      'Responsive collection and product layouts',
      'Campaign-led visual merchandising',
      'Clear product discovery and cart journeys',
      'Mobile-first storefront navigation',
    ],
    technologies: ['Shopify', 'Liquid', 'JavaScript', 'HTML', 'CSS', 'Responsive Design'],
    workflow: ['Campaign direction', 'Theme structure', 'Collection setup', 'Responsive build', 'Storefront refinement'],
    challenges: [
      'Balancing editorial imagery with fast product discovery',
      'Keeping reusable theme sections visually consistent',
      'Making the campaign feel considered across desktop and mobile',
    ],
    outcome:
      'A distinctive Shopify storefront concept that demonstrates theme customization, commerce UX, responsive frontend craft, and hands-on campaign direction.',
    tone: 'sage',
    githubUrl: 'https://github.com/AsimAslah/asimon-shopify-store',
    demoUrl: null,
    screenshot: '/images/projects/asimon-charcoal-utility-overshirt.png',
    screenshotAlt: 'Asim Aslah modelling the ASIMON Charcoal Utility Overshirt',
    screenshotSize: { width: 1254, height: 1254 },
  },
  {
    slug: 'ai-virtual-keyboard',
    visualKind: 'keyboard',
    title: 'AI Virtual Keyboard',
    shortTitle: 'Virtual Keyboard',
    label: 'Computer vision',
    summary:
      'A gesture-controlled virtual keyboard that uses real-time hand tracking to translate finger movement into keyboard interaction.',
    build:
      'A real-time webcam interface that maps hand landmarks and deliberate selection gestures to an on-screen keyboard.',
    contribution:
      'Built the OpenCV-based virtual keyboard and the hand-tracking, gesture-recognition, and key-selection flow for touch-free text entry.',
    description:
      'A computer-vision interface that explores touch-free input using webcam frames, hand landmarks, gesture rules, and on-screen keyboard controls.',
    problem:
      'Traditional input depends on physical contact and fixed hardware, limiting interaction in touch-free or accessibility-oriented scenarios.',
    solution:
      'The system tracks hand landmarks in real time, maps gestures to an on-screen keyboard, and applies deliberate selection logic to reduce accidental key presses.',
    features: ['Real-time hand landmark tracking', 'Gesture-based key selection', 'On-screen keyboard rendering', 'Visual interaction feedback'],
    technologies: ['Python', 'OpenCV', 'Computer Vision', 'Hand Tracking'],
    workflow: ['Webcam capture', 'Hand detection', 'Landmark mapping', 'Gesture evaluation', 'Keyboard event'],
    challenges: ['Reducing unintended gestures', 'Maintaining responsive frame processing', 'Mapping spatial hand movement to stable controls'],
    outcome:
      'A working exploration of gesture-based human-computer interaction using accessible computer-vision tools.',
    tone: 'blue',
    githubUrl: null,
    demoUrl: null,
    screenshot: null,
    screenshotAlt: null,
    screenshotSize: null,
  },
];

export const skillGroups = [
  { name: 'AI Evaluation & Quality', skills: ['LLM Evaluation', 'AI Quality Assurance', 'Rubric Design', 'Pairwise Preference Ranking', 'Evidence-Based Evaluation', 'Evaluation Analytics', 'Instruction-Following Assessment', 'AI Privacy Evaluation'] },
  { name: 'Generative AI & LLMs', skills: ['Retrieval-Augmented Generation (research)', 'Privacy-Aware AI', 'Generative AI Workflows', 'NLP', 'Named Entity Recognition'] },
  { name: 'Machine Learning & Deep Learning', skills: ['PyTorch', 'Computer Vision', 'Object Detection', 'Semantic Segmentation', 'TripoSR', 'YOLO', 'BiSeNet', 'OpenCV'] },
  { name: 'AI Research & Experimentation', skills: ['Conformal Risk Control (research)', 'Distribution Shift (research)', 'Privacy-Risk Estimation', 'NumPy', 'Pandas'] },
  { name: 'Backend Development', skills: ['Python', 'FastAPI', 'REST APIs', 'Server-Sent Events', 'Execution Observability', 'Uvicorn'] },
  { name: 'Frontend Development', skills: ['TypeScript', 'JavaScript', 'React', 'React Flow', 'Next.js', 'HTML', 'CSS', 'Liquid'] },
  { name: 'Databases & Cloud', skills: ['SQL', 'PostgreSQL', 'Supabase', 'Cloudflare Workers', 'Cloudflare D1', 'Shopify'] },
  { name: 'Testing & Developer Tools', skills: ['pytest', 'Playwright', 'Vitest', 'Node.js Test Runner', 'GitHub Actions', 'Git', 'GitHub', 'ESLint', 'Vite'] },
];

export const experience = {
  caption: 'Latest',
  title: 'Brickrat Product Internship',
  organization: 'Realviz LLP',
  product: 'Brickrat',
  period: '01 Jun 2026 — 31 Jul 2026',
  description:
    'Built and tested Brickrat’s image-to-3D application workflow, including FastAPI upload and inference, OBJ/GLB/USDZ asset generation, Supabase persistence, browser previews, REST endpoints, and mobile AR delivery through Apple Quick Look and Android Scene Viewer.',
};

export const education = [
  {
    degree: 'M.Tech — Artificial Intelligence & Data Science',
    institution: 'Government Engineering College, Palakkad',
    university: 'APJ Abdul Kalam Technological University',
    period: '2025 — 2027',
  },
  {
    degree: 'B.Tech — Computer Science & Engineering',
    institution: 'MES College of Engineering, Kuttippuram',
    university: 'APJ Abdul Kalam Technological University',
    period: '2020 — 2024',
  },
];
