-- Supabase bloquea el acceso anónimo si el registro está desactivado, así que el registro
-- queda activo y la autorización se controla aquí: solo las cuentas de esta lista crean salas.
create table if not exists public.facilitators (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.facilitators enable row level security;
revoke all on public.facilitators from anon, authenticated;

insert into public.facilitators (user_id)
select id from auth.users where not is_anonymous
on conflict do nothing;

create or replace function public._es_facilitador() returns boolean
language sql stable security definer set search_path = public as $$
  select auth.uid() is not null
    and coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false) = false
    and exists (select 1 from public.facilitators where user_id = auth.uid())
$$;
revoke execute on function public._es_facilitador() from public, anon, authenticated;
