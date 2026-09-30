import {redirect,notFound} from 'next/navigation';
import {adminDb} from '@/lib/supabase/server';
import {AdminEditor} from '@/components/admin-editor';
import type {Opportunity} from '@/lib/model';
export default async function Edit({params}:{params:Promise<{id:string}>}){const db=await adminDb();if(!db)redirect('/admin/login');const {id}=await params;let call:Opportunity|undefined;if(id!=='new'){const {data,error}=await db.from('opportunities').select('*,requirements(*)').eq('id',id).maybeSingle();if(error||!data)notFound();call=data as Opportunity;}return <section className="page-section"><p className="eyebrow">PRIVATE EDITORIAL DESK</p><h1 className="page-title">{call?'Edit the call.':'New call.'}</h1><AdminEditor initial={call}/></section>;}
