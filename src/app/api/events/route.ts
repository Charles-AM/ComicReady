import {configured,publicDb} from '@/lib/supabase/server';
import {boundedJson,eventSchema,sameOrigin} from '@/lib/request-validation';
export async function POST(request:Request){if(!sameOrigin(request))return new Response(null,{status:403});try{const {event,slug}=eventSchema.parse(await boundedJson(request,512));if(!configured())return new Response(null,{status:204});const {error}=await publicDb().rpc('record_product_event',{event_name:event,call_slug:slug});return new Response(null,{status:error?400:204});}catch{return new Response(null,{status:400});}}
