import { education, experience, profile, projects, skillGroups } from '../data/profile.ts';

export type ByteLink = {
  href: string;
  label: string;
};

export type ByteAnswer = {
  links: ByteLink[];
  text: string;
};

export const BYTE_SUGGESTIONS = [
  'What did Asim build?',
  'Tell me about DataVeil',
  'How does Image-to-3D work?',
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

const answers = {
  contact: {
    text: `The quickest route is email at ${profile.email}. You can also connect with Asim on LinkedIn, message him on WhatsApp, or use the contact section below.`,
    links: [
      { href: `mailto:${profile.email}`, label: 'Email Asim' },
      { href: profile.linkedinUrl, label: 'LinkedIn' },
      { href: profile.whatsappUrl, label: 'WhatsApp' },
      { href: '#contact', label: 'Contact options' },
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
    links: [{ href: '#about', label: 'About and education' }],
  },
  experience: {
    text: `${experience.title} at ${experience.organization}, ${experience.period}. ${experience.description}`,
    links: [{ href: '#experience', label: 'View experience' }],
  },
  imageTo3d: {
    text: `${imageTo3d.title} ${imageTo3d.summary} The flow covers ${imageTo3d.workflow.join(', ').toLowerCase()}, with ${imageTo3d.technologies.join(', ')} in the verified stack.`,
    links: projectLinks(imageTo3d.slug),
  },
  overview: {
    text: `${profile.intro} Featured work includes ${projects.map((project) => project.shortTitle).join(', ')}.`,
    links: [
      { href: '#projects', label: 'Browse projects' },
      { href: profile.githubUrl, label: 'Asim on GitHub' },
    ],
  },
  resume: {
    text: `Asim’s resume and the portfolio’s project details are available directly from this site.`,
    links: [
      { href: profile.resumeUrl, label: 'Open resume' },
      { href: '#projects', label: 'Browse projects' },
    ],
  },
  skills: {
    text: `Asim’s listed toolkit covers ${skillGroups.map((group) => `${group.name}: ${group.skills.join(', ')}`).join('; ')}.`,
    links: [{ href: '#skills', label: 'View technical skills' }],
  },
} satisfies Record<string, ByteAnswer>;

const fallback: ByteAnswer = {
  text: 'I’m a small scripted portfolio guide, so I may not have that answer. Try asking about Asim’s projects, DataVeil, Image-to-3D, experience, education, skills, resume, or contact details.',
  links: [
    { href: '#projects', label: 'Browse projects' },
    { href: '#contact', label: 'Contact Asim' },
  ],
};

export function getByteAnswer(question: string): ByteAnswer {
  const query = question.toLowerCase().replace(/[–—-]/g, ' ').trim();

  if (/dataveil|privacy|anonym/.test(query)) return answers.dataveil;
  if (/image\s*to\s*3d|3d|ar studio|triposr|furniture image/.test(query)) return answers.imageTo3d;
  if (/contact|email|reach|linkedin|whatsapp|hire/.test(query)) return answers.contact;
  if (/experience|intern|brickrat|realviz|work history/.test(query)) return answers.experience;
  if (/education|college|degree|study|m\.?(tech| tech)|b\.?(tech| tech)/.test(query)) return answers.education;
  if (/skill|stack|technolog|language|tool/.test(query)) return answers.skills;
  if (/resume|cv/.test(query)) return answers.resume;
  if (/project|build|built|work|portfolio|asim/.test(query)) return answers.overview;
  return fallback;
}
