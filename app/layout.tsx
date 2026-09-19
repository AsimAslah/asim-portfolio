import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { InteractionLayer } from '@/components/interaction-layer';
import { profile } from '@/data/profile';
import './globals.css';
import './project-demos.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Asim Aslah | AI & Full-Stack Developer',
    template: '%s | Asim Aslah',
  },
  description:
    'Portfolio of Asim Aslah, an AI and Full-Stack Developer building applications in computer vision, privacy-preserving AI, image-to-3D generation and modern web technologies.',
  keywords: ['Asim Aslah', 'AI Engineer', 'Full-Stack Developer', 'Python Developer', 'Computer Vision', 'FastAPI'],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: profile.siteUrl ? { canonical: profile.siteUrl } : undefined,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Asim Aslah | AI & Full-Stack Developer',
    description: 'Practical AI systems, computer vision, privacy-preserving AI, and modern full-stack products.',
    siteName: 'Asim Aslah — Portfolio',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Asim Aslah P M — AI & Full-Stack Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asim Aslah | AI & Full-Stack Developer',
    description: 'Practical AI systems, computer vision, privacy-preserving AI, and modern full-stack products.',
    images: ['/og.png'],
  },
  icons: { icon: '/favicon.svg' },
};

const themeScript = `
  try {
    const saved = localStorage.getItem('theme');
    if (saved !== 'light') document.documentElement.classList.add('dark');
  } catch (_) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InteractionLayer />
        {children}
      </body>
    </html>
  );
}
