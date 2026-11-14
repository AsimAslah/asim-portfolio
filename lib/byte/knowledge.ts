import { education, experience, profile, projects, skillGroups } from '../../data/profile.ts';
import type { ByteKnowledge, ByteLink } from './types.ts';

export const BYTE_SUGGESTIONS = [
  'What did Asim build?',
  'What is EvalLens?',
  'How does EvalLens evaluate AI responses?',
  'What is AI Quality Lab?',
  'What is the difference between the evaluation projects?',
  'Does Asim have AI evaluation experience?',
  'What are Asim’s latest projects?',
  'What is PIIShift-RAG?',
  'Tell me about DataVeil',
  'How does Image-to-3D work?',
  'Tell me about the Shopify store',
  'How does Virtual Keyboard work?',
  'What experience does Asim have?',
  'What skills does Asim use?',
  'Where did Asim study?',
  'Can I view his résumé?',
  'How can I contact him?',
] as const;

function projectBySlug(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Missing portfolio project: ${slug}`);
  return project;
}

function projectLinks(slug: string): ByteLink[] {
  const project = projectBySlug(slug);
  return [
    { href: `/projects/${project.slug}`, label: `View ${project.shortTitle}` },
    ...(project.githubUrl ? [{ href: project.githubUrl, label: 'GitHub repository' }] : []),
  ];
}

const dataVeil = projectBySlug('dataveil');
const evalLens = projectBySlug('evallens');
const aiQualityLab = projectBySlug('ai-quality-lab');
const imageTo3d = projectBySlug('image-to-3d-ar');
const shopify = projectBySlug('shopify-fashion-store');
const virtualKeyboard = projectBySlug('ai-virtual-keyboard');

export const byteKnowledge: ByteKnowledge = {
  answers: {
    aiEvaluation: {
      text: 'Asim has hands-on AI evaluation engineering experience through completed personal projects. EvalLens covers human-centered pairwise comparison, rubric scoring, evidence-backed preference, and analytics; AI Quality Lab covers explainable automated checks, privacy gating, live execution observability, replay, and failure recovery. This portfolio does not present those projects as professional AI-evaluation employment.',
      links: [
        { href: '/projects/evallens', label: 'Explore EvalLens' },
        { href: '/projects/ai-quality-lab', label: 'Explore AI Quality Lab' },
      ],
    },
    aiEvaluationComparison: {
      text: 'EvalLens is the human-centered comparative platform: an evaluator scores two supplied responses independently, records evidence, and makes an explicit preference that remains separate from the calculated rubric score. AI Quality Lab automates deterministic and labeled heuristic checks, then exposes the real eight-stage server execution through persisted events, SSE, replay, privacy checks, and failure recovery.',
      links: [
        { href: '/projects/evallens', label: 'View EvalLens' },
        { href: '/projects/ai-quality-lab', label: 'View AI Quality Lab' },
      ],
    },
    aiQualityLab: {
      text: `${aiQualityLab.title} ${aiQualityLab.summary} Its execution graph is reconstructed from ordered persisted backend events; playback speed changes only the replay presentation, not the original timestamps or durations. The implementation is complete, but no public Replit deployment is claimed yet.`,
      links: projectLinks(aiQualityLab.slug),
    },
    contact: {
      text: `The quickest route is email at ${profile.email}. You can also connect with Asim on LinkedIn, message him on WhatsApp, or use the contact section below.`,
      links: [
        { href: `mailto:${profile.email}`, label: 'Email Asim' },
        { href: profile.linkedinUrl, label: 'LinkedIn' },
        { href: profile.whatsappUrl, label: 'WhatsApp' },
        { href: '/#contact', label: 'Contact options' },
      ],
    },
    dataveil: {
      text: `${dataVeil.title} ${dataVeil.summary} The verified stack listed here includes ${dataVeil.technologies.join(', ')}.`,
      links: projectLinks(dataVeil.slug),
    },
    education: {
      text: education
        .map((item) => `${item.degree} at ${item.institution} (${item.period})`)
        .join(' He also completed '),
      links: [{ href: '/#about', label: 'About and education' }],
    },
    experience: {
      text: `${experience.title} at ${experience.organization}, ${experience.period}. ${experience.description}`,
      links: [{ href: '/#experience', label: 'View experience' }],
    },
    imageTo3d: {
      text: `${imageTo3d.title} ${imageTo3d.summary} The flow covers ${imageTo3d.workflow.join(', ').toLowerCase()}, with ${imageTo3d.technologies.join(', ')} in the verified stack.`,
      links: projectLinks(imageTo3d.slug),
    },
    overview: {
      text: `${profile.intro} Featured work includes ${projects.map((project) => project.shortTitle).join(', ')}.`,
      links: [
        { href: '/#projects', label: 'Browse projects' },
        { href: profile.githubUrl, label: 'Asim on GitHub' },
      ],
    },
    piishift: {
      text: 'PIIShift-RAG is Asim’s ongoing M.Tech research on conformal privacy-risk routing for retrieval-augmented generation under PII distribution shift. The research framing and proposed architecture are defined, while implementation choices, experiments, and empirical results remain future work.',
      links: [{ href: '/projects/piishift-rag', label: 'Explore PIIShift-RAG research' }],
    },
    resume: {
      text: `Asim’s resume and the portfolio’s project details are available directly from this site.`,
      links: [
        { href: profile.resumeUrl, label: 'Open resume' },
        { href: '/#projects', label: 'Browse projects' },
      ],
    },
    skills: {
      text: `Asim’s listed toolkit covers ${skillGroups.map((group) => `${group.name}: ${group.skills.join(', ')}`).join('; ')}.`,
      links: [{ href: '/#skills', label: 'View technical skills' }],
    },
    shopify: {
      text: `${shopify.title} ${shopify.summary} Asim designed the storefront experience, directed the campaign, and modelled for its lead photography. The project uses ${shopify.technologies.join(', ')}.`,
      links: projectLinks(shopify.slug),
    },
    virtualKeyboard: {
      text: `${virtualKeyboard.title} ${virtualKeyboard.summary} Its workflow covers ${virtualKeyboard.workflow.join(', ').toLowerCase()}.`,
      links: projectLinks(virtualKeyboard.slug),
    },
    evallens: {
      text: `${evalLens.title} ${evalLens.summary} It applies a selected default or custom weighted rubric to Responses A and B independently, excludes per-response N/A criteria from normalization, snapshots the rubric at save time, and keeps explicit human preference separate from calculated scores.`,
      links: [
        ...projectLinks(evalLens.slug),
        ...(evalLens.demoUrl ? [{ href: evalLens.demoUrl, label: 'Open live EvalLens' }] : []),
      ],
    },
    latestProjects: {
      text: `Asim’s latest completed projects are ${evalLens.shortTitle}, a human-centered pairwise evaluation and analytics platform, and ${aiQualityLab.shortTitle}, an explainable evaluation workspace with observable server execution and failure recovery.`,
      links: [
        { href: '/projects/evallens', label: 'View EvalLens' },
        { href: '/projects/ai-quality-lab', label: 'View AI Quality Lab' },
      ],
    },
  },
  fallback: {
    text: 'I’m a small scripted portfolio guide, so I may not have that answer. Try asking about EvalLens, AI Quality Lab, Asim’s AI evaluation projects, PIIShift-RAG, other projects, experience, education, skills, resume, or contact details.',
    links: [
      { href: '/#projects', label: 'Browse projects' },
      { href: '/#contact', label: 'Contact Asim' },
    ],
  },
};
