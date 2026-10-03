import { AdminPasswordUpdate } from '@/components/admin-password-recovery';
import { PageHeader } from '@/components/page-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Set admin password',
  description: 'Choose a password for an authorized ComicReady administrator account.',
};

export default function ResetPasswordPage() {
  return (
    <section className="page-section layout-form layout-narrow">
      <PageHeader eyebrow="Administration" title="Set your password" intro="Choose the password you will use for future ComicReady admin sign-ins." />
      <AdminPasswordUpdate />
    </section>
  );
}
