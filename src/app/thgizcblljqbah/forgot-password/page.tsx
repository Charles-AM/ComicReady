import { AdminPasswordRequest } from '@/components/admin-password-recovery';
import { PageHeader } from '@/components/page-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recover admin access',
  description: 'Request a password link for an existing ComicReady administrator account.',
};

export default function ForgotPasswordPage() {
  return (
    <section className="page-section layout-form layout-narrow">
      <PageHeader eyebrow="Administration" title="Choose a password" intro="We will email a private link to an existing admin account." />
      <AdminPasswordRequest />
    </section>
  );
}
