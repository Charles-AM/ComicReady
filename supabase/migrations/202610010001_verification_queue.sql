-- Record a complete manual source recheck without rewriting the opportunity.
create or replace function public.verify_opportunity(target_id uuid,note text) returns timestamptz
language plpgsql security invoker set search_path='' as $$
declare checked timestamptz := now();
begin
  if not public.is_admin() then raise exception 'Admin access required'; end if;
  if length(trim(coalesce(note,''))) < 3 then raise exception 'A verification note is required'; end if;
  if not exists(select 1 from public.opportunities where id=target_id) then raise exception 'Opportunity not found'; end if;
  if not exists(select 1 from public.requirements where opportunity_id=target_id) then raise exception 'At least one sourced requirement is required'; end if;

  update public.opportunities set last_verified_at=checked,updated_at=checked where id=target_id;
  insert into public.verification_events(opportunity_id,result,admin_note,checked_by)
  values(target_id,'verified',left(trim(note),2000),auth.uid());
  return checked;
end; $$;

revoke all on function public.verify_opportunity(uuid,text) from public;
grant execute on function public.verify_opportunity(uuid,text) to authenticated;
