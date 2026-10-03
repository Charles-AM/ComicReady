alter table public.event_counts drop constraint if exists event_counts_event_check;
alter table public.event_counts add constraint event_counts_event_check check(event in (
  'page_viewed','opportunity_viewed','fit_check_started','fit_check_completed',
  'checklist_printed','official_application_clicked','correction_submitted'
));

create or replace function public.record_product_event(event_name text,call_slug text) returns void language plpgsql security definer set search_path='' as $$
begin
 if event_name not in ('page_viewed','opportunity_viewed','fit_check_started','fit_check_completed','checklist_printed','official_application_clicked') then raise exception 'Unknown event'; end if;
 if event_name='page_viewed' then
   if call_slug not in ('home','catalog') then raise exception 'Unknown page'; end if;
 elsif not exists(select 1 from public.opportunities o where o.slug=call_slug and o.published) then
   raise exception 'Published call required';
 end if;
 insert into public.event_counts(day,event,call_slug,count) values(current_date,event_name,call_slug,1)
 on conflict on constraint event_counts_pkey do update set count=least(public.event_counts.count+1,1000000);
 delete from public.event_counts where day<current_date-90;
end; $$;

revoke all on function public.record_product_event(text,text) from public;
grant execute on function public.record_product_event(text,text) to anon,authenticated;
