import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="not-found shell">
        <p className="micro-label">404 / Route not found</p>
        <h1>This page slipped outside the build.</h1>
        <p>The portfolio is still here. Return to the work, experience, and contact details on the home page.</p>
        <Link className="primary-button" href="/#home" prefetch={false} data-sound="navigation">
          <ArrowLeft aria-hidden="true" /> Back to {profile.shortName}&apos;s portfolio
        </Link>
      </main>
    </>
  );
}
