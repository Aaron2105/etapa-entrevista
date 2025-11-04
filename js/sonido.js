// sonido.js
export let sonidoActivado = true;

export function toggleSonido() {
  sonidoActivado = !sonidoActivado;
  return sonidoActivado;
}

export function playFluidSpeechSound(url, volume = 0.7) {
  if (!sonidoActivado) return;
  const audio = new Audio(url); 
  audio.playbackRate = 0.8 + Math.random() * 0.4;
  audio.preservesPitch = false;
  audio.volume = volume;
  audio.currentTime = 0;
  audio.play().catch(e => console.error("Error al reproducir sonido fluido:", e));
}

export function reproducirMusicaFondo() {
  if (!sonidoActivado) return;
  const musica = document.getElementById('audio-lobby');
  if (musica) {
    musica.volume = 0.5;
    musica.loop = true;
    musica.play().catch(e => console.log('Error reproduciendo música de fondo:', e));
  }
}

export function playEfectoSonido(idAudio, volumen = 0.5) {
  const audio = document.getElementById(idAudio);
  if (audio) {
    audio.volume = volumen;
    audio.currentTime = 0;
    audio.play().catch(e => console.log('Error sonido:', e));
  }
}
