-- Structured discovery metadata powers honest filters without parsing marketing copy.
alter table public.opportunities add column if not exists deadline_date date;
alter table public.opportunities add column if not exists compensation_type text not null default 'undisclosed'
  check (compensation_type in ('paid','conditional','unpaid','undisclosed'));
alter table public.opportunities add column if not exists region_scope text not null default 'not-stated'
  check (region_scope in ('worldwide','restricted','not-stated'));

create or replace function public.save_opportunity(doc jsonb,rules jsonb,verified boolean,note text) returns uuid language plpgsql security invoker set search_path='' as $$
declare oid uuid := (doc->>'id')::uuid; r jsonb; checked timestamptz;
begin
 if not public.is_admin() then raise exception 'Admin access required'; end if;
 if jsonb_array_length(rules)=0 then raise exception 'At least one sourced requirement is required'; end if;
 if (doc->>'published')::boolean and not verified then raise exception 'Review guidelines before publishing'; end if;
 if doc->>'deadline' is not null and nullif(doc->>'deadline_note','') is not null then raise exception 'Use an exact deadline or a date-only note, not both'; end if;
 if doc->>'deadline' is null and nullif(doc->>'deadline_date','') is not null and nullif(doc->>'deadline_note','') is null then raise exception 'Date-only deadlines need a public note'; end if;
 checked := case when verified then now() else null end;
 insert into public.opportunities(id,slug,title,organizer,category,official_url,status,deadline,deadline_timezone,deadline_note,deadline_date,compensation,compensation_type,region_scope,rights_disclosure,last_verified_at,published,description,roles,formats)
 values(oid,doc->>'slug',doc->>'title',doc->>'organizer',doc->>'category',doc->>'official_url',doc->>'status',(doc->>'deadline')::timestamptz,doc->>'deadline_timezone',nullif(doc->>'deadline_note',''),nullif(doc->>'deadline_date','')::date,doc->>'compensation',coalesce(doc->>'compensation_type','undisclosed'),coalesce(doc->>'region_scope','not-stated'),doc->>'rights_disclosure',checked,false,doc->>'description',array(select jsonb_array_elements_text(doc->'roles')),array(select jsonb_array_elements_text(doc->'formats')))
 on conflict(id) do update set slug=excluded.slug,title=excluded.title,organizer=excluded.organizer,category=excluded.category,official_url=excluded.official_url,status=excluded.status,deadline=excluded.deadline,deadline_timezone=excluded.deadline_timezone,deadline_note=excluded.deadline_note,deadline_date=excluded.deadline_date,compensation=excluded.compensation,compensation_type=excluded.compensation_type,region_scope=excluded.region_scope,rights_disclosure=excluded.rights_disclosure,last_verified_at=checked,published=false,description=excluded.description,roles=excluded.roles,formats=excluded.formats,updated_at=now();
 delete from public.requirements where opportunity_id=oid;
 for r in select * from jsonb_array_elements(rules) loop
  insert into public.requirements(id,opportunity_id,kind,roles,formats,field,operator,value,wording,source_reference,source_url)
  values((r->>'id')::uuid,oid,r->>'kind',array(select jsonb_array_elements_text(r->'roles')),array(select jsonb_array_elements_text(r->'formats')),r->>'field',r->>'operator',nullif(r->'value','null'::jsonb),r->>'wording',r->>'source_reference',r->>'source_url');
 end loop;
 update public.opportunities set published=(doc->>'published')::boolean where id=oid;
 insert into public.verification_events(opportunity_id,result,admin_note,checked_by) values(oid,case when verified then 'verified' when doc->>'status'='closed' then 'closed' else 'edited' end,left(note,2000),auth.uid());
 return oid;
end; $$;

revoke all on function public.save_opportunity(jsonb,jsonb,boolean,text) from public;
grant execute on function public.save_opportunity(jsonb,jsonb,boolean,text) to authenticated;
