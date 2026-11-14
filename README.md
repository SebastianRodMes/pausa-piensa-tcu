# Pausa, piensa y aprende

Herramienta web educativa para la **Escuela Arturo Quirós Carranza** (Orotina), desarrollada en el TCU-505 «Alfabetización digital como motor para el desarrollo y la inclusión en Costa Rica» (UTN, Sede del Pacífico) por Sebastián Rodríguez Mesén.

Tiene tres recorridos:

| Recorrido | Público | Contenido |
|---|---|---|
| **Orientación** | Preescolar y 1.º a 3.º | 4 módulos: *Así soy yo* (autoestima), *Nos tratamos bien* (convivencia y bullying), *Mi cuerpo merece cuidado* (cuidado del cuerpo y prevención del abuso), *Lo que puedo aprender* (proyecto de vida). Cuento, decisiones con imágenes, pausa activa y estribillo. |
| **Seguridad digital** | 4.º a 6.º | Charla y juego «Pausa, piensa y pide ayuda» (45 o 25 min). Cinco situaciones de juegos en línea. Se juega en grupo (dedos/tarjetas) o con un teléfono por equipo. |
| **Taller docente** | Personal docente | 8 bloques, 120 min. Crear, revisar y adaptar un recurso de clase con IA (ChatGPT/Gemini/Claude, NotebookLM, Suno). Ficha de recurso que se guarda solo en el equipo. |

## Manual de uso (para la escuela)

1. Abrí la dirección del sitio en la computadora conectada al proyector.
2. Elegí un recorrido. En **Orientación**, primero elegí el nivel (Preescolar o Primero a tercero) y luego el tema.
3. En la presentación: **→** avanza, **←** retrocede, **E** o el botón **🔊 Escuchar** narra la pantalla, **F** pantalla completa, **S** abre la vista del presentador con notas (para que no se vean en el proyector).
4. En las decisiones, el grupo señala o levanta la mano y la persona adulta toca la opción elegida; aparece y se narra la explicación.
5. **Sin internet:** si la página se abrió antes con conexión en ese navegador, las presentaciones y el juego en grupo funcionan igual. En *Recursos* está el botón «Preparar copia sin conexión».
6. **Juego con teléfonos (opcional):** la persona facilitadora entra en *Soy facilitador*, crea una sala y proyecta el código y el QR. Cada equipo entra desde un teléfono en *Unirme a un juego*, sin nombre ni correo. Al final se puede descargar un resumen con conteos para la bitácora.

### Cuidado de la niñez y privacidad
- Personajes y situaciones ficticias. No hay logos ni capturas de juegos reales.
- No se piden ni guardan nombres, edades, fotos, ubicación ni texto libre de los niños. No hay chat ni ranking.
- El módulo *Mi cuerpo merece cuidado* lo conduce la orientadora. Si surge una revelación se aplica el protocolo de protección de la escuela; la herramienta no registra denuncias.
- Las salas se cierran a las 4 horas y sus datos se borran a los 7 días.
- Cumple la Ley 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales.

## Guía técnica y de continuidad

**Tecnologías:** Astro 7 + TypeScript (sitio estático), reveal.js 6 (presentaciones), Supabase (salas: PostgreSQL + Auth anónima + funciones RPC), Vercel (publicación), qrcode, fuentes locales @fontsource, voz del navegador (Web Speech API), service worker para uso sin conexión.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/ y dist/sw.js (copia sin conexión)
```

### Estructura
```
src/content/      Textos editables: seguridad.ts, orientacion.ts, docentes.ts
src/lib/art.ts    Ilustraciones SVG originales
src/lib/sala.ts   Conexión con Supabase (salas)
src/lib/voz.ts    Narración
src/components/   Deck (reveal.js), SeguridadDeck, OrientacionDeck
src/pages/        Rutas: /, /orientacion/, /seguridad/, /docentes/, /participar/, /facilitar/, /recursos/
supabase/migrations/  Tablas, reglas y funciones del servidor
tests/            Pruebas de permisos de las salas
```

**Para cambiar un cuento, una pregunta o un estribillo**, editá el archivo correspondiente en `src/content/` y volvé a publicar. No hace falta tocar el diseño.

### Activar las salas con teléfonos (Supabase)
1. Crear un proyecto en Supabase (plan gratuito).
2. Ejecutar `supabase/migrations/20261112000000_salas.sql` en el editor SQL.
3. *Authentication → Sign In / Providers*: activar **Allow anonymous sign-ins** y dejar **activado** *Allow new users to sign up* (Supabase bloquea el acceso anónimo si el registro está apagado).
4. *Authentication → Users → Add user*: crear la cuenta de la persona facilitadora (correo y contraseña, con *Auto Confirm User*).
5. Habilitarla como facilitadora en el editor SQL: `insert into public.facilitators (user_id) select id from auth.users where email = 'correo@ejemplo.com';`. Solo las cuentas de esa lista pueden crear salas, aunque alguien más se registre.
6. Copiar la URL del proyecto y la clave pública (anon) en `.env` (ver `.env.example`) o en las variables de entorno de Vercel: `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY`. **Nunca** usar la clave `service_role` en el sitio.
7. Probar con 2 o 3 teléfonos en la red de la escuela antes de usarlo en clase (Supabase limita los ingresos anónimos por IP).

Sin estos datos el sitio funciona igual; solo se oculta el juego con teléfonos y se ofrece el modo en grupo.

### Publicar en Vercel
Versión publicada: https://pausa-piensa-tcu.vercel.app

Importar el repositorio en Vercel (framework: Astro, comando `npm run build`, salida `dist`), agregar las dos variables de entorno y publicar.

### Pruebas de las salas
`tests/test_salas.py` crea salas y equipos en un PostgreSQL local (con `tests/stub_auth.sql` imitando `auth`) y comprueba: solo los facilitadores habilitados crean salas, nombres únicos, reconexión, respuestas sin duplicar, rechazo de respuestas tardías, aislamiento entre salas y que los equipos no ven conteos hasta cerrar la pregunta.

## Créditos
Contenidos, ilustraciones, cuentos y estribillos: originales del proyecto. Fuentes de referencia: UNICEF (acoso escolar), NSPCC Learning, avisos de seguridad de Roblox y Garena sobre ofertas falsas. Desarrollado como Trabajo Comunal Universitario, 2026.
