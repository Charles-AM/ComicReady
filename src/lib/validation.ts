import { z } from 'zod';
import { fields, roles, formats } from './model';
const httpsUrl=z.string().url().refine(v=>new URL(v).protocol==='https:', 'Use an HTTPS official source URL.');
export const requirementSchema=z.object({
 id:z.string().uuid(),opportunity_id:z.string().uuid(),kind:z.enum(['eligibility','preparation','review']),
 roles:z.array(z.enum(roles)),formats:z.array(z.enum(formats)),field:z.enum(fields).nullable(),
 operator:z.enum(['eq','gte','lte','in','review']),value:z.union([z.string(),z.number().finite(),z.boolean(),z.array(z.string())]).nullable(),
 wording:z.string().trim().min(5).max(1000),source_reference:z.string().trim().min(3).max(500),source_url:httpsUrl,
}).superRefine((r,ctx)=>{
 if(r.operator==='review')return;
 if(!r.field||r.value===null)ctx.addIssue({code:'custom',message:'A comparison needs a field and value.'});
 if(['gte','lte'].includes(r.operator)&&(typeof r.value!=='number'||!['samplePages','storyPages','age','dpi'].includes(r.field||'')))ctx.addIssue({code:'custom',message:'Numeric comparisons require a numeric field and value.'});
 if(r.operator==='in'&&!Array.isArray(r.value))ctx.addIssue({code:'custom',message:'Use a list for the in operator.'});
 if(['identityMatch','rights','english','aiUsed','previouslyPublished','genreFit','audienceFit','script','synopsis','bio','portfolio','collaborator','teamRoles','dimensionsReady','pdf'].includes(r.field||'')&&(r.operator!=='eq'||typeof r.value!=='boolean'))ctx.addIssue({code:'custom',message:'Yes/no fields require equals true or false.'});
});
export const opportunitySchema=z.object({
 id:z.string().uuid(),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(100),title:z.string().trim().min(2).max(150),organizer:z.string().trim().min(2).max(150),category:z.enum(['anthology','short-comic']),official_url:httpsUrl,
 status:z.enum(['open','rolling','closed','unknown']),deadline:z.string().datetime({offset:true}).nullable(),deadline_timezone:z.string().max(100).nullable(),deadline_note:z.string().trim().max(300).nullable().optional(),deadline_date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),compensation:z.string().max(1500).nullable(),compensation_type:z.enum(['paid','conditional','unpaid','undisclosed']).optional(),region_scope:z.enum(['worldwide','restricted','not-stated']).optional(),rights_disclosure:z.string().max(1500).nullable(),description:z.string().trim().min(10).max(1500),roles:z.array(z.enum(roles)).min(1),formats:z.array(z.enum(formats)).min(1),published:z.boolean(),
}).superRefine((o,ctx)=>{
 if(o.deadline&&!o.deadline_timezone)ctx.addIssue({code:'custom',message:'Record the deadline’s published timezone.'});
 if(o.deadline&&o.deadline_note)ctx.addIssue({code:'custom',message:'Use either an exact deadline or a date-only note, not both.'});
 if(!o.deadline&&o.deadline_date&&!o.deadline_note)ctx.addIssue({code:'custom',message:'Add a public note explaining that the deadline time or timezone is not stated.'});
});
