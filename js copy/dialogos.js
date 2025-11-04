// dialogos.js
import { playFluidSpeechSound } from './sonido.js';

export async function generarEfectoTyping(texto, elemento, characterName, velocidad = 0.1) {
  elemento.textContent = ""; 
  let wordCounter = 0; 
  const WORDS_PER_SOUND = 3; 
  const audioSrc = characterName === "tito" ? 
        document.getElementById('audio-tito').src : 
        document.getElementById('audio-itzel-psic').src;

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
  if (idPersonaje.startsWith("tito")) return "tito";
  if (idPersonaje.startsWith("psicologa")) return "psicologa";
  if (idPersonaje.startsWith("itzel")) return "itzel";
  return "tito";
}

export async function actualizarGlobo(escena, personaje, texto, onComplete) {
  const globo = document.getElementById(`globo-${personaje}`);
  if (!globo) return;
  const textoDiv = globo.querySelector(".globo-texto");
  const botonCerrar = globo.querySelector(".globo-cerrar");

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
  
  const cabezaGlobo = globo.querySelector('img[class*="globo-imagen"]');
  if (cabezaGlobo) cabezaGlobo.classList.add('cabeza-hablando');
  
  await generarEfectoTyping(texto, textoDiv, personaje);

  if (elementoPersonaje) elementoPersonaje.classList.remove('hablando');
  if (cabezaGlobo) cabezaGlobo.classList.remove('cabeza-hablando');
  botonCerrar.classList.remove('hidden');
  
  if (onComplete) onComplete();
}