'use client';
import {useEffect,useRef,type ReactNode} from 'react';
import {track,type ProductEvent} from '@/lib/measurement';
export function EventMarker({event,slug,enabled=true}:{event:ProductEvent;slug:string;enabled?:boolean}){const sent=useRef(false);useEffect(()=>{if(enabled&&!sent.current){track(event,slug);sent.current=true;}},[event,slug,enabled]);return null;}
export function ApplicationLink({href,slug,fixture=false,children,className}:{href:string;slug:string;fixture?:boolean;children:ReactNode;className?:string}){return <a className={className} href={href} onClick={()=>{if(!fixture)track('official_application_clicked',slug);}}>{children}</a>;}
