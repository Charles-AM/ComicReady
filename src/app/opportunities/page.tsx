import { getOpportunities } from '@/lib/opportunities';
import { OpportunityList } from '@/components/opportunity-list';
export const dynamic='force-dynamic';
export const metadata={title:'Submission calls'};
export default async function Opportunities(){return <section className="page-section"><p className="eyebrow">FIND YOUR NEXT PAGE</p><h1 className="page-title">Small list.<br/>Clear requirements.</h1><p className="page-intro">English-language short comics and anthologies. Read the source, check your project, and see what to prepare.</p><p className="notice">A deliberately small catalog. Verification records reflect a reading of the public guidelines, not confirmation that the organizer is still responding.</p><OpportunityList calls={await getOpportunities()}/></section>;}
