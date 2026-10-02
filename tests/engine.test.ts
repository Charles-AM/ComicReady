import {describe,expect,test} from 'vitest';
import {evaluate,relevantFields,validInput} from '../src/lib/engine';
import {developmentCall} from '../src/lib/catalog';
import type {Opportunity,Project,Requirement} from '../src/lib/model';
const now=Date.parse('2026-09-30T14:00:00Z');
const call:Opportunity={...developmentCall,status:'rolling',compensation:'Disclosed',compensation_type:'paid',rights_disclosure:'Disclosed'};
const ready:Project={role:'writer',format:'pitch',rights:true,collaborator:true,samplePages:3,storyPages:8,pdf:true};
const check=(p:Project,c:Opportunity=call)=>evaluate(c,p,now);
const rule=(changes:Partial<Requirement>):Requirement=>({...call.requirements[0],...changes});
describe('reviewed rules',()=>{
 test('eligible project meets all deterministic requirements',()=>expect(check(ready).summary).toBe('meets'));
 test('writer without required artist is not eligible',()=>expect(check({...ready,collaborator:false}).findings.find(f=>f.id==='dev-team')?.outcome).toBe('ineligible'));
 test('insufficient sequential pages are preparation, separate from story length',()=>{const r=check({...ready,samplePages:1,storyPages:8});expect(r.summary).toBe('prepare');expect(r.findings.find(f=>f.id==='dev-length')?.outcome).toBe('meets');});
 test('missing PDF is preparation',()=>expect(check({...ready,pdf:false}).summary).toBe('prepare'));
 test('unknown PDF is not treated as false',()=>expect(check({...ready,pdf:null}).findings.find(f=>f.id==='dev-pdf')?.outcome).toBe('unknown'));
 test('zero completed pages is known, not missing',()=>expect(check({...ready,samplePages:0}).findings.find(f=>f.id==='dev-samples')?.outcome).toBe('prepare'));
 test.each([NaN,-1,2.5,'3',Infinity])('invalid page count %s stays unknown',value=>expect(check({...ready,samplePages:value}).findings.find(f=>f.id==='dev-samples')?.outcome).toBe('unknown'));
 test('artist does not inherit writer-only collaboration requirement',()=>expect(check({...ready,role:'artist',collaborator:false}).summary).toBe('meets'));
 test('missing role keeps role-specific rule unknown',()=>expect(check({...ready,role:null}).findings.find(f=>f.id==='dev-team')?.outcome).toBe('unknown'));
 test('residency outside stated region is ineligible; whitespace and case normalize',()=>{const c={...call,requirements:[rule({field:'country',operator:'in',value:['US','CA']})]};expect(check({country:'GB'},c).summary).toBe('ineligible');expect(check({country:' ca '},c).summary).toBe('meets');expect(check({},c).summary).toBe('unknown');});
 test('nuanced conditions stay unknown even when a value is supplied',()=>expect(check({storyPages:8},{...call,requirements:[rule({kind:'review',operator:'review',field:'storyPages',value:7})]}).summary).toBe('unknown'));
 test('format-specific rule is skipped for other formats',()=>expect(check({...ready,format:'script',pdf:false},{...call,requirements:[rule({kind:'preparation',field:'pdf',operator:'eq',value:true,formats:['pitch']})]}).findings.some(f=>f.requirementId)).toBe(false));
 test('unknown format cannot skip a format-specific rule',()=>expect(check({},{...call,requirements:[rule({formats:['pitch']})]}).summary).toBe('unknown'));
 test('undisclosed payment is not unpaid',()=>expect(check(ready,{...call,compensation:null}).findings.find(f=>f.id==='payment')).toMatchObject({outcome:'unknown',title:'Payment not disclosed; confirm with organizer.'}));
 test('closed deadline does not make insufficient samples a permanent failure',()=>{const r=check({...ready,samplePages:1},{...call,deadline:'2026-09-29T00:00:00Z'});expect(r.summary).toBe('ineligible');expect(r.findings.find(f=>f.id==='dev-samples')?.outcome).toBe('prepare');});
 test('at the exact deadline the window is closed',()=>expect(check(ready,{...call,deadline:new Date(now).toISOString()}).summary).toBe('ineligible'));
 test('a date-only deadline remains open through that date anywhere on earth',()=>{
  const dateOnly={...call,status:'open' as const,deadline:null,deadline_date:'2026-09-30',deadline_note:'30 September 2026; time and timezone not stated.'};
  expect(evaluate(dateOnly,ready,Date.parse('2026-10-01T11:59:59Z')).findings.find(f=>f.id==='call-closed')).toBeUndefined();
  expect(evaluate(dateOnly,ready,Date.parse('2026-10-01T12:00:00Z')).findings.find(f=>f.id==='call-closed')?.outcome).toBe('ineligible');
 });
 test('an explicitly undisclosed payment remains unknown even when explanatory text exists',()=>{
  const result=check(ready,{...call,compensation:'The organizer says payment details will be shared later.',compensation_type:'undisclosed'});
  expect(result.findings.find(f=>f.id==='payment')?.outcome).toBe('unknown');
 });
 test('no reviewed rules cannot pass',()=>expect(check(ready,{...call,requirements:[]}).summary).toBe('unknown'));
 test('every finding preserves a source',()=>expect(check({}).findings.every(f=>Boolean(f.sourceUrl&&f.sourceReference))).toBe(true));
 test('irrelevant collaborator input is not requested from artists',()=>expect(relevantFields(call,{role:'artist'})).not.toContain('collaborator'));
 test('stale verification is visible',()=>expect(check(ready,{...call,fixture:false,last_verified_at:'2025-01-01T00:00:00Z'}).findings.find(f=>f.id==='verification')?.outcome).toBe('unknown'));
 test('evaluation is deterministic and does not mutate project or rules',()=>{const before=JSON.stringify({ready,call});expect(check(ready)).toEqual(check(ready));expect(JSON.stringify({ready,call})).toBe(before);});
 test('age and DPI accept useful integer boundaries',()=>{
  expect(validInput('age',0)).toBe(true);expect(validInput('age',130)).toBe(true);expect(validInput('age',131)).toBe(false);
  expect(validInput('dpi',300)).toBe(true);expect(validInput('dpi',0)).toBe(false);expect(validInput('dpi',300.5)).toBe(false);
 });
 test('technical file answers use a controlled vocabulary',()=>{
  expect(validInput('fileFormat',' TIF ')).toBe(true);expect(validInput('fileFormat','psd')).toBe(false);
  expect(validInput('colorMode','BLACK-AND-WHITE')).toBe(true);expect(validInput('colorMode','cmyk')).toBe(false);
 });
});
