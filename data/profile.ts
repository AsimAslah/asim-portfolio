export type ProjectTone = 'indigo' | 'amber' | 'sage' | 'blue';

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  label: string;
  summary: string;
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
};

// Replace null values as links and contact details become available.
export const profile = {
  name: 'Asim Aslah P M',
  shortName: 'Asim',
  role: 'AI & Full-Stack Developer',
  location: 'Palakkad, Kerala, India',
  email: null as string | null,
  githubUrl: null as string | null,
  linkedinUrl: null as string | null,
  resumeUrl: '/resume.pdf',
  siteUrl: null as string | null,
  headline: 'Building useful products at the intersection of AI and the web.',
  intro:
    'I build practical AI-powered applications using Python, FastAPI, modern web technologies, computer vision, and machine learning.',
  about:
    'I am a computer science graduate currently pursuing an M.Tech in Artificial Intelligence & Data Science at Government Engineering College, Palakkad. My work is focused on practical AI systems, computer vision, privacy-preserving AI, and full-stack products that move beyond experimental notebooks into usable applications.',
};

export const navigation = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Education', href: '/#education' },
  { label: 'Contact', href: '/#contact' },
];

export const projects: Project[] = [
  {
    slug: 'dataveil',
    title: 'DataVeil — Privacy-Preserving AI Middleware',
    shortTitle: 'DataVeil',
    label: 'Privacy-preserving AI',
    summary:
      'Masks sensitive information in text and images before it reaches external AI systems, then supports safe restoration afterward.',
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
    technologies: ['Python', 'FastAPI', 'NLP', 'Computer Vision', 'U2-Net', 'JavaScript', 'HTML/CSS'],
    workflow: ['Input inspection', 'Entity detection', 'Local masking', 'External AI request', 'Protected restoration'],
    challenges: [
      'Preserving enough semantic context for useful AI responses',
      'Handling sensitive information consistently across text and images',
      'Keeping the privacy-critical portion of the workflow local-first',
    ],
    outcome:
      'A practical middleware concept that demonstrates how privacy controls can sit between users and generative AI services without discarding the utility of those services.',
    tone: 'indigo',
    githubUrl: null,
    demoUrl: null,
    screenshot: null,
  },
  {
    slug: 'image-to-3d-ar',
    title: 'AI Image-to-3D & AR Platform',
    shortTitle: 'Image-to-3D & AR',
    label: '3D reconstruction / AR',
    summary:
      'Converts a single furniture or product image into a 3D model for interactive browser viewing and augmented-reality preview.',
    description:
      'A full-stack product workflow that connects single-image reconstruction, file conversion, 3D delivery, and device-appropriate AR experiences.',
    problem:
      'Creating a 3D asset for every product is expensive, while customers still benefit from spatial previews before making a purchase decision.',
    solution:
      'The platform accepts a single product image, reconstructs a 3D asset with TripoSR, prepares web and mobile formats, and exposes the result through an interactive viewer and iPhone AR Quick Look.',
    features: [
      'Single-image 3D reconstruction with TripoSR',
      'OBJ, GLB, and USDZ asset generation',
      'Interactive web-based 3D preview',
      'iPhone AR Quick Look and installable PWA flow',
    ],
    technologies: ['Python', 'FastAPI', 'TripoSR', 'PyTorch', 'Three.js', 'Supabase', 'PWA', 'AR'],
    workflow: ['Image upload', 'Pre-processing', '3D reconstruction', 'Format conversion', 'Web / AR delivery'],
    challenges: [
      'Producing usable geometry from a single limited viewpoint',
      'Converting assets for consistent web and iPhone support',
      'Managing GPU-heavy generation behind a responsive product flow',
    ],
    outcome:
      'An end-to-end prototype connecting AI reconstruction to a practical shopping and product-visualization experience.',
    tone: 'amber',
    githubUrl: null,
    demoUrl: null,
    screenshot: null,
  },
  {
    slug: 'velora',
    title: 'Velora — Interactive Furniture Website',
    shortTitle: 'Velora',
    label: 'Frontend / product design',
    summary:
      'A modern furniture website focused on premium product presentation, responsive layouts, and smooth motion-based interactions.',
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
  },
  {
    slug: 'ai-virtual-keyboard',
    title: 'AI Virtual Keyboard',
    shortTitle: 'Virtual Keyboard',
    label: 'Computer vision',
    summary:
      'A gesture-controlled virtual keyboard that uses real-time hand tracking to translate finger movement into keyboard interaction.',
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
  },
];

export const academicWork = [
  { title: 'CBOW Word Prediction', area: 'Natural Language Processing' },
  { title: 'CIFAR-10 Image Classification', area: 'Deep Learning' },
  { title: 'SVD-Based Anomaly Detection', area: 'Machine Learning' },
  { title: 'Statistical Intrusion Detection Research', area: 'Cybersecurity Research' },
  { title: 'Neural Network Intrusion Detection', area: 'Deep Learning Research' },
];

export const skillGroups = [
  { name: 'Languages', skills: ['Python', 'JavaScript', 'TypeScript', 'SQL'] },
  { name: 'AI / Machine Learning', skills: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP', 'PyTorch', 'OpenCV', 'Image Processing', 'Generative AI concepts'] },
  { name: 'Backend', skills: ['FastAPI', 'REST APIs', 'Python backend development'] },
  { name: 'Frontend', skills: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS', 'JavaScript'] },
  { name: 'Data / Cloud / Tools', skills: ['Supabase', 'Git', 'GitHub', 'Vercel', 'PWA'] },
];

export const focusAreas = [
  'AI-powered web applications',
  'Privacy-preserving AI',
  'Computer vision systems',
  'Image-to-3D workflows',
  'Full-stack product development',
  'API development',
  'Progressive Web Apps',
];

export const education = [
  {
    degree: 'M.Tech — Artificial Intelligence & Data Science',
    institution: 'Government Engineering College, Palakkad',
    university: 'APJ Abdul Kalam Technological University',
    period: 'Current',
  },
  {
    degree: 'B.Tech — Computer Science & Engineering',
    institution: null as string | null,
    university: null as string | null,
    period: 'Graduated 2024',
  },
];
