'use client';
import {useState} from 'react';
import {useHydrated} from './client-ready';
export function MeasurementPreference(){return useHydrated()?<Preference/>:null;}
function Preference(){const [allowed,setAllowed]=useState(()=>{try{return localStorage.getItem('comicready:measurement')!=='off';}catch{return false;}});const [error,setError]=useState('');return <><label className="check-label"><input type="checkbox" checked={allowed} onChange={e=>{const next=e.target.checked;try{localStorage.setItem('comicready:measurement',next?'on':'off');setAllowed(next);}catch{setError('Your browser cannot save this preference. Measurement is skipped when storage is unavailable.');}}}/>Allow anonymous usage counts on this device</label>{error&&<p role="alert">{error}</p>}<p className="muted">Do Not Track and Global Privacy Control also disable browser event measurement, regardless of this checkbox.</p></>;}
