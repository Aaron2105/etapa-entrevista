// escenas.js
import { mostrar, ocultar } from './dom.js';
import { inicializarObjetos, inicializarLaptop, limpiarObjetosComida, ocultarLaptop } from './objetos.js';
import { animarItzelHablando } from './main.js';
import { CharacterManager } from './characterManager.js';

export const escenas = [
  {
    personaje: "tito1",
    texto: null,
    next: "tito1",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("tito1", "tito2", escenaActual);
    }
  },
  {
    personaje: "tito2",
    texto: "¡Esta es una sala en donde vienen las niñas y niños para contarle a una persona qué fue lo que les pasó!",
    next: "tito2",
    alClic: (escenaActual) => {
      CharacterManager.crearPersonaje("abogado", true, escenaActual);
    }  
  },
  {
    personaje: "tito2",
    texto: "La persona que trabaja aquí puede ser un abogado.",
    next: "tito2",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("abogado", "abogada", escenaActual);
    }
  },
  {
    personaje: "tito2",
    texto: "Puede ser una abogada.",
    next: "tito2",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("abogada", "psicologo", escenaActual);
    }
  },
  {
    personaje: "tito2",
    texto: "Puede ser un psicólogo.",
    next: "tito2",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("psicologo", "psicologa1", escenaActual);
    }
  },
  {
    personaje: "tito2",
    texto: "O una psicóloga.",
    next: "tito2",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("psicologa1", "psicologa2", escenaActual);
      CharacterManager.crearPersonaje("itzel1", true, escenaActual);
      inicializarLaptop();
    }
  },
  {
    personaje: "tito2",
    texto: "¡Mira! Aquí está Itzel, ella viene para hablar con la psicóloga de lo que le pasó.",
    next: "tito2",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("itzel1", "itzel2", escenaActual);
    }
  },
  {
    personaje: "tito2",
    texto: "Vamos a acompañar a Itzel para ayudarle a cuidar sus emociones.",
    next: "psicologa2",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("tito2", "tito1", escenaActual);
    }
  },
  {
    personaje: "psicologa2",
    texto: "¡Hola Itzel! El día de hoy estás aquí porque vamos a platicar. Muchas niñas y niños vienen aquí a platicar conmigo sobre las cosas que les pasaron.",
    next: "psicologa2"
  },
  {
    personaje: "psicologa2",
    texto: "Antes de empezar quisiera preguntarte... ¿tienes hambre o sed?",
    next: "psicologa2",
    alClic: (escenaActual) => {
      inicializarObjetos();
    }
  },
  {
    personaje: "psicologa2",
    texto: null,
    next: "psicologa2",
    alClic: (escenaActual) => {
      // Espacio para interacción con objetos
    }
  },
  {
    personaje: "psicologa2",
    texto: "¡Muy bien Itzel! Vamos a empezar platicando de algo que te guste, ¿cuál es tu juego favorito?",
    next: "itzel2",
    alClic: (escenaActual) => {
      CharacterManager.crearPersonaje("nube-pensamiento", true, escenaActual);
      CharacterManager.cambiarPersonaje("itzel2", "itzel3", escenaActual);
    }
  },
  {
    personaje: "itzel2",
    texto: null,
    next: "nube-pensamiento",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("nube-pensamiento", "recuerdo1", escenaActual);
    }
  },
  {
    personaje: "itzel3",
    texto: null,
    next: "recuerdo1",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("recuerdo1", "recuerdo2", escenaActual);
    }
  },
  {
    personaje: "itzel3",
    texto: null,
    next: "recuerdo2",
    alClic: (escenaActual) => {
      CharacterManager.eliminarPersonaje("recuerdo2");
      CharacterManager.cambiarPersonaje("itzel3", "itzel4", escenaActual);
    }
  },
  {
    personaje: "itzel4",
    texto: "¡Me gusta mucho ir al parque a jugar con Juanito!",
    next: "itzel4"
  },
  {
    personaje: "itzel4",
    texto: "¡Jugamos a la pelota y también nos gusta explorar y ver los bichitos que hay en los árboles!",
    next: "psicologa2",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("psicologa2", "psicologa3", escenaActual);
    }
  },
  {
    personaje: "psicologa3",
    texto: "Itzel, antes de seguir platicando de lo que juegas con Juanito, vamos a platicar de otra cosa.",
    next: "psicologa3",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("itzel4", "itzel5", escenaActual);
    }
  },
  {
    personaje: "psicologa3",
    texto: "¿Sabes por qué estás aquí el día de hoy?",
    next: "itzel5"
  },
  {
    personaje: "itzel5",
    texto: "Mi mamá me dijo que venía aquí a platicar de lo que me pasó con Don Chucho…",
    next: "psicologa3"
  },
  {
    personaje: "psicologa3",
    texto: "Así es, todo lo que me vas a decir es muy importante. Cuéntame de principio a fin, ¿qué fue lo que pasó con Don Chucho?",
    next: "itzel5",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("psicologa3", "psicologa4", escenaActual);
      CharacterManager.cambiarPersonaje("itzel5", "itzel6", escenaActual);
    }
  },
  {
    personaje: "itzel6",
    texto: "Don Chucho es un vecino que me hizo algo que no me gustó…",
    next: "itzel6",
    alClic: (escenaActual) => {
      return animarItzelHablando();
    }
  },
  {
    personaje: "itzel7",
    texto: null,
    next: "psicologa4",
    alClic: (escenaActual) => {
      CharacterManager.eliminarPersonaje("tito1");
      CharacterManager.eliminarPersonaje("itzel6");
      CharacterManager.crearPersonaje("itzel7", true, escenaActual);
      CharacterManager.crearPersonaje("tito3", true, escenaActual);
    }
  },
  {
    personaje: "psicologa4",
    texto: "¡Muchas gracias por contarme lo que pasó, Itzel! Saber lo que pasó es muy importante para que podamos cuidarte.",
    next: "psicologa4"
  },
  {
    personaje: "psicologa4",
    texto: "¡Eres muy valiente!",
    next: "tito3",
    alClic: (escenaActual) => {
      ocultar("globo-psicologa");
    }
  },
  {
    personaje: "tito3",
    texto: "Recuerda que puedes hablar con tus personas de confianza sobre cómo te sientes.",
    next: "psicologa4",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("tito3", "tito1", escenaActual);
      CharacterManager.cambiarPersonaje("psicologa4", "psicologa5", escenaActual);
    }
  },
  {
    personaje: "psicologa5",
    texto: "¡Recuerdo que al inicio me estabas contando de las cosas que te gusta jugar con Juanito!",
    next: "itzel7",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("itzel7", "itzel8", escenaActual);
    }
  },
  {
    personaje: "itzel8",
    texto: "¡Sí! Hoy voy a salir a jugar con él. Estoy emocionada por contarle cómo me fue el día de hoy en la Fiscalía.",
    next: "psicologa5"
  },
  {
    personaje: "psicologa5",
    texto: "¡Muy bien Itzel! Y muchas gracias por todo lo que me contaste el día de hoy.",
    next: "tito1", 
    alClic: (escenaActual) => {
      CharacterManager.eliminarPersonaje("tito1");
      CharacterManager.eliminarPersonaje("psicologa5");
      CharacterManager.eliminarPersonaje("itzel8");
      CharacterManager.crearPersonaje("tito4", true, escenaActual);
      CharacterManager.crearPersonaje("psicologa6", true, escenaActual);
      CharacterManager.crearPersonaje("itzel9", true, escenaActual);
    }
  },
  {
    personaje: "tito4",
    texto: "¡Muy bien Itzel! ¡Nos vemos pronto para jugar y seguir aprendiendo!",
    next: "btn-continuar",
    alClic: (escenaActual) => {
      CharacterManager.cambiarPersonaje("tito4", "tito2", escenaActual);
      ocultar("sala-entrevista");
      mostrar("nube-juego");
      mostrar("colorear");
      CharacterManager.eliminarPersonaje("itzel9");
      CharacterManager.eliminarPersonaje("psicologa6");
      limpiarObjetosComida();
      ocultarLaptop();
      ocultar("btn-galeria");
      ocultar("btn-continuar");
    }
  },
  // Juego - Mostrar nube del juego y colorear
  {
    personaje: "tito2",
    texto: "¡Mira, Itzel está recordando lo que más le gusta hacer con su amigo Juanito en el parque!",
    next: "tito2"
  },
  {
    personaje: "tito2",
    texto: "Ahora, vamos a darle color a este recuerdo para hacerlo aún más bonito. Puedes elegir los colores que quieras y colorear donde más te guste.",
    next: "tito2",
    alClic: (escenaActual) => {
      ocultar("globo-tito");
      CharacterManager.cambiarPersonaje("tito2", "tito1", escenaActual);
      mostrar("colorear");
      mostrar("instructions-modal");
    }
  },
  {
    personaje: null,
    texto: null,
    next: null
  },
  {
    personaje: "tito4",
    texto: "¡Qué bonito te quedó el dibujo! Felicidades por terminar esta parte de la aventura.",
    next: "tito4"
  },
  {
    personaje: "tito4",
    texto: "¡Itzel estuvo muy valiente, y tú también. ¡Nos vemos pronto para seguir jugando y aprendiendo!", 
    next: null,
    alClic: (escenaActual) => {
      // Limpiar cache completo al final del juego
      CharacterManager.limpiarCacheCompleto();
    }
  },
];