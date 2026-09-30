'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { adminDb,configured,sessionDb } from '@/lib/supabase/server';
import { opportunitySchema,requirementSchema } from '@/lib/validation';
export type ActionState={error?:string;success?:string;id?:string};
export async function login(_state:ActionState,form:FormData):Promise<ActionState>{
 if(!configured())return {error:'Supabase is not configured yet.'};
 const db=await sessionDb();const {error}=await db.auth.signInWithPassword({email:String(form.get('email')||''),password:String(form.get('password')||'')});
 if(error)return {error:'Sign-in failed. Check your credentials.'};
 if(!await adminDb()){await db.auth.signOut();return {error:'This account is not authorized as an admin.'};}
 redirect('/admin');
}
export async function logout(){const db=await sessionDb();await db.auth.signOut();redirect('/admin/login');}
export async function saveCall(_state:ActionState,form:FormData):Promise<ActionState>{
 const db=await adminDb();if(!db)return {error:'Admin authorization required. Sign in again.'};
 try{
  const raw=JSON.parse(String(form.get('payload')));const doc=opportunitySchema.parse(raw);const rules=requirementSchema.array().min(1).max(100).parse(raw.requirements);
  if(rules.some(r=>r.opportunity_id!==doc.id))return {error:'Every rule must belong to this opportunity.'};
  if(rules.some(r=>new URL(r.source_url).hostname!==new URL(doc.official_url).hostname))return {error:'Rules must link to the same official organizer host. Link the original guideline section.'};
  const verified=form.get('verified')==='on';if(doc.published&&!verified)return {error:'Review the official source and check the verification box before publishing.'};
  const {error}=await db.rpc('save_opportunity',{doc,rules,verified,note:String(form.get('note')||'')});
  if(error)return {error:'Save failed. Check that the slug is unique and the database migration is installed.'};
  revalidatePath('/opportunities');revalidatePath('/admin');return {success:doc.published?'Published and verified.':'Draft saved.',id:doc.id};
 }catch{return {error:'Check all fields, URLs, rule comparisons, and the deadline timezone. A sourced requirement is required.'};}
}
