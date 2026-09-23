import { education, experience, profile, projects, skillGroups } from '../../data/profile.ts';
import type { ByteKnowledge, ByteLink } from './types.ts';

export const BYTE_SUGGESTIONS = [
  'What did Asim build?',
  'Tell me about DataVeil',
  'How does Image-to-3D work?',
  'What is Velora?',
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
const imageTo3d = projectBySlug('image-to-3d-ar');
const velora = projectBySlug('velora');
const virtualKeyboard = projectBySlug('ai-virtual-keyboard');

export const byteKnowledge: ByteKnowledge = {
  answers: {
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
    velora: {
      text: `${velora.title} ${velora.summary} It is accurately presented as an in-progress frontend exploration, using ${velora.technologies.join(', ')}.`,
      links: projectLinks(velora.slug),
    },
    virtualKeyboard: {
      text: `${virtualKeyboard.title} ${virtualKeyboard.summary} Its workflow covers ${virtualKeyboard.workflow.join(', ').toLowerCase()}.`,
      links: projectLinks(virtualKeyboard.slug),
    },
  },
  fallback: {
    text: 'I’m a small scripted portfolio guide, so I may not have that answer. Try asking about Asim’s projects, DataVeil, Image-to-3D, experience, education, skills, resume, or contact details.',
    links: [
      { href: '/#projects', label: 'Browse projects' },
      { href: '/#contact', label: 'Contact Asim' },
    ],
  },
};
