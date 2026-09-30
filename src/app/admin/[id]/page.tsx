import { redirect, notFound } from 'next/navigation';
import { adminDb } from '@/lib/supabase/server';
import { AdminEditor } from '@/components/admin-editor';
import type { Opportunity } from '@/lib/model';
import { PageHeader } from '@/components/page-header';

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const db = await adminDb();
  if (!db) redirect('/admin/login');

  const { id } = await params;
  let call: Opportunity | undefined;

  if (id !== 'new') {
    const { data, error } = await db.from('opportunities').select('*,requirements(*)').eq('id', id).maybeSingle();
    if (error || !data) notFound();
    call = data as Opportunity;
  }

  return (
    <section className="page-section layout-admin">
      <PageHeader eyebrow="Private editorial desk" title={call ? 'Edit the call.' : 'New call.'} />
      <AdminEditor initial={call} />
    </section>
  );
}
