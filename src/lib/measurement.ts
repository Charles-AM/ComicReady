export const eventNames=['page_viewed','opportunity_viewed','fit_check_started','fit_check_completed','checklist_printed','official_application_clicked'] as const;
export type ProductEvent=typeof eventNames[number];
export function track(event:ProductEvent,slug:string){
 if(typeof window==='undefined'||location.pathname.startsWith('/thgizcblljqbah'))return;
 if(navigator.doNotTrack==='1'||('globalPrivacyControl' in navigator&&navigator.globalPrivacyControl===true))return;
 try{if(localStorage.getItem('comicready:measurement')==='off')return;}catch{return;}
 // Intentionally only event name and public call slug. Never project answers, user IDs or referrers.
 void fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event,slug}),keepalive:true}).catch(()=>{});
}
