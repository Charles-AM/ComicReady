import { PageHeader } from '@/components/page-header';
import { AdminLogin } from '@/components/admin-login';

export const metadata = { title: 'Admin sign in' };

export default function LoginPage() {
  return (
    <section className="page-section layout-form layout-narrow">
      <PageHeader eyebrow="Administration" title="Sign in" intro="Private access for maintaining calls and reviewing corrections." />
      <AdminLogin />
    </section>
  );
}
