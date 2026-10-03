import {expect,test} from 'vitest';
import {boundedJson,eventSchema,correctionSchema,sameOrigin} from '../src/lib/request-validation';
test('measurement rejects project details and unrecognized events',()=>{
 expect(eventSchema.safeParse({event:'fit_check_completed',slug:'test-call'}).success).toBe(true);
 expect(eventSchema.safeParse({event:'page_viewed',slug:'home'}).success).toBe(true);
 expect(eventSchema.safeParse({event:'fit_check_completed',slug:'test-call',project:{storyPages:8}}).success).toBe(false);
 expect(eventSchema.safeParse({event:'story_uploaded',slug:'test-call'}).success).toBe(false);
});
test('corrections reject honeypot and oversized messages',()=>{
 expect(correctionSchema.safeParse({slug:'',message:'Please correct this guideline.',website:''}).success).toBe(true);
 expect(correctionSchema.safeParse({slug:'',message:'Please correct this guideline.',website:'spam'}).success).toBe(false);
 expect(correctionSchema.safeParse({slug:'',message:'x'.repeat(2001),website:''}).success).toBe(false);
});
test('requests require matching origin and JSON',()=>{
 const request=(origin:string,type='application/json')=>new Request('https://comicready.example/api/events',{method:'POST',headers:{origin,'content-type':type},body:'{}'});
 expect(sameOrigin(request('https://comicready.example'))).toBe(true);
 expect(sameOrigin(request('https://unrelated.example'))).toBe(false);
 expect(sameOrigin(request('https://comicready.example','text/plain'))).toBe(false);
});
test('requests accept the public host behind the deployment proxy',()=>{
 const headers={origin:'https://comicready.com','content-type':'application/json',host:'comicready.com','x-forwarded-host':'comicready.com'};
 expect(sameOrigin(new Request('https://internal-host.example/api/events',{method:'POST',headers,body:'{}'}))).toBe(true);
 expect(sameOrigin(new Request('https://internal-host.example/api/events',{method:'POST',headers:{...headers,origin:'https://unrelated.example'},body:'{}'}))).toBe(false);
});
test('JSON limit is checked without trusting content-length',async()=>{
 await expect(boundedJson(new Request('https://example.com',{method:'POST',body:'x'.repeat(513)}),512)).rejects.toThrow('Too large');
});
