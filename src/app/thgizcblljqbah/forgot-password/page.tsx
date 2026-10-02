import { AdminPasswordRequest } from '@/components/admin-password-recovery';
import { PageHeader } from '@/components/page-header';

export const metadata = { title: 'Recover admin access' };

export default function ForgotPasswordPage() {
  return (
    <section className="page-section layout-form layout-narrow">
      <PageHeader eyebrow="Administration" title="Choose a password" intro="We will email a private link to an existing admin account." />
      <AdminPasswordRequest />
    </section>
  );
}
