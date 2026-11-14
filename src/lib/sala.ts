// Conexión con Supabase para las salas. Solo usa la URL y la clave pública (anon);
// las reglas viven en las funciones del servidor (supabase/migrations).
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const URL_SB = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const KEY_SB = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export const salasDisponibles = Boolean(URL_SB && KEY_SB);
export const sb: SupabaseClient | null = salasDisponibles ? createClient(URL_SB!, KEY_SB!, { auth: { persistSession: true, storageKey: 'pausa-sesion' } }) : null;

export const EQUIPOS = [
  { nombre: 'Rayo', icono: '⚡', color: '#D3A34C' },
  { nombre: 'Tucán', icono: '🐦', color: '#AD523A' },
  { nombre: 'Volcán', icono: '🌋', color: '#8a3b2a' },
  { nombre: 'Estrella', icono: '⭐', color: '#c9932f' },
  { nombre: 'Ola', icono: '🌊', color: '#4f7f9a' },
  { nombre: 'Cohete', icono: '🚀', color: '#3E6549' },
  { nombre: 'Jaguar', icono: '🐆', color: '#9c7428' },
  { nombre: 'Montaña', icono: '⛰️', color: '#5f6455' },
];
export const iconoEquipo = (n: string) => EQUIPOS.find((e) => e.nombre === n)?.icono ?? '•';

export interface EstadoSala {
  status: 'lobby' | 'question' | 'reveal' | 'ended'; q: number; revision: number; code?: string | null;
  teams: string[]; answered: number; counts: [number, number] | null; my_answer: number | null; expired: boolean;
}

const MENSAJES: Record<string, string> = {
  codigo_incorrecto: 'Ese código no existe. Pidan ayuda para revisarlo.',
  sala_cerrada: 'La sala ya terminó.',
  sala_llena: 'La sala está llena. Únanse a otro equipo.',
  nombre_tomado: 'Ese nombre ya lo eligió otro equipo.',
  pregunta_cerrada: 'La pregunta ya se cerró.',
  sin_permiso: 'No tenés permiso para esta sala.',
  solo_facilitador: 'Necesitás entrar con la cuenta de facilitador.',
};
export function mensajeError(e: unknown): string {
  const m = (e as any)?.message || String(e);
  for (const k of Object.keys(MENSAJES)) if (m.includes(k)) return MENSAJES[k];
  if (/anonymous/i.test(m)) return 'Las salas todavía no aceptan teléfonos: la persona facilitadora debe activar el acceso anónimo en Supabase.';
  if (/fetch|network|Failed/i.test(m)) return 'Sin conexión. Si no vuelve, sigan jugando en grupo.';
  if (/rate|too many/i.test(m)) return 'Demasiados intentos desde esta red. Esperen un momento o jueguen en grupo.';
  return 'Algo salió mal. Intenten de nuevo.';
}

export async function rpc<T = any>(fn: string, args: Record<string, unknown> = {}): Promise<T> {
  if (!sb) throw new Error('salas_no_configuradas');
  const { data, error } = await sb.rpc(fn, args);
  if (error) throw new Error(error.message);
  return data as T;
}

/** Consulta periódica del estado (cada 1,5 s). Más simple y confiable que tiempo real para 8 equipos. */
export function escucharSala(roomId: string, cb: (s: EstadoSala) => void, onError: (e: unknown) => void) {
  let rev = -1, activo = true, fallos = 0;
  async function tick() {
    if (!activo) return;
    try {
      const s = await rpc<EstadoSala>('room_state', { p_room: roomId });
      fallos = 0;
      if (s.revision !== rev || s.status === 'question') { rev = s.revision; cb(s); }
    } catch (e) { fallos++; if (fallos === 2) onError(e); }
    if (activo) setTimeout(tick, 1500);
  }
  tick();
  return () => { activo = false; };
}
