create table public.event_counts (
 day date not null default current_date,event text not null,call_slug text not null default '',count bigint not null default 0,
 primary key(day,event,call_slug),check(event in ('opportunity_viewed','fit_check_started','fit_check_completed','checklist_printed','official_application_clicked','correction_submitted'))
);
create table public.corrections (
 id uuid primary key default gen_random_uuid(),call_slug text not null default '',message text not null check(length(message) between 10 and 2000),
 created_at timestamptz not null default now(),resolved boolean not null default false
);
alter table public.event_counts enable row level security;
alter table public.corrections enable row level security;
create policy admin_counts on public.event_counts for select to authenticated using(public.is_admin());
create policy admin_corrections_read on public.corrections for select to authenticated using(public.is_admin());
create policy admin_corrections_resolve on public.corrections for update to authenticated using(public.is_admin()) with check(public.is_admin());
grant select on public.event_counts to authenticated;
grant select,update on public.corrections to authenticated;
create function public.record_product_event(event_name text,call_slug text) returns void language plpgsql security definer set search_path='' as $$
begin
 if event_name not in ('opportunity_viewed','fit_check_started','fit_check_completed','checklist_printed','official_application_clicked') then raise exception 'Unknown event'; end if;
 if not exists(select 1 from public.opportunities o where o.slug=call_slug and o.published) then raise exception 'Published call required'; end if;
 insert into public.event_counts(day,event,call_slug,count) values(current_date,event_name,call_slug,1)
 on conflict on constraint event_counts_pkey do update set count=least(public.event_counts.count+1,1000000);
 delete from public.event_counts where day<current_date-90;
end; $$;
create function public.submit_correction(call_slug text,message_text text) returns void language plpgsql security definer set search_path='' as $$
begin
 if length(trim(message_text)) not between 10 and 2000 then raise exception 'Invalid message'; end if;
 if call_slug<>'' and not exists(select 1 from public.opportunities o where o.slug=call_slug and o.published) then raise exception 'Published call required'; end if;
 if (select count(*) from public.corrections where created_at>now()-interval '1 hour')>=100 then raise exception 'Please try later'; end if;
 insert into public.corrections(call_slug,message) values(call_slug,trim(message_text));
 insert into public.event_counts(day,event,call_slug,count) values(current_date,'correction_submitted',call_slug,1)
 on conflict on constraint event_counts_pkey do update set count=least(public.event_counts.count+1,1000000);
end; $$;
revoke all on function public.record_product_event(text,text) from public;
revoke all on function public.submit_correction(text,text) from public;
grant execute on function public.record_product_event(text,text) to anon,authenticated;
grant execute on function public.submit_correction(text,text) to anon,authenticated;
