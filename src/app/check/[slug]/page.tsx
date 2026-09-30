import Link from 'next/link';
import {EventMarker} from '@/components/event-marker';
import {notFound} from 'next/navigation';
import {getOpportunity} from '@/lib/opportunities';
import {ProjectForm} from '@/components/project-form';
export const dynamic='force-dynamic';
export default async function Check({params}:{params:Promise<{slug:string}>}){const call=await getOpportunity((await params).slug);if(!call)notFound();return <section className="page-section reading"><Link href={'/opportunities/'+call.slug}>← {call.title}</Link><p className="eyebrow section-gap">{call.fixture?'DEVELOPMENT FIXTURE':'PROJECT CHECK'}</p><h1 className="page-title">Tell us what’s<br/>on your desk.</h1><p>For {call.title}. Only questions connected to this call’s reviewed rules appear.</p><EventMarker event="fit_check_started" slug={call.slug} enabled={!call.fixture}/><ProjectForm call={call}/></section>;}
