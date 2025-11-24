// dialogos.js
import { playFluidSpeechSound } from './sonido.js';

// --- Referencias a la plantilla (AÑADIDO) ---
const plantillaGlobo = document.getElementById('plantilla-globo');
const gameCanvas = document.getElementById('game-canvas');

// --- Mapa de Imágenes (AÑADIDO) ---
// Guarda las rutas de las imágenes de cabeza para cada personaje
const imagenesPersonaje = {
  'Tito': 'img/Tito/Cabeza_Tito.png',
  'Psicóloga': 'img/Psicologa/Cabeza_Psicologa.png',
  'Itzel': 'img/Itzel/Cabeza_Itzel.png'
};

// --- Función para cerrar (AÑADIDO) ---
// Esta función era llamada por tu main.js pero no estaba definida aquí.
export function cerrarGlobo(globo) {
  if (globo) {
    globo.classList.add('hidden');
    document.querySelector('.btn-dialogo').classList.remove('hidden');
  }
}

export async function generarEfectoTyping(texto, elemento, characterName, velocidad = 0.3) {
  elemento.textContent = "";
  let wordCounter = 0; 
  const WORDS_PER_SOUND = characterName === "tito" ? 23: 3; 
  const audioSrc = characterName === "tito" ? 
        document.getElementById('audio-tito').src : 
        document.getElementById('audio-itzel-psic').src;

  if (characterName === "tito") playFluidSpeechSound(audioSrc);

  for (let i = 0; i < texto.length; i++) {
    elemento.textContent += texto[i];
    const prevChar = i > 0 ? texto[i - 1] : ' ';
    const isWordBoundary = prevChar === ' ' || /[.!?;:]/.test(prevChar);
    if (isWordBoundary && texto[i] !== ' ') {
      wordCounter++;
      if (wordCounter % WORDS_PER_SOUND === 0) playFluidSpeechSound(audioSrc);
    }
    await new Promise(r => setTimeout(r, velocidad));
  }
}

export function obtenerNombreGlobo(idPersonaje) {
  if (idPersonaje.startsWith("tito")) return "Tito";
  if (idPersonaje.startsWith("psicologa")) return "Psicóloga";
  if (idPersonaje.startsWith("itzel")) return "Itzel";
  return "Tito";
}

export async function actualizarGlobo(escena, nombrePersonaje, texto, onComplete) {
  
  // 1. OBTENER O CREAR EL GLOBO (Lógica fusionada)
  
  // Convertimos "Psicóloga" a "psicologa" para el ID
  const nombreID = nombrePersonaje.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // "psicologa"
  
  const idGlobo = `globo-${nombreID}`; // "globo-psicologa"
  
  let globo = document.getElementById(idGlobo);

  // ¡AQUÍ ESTÁ LA MAGIA! Si el globo no existe, lo crea. (AÑADIDO)
  if (!globo) {
    console.log(`Creando globo: ${idGlobo}`);
    const clon = plantillaGlobo.content.cloneNode(true);
    globo = clon.querySelector('.globo-dialogo');
    globo.id = idGlobo; // Asignamos ID (ej: 'globo-tito')
    gameCanvas.appendChild(globo); // Lo añadimos al DOM
  }

  // 2. ACTUALIZAR CONTENIDO (Lógica fusionada)
  const textoDiv = globo.querySelector(".globo-texto");
  const botonCerrar = globo.querySelector(".globo-cerrar");
  const cabezaGlobo = globo.querySelector('.globo-imagen-personaje'); // <-- MODIFICADO (usa la clase de la plantilla)
  
  // Rellenamos los datos del globo (AÑADIDO)
  globo.querySelector('.globo-nombre').textContent = nombrePersonaje;
  cabezaGlobo.src = imagenesPersonaje[nombrePersonaje];
  cabezaGlobo.alt = nombrePersonaje;
  botonCerrar.onclick = () => cerrarGlobo(globo); // Asignamos el cierre

  
  // 3. EJECUTAR TU ANIMACIÓN (Tu código original)
  
  botonCerrar.classList.add('hidden');
  textoDiv.textContent = "";
  globo.classList.remove("hidden");

  if (escena.next && escena.next.startsWith('btn-')) {
    const botonContinuar = document.createElement('button');
    botonContinuar.className = 'btn';
    botonContinuar.id = escena.next;
    botonContinuar.textContent = 'Continuar';
    globo.appendChild(botonContinuar);
  }
  const elementoPersonaje = document.getElementById(escena.personaje);
  if (elementoPersonaje) elementoPersonaje.classList.add('hablando');
  
  if (cabezaGlobo) cabezaGlobo.classList.add('cabeza-hablando');
  
  // Pasamos el nombre en minúsculas a tu función de typing
  await generarEfectoTyping(texto, textoDiv, nombreID); 

  if (elementoPersonaje) elementoPersonaje.classList.remove('hablando');
  if (cabezaGlobo) cabezaGlobo.classList.remove('cabeza-hablando');
  botonCerrar.classList.remove('hidden');
  
  if (onComplete) onComplete();
}