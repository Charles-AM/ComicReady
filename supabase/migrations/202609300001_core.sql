-- Apply through the Supabase SQL editor or CLI. No sample opportunities are inserted.
create table public.admin_users (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.admin_users enable row level security;
create policy own_admin_membership on public.admin_users for select to authenticated using (user_id = auth.uid());
create function public.is_admin() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.admin_users where user_id=auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create table public.opportunities (
 id uuid primary key default gen_random_uuid(),slug text unique not null check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),title text not null,organizer text not null,
 category text not null check(category in ('anthology','short-comic')),official_url text not null check(official_url ~ '^https://'),
 status text not null default 'unknown' check(status in ('open','rolling','closed','unknown')),deadline timestamptz,deadline_timezone text,
 compensation text,rights_disclosure text,last_verified_at timestamptz,published boolean not null default false,description text not null,
 roles text[] not null default '{}',formats text[] not null default '{}',updated_at timestamptz not null default now(),
 check (not published or last_verified_at is not null),check(deadline is null or deadline_timezone is not null)
);
create table public.requirements (
 id uuid primary key default gen_random_uuid(),opportunity_id uuid not null references public.opportunities(id) on delete cascade,
 kind text not null check(kind in ('eligibility','preparation','review')),roles text[] not null default '{}',formats text[] not null default '{}',
 field text check(field in ('role','format','country','region','rights','samplePages','storyPages','script','synopsis','bio','portfolio','collaborator','pdf')),
 operator text not null check(operator in ('eq','gte','lte','in','review')),value jsonb,
 wording text not null,source_reference text not null,source_url text not null check(source_url ~ '^https://'),
 check(operator='review' or (field is not null and value is not null))
);
create index requirements_opportunity_idx on public.requirements(opportunity_id);
create table public.verification_events (
 id bigint generated always as identity primary key,opportunity_id uuid not null references public.opportunities(id) on delete cascade,
 checked_at timestamptz not null default now(),result text not null check(result in ('verified','edited','closed','unpublished')),admin_note text not null default '',
 checked_by uuid references auth.users(id)
);
alter table public.opportunities enable row level security;
alter table public.requirements enable row level security;
alter table public.verification_events enable row level security;
create policy published_opportunities on public.opportunities for select to anon,authenticated using (published);
create policy published_requirements on public.requirements for select to anon,authenticated using (exists(select 1 from public.opportunities o where o.id=opportunity_id and o.published));
create policy admin_opportunities on public.opportunities for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy admin_requirements on public.requirements for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy admin_verifications on public.verification_events for all to authenticated using(public.is_admin()) with check(public.is_admin());
grant select on public.opportunities,public.requirements to anon;
grant select,insert,update,delete on public.opportunities,public.requirements,public.verification_events to authenticated;
grant select on public.admin_users to authenticated;
grant usage,select on sequence public.verification_events_id_seq to authenticated;

-- One transaction: no partial rule saves. Every edit resets verification unless reviewed again.
create function public.save_opportunity(doc jsonb,rules jsonb,verified boolean,note text) returns uuid language plpgsql security invoker set search_path='' as $$
declare oid uuid := (doc->>'id')::uuid; r jsonb; checked timestamptz;
begin
 if not public.is_admin() then raise exception 'Admin access required'; end if;
 if jsonb_array_length(rules)=0 then raise exception 'At least one sourced requirement is required'; end if;
 if (doc->>'published')::boolean and not verified then raise exception 'Review guidelines before publishing'; end if;
 checked := case when verified then now() else null end;
 insert into public.opportunities(id,slug,title,organizer,category,official_url,status,deadline,deadline_timezone,compensation,rights_disclosure,last_verified_at,published,description,roles,formats)
 values(oid,doc->>'slug',doc->>'title',doc->>'organizer',doc->>'category',doc->>'official_url',doc->>'status',(doc->>'deadline')::timestamptz,doc->>'deadline_timezone',doc->>'compensation',doc->>'rights_disclosure',checked,false,doc->>'description',array(select jsonb_array_elements_text(doc->'roles')),array(select jsonb_array_elements_text(doc->'formats')))
 on conflict(id) do update set slug=excluded.slug,title=excluded.title,organizer=excluded.organizer,category=excluded.category,official_url=excluded.official_url,status=excluded.status,deadline=excluded.deadline,deadline_timezone=excluded.deadline_timezone,compensation=excluded.compensation,rights_disclosure=excluded.rights_disclosure,last_verified_at=checked,published=false,description=excluded.description,roles=excluded.roles,formats=excluded.formats,updated_at=now();
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
