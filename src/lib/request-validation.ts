import {z} from 'zod';
import {eventNames} from './measurement';
export const eventSchema=z.object({event:z.enum(eventNames),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(100)}).strict();
export const correctionSchema=z.object({slug:z.string().max(100),message:z.string().trim().min(10).max(2000),website:z.string().max(0)}).strict();
export function sameOrigin(request:Request){
 const origin=request.headers.get('origin');
 if(!origin||!request.headers.get('content-type')?.startsWith('application/json'))return false;
 try{
  const originUrl=new URL(origin);
  const requestUrl=new URL(request.url);
  const forwardedHost=request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const host=request.headers.get('host')?.split(',')[0]?.trim();
  const allowedHosts=new Set([requestUrl.host,forwardedHost,host].filter(Boolean));
  return (originUrl.protocol==='https:'||originUrl.protocol==='http:')&&allowedHosts.has(originUrl.host);
 }catch{return false;}
}
export async function boundedJson(request:Request,limit=8192){if(Number(request.headers.get('content-length')||0)>limit)throw new Error('Too large');const text=await request.text();if(text.length>limit)throw new Error('Too large');return JSON.parse(text);}
