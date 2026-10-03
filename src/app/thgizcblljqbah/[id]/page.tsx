import { redirect, notFound } from 'next/navigation';
import { adminDb } from '@/lib/supabase/server';
import { AdminEditor } from '@/components/admin-editor';
import {ADMIN_LOGIN_PATH} from '@/lib/admin-route';
import type { Opportunity } from '@/lib/model';
import { PageHeader } from '@/components/page-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit opportunity',
  description: 'Private ComicReady editor for maintaining an opportunity and its source-linked requirements.',
};

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const db = await adminDb();
  if (!db) redirect(ADMIN_LOGIN_PATH);

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
