import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { InteractionLayer } from '@/components/interaction-layer';
import { PortfolioUIProvider } from '@/components/portfolio-ui-provider';
import { profile } from '@/data/profile';
import './globals.css';
import './redesign.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: 'Asim Aslah | AI/ML, Generative AI & Full-Stack Developer',
    template: '%s | Asim Aslah',
  },
  description:
    'Portfolio of Asim Aslah, an AI/ML and Generative AI developer researching privacy-aware RAG and building tested full-stack applications with Python, FastAPI, React, and Cloudflare.',
  keywords: ['Asim Aslah', 'AI/ML Engineer', 'Generative AI Developer', 'AI Research', 'RAG', 'Full-Stack Developer', 'Python', 'FastAPI', 'React', 'Data Privacy'],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: profile.siteUrl ? { canonical: profile.siteUrl } : undefined,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Asim Aslah | AI/ML, Generative AI & Full-Stack Developer',
    description: 'AI/ML research and full-stack portfolio covering privacy-aware RAG, privacy-preserving AI, image-to-3D, FastAPI, React, and Cloudflare.',
    siteName: 'Asim Aslah — Portfolio',
    images: [{ url: '/og.png', width: 1731, height: 909, alt: 'Asim Aslah P M — AI Full-Stack Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asim Aslah | AI/ML, Generative AI & Full-Stack Developer',
    description: 'AI/ML research and full-stack portfolio covering privacy-aware RAG, privacy-preserving AI, image-to-3D, FastAPI, React, and Cloudflare.',
    images: ['/og.png'],
  },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f3ed' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0f15' },
  ],
};

const themeScript = `
  try {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) document.documentElement.classList.add('dark');
  } catch (_) {}
`;

const cloudflareAnalyticsToken =
  process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim();

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
        <PortfolioUIProvider>{children}</PortfolioUIProvider>
        {cloudflareAnalyticsToken ? (
          <script
            type="module"
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: cloudflareAnalyticsToken })}
          />
        ) : null}
      </body>
    </html>
  );
}
