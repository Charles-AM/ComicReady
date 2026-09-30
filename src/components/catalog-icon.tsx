/** Original category symbols, never publisher logos or submission artwork. */
export function CatalogIcon({ category }: { category: string }) {
  return <svg className="catalog-preview-icon" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
    {category === 'short-comic' ? <>
      <path d="M17 10h46v58H17z" />
      <path d="M23 17h34v16H23zM23 39h14v21H23zM43 39h14v21H43z" />
      <path d="M11 19v55h43" opacity=".35" />
      <path d="m27 29 8-7 8 7 6-4 5 4" opacity=".5" />
    </> : <>
      <path d="M19 17h44v51H19c-8 0-8-11 0-11h44M19 17c-8 0-8 10 0 10v30" />
      <path d="M24 11h44v51M29 6h44v50M26 26h27v20H26z" opacity=".55" />
      <path d="m26 42 9-10 8 8 6-4 4 5M22 62h33" />
    </>}
    <path d="M5 39h7M8.5 35.5v7" stroke="var(--cover-accent)" strokeWidth="2" />
  </svg>;
}
