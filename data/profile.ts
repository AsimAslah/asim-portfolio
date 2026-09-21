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
  outcome: string;
  tone: ProjectTone;
  githubUrl: string | null;
  demoUrl: string | null;
  screenshot: string | null;
  screenshotAlt: string | null;
  screenshotSize: { width: number; height: number } | null;
};

export const profile = {
  name: 'Asim Aslah P M',
  shortName: 'Asim',
  role: 'AI & Full-Stack Developer',
  location: 'Palakkad, Kerala, India',
  email: 'asimaslu7@gmail.com',
  whatsappUrl:
    'https://wa.me/919207900426?text=Hi%20Asim%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect.',
  githubUrl: 'https://github.com/AsimAslah',
  linkedinUrl: 'https://www.linkedin.com/in/asim-aslah-pm-05906a222',
  resumeUrl: '/resume.pdf',
  siteUrl: 'https://asim-aslah-portfolio.asimaslu7.chatgpt.site',
  headline: 'Building useful products at the intersection of AI and the web.',
  intro:
    'I build intelligent digital products across AI, computer vision, privacy, 3D generation, and modern web systems.',
  about:
    'I am a computer science graduate currently pursuing an M.Tech in Artificial Intelligence & Data Science at Government Engineering College, Palakkad. My work is focused on practical AI systems, computer vision, privacy-preserving AI, and full-stack products that move beyond experimental notebooks into usable applications.',
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
    title: 'AI Image-to-3D Platform',
    shortTitle: 'Image-to-3D',
    label: '3D reconstruction',
    summary:
      'Converts a single product image into a 3D mesh with preprocessing controls, interactive preview, and OBJ/GLB export.',
    build:
      'A Gradio workflow and FastAPI product studio for image upload, TripoSR inference, mesh export, preview, and Supabase-backed product records.',
    contribution:
      'Integrated the pretrained TripoSR model into the application workflow, added preprocessing and mesh controls, built interactive previews and exports, and documented the project without claiming ownership of the underlying model.',
    description:
      'A practical application layer around TripoSR that connects single-image reconstruction to configurable preprocessing, model preview, export, and a product-management workflow.',
    problem:
      'Creating a 3D asset for every product is expensive, while customers still benefit from spatial previews before making a purchase decision.',
    solution:
      'The application accepts a single image, optionally removes its background, runs TripoSR inference, extracts a mesh, and makes the result available for interactive preview and OBJ/GLB export.',
    features: [
      'Single-image 3D reconstruction with TripoSR',
      'OBJ and GLB mesh export',
      'Interactive web-based 3D preview',
      'FastAPI product workflow with Supabase asset records',
    ],
    technologies: ['Python', 'FastAPI', 'TripoSR', 'PyTorch', 'Gradio', 'Supabase', 'OBJ / GLB'],
    workflow: ['Image upload', 'Pre-processing', 'TripoSR inference', 'Mesh extraction', 'Preview and export'],
    challenges: [
      'Producing usable geometry from a single limited viewpoint',
      'Turning model output into reliable preview and export formats',
      'Managing GPU-heavy generation behind a responsive product flow',
    ],
    outcome:
      'A reproducible application with verified chair outputs, interactive preview, and downloadable OBJ and GLB files.',
    tone: 'amber',
    githubUrl: 'https://github.com/AsimAslah/Image-to-3D',
    demoUrl: null,
    screenshot: '/images/projects/image-to-3d-result.png',
    screenshotAlt: 'Image-to-3D application showing the source chair, processed image, and generated GLB preview',
    screenshotSize: { width: 1861, height: 1002 },
  },
  {
    slug: 'dataveil',
    title: 'DataVeil — Privacy-Preserving AI Middleware',
    shortTitle: 'DataVeil',
    label: 'Privacy-preserving AI',
    summary:
      'Masks sensitive information in text and images before it reaches external AI systems, then supports safe restoration afterward.',
    build:
      'A local-first middleware flow that detects sensitive content, applies reversible masks, and restores protected AI responses.',
    contribution:
      'Designed a unified FastAPI application that combines document and image masking, local detection, selectable privacy effects, recovery packages, and post-AI restoration in one workflow.',
    description:
      'A local-first privacy layer designed to reduce exposure risks when people use generative AI services with sensitive text, documents, and images.',
    problem:
      'Using external AI tools can expose names, identifiers, documents, and visual information that users did not intend to share with a third party.',
    solution:
      'DataVeil detects sensitive entities, replaces them with reversible semantic masks, and provides a controlled restoration path after the external AI response is received.',
    features: [
      'Sensitive entity detection in text and documents',
      'Semantic and reversible anonymization',
      'Image-region masking with local processing',
      'Protected request and response restoration workflow',
    ],
    technologies: ['Python', 'FastAPI', 'Presidio', 'spaCy', 'YOLO', 'OpenCV', 'BiSeNet'],
    workflow: ['Input inspection', 'Entity detection', 'Local masking', 'External AI request', 'Protected restoration'],
    challenges: [
      'Preserving enough semantic context for useful AI responses',
      'Handling sensitive information consistently across text and images',
      'Keeping the privacy-critical portion of the workflow local-first',
    ],
    outcome:
      'A practical middleware concept that demonstrates how privacy controls can sit between users and generative AI services without discarding the utility of those services.',
    tone: 'indigo',
    githubUrl: 'https://github.com/AsimAslah/Dataveil',
    demoUrl: null,
    screenshot: '/images/projects/dataveil-home.png',
    screenshotAlt: 'DataVeil home screen presenting local document and image privacy workflows',
    screenshotSize: { width: 1387, height: 953 },
  },
  {
    slug: 'velora',
    title: 'Velora — Interactive Furniture Website',
    shortTitle: 'Velora',
    label: 'Frontend / product design',
    summary:
      'A modern furniture website focused on premium product presentation, responsive layouts, and smooth motion-based interactions.',
    build:
      'A responsive product catalogue with editorial layouts, collection storytelling, and restrained motion across screen sizes.',
    contribution:
      'Implemented the responsive catalogue experience, interaction states, and motion-led product presentation described in this portfolio.',
    description:
      'A design-led frontend project exploring how hierarchy, imagery, motion, and responsive composition can make a product catalogue feel considered and easy to browse.',
    problem:
      'Furniture catalogues can become visually dense and generic, making it difficult for individual products and collections to feel distinctive.',
    solution:
      'Velora uses editorial layouts, purposeful spacing, responsive product storytelling, and restrained motion to create a more premium browsing experience.',
    features: ['Responsive product layouts', 'Motion-led browsing interactions', 'Collection and product presentation', 'Mobile-first navigation patterns'],
    technologies: ['React', 'JavaScript', 'HTML', 'CSS', 'Responsive Design', 'Motion'],
    workflow: ['Content hierarchy', 'Responsive layout', 'Interaction states', 'Motion refinement', 'Cross-device review'],
    challenges: ['Keeping product layouts expressive across screen sizes', 'Using motion without delaying navigation', 'Maintaining consistent spacing and hierarchy'],
    outcome:
      'A polished frontend experience demonstrating product-focused UI design and responsive implementation.',
    tone: 'sage',
    githubUrl: null,
    demoUrl: null,
    screenshot: null,
    screenshotAlt: null,
    screenshotSize: null,
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
  { name: 'Languages', skills: ['Python', 'JavaScript', 'TypeScript', 'SQL'] },
  { name: 'AI / Machine Learning', skills: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP', 'PyTorch', 'OpenCV', 'Image Processing'] },
  { name: 'Backend', skills: ['FastAPI', 'REST APIs', 'Supabase'] },
  { name: 'Frontend', skills: ['React', 'Next.js', 'Three.js', 'HTML', 'CSS', 'Tailwind CSS', 'PWA'] },
  { name: 'Tools', skills: ['Git', 'GitHub'] },
];

export const experience = {
  caption: 'Latest',
  title: 'Brickrat Product Internship',
  organization: 'Realviz LLP',
  product: 'Brickrat',
  period: '01 Jun 2026 — 31 Jul 2026',
  description:
    'Contributed to the Brickrat product during a two-month internship with Realviz LLP under the guidance of CEO Indrajith Kottarathil.',
  credentialUrl: '/documents/internship-completion-realviz-2026.pdf',
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
