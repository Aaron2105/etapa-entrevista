import { show, hide } from './dom.js';
import { CharacterManager } from './characterManager.js';

// Estas importaciones asumen que refactorizaremos estos archivos en los siguientes pasos.
// Por ahora, marcarán error hasta que actualicemos objects.js, main.js, game.js y canvas.js.
import { initObjects, initLaptop, clearFoodObjects, hideLaptop } from './objects.js'; // Antes: objetos.js
import { animateItzelSpeaking } from './main.js'; 
import { createDrawingGame, assignDrawingGameEvents } from './game.js'; // Antes: juego.js
import { initColorPalette, initSVGFill } from './canvas.js';

/**
 * @typedef {Object} Scene
 * @property {string|null} character - The ID of the character speaking (e.g., "tito1"). Null if no character.
 * @property {string|null} text - The dialogue text to display. Null if no text box is needed.
 * @property {string|null} next - The ID of the DOM element that triggers the next scene when clicked.
 * @property {Function} [onClick] - Optional async callback function executed when the 'next' element is clicked.
 */

/**
 * Array containing the complete sequence of scenes for the interactive story.
 * Each object represents a state in the conversation flow.
 * @type {Scene[]}
 */
export const scenes = [
  {
    character: "tito1",
    text: null,
    next: "tito1",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("tito1", "tito2", currentSceneIndex);
    }
  },
  {
    character: "tito2",
    text: "¡Esta es una sala en donde vienen las niñas y niños para contarle a una persona qué fue lo que les pasó!",
    next: "tito2",
    onClick: (currentSceneIndex) => {
      CharacterManager.createCharacter("abogado", true, currentSceneIndex);
    }  
  },
  {
    character: "tito2",
    text: "La persona que trabaja aquí puede ser un abogado.",
    next: "tito2",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("abogado", "abogada", currentSceneIndex);
    }
  },
  {
    character: "tito2",
    text: "Puede ser una abogada.",
    next: "tito2",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("abogada", "psicologo", currentSceneIndex);
    }
  },
  {
    character: "tito2",
    text: "Puede ser un psicólogo.",
    next: "tito2",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("psicologo", "psicologa1", currentSceneIndex);
    }
  },
  {
    character: "tito2",
    text: "O una psicóloga.",
    next: "tito2",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("psicologa1", "psicologa2", currentSceneIndex);
      CharacterManager.createCharacter("itzel1", true, currentSceneIndex);
      initLaptop(); // Antes: inicializarLaptop()
    }
  },
  {
    character: "tito2",
    text: "¡Mira! Aquí está Itzel, ella viene para hablar con la psicóloga de lo que le pasó.",
    next: "tito2",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("itzel1", "itzel2", currentSceneIndex);
    }
  },
  {
    character: "tito2",
    text: "Vamos a acompañar a Itzel para ayudarle a cuidar sus emociones.",
    next: "psicologa2",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("tito2", "tito1", currentSceneIndex);
    }
  },
  {
    character: "psicologa2",
    text: "¡Hola Itzel! El día de hoy estás aquí porque vamos a platicar. Muchas niñas y niños vienen aquí a platicar conmigo sobre las cosas que les pasaron.",
    next: "psicologa2"
  },
  {
    character: "psicologa2",
    text: "Antes de empezar quisiera preguntarte... ¿tienes hambre o sed?",
    next: "psicologa2",
    onClick: (currentSceneIndex) => {
      initObjects();
    }
  },
  {
    character: "psicologa2",
    text: null,
    next: "psicologa2",
    onClick: (currentSceneIndex) => {
      // Placeholder for object interaction if needed
    }
  },
  {
    character: "psicologa2",
    text: "¡Muy bien Itzel! Vamos a empezar platicando de algo que te guste, ¿cuál es tu juego favorito?",
    next: "itzel2",
    onClick: (currentSceneIndex) => {
      CharacterManager.createCharacter("nube-pensamiento", true, currentSceneIndex);
      CharacterManager.switchCharacter("itzel2", "itzel3", currentSceneIndex);
    }
  },
  {
    character: "itzel2",
    text: null,
    next: "nube-pensamiento",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("nube-pensamiento", "recuerdo1", currentSceneIndex);
    }
  },
  {
    character: "itzel3",
    text: null,
    next: "recuerdo1",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("recuerdo1", "recuerdo2", currentSceneIndex);
    }
  },
  {
    character: "itzel3",
    text: null,
    next: "recuerdo2",
    onClick: (currentSceneIndex) => {
      CharacterManager.removeCharacter("recuerdo2");
      CharacterManager.switchCharacter("itzel3", "itzel4", currentSceneIndex);
    }
  },
  {
    character: "itzel4",
    text: "¡Me gusta mucho ir al parque a jugar con Juanito!",
    next: "itzel4"
  },
  {
    character: "itzel4",
    text: "¡Jugamos a la pelota y también nos gusta explorar y ver los bichitos que hay en los árboles!",
    next: "psicologa2",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("psicologa2", "psicologa3", currentSceneIndex);
    }
  },
  {
    character: "psicologa3",
    text: "Itzel, antes de seguir platicando de lo que juegas con Juanito, vamos a platicar de otra cosa.",
    next: "psicologa3",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("itzel4", "itzel5", currentSceneIndex);
    }
  },
  {
    character: "psicologa3",
    text: "¿Sabes por qué estás aquí el día de hoy?",
    next: "itzel5"
  },
  {
    character: "itzel5",
    text: "Mi mamá me dijo que venía aquí a platicar de lo que me pasó con Don Chucho…",
    next: "psicologa3"
  },
  {
    character: "psicologa3",
    text: "Así es, todo lo que me vas a decir es muy importante. Cuéntame de principio a fin, ¿qué fue lo que pasó con Don Chucho?",
    next: "itzel5",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("psicologa3", "psicologa4", currentSceneIndex);
      CharacterManager.switchCharacter("itzel5", "itzel6", currentSceneIndex);
    }
  },
  {
    character: "itzel6",
    text: "Don Chucho es un vecino que me hizo algo que no me gustó…",
    next: "itzel6",
    onClick: () => {
      return animateItzelSpeaking(); // Antes: animarItzelHablando()
    }
  },
  {
    character: "itzel7",
    text: null,
    next: "psicologa4",
    onClick: (currentSceneIndex) => {
      CharacterManager.removeCharacter("tito1");
      CharacterManager.removeCharacter("itzel6");
      CharacterManager.createCharacter("itzel7", true, currentSceneIndex);
      CharacterManager.createCharacter("tito3", true, currentSceneIndex);
    }
  },
  {
    character: "psicologa4",
    text: "¡Muchas gracias por contarme lo que pasó, Itzel! Saber lo que pasó es muy importante para que podamos cuidarte.",
    next: "psicologa4"
  },
  {
    character: "psicologa4",
    text: "¡Eres muy valiente!",
    next: "tito3",
    onClick: () => {
      hide("globo-psicologa");
    }
  },
  {
    character: "tito3",
    text: "Recuerda que puedes hablar con tus personas de confianza sobre cómo te sientes.",
    next: "psicologa4",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("tito3", "tito1", currentSceneIndex);
      CharacterManager.switchCharacter("psicologa4", "psicologa5", currentSceneIndex);
    }
  },
  {
    character: "psicologa5",
    text: "¡Recuerdo que al inicio me estabas contando de las cosas que te gusta jugar con Juanito!",
    next: "itzel7",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("itzel7", "itzel8", currentSceneIndex);
    }
  },
  {
    character: "itzel8",
    text: "¡Sí! Hoy voy a salir a jugar con él. Estoy emocionada por contarle cómo me fue el día de hoy en la Fiscalía.",
    next: "psicologa5"
  },
  {
    character: "psicologa5",
    text: "¡Muy bien Itzel! Y muchas gracias por todo lo que me contaste el día de hoy.",
    next: "tito1", 
    onClick: (currentSceneIndex) => {
      CharacterManager.removeCharacter("tito1");
      CharacterManager.removeCharacter("psicologa5");
      CharacterManager.removeCharacter("itzel8");
      CharacterManager.createCharacter("tito4", true, currentSceneIndex);
      CharacterManager.createCharacter("psicologa6", true, currentSceneIndex);
      CharacterManager.createCharacter("itzel9", true, currentSceneIndex);
    }
  },
  {
    character: "tito4",
    text: "¡Muy bien Itzel! ¡Nos vemos pronto para jugar y seguir aprendiendo!",
    next: "btn-continuar",
    onClick: (currentSceneIndex) => {
      CharacterManager.switchCharacter("tito4", "tito2", currentSceneIndex);
      hide("sala-entrevista");
      show("nube-juego");
      show("colorear");
      createDrawingGame(); // Antes: crearJuegoDeDibujo()
      CharacterManager.removeCharacter("itzel9");
      CharacterManager.removeCharacter("psicologa6");
      clearFoodObjects(); // Antes: limpiarObjetosComida()
      hideLaptop(); // Antes: ocultarLaptop()
      hide("btn-galeria");
      hide("btn-continuar");
    }
  },
  // Game Section
  {
    character: "tito2",
    text: "¡Mira, Itzel está recordando lo que más le gusta hacer con su amigo Juanito en el parque!",
    next: "tito2"
  },
  {
    character: "tito2",
    text: "Ahora, vamos a darle color a este recuerdo para hacerlo aún más bonito. Puedes elegir los colores que quieras y colorear donde más te guste.",
    next: "tito2",
    onClick: async (currentSceneIndex) => {
      hide("globo-tito");
      CharacterManager.switchCharacter("tito2", "tito1", currentSceneIndex);
      show("colorear");
      show("modo-container");
      show("paleta-colores");
      show("instructions-modal");
      initColorPalette(); 
      initSVGFill();
      await assignDrawingGameEvents();
    }
  },
  {
    character: null,
    text: null,
    next: null
  },
  {
    character: "tito4",
    text: "¡Qué bonito te quedó el dibujo! Felicidades por terminar esta parte de la aventura.",
    next: "tito4"
  },
  {
    character: "tito4",
    text: "¡Itzel estuvo muy valiente, y tú también. ¡Nos vemos pronto para seguir jugando y aprendiendo!", 
    next: null,
    onClick: (currentSceneIndex) => {
      // Clear full cache at the end of the game
      CharacterManager.clearFullCache();
    }
  },
];