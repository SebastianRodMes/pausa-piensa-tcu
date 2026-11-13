import json, psycopg
c = psycopg.connect("host=/tmp port=54329 user=postgres dbname=postgres", autocommit=True)
def como(sub, anon):
    c.execute("select set_config('request.jwt.claim.sub', %s, false), set_config('request.jwt.claims', %s, false)", (sub, json.dumps({'sub': sub, 'is_anonymous': anon})))
    c.execute("set role authenticated")
def call(sql, *a):
    try: return c.execute(sql, a).fetchone()[0]
    except Exception as e: return 'ERROR: ' + str(e).split('\n')[0]
FAC, FAC2 = '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222'
T1, T2, T3 = ['aaaaaaaa-0000-0000-0000-00000000000%d' % i for i in (1,2,3)]
ok = lambda cond, msg: print(('PASA ' if cond else 'FALLA'), msg)
como(FAC, False); r = call("select public.create_room()"); room, code = r['room_id'], r['code']
como(T1, True); ok('ERROR' in str(call("select public.peek_room('000000')")) or code == '000000', 'código incorrecto rechazado')
j = call("select public.join_room(%s,'Rayo')", code); ok(j['name'] == 'Rayo', 'equipo 1 entra')
j2 = call("select public.join_room(%s,'Tucán')", code); ok(j2['name'] == 'Rayo', 'reconexión devuelve mismo equipo')
como(T2, True); ok('nombre_tomado' in str(call("select public.join_room(%s,'Rayo')", code)), 'nombre tomado rechazado')
ok('ERROR' in str(call("select public.join_room(%s,'Pirata')", code)), 'nombre fuera de lista rechazado')
call("select public.join_room(%s,'Ola')", code)
ok('pregunta_cerrada' in str(call("select public.submit_answer(%s,0,1)", room)), 'no responde en lobby')
ok('sin_permiso' in str(call("select public.set_state(%s,'question',0)", room)), 'equipo no puede avanzar')
como(FAC2, False); ok('sin_permiso' in str(call("select public.room_state(%s)", room)), 'otro adulto no ve sala ajena')
como(T3, True); ok('sin_permiso' in str(call("select public.room_state(%s)", room)), 'no miembro no ve la sala')
como(FAC, False); call("select public.set_state(%s,'question',0)", room)
como(T1, True); call("select public.submit_answer(%s,0,1)", room); call("select public.submit_answer(%s,0,0)", room); call("select public.submit_answer(%s,0,1)", room)
s = call("select public.room_state(%s)", room); ok(s['counts'] is None and s['my_answer'] == 1, 'equipo no ve conteos con pregunta abierta; cambio de respuesta')
como(T2, True); call("select public.submit_answer(%s,0,1)", room)
como(FAC, False); s = call("select public.room_state(%s)", room); ok(s['answered'] == 2, 'sin duplicados: 2 respuestas')
call("select public.set_state(%s,'reveal',0)", room)
como(T1, True); ok('pregunta_cerrada' in str(call("select public.submit_answer(%s,0,0)", room)), 'respuesta tardía rechazada')
s = call("select public.room_state(%s)", room); ok(s['counts'] == [0, 2] and s.get('code') is None, 'conteos al cerrar; equipo no ve código')
como(FAC, False); call("select public.set_state(%s,'ended',0)", room)
print(call("select public.room_summary(%s)", room))
como(T3, True); ok('sala_cerrada' in str(call("select public.join_room(%s,'Jaguar')", code)), 'no se entra a sala terminada')
