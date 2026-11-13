// Módulos de orientación. Cuentos, estribillos y juegos originales del proyecto.
// Versiones: preescolar y primero a tercero. Ninguna actividad exige leer ni escribir.

export type Nivel = 'preescolar' | 'primaria';
export const NIVELES: { id: Nivel; nombre: string; detalle: string }[] = [
  { id: 'preescolar', nombre: 'Preescolar', detalle: 'Una idea por escena, dos opciones, gestos y títeres.' },
  { id: 'primaria', nombre: 'Primero a tercero', detalle: 'Cuento narrado, dos o tres opciones y conversación.' },
];

export interface OpcionO { texto: string; dibujo: string; respuesta: string; cuidado?: boolean }
export type Escena =
  | { tipo: 'cuento'; titulo: string; dibujo: string; texto: string; consigna: string; notas?: string }
  | { tipo: 'decision'; titulo: string; pregunta: string; consigna: string; abierta: boolean; opciones: OpcionO[]; notas?: string }
  | { tipo: 'movimiento'; titulo: string; texto: string; consigna: string; notas?: string }
  | { tipo: 'cierre'; titulo: string; estribillo: string; actividad: string; consigna: string; notas?: string };

export interface Modulo {
  slug: string; titulo: string; tema: string; portada: string; objetivo: string; duracion: Record<Nivel, string>;
  sensible?: boolean; estribillo: string; escenas: Record<Nivel, Escena[]>;
}

const ESTRIBILLOS = {
  autoestima: 'Soy importante, puedo aprender; si necesito ayuda, la puedo tener.',
  convivencia: 'Con mis palabras puedo cuidar; si alguien sufre, voy a ayudar.',
  cuerpo: 'Mi cuerpo merece cuidado y respeto; puedo pedir ayuda y contar lo que siento.',
  proyecto: 'Pruebo, descubro, vuelvo a intentar; hay muchas cosas que puedo explorar.',
};

export const MODULOS: Modulo[] = [
  {
    slug: 'autoestima', titulo: 'Así soy yo', tema: 'Autoestima', portada: 'portada:autoestima',
    objetivo: 'Reconocer gustos, emociones y fortalezas propias, y saber que se puede aprender y pedir ayuda.',
    duracion: { preescolar: '20 min', primaria: '30 min' }, estribillo: ESTRIBILLOS.autoestima,
    escenas: {
      preescolar: [
        { tipo: 'cuento', titulo: 'Luna aprende a saltar', dibujo: 'tortuga:triste',
          texto: 'Luna todavía no salta como sus amigos.',
          consigna: 'Este es el cuento de Luna. Luna quiere saltar como sus amigos, pero todavía no puede. Luna se siente triste.',
          notas: 'Narrar despacio con gestos. Se puede usar un títere.' },
        { tipo: 'decision', titulo: '¿Cómo se siente Luna?', pregunta: '¿Cómo se siente Luna?', abierta: true,
          consigna: '¿Cómo se siente Luna? Señalen la carita.',
          opciones: [
            { texto: 'Triste', dibujo: 'cara:triste', respuesta: 'Sí, Luna se siente triste. Está bien sentirse así.' },
            { texto: 'Feliz', dibujo: 'cara:feliz', respuesta: 'A veces sonreímos aunque algo no salga. Luna ahora está un poco triste.' },
          ],
          notas: 'No hay respuestas incorrectas. Invitar a imitar la carita con el rostro.' },
        { tipo: 'cuento', titulo: 'Lo que Luna sí sabe hacer', dibujo: 'simbolo:torre',
          texto: 'Luna escucha con atención y construye torres altas.',
          consigna: 'Pero Luna sabe hacer muchas cosas: escucha con atención y construye torres muy altas. Y si practica, puede aprender a saltar.' },
        { tipo: 'decision', titulo: '¿Qué te gusta hacer?', pregunta: '¿Qué te gusta hacer a vos?', abierta: true,
          consigna: '¿Y a ustedes qué les gusta hacer? Señalen un dibujo.',
          opciones: [
            { texto: 'Jugar con pelota', dibujo: 'simbolo:pelota', respuesta: '¡Qué bien! Jugar con otros nos hace fuertes.' },
            { texto: 'Pintar', dibujo: 'simbolo:pincel', respuesta: '¡Qué bonito! Pintar es una forma de contar lo que sentimos.' },
          ] },
        { tipo: 'movimiento', titulo: 'Saltamos como Luna', texto: 'Practicamos un salto pequeño, otro y otro.',
          consigna: 'Ahora todos de pie. Vamos a practicar como Luna: un salto pequeño… otro… ¡y otro! Practicar nos ayuda a aprender.' },
        { tipo: 'cierre', titulo: 'Soy importante', estribillo: ESTRIBILLOS.autoestima,
          actividad: 'Cada niño señala o dice una cosa que sabe hacer.',
          consigna: 'Repitamos juntos: Soy importante, puedo aprender; si necesito ayuda, la puedo tener.' },
      ],
      primaria: [
        { tipo: 'cuento', titulo: 'Tito y el dibujo', dibujo: 'tortuga:triste',
          texto: 'A Tito no le salió el dibujo como quería.',
          consigna: 'Tito la tortuga quería dibujar un volcán, pero no le salió como quería. Tito arrugó el papel.',
          notas: 'Presentar a Tito como guía de todo el recorrido.' },
        { tipo: 'decision', titulo: 'Detectives de emociones', pregunta: '¿Cómo se siente Tito?', abierta: true,
          consigna: 'Detectives de emociones: ¿cómo creen que se siente Tito? Elijan una carita.',
          opciones: [
            { texto: 'Triste', dibujo: 'cara:triste', respuesta: 'Puede ser. Cuando algo no sale, a veces nos ponemos tristes.' },
            { texto: 'Enojado', dibujo: 'cara:enojado', respuesta: 'Puede ser. El enojo también es una emoción válida; lo importante es qué hacemos con ella.' },
            { texto: 'Con dudas', dibujo: 'cara:duda', respuesta: 'Puede ser. Tito no sabe si puede hacerlo mejor.' },
          ],
          notas: 'Conversar varias respuestas posibles sin calificar emociones como correctas o incorrectas.' },
        { tipo: 'decision', titulo: '¿Qué puede hacer Tito?', pregunta: '¿Qué puede hacer Tito ahora?', abierta: false,
          consigna: '¿Qué le ayudaría a Tito?',
          opciones: [
            { texto: 'Practicar otra vez', dibujo: 'simbolo:pasito', respuesta: '¡Sí! Practicar nos ayuda a aprender.', cuidado: true },
            { texto: 'Pedir ayuda a la maestra', dibujo: 'simbolo:avisar', respuesta: '¡Sí! Pedir ayuda es una fortaleza.', cuidado: true },
            { texto: 'No volver a dibujar nunca', dibujo: 'cara:triste', respuesta: 'Rendirse no ayuda. Todos necesitamos practicar para aprender.' },
          ] },
        { tipo: 'decision', titulo: 'Mi mochila de cualidades', pregunta: '¿Qué cosas sabés hacer o te gustan?', abierta: true,
          consigna: 'Mi mochila de cualidades: elijan algo que disfrutan o saben hacer.',
          opciones: [
            { texto: 'Hacer deporte', dibujo: 'simbolo:pelota', respuesta: '¡A la mochila! Moverse y jugar en equipo es una fortaleza.' },
            { texto: 'Cantar o hacer música', dibujo: 'simbolo:musica', respuesta: '¡A la mochila! La música alegra a los demás.' },
            { texto: 'Leer o escuchar cuentos', dibujo: 'simbolo:libro', respuesta: '¡A la mochila! Escuchar con atención es una cualidad.' },
          ],
          notas: 'No se exige compartir información familiar ante el grupo.' },
        { tipo: 'movimiento', titulo: 'Pausa con estrellas', texto: 'Brazos arriba como estrella, respiramos tres veces.',
          consigna: 'Todos de pie. Abran los brazos como una estrella y respiren profundo tres veces.' },
        { tipo: 'cierre', titulo: 'Soy importante', estribillo: ESTRIBILLOS.autoestima,
          actividad: 'Sin pantalla: dibujar en el cuaderno su mochila con una cualidad y algo que quieren aprender.',
          consigna: 'Cantemos juntos: Soy importante, puedo aprender; si necesito ayuda, la puedo tener.' },
      ],
    },
  },
  {
    slug: 'convivencia', titulo: 'Nos tratamos bien', tema: 'Convivencia y prevención del bullying', portada: 'portada:convivencia',
    objetivo: 'Distinguir buen trato y maltrato, reconocer la exclusión y practicar cómo acompañar y pedir ayuda.',
    duracion: { preescolar: '20 min', primaria: '30 min' }, estribillo: ESTRIBILLOS.convivencia,
    escenas: {
      preescolar: [
        { tipo: 'cuento', titulo: 'Un lugar para Nico', dibujo: 'cara:triste',
          texto: 'Nico quiere jugar, pero lo dejan afuera.',
          consigna: 'Nico quiere jugar con sus compañeros, pero lo dejan afuera una y otra vez. Nico está triste.' },
        { tipo: 'decision', titulo: '¿Qué hacemos?', pregunta: '¿Qué puede hacer una compañera?', abierta: false,
          consigna: '¿Qué puede hacer una compañera para ayudar a Nico?',
          opciones: [
            { texto: 'Invitarlo a jugar', dibujo: 'simbolo:acompanar', respuesta: '¡Muy bien! Invitar a otros es tratarnos bien.', cuidado: true },
            { texto: 'Reírse de Nico', dibujo: 'simbolo:burla', respuesta: 'Reírse lastima. Mejor invitarlo o buscar a la maestra.' },
          ] },
        { tipo: 'cuento', titulo: 'Buscamos a la maestra', dibujo: 'icono:adulto',
          texto: 'La compañera acompaña a Nico y buscan a la maestra.',
          consigna: 'La compañera acompaña a Nico y juntos buscan a la maestra. La maestra los ayuda y ahora todos juegan.' },
        { tipo: 'movimiento', titulo: 'Títeres amigos', texto: 'Con las manos hacemos títeres que se invitan a jugar.',
          consigna: 'Hagamos un títere con la mano. Que el títere diga: ¿querés jugar conmigo?' },
        { tipo: 'cierre', titulo: 'Con mis palabras', estribillo: ESTRIBILLOS.convivencia,
          actividad: 'Practicar en parejas cómo invitar a alguien y cómo pedir ayuda.',
          consigna: 'Repitamos: Con mis palabras puedo cuidar; si alguien sufre, voy a ayudar.' },
      ],
      primaria: [
        { tipo: 'cuento', titulo: 'Ayudemos al personaje', dibujo: 'portada:convivencia',
          texto: 'Todos los días, en el recreo, le dicen apodos feos a Nico y lo dejan afuera.',
          consigna: 'Todos los días, en el recreo, un grupo le dice apodos feos a Nico y no lo deja jugar. Esto se repite y Nico ya no quiere ir a la escuela.',
          notas: 'Explicar que cuando el maltrato se repite y hay desigualdad de poder hablamos de acoso. Una agresión aislada también se atiende.' },
        { tipo: 'decision', titulo: '¿Es un accidente o es maltrato?', pregunta: '¿Qué está pasando con Nico?', abierta: false,
          consigna: '¿Esto es un accidente o es maltrato que se repite?',
          opciones: [
            { texto: 'Un accidente', dibujo: 'cara:duda', respuesta: 'Un accidente pasa sin querer y una vez. Aquí se repite a propósito: es maltrato.' },
            { texto: 'Maltrato que se repite', dibujo: 'cara:triste', respuesta: 'Correcto. Cuando se repite y lastima, hay que actuar y buscar ayuda.', cuidado: true },
          ] },
        { tipo: 'decision', titulo: 'Si yo lo veo', pregunta: '¿Qué puede hacer quien lo ve?', abierta: false,
          consigna: 'Ustedes ven lo que le pasa a Nico. ¿Qué pueden hacer?',
          opciones: [
            { texto: 'Acompañar a Nico', dibujo: 'simbolo:acompanar', respuesta: 'Acompañar sin ponerse en riesgo ayuda mucho.', cuidado: true },
            { texto: 'Avisar a la docente', dibujo: 'simbolo:avisar', respuesta: 'Avisar no es «sapear»: es cuidar.', cuidado: true },
            { texto: 'Sumarse a la burla', dibujo: 'simbolo:burla', respuesta: 'Sumarse empeora el daño. Quien observa también puede ayudar a detenerlo.' },
          ] },
        { tipo: 'decision', titulo: 'También en línea', pregunta: 'Si le escriben mensajes feos por el celular…', abierta: false,
          consigna: 'Y si a Nico le mandan mensajes feos por el celular, ¿qué hace?',
          opciones: [
            { texto: 'Responder con insultos', dibujo: 'icono:insulto', respuesta: 'Responder empeora todo.' },
            { texto: 'Guardar, bloquear y contar', dibujo: 'icono:bloquear', respuesta: 'Así se hace: no responde, bloquea y le cuenta a una persona adulta.', cuidado: true },
          ] },
        { tipo: 'movimiento', titulo: 'Pausa: chocamos la mano', texto: 'Saludamos a tres compañeros con un choque de manos o un saludo de lejos.',
          consigna: 'Saluden a tres compañeros: choque de manos o saludo de lejos. Cada quien elige.' },
        { tipo: 'cierre', titulo: 'Con mis palabras', estribillo: ESTRIBILLOS.convivencia,
          actividad: 'Sin pantalla: en grupo, escribir o dibujar un acuerdo de buen trato para el aula.',
          consigna: 'Cantemos: Con mis palabras puedo cuidar; si alguien sufre, voy a ayudar.' },
      ],
    },
  },
  {
    slug: 'cuidado-del-cuerpo', titulo: 'Mi cuerpo merece cuidado', tema: 'Cuidado del cuerpo y prevención del abuso', portada: 'portada:cuerpo', sensible: true,
    objetivo: 'Reconocer el derecho al cuidado y al respeto, los límites personales y a qué personas adultas seguras acudir.',
    duracion: { preescolar: '20 min', primaria: '30 min' }, estribillo: ESTRIBILLOS.cuerpo,
    escenas: {
      preescolar: [
        { tipo: 'cuento', titulo: 'Tina tiene algo que contar', dibujo: 'cara:duda',
          texto: 'Algo le preocupa a Tina.',
          consigna: 'Esta es Tina. Algo le preocupa y siente un nudo en la panza.',
          notas: 'Conducido por la orientadora. No se representa ninguna agresión. No se piden experiencias personales.' },
        { tipo: 'cuento', titulo: 'Una persona adulta segura', dibujo: 'icono:adulto',
          texto: 'Tina se lo cuenta a su maestra. La maestra la escucha y la ayuda.',
          consigna: 'Tina se lo cuenta a su maestra. La maestra la escucha, le dice que hizo muy bien en contarlo y la ayuda.' },
        { tipo: 'decision', titulo: '¿Cómo quiero saludar?', pregunta: '¿Cómo querés saludar hoy?', abierta: true,
          consigna: 'Cada uno decide cómo quiere saludar. ¿Con la mano, chocando puños o de lejos?',
          opciones: [
            { texto: 'Chocar la mano', dibujo: 'simbolo:saludo_mano', respuesta: 'Muy bien. Vos decidís cómo saludar.' },
            { texto: 'Saludar de lejos', dibujo: 'simbolo:saludo_lejos', respuesta: 'Muy bien. Saludar de lejos también está bien.' },
          ],
          notas: 'Respetar la decisión de cada niño. Explicar que las demás personas también eligen.' },
        { tipo: 'movimiento', titulo: 'Mi burbuja', texto: 'Abrimos los brazos y dibujamos nuestra burbuja de espacio.',
          consigna: 'Abran los brazos y den una vuelta despacio. Esa es su burbuja. Todos tenemos una.' },
        { tipo: 'cierre', titulo: 'Mi cuerpo merece cuidado', estribillo: ESTRIBILLOS.cuerpo,
          actividad: 'Cada niño piensa en dos personas adultas que lo cuidan.',
          consigna: 'Repitamos: Mi cuerpo merece cuidado y respeto; puedo pedir ayuda y contar lo que siento.' },
      ],
      primaria: [
        { tipo: 'cuento', titulo: 'Mi cuerpo es mío', dibujo: 'portada:cuerpo',
          texto: 'Todas las personas merecemos cuidado y buen trato.',
          consigna: 'Todas las niñas y los niños merecen cuidado y buen trato. Nuestro cuerpo es nuestro y tiene partes privadas, las que cubre el traje de baño.',
          notas: 'La orientadora decide el vocabulario de las partes del cuerpo. Aclarar que hay cuidados de higiene o salud que hacen personas adultas de confianza con permiso.' },
        { tipo: 'decision', titulo: 'Secretos que preocupan', pregunta: 'Si un secreto me hace sentir mal…', abierta: false,
          consigna: 'Hay secretos bonitos, como una fiesta sorpresa. Pero si un secreto me hace sentir mal o con miedo, ¿qué hago?',
          opciones: [
            { texto: 'Lo guardo', dibujo: 'cara:asustado', respuesta: 'Los secretos que preocupan no se guardan.' },
            { texto: 'Se lo cuento a un adulto seguro', dibujo: 'simbolo:avisar', respuesta: 'Así es: los secretos que preocupan se cuentan.', cuidado: true },
          ] },
        { tipo: 'decision', titulo: 'La ruta de ayuda', pregunta: 'Si la primera persona no me ayuda…', abierta: false,
          consigna: 'El personaje le contó a alguien, pero no le prestó atención. ¿Qué puede hacer?',
          opciones: [
            { texto: 'Buscar a otra persona adulta', dibujo: 'simbolo:avisar', respuesta: 'Sí. Se sigue buscando ayuda hasta que alguien escuche.', cuidado: true },
            { texto: 'No decir nada más', dibujo: 'cara:triste', respuesta: 'Siempre se puede volver a pedir ayuda, a la maestra, la orientadora u otra persona.' },
          ] },
        { tipo: 'cuento', titulo: 'Nunca es tu culpa', dibujo: 'icono:adulto',
          texto: 'Nunca es tu culpa, aunque no hayas podido decir que no, alejarte o contarlo antes.',
          consigna: 'Esto es muy importante: nunca es tu culpa, aunque no hayas podido decir que no, alejarte o contarlo antes. Podés pedir ayuda aunque la persona sea conocida.',
          notas: 'Si surge una revelación: escuchar sin interrogar frente al grupo, no prometer secreto y activar el protocolo de la escuela. La plataforma no registra denuncias.' },
        { tipo: 'movimiento', titulo: 'Mi burbuja', texto: 'Con los brazos marcamos nuestro espacio personal.',
          consigna: 'De pie: marquen con los brazos su burbuja. Respetamos la burbuja de los demás.' },
        { tipo: 'cierre', titulo: 'Mi cuerpo merece cuidado', estribillo: ESTRIBILLOS.cuerpo,
          actividad: 'Sin pantalla: dibujar una mano y escribir o dibujar en cada dedo a una persona adulta segura.',
          consigna: 'Cantemos: Mi cuerpo merece cuidado y respeto; puedo pedir ayuda y contar lo que siento.' },
      ],
    },
  },
  {
    slug: 'proyecto-de-vida', titulo: 'Lo que puedo aprender', tema: 'Proyecto de vida', portada: 'portada:proyecto',
    objetivo: 'Explorar gustos, habilidades y oficios sin estereotipos, y proponer un primer paso para aprender algo nuevo.',
    duracion: { preescolar: '20 min', primaria: '30 min' }, estribillo: ESTRIBILLOS.proyecto,
    escenas: {
      preescolar: [
        { tipo: 'cuento', titulo: 'El pueblo de los talentos', dibujo: 'portada:proyecto',
          texto: 'En el pueblo, cada quien ayuda: cocinan, siembran, reparan y enseñan.',
          consigna: 'En el pueblo de los talentos todas las personas ayudan: unas cocinan, otras siembran, otras reparan y otras enseñan.' },
        { tipo: 'decision', titulo: '¿Con qué se trabaja?', pregunta: '¿Qué usa quien siembra?', abierta: false,
          consigna: '¿Qué usa la persona que siembra?',
          opciones: [
            { texto: 'Una planta', dibujo: 'simbolo:planta', respuesta: '¡Sí! Quien siembra cuida las plantas.', cuidado: true },
            { texto: 'Una olla', dibujo: 'simbolo:olla', respuesta: 'La olla la usa quien cocina. ¡También es un trabajo importante!' },
          ] },
        { tipo: 'movimiento', titulo: 'Jugamos a los oficios', texto: 'Imitamos: cocinar, sembrar, martillar y enseñar.',
          consigna: 'Vamos a imitar: revolver la olla… sembrar una semilla… martillar… ¡y enseñar en la pizarra!' },
        { tipo: 'decision', titulo: '¿Qué quiero aprender?', pregunta: '¿Qué te gustaría aprender?', abierta: true,
          consigna: '¿Qué les gustaría aprender? Elijan un dibujo.',
          opciones: [
            { texto: 'Cocinar', dibujo: 'simbolo:olla', respuesta: '¡Qué rico! Se aprende ayudando en casa con una persona adulta.' },
            { texto: 'Reparar cosas', dibujo: 'simbolo:herramienta', respuesta: '¡Qué útil! Niñas y niños pueden aprender a reparar.' },
          ] },
        { tipo: 'cierre', titulo: 'Pruebo y descubro', estribillo: ESTRIBILLOS.proyecto,
          actividad: 'Cada niño representa con el cuerpo algo que quiere aprender.',
          consigna: 'Repitamos: Pruebo, descubro, vuelvo a intentar; hay muchas cosas que puedo explorar.' },
      ],
      primaria: [
        { tipo: 'cuento', titulo: 'La comunidad necesita ayuda', dibujo: 'portada:proyecto',
          texto: 'En la comunidad se dañó la tubería, la huerta tiene sed y los niños quieren un cuento.',
          consigna: 'En la comunidad pasaron tres cosas: se dañó una tubería, la huerta tiene sed y en la biblioteca quieren escuchar un cuento. ¿Quién puede ayudar?' },
        { tipo: 'decision', titulo: '¿Quién ayuda con la tubería?', pregunta: '¿Quién arregla la tubería?', abierta: false,
          consigna: '¿Qué herramienta ayuda con la tubería?',
          opciones: [
            { texto: 'Herramientas', dibujo: 'simbolo:herramienta', respuesta: '¡Sí! Una fontanera o un fontanero. Mujeres y hombres pueden hacerlo.', cuidado: true },
            { texto: 'Pincel', dibujo: 'simbolo:pincel', respuesta: 'El pincel sirve para pintar. Para la tubería se usan herramientas.' },
            { texto: 'Libro', dibujo: 'simbolo:libro', respuesta: 'El libro sirve para la biblioteca. Para la tubería se usan herramientas.' },
          ],
          notas: 'Remarcar que no hay trabajos «de hombres» ni «de mujeres».' },
        { tipo: 'decision', titulo: 'Mis habilidades', pregunta: '¿En qué soy bueno o buena?', abierta: true,
          consigna: '¿En qué son buenos o buenas? Todas las respuestas valen.',
          opciones: [
            { texto: 'Cuidar plantas o animales', dibujo: 'simbolo:planta', respuesta: 'Eso sirve para la huerta, la veterinaria y mucho más.' },
            { texto: 'Explicar a otros', dibujo: 'simbolo:pizarra', respuesta: 'Eso sirve para enseñar y para trabajar en equipo.' },
            { texto: 'Arreglar cosas', dibujo: 'simbolo:herramienta', respuesta: 'Eso sirve para la mecánica, la electricidad y la construcción.' },
          ] },
        { tipo: 'decision', titulo: 'Mi próxima aventura', pregunta: '¿Cuál es un primer paso?', abierta: false,
          consigna: 'Si quiero aprender a tocar guitarra, ¿cuál es un buen primer paso?',
          opciones: [
            { texto: 'Practicar un poquito cada día', dibujo: 'simbolo:pasito', respuesta: '¡Sí! Las metas grandes se logran con pasos pequeños.', cuidado: true },
            { texto: 'Rendirme si sale mal', dibujo: 'cara:triste', respuesta: 'Al principio cuesta. Practicar y volver a intentar es parte de aprender.' },
          ] },
        { tipo: 'movimiento', titulo: 'Adivina el oficio', texto: 'Un voluntario imita un oficio y el grupo adivina.',
          consigna: 'Un voluntario imita un oficio sin hablar y los demás adivinan.' },
        { tipo: 'cierre', titulo: 'Pruebo y descubro', estribillo: ESTRIBILLOS.proyecto,
          actividad: 'Sin pantalla: dibujar algo que quieren aprender y un paso pequeño para empezar. Los intereses pueden cambiar.',
          consigna: 'Cantemos: Pruebo, descubro, vuelvo a intentar; hay muchas cosas que puedo explorar.' },
      ],
    },
  },
];
