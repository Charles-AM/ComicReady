import {describe,expect,test} from 'vitest';
import {reviewedCatalog} from '../src/lib/catalog';
import {evaluate,type Outcome} from '../src/lib/engine';
import type {Project} from '../src/lib/model';

const now=Date.parse('2026-09-30T20:00:00Z');

const scenarios:{slug:string;project:Project;finding:string;outcome:Outcome}[]=[
  {slug:'sector-13',project:{role:'artist',format:'portfolio',portfolio:false},finding:'s13-art',outcome:'prepare'},
  {slug:'cbk-cba-v76',project:{role:'writer-artist',format:'completed short comic',aiUsed:true},finding:'cbk-ai',outcome:'ineligible'},
  {slug:'discord-bite',project:{role:'writer',format:'pitch',age:17},finding:'bite-age',outcome:'ineligible'},
  {slug:'icc-smut-peddler-baddies',project:{role:'writer',format:'pitch',age:17},finding:'icc-baddies-mature',outcome:'ineligible'},
  {slug:'thirdbear-2027-singles',project:{role:'writer-artist',format:'pitch',country:'US'},finding:'tb-uk',outcome:'ineligible'},
  {slug:'birdseye-bebop',project:{role:'writer',format:'script',script:false},finding:'bebop-script',outcome:'prepare'},
  {slug:'kkum-hybrid-horror',project:{role:'team',format:'pitch',teamRoles:false},finding:'kkum-team-roles',outcome:'prepare'},
  {slug:'afrocomiccon-illustrated-revolution-adult',project:{role:'artist',format:'completed short comic',aiUsed:true},finding:'afro-ai',outcome:'ineligible'},
  {slug:'lumicpress-magazine',project:{role:'writer-artist',format:'completed short comic',age:17},finding:'lumic-age',outcome:'ineligible'},
  {slug:'viz-one-shots',project:{role:'writer-artist',format:'completed short comic',storyPages:10},finding:'viz-min-pages',outcome:'ineligible'},
];

describe('catalog opportunity scenarios',()=>{
  test.each(scenarios)('$slug produces $outcome for $finding',({slug,project,finding,outcome})=>{
    const call=reviewedCatalog.find(item=>item.slug===slug);
    expect(call,`Missing catalog call ${slug}`).toBeDefined();
    expect(evaluate(call!,project,now).findings.find(item=>item.id===finding)?.outcome).toBe(outcome);
  });
});
