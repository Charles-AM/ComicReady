import { AdminPasswordUpdate } from '@/components/admin-password-recovery';
import { PageHeader } from '@/components/page-header';

export const metadata = { title: 'Set admin password' };

export default function ResetPasswordPage() {
  return (
    <section className="page-section layout-form layout-narrow">
      <PageHeader eyebrow="Administration" title="Set your password" intro="Choose the password you will use for future ComicReady admin sign-ins." />
      <AdminPasswordUpdate />
    </section>
  );
}
