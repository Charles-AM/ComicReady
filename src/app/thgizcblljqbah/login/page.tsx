import { PageHeader } from '@/components/page-header';
import { AdminLogin } from '@/components/admin-login';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin sign in',
  description: 'Private sign-in for the ComicReady editorial workspace.',
};

export default function LoginPage() {
  return (
    <section className="page-section layout-form layout-narrow">
      <PageHeader eyebrow="Administration" title="Sign in" intro="Private access for maintaining calls and reviewing corrections." />
      <AdminLogin />
    </section>
  );
}
