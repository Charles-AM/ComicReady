import {describe,expect,test} from 'vitest';
import {buildVerificationQueue,verificationQueueCounts,type VerificationCandidate} from '../src/lib/verification-queue';

const now=Date.parse('2026-10-01T12:00:00Z');
const base:VerificationCandidate={id:'1',slug:'call',title:'Call',official_url:'https://example.com',status:'open',published:true,deadline:null,deadline_date:null,compensation:'Paid',rights_disclosure:'Creator retains copyright',last_verified_at:'2026-09-20T12:00:00Z',updated_at:'2026-09-20T12:00:00Z',requirements:[{id:'r1',source_url:'https://example.com'}]};

describe('verification queue',()=>{
  test('uses a seven-day review schedule during the final 30 days',()=>{
    const [item]=buildVerificationQueue([{...base,deadline:'2026-10-20T12:00:00Z'}],now);
    expect(item.cadenceDays).toBe(7);expect(item.priority).toBe('due');expect(item.issues.map(i=>i.kind)).toContain('overdue');
  });
  test('flags a passed deadline that is still shown as open as urgent',()=>{
    const [item]=buildVerificationQueue([{...base,deadline_date:'2026-09-30'}],now);
    expect(item.priority).toBe('urgent');expect(item.issues.map(i=>i.kind)).toContain('deadline-passed');
  });
  test('keeps freshly confirmed unknown disclosures out of the due queue',()=>{
    const [item]=buildVerificationQueue([{...base,compensation:null,rights_disclosure:null,last_verified_at:'2026-09-30T12:00:00Z'}],now);
    expect(item.priority).toBe('current');expect(item.issues.map(i=>i.kind)).toEqual(['missing-payment','missing-rights']);
  });
  test('drafts and missing rules remain visible in the editorial queue',()=>{
    const [item]=buildVerificationQueue([{...base,published:false,requirements:[]}],now);
    expect(item.priority).toBe('needs-details');expect(item.issues.map(i=>i.kind)).toEqual(['missing-rules','draft']);
  });
  test('current calls sort after action items and counts remain stable',()=>{
    const items=buildVerificationQueue([{...base,id:'current',title:'Current',last_verified_at:'2026-09-30T12:00:00Z'},{...base,id:'never',title:'Never',last_verified_at:null}],now);
    expect(items.map(i=>i.id)).toEqual(['never','current']);expect(verificationQueueCounts(items)).toEqual({urgent:1,due:0,'needs-details':0,current:1});
  });
});
