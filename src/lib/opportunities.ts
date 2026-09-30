import 'server-only';
import { reviewedCatalog, developmentCall } from './catalog';
import { configured, publicDb } from './supabase/server';
import type { Opportunity } from './model';
export async function getOpportunities():Promise<Opportunity[]> {
 if(configured()){
  // Deliberately anonymous: an admin session must never expose drafts on public routes.
  const {data,error}=await publicDb().from('opportunities').select('*,requirements(*)').eq('published',true).order('last_verified_at',{ascending:false});
  if(error)throw new Error('The opportunity catalog is temporarily unavailable. Please try again.');
  return data as Opportunity[];
 }
 return process.env.COMICREADY_ENABLE_DEV_FIXTURES==='true'?[...reviewedCatalog,developmentCall]:reviewedCatalog;
}
export async function getOpportunity(slug:string){return (await getOpportunities()).find(c=>c.slug===slug&&c.published);}
