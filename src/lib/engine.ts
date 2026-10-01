import {fields,roles,formats,UNKNOWN,type Field,type Opportunity,type Project,type Requirement} from './model';
export type Outcome='meets'|'ineligible'|'prepare'|'unknown';
export type Finding={id:string;outcome:Outcome;title:string;explanation:string;sourceUrl:string;sourceReference:string;requirementId?:string};
export type Evaluation={findings:Finding[];summary:Outcome;counts:Record<Outcome,number>};
const normalize=(s:string)=>s.trim().toLowerCase();
export function validInput(field:Field,value:unknown):boolean {
 if(value===null||value===undefined||value==='')return false;
 if(field==='role')return typeof value==='string'&&(roles as readonly string[]).includes(value);
 if(field==='format')return typeof value==='string'&&(formats as readonly string[]).includes(value);
 if(field==='samplePages'||field==='storyPages')return typeof value==='number'&&Number.isInteger(value)&&value>=0&&value<=100000;
 if(field==='age')return typeof value==='number'&&Number.isInteger(value)&&value>=0&&value<=130;
 if(field==='dpi')return typeof value==='number'&&Number.isInteger(value)&&value>=1&&value<=10000;
 if(field==='country')return typeof value==='string'&&/^[a-z]{2}$/i.test(value.trim());
 if(field==='region')return typeof value==='string'&&value.trim().length>0;
 if(field==='fileFormat')return typeof value==='string'&&['pdf','jpg','png','tif','other'].includes(normalize(value));
 if(field==='colorMode')return typeof value==='string'&&['black-and-white','color','either'].includes(normalize(value));
 return typeof value==='boolean';
}
/** An unknown selector cannot silently remove a potentially applicable rule. */
export function applicability(rule:Requirement,project:Project):'yes'|'no'|'unknown'{
 let unknown=false;
 if(rule.roles.length){if(!validInput('role',project.role))unknown=true;else if(!rule.roles.includes(project.role as typeof roles[number]))return 'no';}
 if(rule.formats.length){if(!validInput('format',project.format))unknown=true;else if(!rule.formats.includes(project.format as typeof formats[number]))return 'no';}
 return unknown?'unknown':'yes';
}
export function relevantFields(call:Opportunity,project:Project):Field[]{
 const needed=new Set<Field>(['role','format']);
 for(const r of call.requirements)if(r.field&&applicability(r,project)!=='no')needed.add(r.field);
 return fields.filter(f=>needed.has(f));
}
export function compare(rule:Requirement,input:unknown):boolean|null{
 if(!rule.field||!validInput(rule.field,input)||rule.operator==='review'||rule.value===null)return null;
 const v=rule.value;
 if(rule.operator==='gte'||rule.operator==='lte')return typeof input==='number'&&typeof v==='number'&&Number.isFinite(v)?(rule.operator==='gte'?input>=v:input<=v):null;
 if(rule.operator==='in')return typeof input==='string'&&Array.isArray(v)&&v.every(s=>typeof s==='string')?v.some(s=>normalize(s)===normalize(input)):null;
 if(rule.operator==='eq'){
  if(typeof input!==typeof v||Array.isArray(v))return null;
  return typeof input==='string'&&typeof v==='string'?normalize(input)===normalize(v):input===v;
 }
 return null;
}
/** Pure evaluation. Time is supplied by the caller; no I/O or hidden clock reads. */
export function evaluate(call:Opportunity,project:Project,now:number):Evaluation{
 const findings:Finding[]=[];
 function meta(id:string,outcome:Outcome,title:string,explanation:string){findings.push({id,outcome,title,explanation,sourceUrl:call.official_url,sourceReference:call.fixture?'Development guidelines':'Official guidelines'});}
 if(call.status==='closed'||(call.deadline!==null&&Date.parse(call.deadline)<=now))meta('call-closed','ineligible','This call is closed.','This submission window is not usable now. This does not make your project permanently ineligible.');
 else if(call.status==='unknown')meta('call-status','unknown','Confirm whether this call is open.',UNKNOWN);
 if(call.deadline===null&&call.status==='open')meta('deadline','unknown',call.deadline_note?'Confirm the exact deadline time and timezone.':'Confirm the deadline.',call.deadline_note?`${call.deadline_note} The organizer does not state an exact submission time or timezone.`:UNKNOWN);
 if(!call.compensation)meta('payment','unknown','Payment not disclosed; confirm with organizer.',UNKNOWN);
 if(!call.rights_disclosure)meta('licensing','unknown','Confirm the copyright and licensing terms.',UNKNOWN+' ComicReady does not provide a legal opinion.');
 if(!call.fixture&&(!call.last_verified_at||now-Date.parse(call.last_verified_at)>90*86400000))meta('verification','unknown','The guidelines need a fresh review.','The source has not been manually checked in the last 90 days. Confirm the current requirements.');
 if(!call.requirements.length)meta('no-rules','unknown','No reviewed requirements are available.',UNKNOWN);
 for(const r of call.requirements){
  const applies=applicability(r,project);if(applies==='no')continue;
  const result=applies==='unknown'||r.kind==='review'?null:compare(r,r.field?project[r.field]:null);
  const outcome:Outcome=result===null?'unknown':result?'meets':r.kind==='eligibility'?'ineligible':'prepare';
  const explanation=applies==='unknown'?'Choose a role and format to determine whether this rule applies.':result===null?(r.operator==='review'||r.kind==='review'?UNKNOWN+' Review this condition with the organizer.':'Your answer is missing or uncertain; this requirement has not been passed or failed.'):result?'Your stated project facts meet this published requirement.':outcome==='prepare'?'Prepare this item, then update your project answers. A missing material is not a permanent eligibility failure.':'Your stated project facts do not meet this requirement.';
  findings.push({id:r.id,outcome,title:r.wording,explanation,sourceUrl:r.source_url,sourceReference:r.source_reference,requirementId:r.id});
 }
 if(call.requirements.length&&!findings.some(f=>f.requirementId))meta('no-applicable-rules','unknown','No reviewed rules cover this project.', 'Confirm your role and format with the organizer before submitting.');
 const counts:Record<Outcome,number>={meets:0,ineligible:0,prepare:0,unknown:0};findings.forEach(f=>counts[f.outcome]++);
 const summary:Outcome=counts.ineligible?'ineligible':counts.unknown?'unknown':counts.prepare?'prepare':'meets';
 return {findings,summary,counts};
}
