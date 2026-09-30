import type { Opportunity, Requirement } from './model';
const source = 'https://www.boxofrainmag.co.uk/submission-guidelines/sector-13/';
const rule = (id: string, wording: string, rest: Partial<Requirement> = {}): Requirement => ({
  id, opportunity_id: 'sector-13', kind: 'review', roles: [], formats: [], field: null, operator: 'review', value: null,
  wording, source_reference: 'Sector 13 contributor guidelines', source_url: source, ...rest,
});
/** Reviewed public webpage, not a fabricated call. Not automatically inserted in a database. */
export const reviewedCatalog: Opportunity[] = [{
  id: 'sector-13', slug: 'sector-13', title: 'Sector 13', organizer: 'Box of Rain / Sector House 13', category: 'anthology',
  official_url: source, status: 'rolling', deadline: null, deadline_timezone: null,
  compensation: 'Unpaid: the organizer states that contributors are not paid.', rights_disclosure: null,
  last_verified_at: '2026-09-30T13:25:43Z', published: true,
  description: 'A science-fiction comics fanzine seeking writers, sequential artists, and letterers. Recheck the organizer’s page before contacting them.',
  roles: ['writer', 'artist', 'writer-artist', 'letterer', 'team'], formats: ['script', 'portfolio'],
  requirements: [
    rule('s13-script', 'Have a script or story idea ready to share.', {roles:['writer','writer-artist']}),
    rule('s13-art', 'Provide examples of your comics or lettering work.', {kind:'preparation',roles:['artist','letterer','writer-artist'],field:'portfolio',operator:'eq',value:true}),
    rule('s13-length', 'Stories are generally up to seven pages; longer work may be considered. Confirm exceptions.', {roles:['writer','writer-artist','team']}),
    rule('s13-content', 'Review the science-fiction/fantasy focus, audience guidance, and character restrictions with the organizer.'),
  ],
}];
const fixtureSource = '/development-guidelines';
export const developmentCall: Opportunity = {
  id:'dev-anthology',slug:'development-anthology',title:'Practice anthology',organizer:'ComicReady development fixture',category:'anthology',
  official_url:fixtureSource,status:'open',deadline:null,deadline_timezone:null,compensation:null,rights_disclosure:null,last_verified_at:null,
  published:true,fixture:true,description:'A fictional call for testing the checker. Not an opportunity and not accepting applications.',
  roles:['writer','artist','writer-artist','team'],formats:['pitch','completed short comic'],requirements:[
    rule('dev-rights','You must control the rights needed to submit.',{opportunity_id:'dev-anthology',kind:'eligibility',field:'rights',operator:'eq',value:true,source_url:fixtureSource,source_reference:'Development rule A'}),
    rule('dev-team','Writers must have an artist collaborator.',{opportunity_id:'dev-anthology',kind:'eligibility',roles:['writer'],field:'collaborator',operator:'eq',value:true,source_url:fixtureSource,source_reference:'Development rule B'}),
    rule('dev-samples','Prepare at least three completed sequential sample pages.',{opportunity_id:'dev-anthology',kind:'preparation',field:'samplePages',operator:'gte',value:3,source_url:fixtureSource,source_reference:'Development rule C'}),
    rule('dev-length','The proposed story must be no more than eight pages.',{opportunity_id:'dev-anthology',kind:'eligibility',field:'storyPages',operator:'lte',value:8,source_url:fixtureSource,source_reference:'Development rule D'}),
    rule('dev-pdf','Prepare a submission PDF.',{opportunity_id:'dev-anthology',kind:'preparation',field:'pdf',operator:'eq',value:true,source_url:fixtureSource,source_reference:'Development rule E'}),
  ],
};
