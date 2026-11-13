// Charla y juego «Pausa, piensa y pide ayuda» (4.º a 6.º grado).
// Situaciones y nombres ficticios. Sin logos ni capturas de juegos reales.

export interface Opcion { id: string; texto: string; dibujo: string; cuidado: boolean }
export interface Ronda {
  id: string; tema: string; escena: string; personaje: string; mensaje: string;
  consigna: string; opciones: [Opcion, Opcion]; explicacion: string; frase: string;
}
export interface Bloque {
  id: string; titulo: string; dibujo: string; texto: string[]; consigna: string; notas: string;
  min45: number; min25: number; // 0 = no se usa en esa duración
}

export const VERSION_SEGURIDAD = '1.0 · noviembre 2026';

export const BLOQUES: Bloque[] = [
  {
    id: 'mision', titulo: 'Misión del día', dibujo: 'escena:bienvenida',
    texto: ['Hoy vamos a practicar cómo cuidarnos cuando jugamos en línea.', 'Pedir ayuda siempre está bien.'],
    consigna: 'Hola, equipo. Hoy vamos a practicar cómo cuidarnos cuando jugamos en línea. Recuerden algo importante: pedir ayuda siempre está bien.',
    notas: 'Presentarse. Preguntar a mano alzada quién juega en línea (sin pedir nombres de cuentas). Acordar que nadie se burla de las respuestas.',
    min45: 2, min25: 2,
  },
  {
    id: 'avatar', titulo: '¿Quién está detrás?', dibujo: 'escena:avatar',
    texto: ['Un avatar no dice quién es la persona.', 'Alguien puede decir que tiene tu edad y no ser cierto.'],
    consigna: 'En los juegos vemos personajes, pero no sabemos quién está detrás de la pantalla. Una persona puede decir que tiene tu edad y no ser cierto.',
    notas: 'Ejemplo narrado: «Estrella123 dice que tiene 11 años y que va a una escuela cerca». ¿Podemos saber si es verdad? No. Por eso cuidamos lo que contamos.',
    min45: 3, min25: 0,
  },
  {
    id: 'datos', titulo: 'Mis datos personales', dibujo: 'icono:escuela',
    texto: ['Se cuidan: dirección, escuela, teléfono, fotos con uniforme y ubicación.', 'Aunque la persona sea amable.'],
    consigna: 'Hay datos que se cuidan: dónde vivo, mi escuela, mi teléfono, fotos con el uniforme y dónde estoy. Se cuidan aunque la persona sea muy amable.',
    notas: 'Pedir al grupo que señale qué datos se cuidan. Aclarar que el nombre del juego o apodo sí se puede usar, pero sin datos reales.',
    min45: 4, min25: 3,
  },
  {
    id: 'cuenta', titulo: 'Mi cuenta', dibujo: 'escena:llaves',
    texto: ['La contraseña y los códigos son la llave de mi cuenta.', 'El juego nunca los pide por mensaje.'],
    consigna: 'La contraseña y los códigos que llegan al teléfono son como la llave de la casa. No se le entregan a nadie, ni a un amigo. El juego nunca los pide por mensaje.',
    notas: 'Comparar con la llave de la casa. Si alguien ya compartió su clave: avisar a una persona adulta para cambiarla. No regañar.',
    min45: 4, min25: 0,
  },
  {
    id: 'secretos', titulo: 'Contactos y secretos', dibujo: 'escena:secreto',
    texto: ['Si alguien pide fotos o pide guardar un secreto que incomoda…', '…eso se cuenta a una persona adulta.'],
    consigna: 'Si alguien en un juego pide fotos o pide guardar un secreto que hace sentir incómodo, eso no se guarda: se le cuenta a una persona adulta de confianza.',
    notas: 'Lenguaje cuidadoso, sin detalles. Mensaje clave: nunca es culpa del niño o la niña. Si surge una revelación, no preguntar frente al grupo y avisar ese mismo día a la orientadora.',
    min45: 4, min25: 0,
  },
  {
    id: 'premios', titulo: 'Premios y enlaces', dibujo: 'escena:premio',
    texto: ['Gratis + prisa + te piden datos = trampa.', 'Me detengo y lo reviso con una persona adulta.'],
    consigna: 'Cuando aparece algo gratis, con mucha prisa, y además piden tu usuario o contraseña, es una trampa. Hago pausa y lo reviso con una persona adulta.',
    notas: 'Las propias plataformas advierten sobre generadores de monedas o diamantes gratis. No se abre ningún enlace real en la charla.',
    min45: 4, min25: 0,
  },
  {
    id: 'ayuda', titulo: 'Si algo me incomoda', dibujo: 'escena:ayuda',
    texto: ['Busco a una persona adulta segura.', 'Si la primera no me ayuda, busco a otra.'],
    consigna: '¿A quién le puedo contar? A mi mamá, papá o quien me cuida, a la maestra, a la orientadora. Si la primera persona no me ayuda, busco a otra.',
    notas: 'Ensayo: cada niño piensa en silencio en dos personas adultas de confianza. No se dicen en voz alta. Practicar la frase: «Me pasó algo en un juego y quiero contarle».',
    min45: 3, min25: 2,
  },
  {
    id: 'compras', titulo: 'Compras y buen trato', dibujo: 'escena:compras',
    texto: ['Para comprar en un juego, primero pido permiso.', 'Si alguien me trata mal: no respondo, bloqueo, reporto y cuento.'],
    consigna: 'Para comprar algo en un juego, primero pido permiso. Y si alguien me trata mal, no respondo con insultos: bloqueo, reporto con ayuda y lo cuento.',
    notas: 'Mostrar el gesto de bloquear como simulación, sin abrir juegos reales. Recordar que en línea también se trata bien a los demás.',
    min45: 3, min25: 0,
  },
];

export const RONDAS: Ronda[] = [
  {
    id: 'r1', tema: 'Mis datos', escena: 'escena:datos', personaje: 'Rayo_77',
    mensaje: '¡Qué bien jugás! ¿En qué escuela estás y por dónde vivís?',
    consigna: 'Alguien del chat te dice: ¡Qué bien jugás! ¿En qué escuela estás y por dónde vivís? ¿Qué hacés?',
    opciones: [
      { id: 'a', texto: 'Le digo mi escuela', dibujo: 'icono:escuela', cuidado: false },
      { id: 'b', texto: 'No doy esos datos y le cuento a un adulto', dibujo: 'icono:adulto', cuidado: true },
    ],
    explicacion: 'Escuela, dirección, ubicación y fotos con uniforme son datos personales, aunque la persona sea amable.',
    frase: 'Mis datos se cuidan.',
  },
  {
    id: 'r2', tema: 'Mi contraseña', escena: 'escena:clave', personaje: 'Soporte_Oficial_1',
    mensaje: 'Somos del equipo del juego. Pasanos tu contraseña y el código que te llegó.',
    consigna: 'Te llega este mensaje: Somos del equipo del juego. Pasanos tu contraseña y el código que te llegó. ¿Qué hacés?',
    opciones: [
      { id: 'a', texto: 'No doy nada y aviso a un adulto', dibujo: 'icono:candado', cuidado: true },
      { id: 'b', texto: 'La paso solo esta vez', dibujo: 'icono:llave-entregada', cuidado: false },
    ],
    explicacion: 'La clave y los códigos son la llave de mi cuenta. El juego nunca los pide por mensaje.',
    frase: 'Mi clave es mi llave.',
  },
  {
    id: 'r3', tema: 'Premios falsos', escena: 'escena:premio', personaje: 'Anuncio',
    mensaje: '¡10 000 monedas gratis! Escribí tu usuario y contraseña. ¡Quedan 5 minutos!',
    consigna: 'Aparece un anuncio: ¡Diez mil monedas gratis! Escribí tu usuario y contraseña. ¡Quedan cinco minutos! ¿Qué hacés?',
    opciones: [
      { id: 'a', texto: 'Entro rápido', dibujo: 'icono:dedo-enlace', cuidado: false },
      { id: 'b', texto: 'Hago pausa y se lo enseño a un adulto', dibujo: 'icono:pausa', cuidado: true },
    ],
    explicacion: 'Gratis + prisa + piden datos = trampa.',
    frase: 'Si hay prisa, hago pausa.',
  },
  {
    id: 'r4', tema: 'Fotos y secretos', escena: 'escena:secreto', personaje: 'Nube_Azul',
    mensaje: 'Mandame una foto tuya, pero no le digás a nadie. Es nuestro secreto.',
    consigna: 'Un contacto escribe: Mandame una foto tuya, pero no le digás a nadie. Es nuestro secreto. ¿Qué hacés?',
    opciones: [
      { id: 'a', texto: 'No la mando y le cuento a un adulto', dibujo: 'icono:adulto', cuidado: true },
      { id: 'b', texto: 'La mando porque somos amigos', dibujo: 'icono:camara-enviar', cuidado: false },
    ],
    explicacion: 'Un secreto que incomoda se cuenta. Si alguien ya respondió, no es su culpa: igual puede pedir ayuda.',
    frase: 'Los secretos que incomodan se cuentan.',
  },
  {
    id: 'r5', tema: 'Buen trato', escena: 'escena:trato', personaje: 'Lobo_X',
    mensaje: 'Sos malísimo. Nadie te quiere en el equipo.',
    consigna: 'Alguien escribe en cada partida: Sos malísimo. Nadie te quiere en el equipo. ¿Qué hacés?',
    opciones: [
      { id: 'a', texto: 'Le respondo con insultos', dibujo: 'icono:insulto', cuidado: false },
      { id: 'b', texto: 'No contesto, bloqueo o reporto con ayuda y le cuento a un adulto', dibujo: 'icono:bloquear', cuidado: true },
    ],
    explicacion: 'Responder empeora todo. Bloquear, reportar y pedir ayuda sí ayuda.',
    frase: 'No respondo: bloqueo, reporto y cuento.',
  },
];

/** Reto final: tres casos nuevos para comprobar (se responde con el pulgar arriba o abajo). */
export const RETO = [
  { caso: 'Un jugador te ofrece un traje gratis si le das el código que te llegó al teléfono.', cuidado: 'No doy el código y aviso a una persona adulta.' },
  { caso: 'Tu primo quiere ver tu partida y te pregunta cómo se juega.', cuidado: 'Esto está bien: le enseño el juego sin darle mi contraseña.' },
  { caso: 'Alguien que no conocés te pide que hablen por otra aplicación y que no le contés a nadie.', cuidado: 'Hago pausa y se lo cuento a una persona adulta.' },
];

export const CIERRE = {
  titulo: 'Pausa, piensa y pide ayuda',
  texto: 'Pausa: me detengo. Piensa: ¿me piden datos, claves, fotos, dinero o un secreto? Pide ayuda: le cuento a una persona adulta de confianza.',
  tarea: 'Tarea para la casa: contale a alguien de tu familia el truco de las tres palabras.',
};
