// Taller docente «Creamos un recurso para nuestra clase» (120 minutos).
// Se trabaja con datos ficticios. Las herramientas se abren aparte con cuentas adultas; no hay API integrada.

export interface BloqueTaller {
  id: string; titulo: string; min: number; objetivo: string; pasos: string[];
  ejemplo?: { antes?: string; despues?: string; titulo?: string; texto?: string };
  enlaces?: { texto: string; href: string }[];
  notas: string;
}

export const HERRAMIENTAS = [
  { id: 'chatgpt', nombre: 'ChatGPT', href: 'https://chatgpt.com/' },
  { id: 'gemini', nombre: 'Gemini', href: 'https://gemini.google.com/' },
  { id: 'claude', nombre: 'Claude', href: 'https://claude.ai/' },
];

export const BLOQUES_TALLER: BloqueTaller[] = [
  {
    id: 'inicio', titulo: 'Inicio y cuidados', min: 10,
    objetivo: 'Elegir un recurso de clase y acordar trabajar sin datos de estudiantes.',
    pasos: [
      'Cada docente piensa en una clase de la próxima semana.',
      'Elige qué recurso le serviría: cuento, actividad visual, preguntas o canción.',
      'Acuerdo: no usamos nombres, fotos, notas ni expedientes de estudiantes. Solo ejemplos ficticios.',
    ],
    notas: 'Preguntar qué herramientas han usado. Aclarar que no se exige aprender las tres.',
  },
  {
    id: 'instrucciones', titulo: 'Instrucciones claras', min: 15,
    objetivo: 'Transformar una petición vaga en objetivo, nivel, contexto y formato.',
    pasos: ['Objetivo: qué deben aprender.', 'Nivel: grado y si saben leer.', 'Contexto: tiempo, materiales y tema.', 'Formato: pasos, preguntas, cuento, tabla.'],
    ejemplo: {
      antes: 'Hazme una actividad.',
      despues: 'Prepara una actividad oral de ocho minutos para primero de primaria sobre reconocer el enojo y pedir ayuda. Usa imágenes descritas, dos opciones por situación y lenguaje sencillo. Incluye objetivo, materiales, pasos y una comprobación final. No supongas que saben leer.',
    },
    notas: 'Pedir a dos docentes que lean su petición mejorada en voz alta.',
  },
  {
    id: 'crear', titulo: 'Crear y adaptar', min: 20,
    objetivo: 'Generar una actividad con un asistente, revisarla y mejorarla.',
    pasos: ['Prueba la petición en el asistente elegido.', 'Revisa el resultado: vocabulario, edad, tiempo, materiales, inclusión y exactitud.', 'Pide una adaptación concreta (por ejemplo: «hazla para un grupo con poca lectura»).', 'Decide qué conservar. La revisión humana es parte del producto.'],
    enlaces: [],
    notas: 'Si falla el acceso, usar el ejemplo preparado de la ficha.',
  },
  {
    id: 'fuentes', titulo: 'Trabajar con fuentes', min: 20,
    objetivo: 'Formular preguntas sobre un documento en NotebookLM y comprobar una cita.',
    pasos: ['Subir un documento breve y autorizado (por ejemplo, un texto del programa de estudio).', 'Hacer tres preguntas sobre el documento.', 'Abrir una cita y comprobar si la respuesta coincide con el texto.', 'Guardar una pregunta y su verificación.'],
    enlaces: [{ texto: 'Abrir NotebookLM', href: 'https://notebooklm.google.com/' }],
    notas: 'Mostrar un ejemplo donde la respuesta no coincide del todo con la fuente.',
  },
  {
    id: 'pausa', titulo: 'Pausa', min: 5,
    objetivo: 'Descanso breve y preparación de la siguiente práctica.',
    pasos: ['Estiramos, tomamos agua.', 'Cada docente piensa en un tema de buen trato para su canción.'],
    notas: '',
  },
  {
    id: 'musica', titulo: 'Música', min: 20,
    objetivo: 'Probar una letra original en Suno y revisar el resultado y sus límites de uso.',
    pasos: ['Escribir una letra original breve (4 a 6 líneas) sobre buen trato.', 'Probar la musicalización en Suno.', 'Revisar letra, pronunciación y si es adecuada para el grupo.', 'Leer las condiciones del plan gratuito antes de usarla en clase.'],
    ejemplo: { titulo: 'Letra de ejemplo', texto: 'Con mis palabras puedo cuidar,\nsi alguien sufre, voy a ayudar.\nEn el recreo y en la pantalla,\nel buen trato nunca falla.' },
    enlaces: [{ texto: 'Abrir Suno', href: 'https://suno.com/' }],
    notas: 'La canción es complementaria: no condiciona terminar el taller. No se promete descarga ni publicación.',
  },
  {
    id: 'aplicacion', titulo: 'Aplicación propia', min: 20,
    objetivo: 'Completar la ficha de un recurso y registrar las correcciones humanas.',
    pasos: ['Abrir la ficha del recurso.', 'Llenar grado, objetivo, instrucción, borrador y fuente.', 'Escribir qué corrigió y cómo lo usará.', 'Descargar la ficha.'],
    enlaces: [{ texto: 'Abrir la ficha del recurso', href: '/docentes/ficha/' }],
    notas: 'La ficha se guarda solo en el equipo del docente. Recordar borrarla en computadoras compartidas.',
  },
  {
    id: 'cierre', titulo: 'Compartir y cerrar', min: 10,
    objetivo: 'Mostrar el producto, explicar un cambio realizado y conservar el procedimiento.',
    pasos: ['Dos o tres docentes muestran su recurso.', 'Cada uno explica un cambio que hizo a la respuesta del asistente.', 'Recordatorio: pedir, crear, comprobar, adaptar y compartir.'],
    notas: 'Pedir a cada docente su ficha descargada o una captura como evidencia (sin datos de estudiantes).',
  },
];

export const EJEMPLO_FICHA = {
  grado: 'Primero',
  objetivo: 'Reconocer el enojo y una forma de pedir ayuda.',
  instruccion: 'Prepara una actividad oral de ocho minutos para primero de primaria sobre reconocer el enojo y pedir ayuda. Usa imágenes descritas, dos opciones por situación y lenguaje sencillo.',
  borrador: 'Cuento corto de un conejo que se enoja porque le quitan su turno. Preguntas: ¿cómo se siente? ¿qué puede hacer? Opciones: gritar / respirar y pedir ayuda.',
  fuente: 'Programa de estudio de Orientación (texto de referencia autorizado).',
  correcciones: 'Cambié «frustración» por «enojo». Quité una pregunta que pedía leer. Agregué un gesto para respirar.',
  uso: 'Inicio de la clase de orientación del martes, con el grupo de primero.',
};
