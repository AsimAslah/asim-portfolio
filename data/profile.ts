export type ProjectTone = 'indigo' | 'amber' | 'sage' | 'blue';

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  label: string;
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
  outcome: string;
  tone: ProjectTone;
  githubUrl: string | null;
  demoUrl: string | null;
  screenshot: string | null;
  screenshotAlt: string | null;
  screenshotSize: { width: number; height: number } | null;
  adVideo?: { src: string; poster: string };
};

export const profile = {
  name: 'Asim Aslah P M',
  shortName: 'Asim',
  role: 'AI/ML & Generative AI Developer | AI Research | Full-Stack Software Engineer',
  location: 'Palakkad, Kerala, India',
  email: 'asimaslu7@gmail.com',
  whatsappUrl:
    'https://wa.me/919207900426?text=Hi%20Asim%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect.',
  githubUrl: 'https://github.com/AsimAslah',
  linkedinUrl: 'https://www.linkedin.com/in/asim-aslah-pm-05906a222',
  resumeUrl: '/Asim_Aslah_GenAI_AIResearch_FullStack_Resume.pdf',
  siteUrl: 'https://asim-portfolio.asimaslu7.workers.dev',
  headline: 'Building privacy-aware AI systems and full-stack products from research concepts to deployed applications.',
  intro:
    'I build Python and FastAPI systems that turn AI models and research ideas into usable products. My work spans computer vision, privacy-preserving AI, retrieval-augmented generation research, REST APIs, and React applications deployed on Cloudflare.',
  about:
    'I am a computer science graduate pursuing an M.Tech in Artificial Intelligence & Data Science at Government Engineering College, Palakkad. My current research explores conformal privacy-risk routing for retrieval-augmented generation under PII distribution shift. I also build and test full-stack AI applications with Python, FastAPI, React, and cloud services.',
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
    slug: 'image-to-3d-ar',
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
  { name: 'Generative AI & LLMs', skills: ['Retrieval-Augmented Generation (research)', 'Privacy-Aware AI', 'Generative AI Workflows', 'NLP', 'Named Entity Recognition'] },
  { name: 'Machine Learning & Deep Learning', skills: ['PyTorch', 'Computer Vision', 'Object Detection', 'Semantic Segmentation', 'TripoSR', 'YOLO', 'BiSeNet', 'OpenCV'] },
  { name: 'AI Research & Experimentation', skills: ['Conformal Risk Control (research)', 'Distribution Shift (research)', 'Privacy-Risk Estimation', 'NumPy', 'Pandas'] },
  { name: 'Backend Development', skills: ['Python', 'FastAPI', 'REST APIs', 'Uvicorn'] },
  { name: 'Frontend Development', skills: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'HTML', 'CSS', 'Liquid'] },
  { name: 'Databases & Cloud', skills: ['SQL', 'Supabase', 'Cloudflare Workers', 'Cloudflare D1', 'Shopify'] },
  { name: 'Testing & Developer Tools', skills: ['pytest', 'Node.js Test Runner', 'GitHub Actions', 'Git', 'GitHub', 'ESLint', 'Vite'] },
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
