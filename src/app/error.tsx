'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="page-section"><h1 className="page-title">This page hit a snag.</h1><p>We could not load the latest records. Please try again.</p><button className="button" onClick={reset}>Try again</button></section>;}
