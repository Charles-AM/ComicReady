import {fields,type Opportunity,type Project} from './model';
export function projectKey(slug:string){return 'comicready:project:v1:'+slug;}
export function checklistKey(call:Opportunity){
 const source=JSON.stringify([call.last_verified_at,call.status,call.deadline,call.compensation,call.rights_disclosure,call.requirements]);
 let hash=2166136261;for(let i=0;i<source.length;i++){hash^=source.charCodeAt(i);hash=Math.imul(hash,16777619);}
 return 'comicready:checklist:v1:'+call.slug+':'+(hash>>>0).toString(16);
}
export function readProject(slug:string):Project|null{
 try{const raw=localStorage.getItem(projectKey(slug));if(!raw)return null;const parsed=JSON.parse(raw);if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))return null;
 const project:Project={};for(const f of fields){const value=parsed[f];if(typeof value==='boolean'||typeof value==='number'||value===null||(typeof value==='string'&&value.length<200))project[f]=value;}return project;
 }catch{return null;}
}
