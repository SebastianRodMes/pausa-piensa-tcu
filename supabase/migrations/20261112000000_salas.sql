-- Salas del juego «Pausa, piensa y pide ayuda»
-- Ninguna tabla guarda nombres de personas, edades, fotos ni texto libre de niñas y niños.
-- Todo el acceso pasa por funciones del servidor; RLS sin políticas bloquea el acceso directo.

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  code text not null check (code ~ '^[0-9]{6}$'),
  owner uuid not null references auth.users(id) on delete cascade,
  status text not null default 'lobby' check (status in ('lobby', 'question', 'reveal', 'ended')),
  q integer not null default 0 check (q between 0 and 4),
  revision integer not null default 0,
  max_teams integer not null default 8 check (max_teams between 1 and 8),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '4 hours'
);
create index if not exists rooms_code_idx on public.rooms (code);

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null,
  name text not null check (name in ('Rayo','Tucán','Volcán','Estrella','Ola','Cohete','Jaguar','Montaña')),
  joined_at timestamptz not null default now(),
  unique (room_id, user_id),
  unique (room_id, name)
);

create table if not exists public.answers (
  room_id uuid not null references public.rooms(id) on delete cascade,
  team_id uuid not null references public.teams(id) on delete cascade,
  q integer not null check (q between 0 and 4),
  option integer not null check (option in (0, 1)),
  answered_at timestamptz not null default now(),
  primary key (room_id, team_id, q)
);

alter table public.rooms enable row level security;
alter table public.teams enable row level security;
alter table public.answers enable row level security;
revoke all on public.rooms, public.teams, public.answers from anon, authenticated;

-- ¿La persona que llama es un adulto con cuenta (no anónima)?
create or replace function public._es_facilitador() returns boolean
language sql stable as $$
  select auth.uid() is not null and coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false) = false
$$;

-- Crear sala (solo facilitador). Limpia datos vencidos: respuestas y salas se borran a los 7 días.
create or replace function public.create_room() returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_code text; v_id uuid; intentos int := 0;
begin
  if not public._es_facilitador() then raise exception 'solo_facilitador'; end if;
  delete from public.rooms where created_at < now() - interval '7 days';
  loop
    v_code := lpad((floor(random() * 1000000))::int::text, 6, '0');
    exit when not exists (select 1 from public.rooms where code = v_code and expires_at > now());
    intentos := intentos + 1;
    if intentos > 20 then raise exception 'sin_codigo'; end if;
  end loop;
  insert into public.rooms (code, owner) values (v_code, auth.uid()) returning id into v_id;
  return jsonb_build_object('room_id', v_id, 'code', v_code);
end $$;

-- Ver qué nombres de equipo están tomados antes de entrar.
create or replace function public.peek_room(p_code text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare r public.rooms;
begin
  if auth.uid() is null then raise exception 'sin_sesion'; end if;
  select * into r from public.rooms where code = p_code and expires_at > now() order by created_at desc limit 1;
  if r.id is null then raise exception 'codigo_incorrecto'; end if;
  if r.status = 'ended' then raise exception 'sala_cerrada'; end if;
  return jsonb_build_object(
    'taken', coalesce((select jsonb_agg(name) from public.teams where room_id = r.id), '[]'::jsonb),
    'full', (select count(*) from public.teams where room_id = r.id) >= r.max_teams,
    'mine', (select name from public.teams where room_id = r.id and user_id = auth.uid())
  );
end $$;

-- Unirse a una sala. Si el teléfono ya estaba, devuelve su equipo (reconexión).
create or replace function public.join_room(p_code text, p_team text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare r public.rooms; t public.teams;
begin
  if auth.uid() is null then raise exception 'sin_sesion'; end if;
  select * into r from public.rooms where code = p_code and expires_at > now() order by created_at desc limit 1;
  if r.id is null then raise exception 'codigo_incorrecto'; end if;
  if r.status = 'ended' then raise exception 'sala_cerrada'; end if;
  select * into t from public.teams where room_id = r.id and user_id = auth.uid();
  if t.id is not null then return jsonb_build_object('room_id', r.id, 'team_id', t.id, 'name', t.name); end if;
  if (select count(*) from public.teams where room_id = r.id) >= r.max_teams then raise exception 'sala_llena'; end if;
  if exists (select 1 from public.teams where room_id = r.id and name = p_team) then raise exception 'nombre_tomado'; end if;
  insert into public.teams (room_id, user_id, name) values (r.id, auth.uid(), p_team) returning * into t;
  update public.rooms set revision = revision + 1 where id = r.id;
  return jsonb_build_object('room_id', r.id, 'team_id', t.id, 'name', t.name);
end $$;

-- Estado de la sala para el dueño o un equipo miembro.
-- Los equipos solo ven el conteo por opción cuando la pregunta está cerrada.
create or replace function public.room_state(p_room uuid) returns jsonb
language plpgsql security definer set search_path = public as $$
declare r public.rooms; v_owner boolean; v_team public.teams; v_counts jsonb; v_answered int;
begin
  select * into r from public.rooms where id = p_room;
  if r.id is null then raise exception 'sala_no_existe'; end if;
  v_owner := r.owner = auth.uid();
  select * into v_team from public.teams where room_id = r.id and user_id = auth.uid();
  if not v_owner and v_team.id is null then raise exception 'sin_permiso'; end if;
  select count(*) into v_answered from public.answers where room_id = r.id and q = r.q;
  if r.status in ('reveal', 'ended') then
    select jsonb_build_array(
      count(*) filter (where option = 0), count(*) filter (where option = 1)
    ) into v_counts from public.answers where room_id = r.id and q = r.q;
  end if;
  return jsonb_build_object(
    'status', r.status, 'q', r.q, 'revision', r.revision, 'code', case when v_owner then r.code end,
    'teams', coalesce((select jsonb_agg(name order by joined_at) from public.teams where room_id = r.id), '[]'::jsonb),
    'answered', v_answered, 'counts', v_counts,
    'my_answer', (select option from public.answers where room_id = r.id and q = r.q and team_id = v_team.id),
    'expired', r.expires_at < now()
  );
end $$;

-- Guardar o cambiar la respuesta mientras la situación esté abierta. Una respuesta tardía se rechaza.
create or replace function public.submit_answer(p_room uuid, p_q int, p_option int) returns jsonb
language plpgsql security definer set search_path = public as $$
declare r public.rooms; v_team uuid;
begin
  select * into r from public.rooms where id = p_room for update;
  if r.id is null then raise exception 'sala_no_existe'; end if;
  select id into v_team from public.teams where room_id = r.id and user_id = auth.uid();
  if v_team is null then raise exception 'sin_permiso'; end if;
  if r.status <> 'question' or r.q <> p_q then raise exception 'pregunta_cerrada'; end if;
  if p_option not in (0, 1) then raise exception 'opcion_invalida'; end if;
  insert into public.answers (room_id, team_id, q, option) values (r.id, v_team, p_q, p_option)
    on conflict (room_id, team_id, q) do update set option = excluded.option, answered_at = now();
  return jsonb_build_object('ok', true, 'option', p_option);
end $$;

-- Avanzar el juego (solo el dueño): abrir, cerrar, siguiente y terminar.
create or replace function public.set_state(p_room uuid, p_status text, p_q int) returns jsonb
language plpgsql security definer set search_path = public as $$
declare r public.rooms;
begin
  select * into r from public.rooms where id = p_room for update;
  if r.id is null or r.owner <> auth.uid() then raise exception 'sin_permiso'; end if;
  if p_status not in ('lobby', 'question', 'reveal', 'ended') or p_q not between 0 and 4 then raise exception 'estado_invalido'; end if;
  update public.rooms set status = p_status, q = p_q, revision = revision + 1 where id = r.id;
  return jsonb_build_object('ok', true);
end $$;

-- Resumen agregado por situación para la bitácora (solo el dueño).
create or replace function public.room_summary(p_room uuid) returns jsonb
language plpgsql security definer set search_path = public as $$
declare r public.rooms;
begin
  select * into r from public.rooms where id = p_room;
  if r.id is null or r.owner <> auth.uid() then raise exception 'sin_permiso'; end if;
  return jsonb_build_object(
    'created_at', r.created_at,
    'teams', (select count(*) from public.teams where room_id = r.id),
    'per_q', coalesce((select jsonb_agg(jsonb_build_object('q', g.q, 'opt0', g.o0, 'opt1', g.o1) order by g.q)
      from (select q, count(*) filter (where option = 0) o0, count(*) filter (where option = 1) o1
            from public.answers where room_id = r.id group by q) g), '[]'::jsonb)
  );
end $$;

revoke all on function public.create_room(), public.peek_room(text), public.join_room(text, text), public.room_state(uuid),
  public.submit_answer(uuid, int, int), public.set_state(uuid, text, int), public.room_summary(uuid), public._es_facilitador() from public, anon;
grant execute on function public.create_room(), public.peek_room(text), public.join_room(text, text), public.room_state(uuid),
  public.submit_answer(uuid, int, int), public.set_state(uuid, text, int), public.room_summary(uuid), public._es_facilitador() to authenticated;
