-- Ajuste recomendado por el asesor de seguridad de Supabase.
-- (Las advertencias sobre RLS sin políticas y funciones SECURITY DEFINER son intencionales:
--  las tablas no se leen directamente y las funciones son la única puerta, con validación interna.)
alter function public._es_facilitador() set search_path = public;
revoke execute on function public._es_facilitador() from authenticated;
