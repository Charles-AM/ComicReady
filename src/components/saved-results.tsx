'use client';
import Link from 'next/link';
import {useState} from 'react';
import {useHydrated} from './client-ready';
import {readProject} from '@/lib/local-progress';
import type {Opportunity} from '@/lib/model';
import {ResultsView} from './results-view';
export function SavedResults({call,now}:{call:Opportunity;now:number}){const hydrated=useHydrated();return hydrated?<Loaded call={call} now={now}/>:<p role="status">Loading your device’s project facts…</p>;}
function Loaded({call,now}:{call:Opportunity;now:number}){const [project]=useState(()=>readProject(call.slug));return project?<ResultsView call={call} project={project} now={now}/>:<div className="empty-state"><h1 className="page-title">Start with your project.</h1><p>No saved answers were found on this device. Your project facts are never retrieved from a server.</p><Link className="button" href={'/check/'+call.slug}>Check my project →</Link></div>;}
