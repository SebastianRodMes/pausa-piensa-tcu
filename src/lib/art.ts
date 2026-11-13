// Ilustraciones SVG originales del proyecto (sin logos ni personajes de marcas).
// Estilo: trazo de tinta redondeado sobre colores de papel, acuarela plana.

const T = '#3C4035'; // tinta
const B = '#3E6549'; // bosque
const A = '#AD523A'; // arcilla
const M = '#D3A34C'; // miel
const P = '#FBF6E8'; // página
const PC = '#F3EBD9'; // papel
const S = 'stroke="#3C4035" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';

const wrap = (body: string, label: string, vb = '0 0 200 160') =>
  `<svg viewBox="${vb}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

const sombra = (cx: number, cy: number, rx: number) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx / 6}" fill="${T}" opacity=".12"/>`;

/** Niña o niño sencillo. */
export function nino(x: number, y: number, opts: { pelo?: string; ropa?: string; cara?: 'feliz' | 'triste' | 'duda' | 'asustado' | 'enojado'; s?: number } = {}) {
  const { pelo = '#6b4a2f', ropa = B, cara = 'feliz', s = 1 } = opts;
  const boca = {
    feliz: `<path d="M-9 8 q9 9 18 0" fill="none" ${S}/>`,
    triste: `<path d="M-8 12 q8 -7 16 0" fill="none" ${S}/>`,
    duda: `<path d="M-7 10 h14" fill="none" ${S}/>`,
    asustado: `<ellipse cx="0" cy="10" rx="5" ry="6" fill="${T}"/>`,
    enojado: `<path d="M-8 12 q8 -6 16 0" fill="none" ${S}/><path d="M-16 -8 l9 4 M16 -8 l-9 4" ${S}/>`,
  }[cara];
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${sombra(0, 78, 30)}
    <path d="M-26 78 q-2 -40 26 -42 q28 2 26 42 z" fill="${ropa}" ${S}/>
    <circle cx="0" cy="0" r="27" fill="#e9b98f" ${S}/>
    <path d="M-27 -2 q2 -30 27 -29 q27 -1 27 29 q-10 -14 -27 -14 q-17 0 -27 14z" fill="${pelo}" ${S}/>
    <circle cx="-9" cy="-1" r="3.2" fill="${T}"/><circle cx="9" cy="-1" r="3.2" fill="${T}"/>
    <circle cx="-15" cy="8" r="4" fill="${A}" opacity=".35"/><circle cx="15" cy="8" r="4" fill="${A}" opacity=".35"/>
    ${boca}
  </g>`;
}

/** Persona adulta de confianza (docente, orientadora o familiar). */
export function adulto(x: number, y: number, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${sombra(0, 100, 34)}
    <path d="M-32 100 q-3 -52 32 -55 q35 3 32 55 z" fill="${M}" ${S}/>
    <path d="M-10 48 l10 14 l10 -14" fill="none" ${S}/>
    <circle cx="0" cy="0" r="30" fill="#c98f62" ${S}/>
    <path d="M-30 -4 q0 -32 30 -32 q30 0 30 32 q-6 -8 -12 -10 q-14 6 -36 -2 q-8 4 -12 12z" fill="#2f2a24" ${S}/>
    <circle cx="-10" cy="0" r="3.2" fill="${T}"/><circle cx="10" cy="0" r="3.2" fill="${T}"/>
    <path d="M-10 13 q10 8 20 0" fill="none" ${S}/>
  </g>`;
}

/** Teléfono con mensaje en burbuja. */
export function telefono(x: number, y: number, texto = '', s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-34" y="-58" width="68" height="116" rx="12" fill="${T}"/>
    <rect x="-28" y="-48" width="56" height="94" rx="6" fill="${P}"/>
    <rect x="-27" y="-38" width="54" height="30" rx="8" fill="${A}" opacity=".9"/>
    <path d="M-14 -8 l-4 10 l12 -10z" fill="${A}" opacity=".9"/>
    ${texto ? `<text x="0" y="-19" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="${texto.length > 8 ? 10 : 12}" fill="#fff">${texto}</text>` : ''}
    <rect x="-20" y="10" width="40" height="7" rx="3.5" fill="${PC}"/>
    <rect x="-20" y="22" width="28" height="7" rx="3.5" fill="${PC}"/>
  </g>`;
}

export const ICONOS: Record<string, (label: string) => string> = {
  escuela: (l) => wrap(`
    ${sombra(100, 140, 70)}
    <path d="M40 70 L100 32 L160 70" fill="${A}" ${S}/>
    <rect x="50" y="68" width="100" height="70" fill="${P}" ${S}/>
    <rect x="88" y="100" width="24" height="38" fill="${M}" ${S}/>
    <rect x="60" y="82" width="20" height="16" fill="#cfe0e8" ${S}/><rect x="120" y="82" width="20" height="16" fill="#cfe0e8" ${S}/>
    <path d="M100 32 V14 h18 l-4 6 l4 6 h-18" fill="${B}" ${S}/>
    <path d="M150 34 q20 -14 34 4" fill="none" stroke="${A}" stroke-width="3" stroke-dasharray="4 7" stroke-linecap="round"/>
    <circle cx="186" cy="44" r="7" fill="${A}"/>`, l),
  adulto: (l) => wrap(`${nino(62, 70, { cara: 'feliz', s: .9 })}${adulto(132, 52, .95)}
    <path d="M86 98 q14 -10 26 -2" fill="none" stroke="${A}" stroke-width="4" stroke-linecap="round"/>
    <path d="M150 18 q8 -10 16 0 q8 -10 16 0 q0 12 -16 22 q-16 -10 -16 -22z" fill="${A}" ${S}/>`, l),
  candado: (l) => wrap(`
    ${sombra(80, 142, 46)}
    <path d="M56 70 v-18 a24 24 0 0 1 48 0 v18" fill="none" stroke="${T}" stroke-width="8" stroke-linecap="round"/>
    <rect x="42" y="68" width="76" height="66" rx="12" fill="${M}" ${S}/>
    <circle cx="80" cy="96" r="8" fill="${T}"/><rect x="77" y="98" width="6" height="18" rx="3" fill="${T}"/>
    ${adulto(158, 50, .7)}`, l),
  'llave-entregada': (l) => wrap(`
    ${telefono(150, 78, '¿Tu clave?', .95)}
    <g transform="translate(36 82) rotate(-12)">
      <circle cx="0" cy="0" r="18" fill="${M}" ${S}/><circle cx="0" cy="0" r="6" fill="${P}" ${S}/>
      <path d="M18 0 h52 M56 0 v12 M66 0 v9" fill="none" stroke="${T}" stroke-width="6" stroke-linecap="round"/>
    </g>
    <path d="M100 52 l14 -6 l-4 14" fill="none" ${S}/>`, l),
  'dedo-enlace': (l) => wrap(`
    ${telefono(84, 80, '¡GRATIS!', 1)}
    <g transform="translate(130 104) rotate(-28)">
      <path d="M0 0 v-40 a8 8 0 0 1 16 0 v26 l18 4 q10 4 8 16 l-6 24 h-34 q-10 -14 -16 -24 q-4 -10 6 -10z" fill="#e9b98f" ${S}/>
    </g>
    <path d="M30 30 l10 8 M22 50 l12 2 M40 18 l4 12" ${S}/>
    <text x="150" y="40" font-family="Caveat, cursive" font-size="26" fill="${A}">¡rápido!</text>`, l),
  pausa: (l) => wrap(`
    <g transform="translate(62 80)">
      <circle r="44" fill="${B}" ${S}/>
      <rect x="-15" y="-20" width="10" height="40" rx="4" fill="#fff"/><rect x="5" y="-20" width="10" height="40" rx="4" fill="#fff"/>
    </g>
    ${adulto(150, 50, .78)}`, l),
  'camara-enviar': (l) => wrap(`
    <g transform="translate(70 84)">
      <rect x="-46" y="-32" width="92" height="64" rx="12" fill="${A}" ${S}/>
      <rect x="-18" y="-44" width="36" height="16" rx="5" fill="${A}" ${S}/>
      <circle r="20" fill="${P}" ${S}/><circle r="9" fill="${T}"/>
    </g>
    <path d="M128 84 h44 M160 70 l14 14 l-14 14" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="126" y="58" font-family="Caveat, cursive" font-size="24" fill="${A}">enviar</text>`, l),
  insulto: (l) => wrap(`
    ${nino(64, 66, { cara: 'enojado', ropa: A, s: .95 })}
    <path d="M104 22 h80 a10 10 0 0 1 10 10 v34 a10 10 0 0 1 -10 10 h-56 l-14 14 v-14 h-10 a10 10 0 0 1 -10 -10 v-34 a10 10 0 0 1 10 -10z" fill="${A}" ${S}/>
    <text x="144" y="56" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="22" fill="#fff">#@%!</text>`, l),
  bloquear: (l) => wrap(`
    <g transform="translate(60 80)">
      <path d="M0 -50 l40 14 v30 q0 34 -40 52 q-40 -18 -40 -52 v-30z" fill="${B}" ${S}/>
      <circle r="17" fill="none" stroke="#fff" stroke-width="5"/><path d="M-12 12 l24 -24" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
    </g>
    ${adulto(150, 50, .78)}`, l),
};

/** Escenas (lado izquierdo del libro) para las situaciones del juego. */
export const ESCENAS: Record<string, (label: string) => string> = {
  datos: (l) => wrap(`${nino(70, 80, { cara: 'duda', s: 1.1 })}${telefono(190, 92, '¿Escuela?', 1.15)}
    <text x="40" y="34" font-family="Caveat, cursive" font-size="26" fill="${A}">«¡Qué bien jugás!»</text>`, l, '0 0 260 200'),
  clave: (l) => wrap(`${nino(70, 80, { cara: 'duda', s: 1.1, pelo: '#2f2a24', ropa: M })}${telefono(190, 92, '¿Tu clave?', 1.15)}
    <text x="34" y="34" font-family="Caveat, cursive" font-size="24" fill="${A}">«Somos del juego…»</text>`, l, '0 0 260 200'),
  premio: (l) => wrap(`${nino(70, 80, { cara: 'feliz', s: 1.1, pelo: '#a0522d', ropa: A })}${telefono(190, 92, '¡GRATIS!', 1.15)}
    <g fill="${M}" ${S}><circle cx="150" cy="30" r="12"/><circle cx="176" cy="22" r="10"/><circle cx="226" cy="34" r="12"/></g>
    <text x="20" y="180" font-family="Caveat, cursive" font-size="24" fill="${A}">¡Quedan 5 minutos!</text>`, l, '0 0 260 200'),
  secreto: (l) => wrap(`${nino(70, 80, { cara: 'asustado', s: 1.1, pelo: '#2f2a24', ropa: B })}${telefono(190, 92, 'Secreto…', 1.15)}
    <path d="M30 26 q10 -12 20 0" fill="none" stroke="${A}" stroke-width="3" stroke-linecap="round"/>
    <text x="22" y="182" font-family="Caveat, cursive" font-size="24" fill="${A}">«No le digás a nadie»</text>`, l, '0 0 260 200'),
  trato: (l) => wrap(`${nino(70, 80, { cara: 'triste', s: 1.1, pelo: '#6b4a2f', ropa: M })}${telefono(190, 92, '¡Malísimo!', 1.15)}
    <path d="M40 24 q4 10 0 16 M52 20 q4 10 0 16" fill="none" stroke="#7aa6c2" stroke-width="3" stroke-linecap="round"/>`, l, '0 0 260 200'),
  bienvenida: (l) => wrap(`${tortuga(82, 120, 1.1)}${nino(190, 92, { cara: 'feliz', s: .95, pelo: '#2f2a24', ropa: A })}
    <text x="20" y="34" font-family="Caveat, cursive" font-size="28" fill="${B}">¡Hola, equipo!</text>`, l, '0 0 260 200'),
  avatar: (l) => wrap(`
    <g transform="translate(70 100)"><rect x="-44" y="-56" width="88" height="112" rx="14" fill="${B}" ${S}/>
      <rect x="-20" y="-30" width="40" height="40" rx="6" fill="${M}" ${S}/><circle cx="-8" cy="-12" r="4" fill="${T}"/><circle cx="8" cy="-12" r="4" fill="${T}"/>
      <rect x="-24" y="16" width="48" height="26" rx="6" fill="${A}" ${S}/></g>
    <text x="70" y="186" text-anchor="middle" font-family="Caveat, cursive" font-size="24" fill="${T}">el avatar</text>
    <path d="M124 100 h20" ${S}/><text x="134" y="88" font-family="Nunito, sans-serif" font-weight="800" font-size="40" fill="${A}">?</text>
    ${adulto(206, 76, .8)}
    <text x="206" y="186" text-anchor="middle" font-family="Caveat, cursive" font-size="24" fill="${T}">¿quién es?</text>`, l, '0 0 260 200'),
  llaves: (l) => wrap(`
    <g transform="translate(130 100)">
      <path d="M0 -70 l56 20 v40 q0 46 -56 70 q-56 -24 -56 -70 v-40z" fill="${B}" ${S}/>
      <g transform="translate(-24 4)"><circle r="16" fill="${M}" ${S}/><circle r="5" fill="${P}" ${S}/>
      <path d="M16 0 h40 M46 0 v10 M54 0 v7" fill="none" stroke="${T}" stroke-width="6" stroke-linecap="round"/></g>
    </g>
    <text x="130" y="190" text-anchor="middle" font-family="Caveat, cursive" font-size="26" fill="${A}">mi clave es mi llave</text>`, l, '0 0 260 200'),
  compras: (l) => wrap(`${nino(70, 80, { cara: 'duda', s: 1.1, pelo: '#a0522d', ropa: B })}
    <g transform="translate(190 92)"><rect x="-44" y="-40" width="88" height="70" rx="10" fill="${P}" ${S}/>
    <path d="M-30 -18 h12 l10 30 h34 l8 -22 h-46" fill="none" ${S}/><circle cx="-4" cy="20" r="5" fill="${T}"/><circle cx="20" cy="20" r="5" fill="${T}"/></g>
    <text x="150" y="176" font-family="Caveat, cursive" font-size="24" fill="${A}">¿pido permiso?</text>`, l, '0 0 260 200'),
  ayuda: (l) => wrap(`${nino(80, 92, { cara: 'feliz', s: 1.05 })}${adulto(180, 70, 1)}
    <path d="M104 120 q22 -14 50 -4" fill="none" stroke="${A}" stroke-width="5" stroke-linecap="round"/>
    <path d="M118 22 q8 -10 16 0 q8 -10 16 0 q0 12 -16 22 q-16 -10 -16 -22z" fill="${A}" ${S}/>`, l, '0 0 260 200'),
  trespasos: (l) => wrap(`
    <g transform="translate(46 96)"><circle r="34" fill="${B}" ${S}/><rect x="-11" y="-15" width="8" height="30" rx="3" fill="#fff"/><rect x="3" y="-15" width="8" height="30" rx="3" fill="#fff"/></g>
    <g transform="translate(130 96)"><circle r="34" fill="${M}" ${S}/><text y="14" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="40" fill="${T}">?</text></g>
    <g transform="translate(214 96)"><circle r="34" fill="${A}" ${S}/><path d="M-12 -2 q0 -14 12 -6 q12 -8 12 6 q0 10 -12 18 q-12 -8 -12 -18z" fill="#fff"/></g>
    <text x="46" y="160" text-anchor="middle" font-family="Bree Serif, serif" font-size="18" fill="${T}">Pausa</text>
    <text x="130" y="160" text-anchor="middle" font-family="Bree Serif, serif" font-size="18" fill="${T}">Piensa</text>
    <text x="214" y="160" text-anchor="middle" font-family="Bree Serif, serif" font-size="18" fill="${T}">Pide ayuda</text>`, l, '0 0 260 200'),
};

/** Tito, la tortuga guía. */
export function tortuga(x: number, y: number, s = 1, cara: 'feliz' | 'triste' = 'feliz') {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${sombra(0, 40, 60)}
    <ellipse cx="46" cy="10" rx="20" ry="16" fill="#9cbf8a" ${S}/>
    <circle cx="52" cy="6" r="3" fill="${T}"/>
    ${cara === 'feliz' ? `<path d="M48 16 q6 4 12 -2" fill="none" ${S}/>` : `<path d="M48 19 q6 -5 12 0" fill="none" ${S}/>`}
    <ellipse cx="-30" cy="34" rx="12" ry="9" fill="#9cbf8a" ${S}/><ellipse cx="22" cy="34" rx="12" ry="9" fill="#9cbf8a" ${S}/>
    <path d="M-52 26 q0 -56 48 -56 q48 0 48 56z" fill="${B}" ${S}/>
    <path d="M-30 -8 l14 -12 l16 6 l2 18 l-16 10z M10 -14 l16 4 l4 16 l-12 10" fill="none" stroke="#2c4a35" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-52 26 h96" ${S}/>
  </g>`;
}

/** Símbolos sencillos para opciones (viewBox 0 0 120 120). */
const sym = (body: string, l: string) => wrap(body, l, '0 0 120 120');
export const SIMBOLOS: Record<string, (l: string) => string> = {
  corazon: (l) => sym(`<path d="M30 50 q0 -26 30 -12 q30 -14 30 12 q0 22 -30 44 q-30 -22 -30 -44z" fill="${A}" ${S}/>`, l),
  estrella: (l) => sym(`<path d="M60 16 l12 26 l28 3 l-21 19 l6 28 l-25 -14 l-25 14 l6 -28 l-21 -19 l28 -3z" fill="${M}" ${S}/>`, l),
  pelota: (l) => sym(`<circle cx="60" cy="62" r="36" fill="${P}" ${S}/><path d="M60 26 l-14 22 l14 14 l16 -12z M24 62 h22 M74 50 l22 2 M46 48 l-14 36 M60 62 l4 34" fill="none" ${S}/>`, l),
  pincel: (l) => sym(`<path d="M84 18 l18 18 l-42 42 l-18 -18z" fill="${M}" ${S}/><path d="M42 60 q-24 4 -22 40 q34 2 40 -22z" fill="${B}" ${S}/>`, l),
  musica: (l) => sym(`<path d="M44 84 V30 l44 -10 v54" fill="none" ${S}/><ellipse cx="34" cy="86" rx="12" ry="9" fill="${A}" ${S}/><ellipse cx="78" cy="76" rx="12" ry="9" fill="${A}" ${S}/>`, l),
  torre: (l) => sym(`<rect x="34" y="78" width="52" height="22" rx="3" fill="${A}" ${S}/><rect x="40" y="56" width="40" height="22" rx="3" fill="${M}" ${S}/><rect x="46" y="34" width="28" height="22" rx="3" fill="${B}" ${S}/><rect x="52" y="14" width="16" height="20" rx="3" fill="${P}" ${S}/>`, l),
  libro: (l) => sym(`<path d="M14 30 q22 -10 46 4 v62 q-24 -14 -46 -4z" fill="${P}" ${S}/><path d="M106 30 q-22 -10 -46 4 v62 q24 -14 46 -4z" fill="${M}" ${S}/>`, l),
  olla: (l) => sym(`<path d="M24 52 h72 v30 q0 16 -16 16 h-40 q-16 0 -16 -16z" fill="${A}" ${S}/><path d="M16 52 h88 M44 40 q2 -12 -4 -20 M60 40 q2 -12 -4 -20 M76 40 q2 -12 -4 -20" fill="none" ${S}/>`, l),
  planta: (l) => sym(`<path d="M36 74 h48 l-6 28 h-36z" fill="${A}" ${S}/><path d="M60 74 V40" ${S}/><path d="M60 52 q-26 -2 -28 -26 q26 0 28 26z M60 44 q22 -4 26 -26 q-24 2 -26 26z" fill="${B}" ${S}/>`, l),
  herramienta: (l) => sym(`<path d="M30 92 l40 -40 a20 20 0 0 1 26 -26 l-12 12 l4 10 l10 4 l12 -12 a20 20 0 0 1 -26 26 l-40 40 a8 8 0 0 1 -14 -14z" fill="${M}" ${S}/>`, l),
  pizarra: (l) => sym(`<rect x="16" y="22" width="88" height="60" rx="6" fill="${B}" ${S}/><path d="M30 44 h40 M30 58 h28" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M40 82 l-10 22 M80 82 l10 22" ${S}/>`, l),
  acompanar: (l) => wrap(`${nino(38, 44, { s: .6, cara: 'triste', ropa: M })}${nino(84, 44, { s: .6, cara: 'feliz', ropa: A, pelo: '#2f2a24' })}<path d="M52 86 q8 -6 18 0" fill="none" stroke="${A}" stroke-width="4" stroke-linecap="round"/>`, l, '0 0 120 120'),
  alejarse: (l) => wrap(`${nino(40, 46, { s: .62, cara: 'duda' })}<path d="M70 62 h34 M92 50 l12 12 l-12 12" fill="none" stroke="${B}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`, l, '0 0 120 120'),
  burla: (l) => wrap(`${nino(42, 48, { s: .62, cara: 'enojado', ropa: A })}<text x="92" y="44" text-anchor="middle" font-family="Caveat, cursive" font-size="28" fill="${A}">ja ja</text>`, l, '0 0 120 120'),
  avisar: (l) => wrap(`${adulto(60, 34, .62)}`, l, '0 0 120 120'),
  mano: (l) => sym(`<path d="M40 104 v-50 a7 7 0 0 1 14 0 v-22 a7 7 0 0 1 14 0 v24 a7 7 0 0 1 14 0 v10 a7 7 0 0 1 14 0 v22 q0 16 -16 16z" fill="#e9b98f" ${S}/>`, l),
  saludo_mano: (l) => sym(`<path d="M26 66 h30 M64 66 h30" stroke="${T}" stroke-width="10" stroke-linecap="round"/><circle cx="60" cy="66" r="10" fill="${M}" ${S}/>`, l),
  saludo_lejos: (l) => sym(`<path d="M46 98 v-44 a6 6 0 0 1 12 0 v-16 a6 6 0 0 1 12 0 v18 a6 6 0 0 1 12 0 v24 q0 18 -18 18z" fill="#e9b98f" ${S}/><path d="M24 40 q-8 10 0 20 M14 34 q-12 16 0 32" fill="none" stroke="${A}" stroke-width="3" stroke-linecap="round"/>`, l),
  abrazo_no: (l) => sym(`<circle cx="60" cy="60" r="38" fill="${P}" ${S}/><path d="M42 50 q18 -12 36 0" fill="none" ${S}/><path d="M40 70 h40" stroke="${A}" stroke-width="6" stroke-linecap="round"/>`, l),
  bandera: (l) => sym(`<path d="M34 104 V18" ${S}/><path d="M34 20 h52 l-10 14 l10 14 h-52" fill="${M}" ${S}/>`, l),
  pasito: (l) => sym(`<ellipse cx="44" cy="80" rx="14" ry="20" fill="${B}" ${S}/><ellipse cx="78" cy="46" rx="14" ry="20" fill="${B}" ${S}/>`, l),
};

/** Renderiza una clave de dibujo: «cara:triste», «icono:adulto», «simbolo:pelota», «escena:datos». */
export function dibujo(clave: string, label: string): string {
  const [tipo, nombre] = clave.split(':');
  if (tipo === 'cara') {
    return wrap(nino(60, 50, { cara: nombre as any, s: .85, ropa: nombre === 'enojado' ? A : nombre === 'triste' ? '#6f8fa6' : B }), label, '0 0 120 130');
  }
  if (tipo === 'tortuga') return wrap(tortuga(110, 110, 1.3, (nombre as any) || 'feliz'), label, '0 0 220 170');
  if (tipo === 'icono' && ICONOS[nombre]) return ICONOS[nombre](label);
  if (tipo === 'simbolo' && SIMBOLOS[nombre]) return SIMBOLOS[nombre](label);
  if (tipo === 'escena' && ESCENAS[nombre]) return ESCENAS[nombre](label);
  if (tipo === 'portada' && PORTADAS[nombre]) return PORTADAS[nombre];
  return wrap(`<rect x="10" y="10" width="180" height="140" rx="12" fill="${PC}"/>`, label);
}

/** Ilustración de portada de cada recorrido o módulo. */
export const PORTADAS: Record<string, string> = {
  orientacion: wrap(`${tortuga(84, 108, 1)}${nino(186, 78, { cara: 'feliz', s: .9, pelo: '#2f2a24', ropa: A })}
    <path d="M150 20 q8 -10 16 0 q8 -10 16 0 q0 12 -16 22 q-16 -10 -16 -22z" fill="${A}" ${S}/>`, 'Tortuga guía junto a una niña sonriente', '0 0 260 180'),
  seguridad: wrap(`${nino(72, 76, { cara: 'duda', s: .95 })}${telefono(178, 86, '¿Clave?', 1)}
    <g transform="translate(128 30)"><circle r="16" fill="${B}" ${S}/><rect x="-6" y="-8" width="4" height="16" fill="#fff"/><rect x="2" y="-8" width="4" height="16" fill="#fff"/></g>`, 'Niño mirando un mensaje sospechoso en un teléfono', '0 0 260 180'),
  docentes: wrap(`${adulto(80, 54, .95)}
    <g transform="translate(184 92)"><rect x="-58" y="-48" width="116" height="80" rx="8" fill="${P}" ${S}/><rect x="-64" y="32" width="128" height="10" rx="4" fill="${T}"/>
    <rect x="-46" y="-34" width="56" height="8" rx="4" fill="${M}"/><rect x="-46" y="-18" width="84" height="6" rx="3" fill="${PC}"/><rect x="-46" y="-6" width="70" height="6" rx="3" fill="${PC}"/>
    <path d="M-40 14 l10 -10 l10 8 l14 -16 l18 18" fill="none" stroke="${B}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>
    <text x="128" y="30" font-family="Caveat, cursive" font-size="21" fill="${A}">¡reviso y mejoro!</text>`, 'Docente frente a una computadora preparando un recurso', '0 0 260 180'),
  autoestima: wrap(`${tortuga(80, 116, .95)}
    <g transform="translate(184 86)"><path d="M-30 30 q-4 -60 30 -66 q34 6 30 66z" fill="${M}" ${S}/>
    <circle cx="-8" cy="-6" r="8" fill="${A}" ${S}/><path d="M6 -14 l4 8 l8 1 l-6 6 l2 8 l-8 -4 l-8 4 l2 -8 l-6 -6 l8 -1z" fill="${B}" ${S}/><path d="M-14 14 h28" ${S}/></g>
    <text x="150" y="28" font-family="Caveat, cursive" font-size="24" fill="${A}">mi mochila</text>`, 'Tortuga y una mochila llena de cualidades', '0 0 260 180'),
  convivencia: wrap(`${nino(62, 70, { cara: 'triste', s: .8, pelo: '#a0522d', ropa: M })}${nino(130, 70, { cara: 'feliz', s: .8, pelo: '#2f2a24', ropa: A })}${nino(198, 70, { cara: 'feliz', s: .8 })}
    <path d="M84 120 q12 -8 24 0" fill="none" stroke="${A}" stroke-width="4" stroke-linecap="round"/>`, 'Tres niños, uno de ellos invitado a jugar', '0 0 260 180'),
  cuerpo: wrap(`${nino(86, 70, { cara: 'feliz', s: .95, pelo: '#2f2a24', ropa: B })}
    <g transform="translate(188 76)"><path d="M0 -44 l40 14 v24 q0 38 -40 56 q-40 -18 -40 -56 v-24z" fill="${M}" ${S}/>
    <path d="M-12 -2 q0 -14 12 -6 q12 -8 12 6 q0 10 -12 18 q-12 -8 -12 -18z" fill="${A}"/></g>`, 'Niña junto a un escudo con un corazón', '0 0 260 180'),
  proyecto: wrap(`${nino(70, 70, { cara: 'feliz', s: .9, pelo: '#a0522d', ropa: A })}
    <path d="M110 140 q40 -10 60 -50 q20 -40 70 -50" fill="none" stroke="${T}" stroke-width="3" stroke-dasharray="6 8" stroke-linecap="round"/>
    <path d="M226 22 v36 M226 22 h24 l-6 8 l6 8 h-24" fill="${M}" ${S}/>
    <g fill="${B}" ${S}><circle cx="140" cy="122" r="7"/><circle cx="178" cy="78" r="7"/></g>`, 'Niño mirando un camino que lleva a una bandera', '0 0 260 180'),
};
