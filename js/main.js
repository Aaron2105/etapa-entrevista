// main.js
import { ocultar, initModalEvents, abrirModalSala, resetGlobos, crearModalBienvenida } from './dom.js';
import { toggleSonido, reproducirMusicaFondo } from './sonido.js';
import { actualizarGlobo, obtenerNombreGlobo } from './dialogos.js';
import { escenas } from './escenas.js';
import { playFluidSpeechSound } from './sonido.js';
import { CharacterManager } from './characterManager.js';
import { initCanvas } from './canvas.js';

let escenaActual = 0;

// Botón de sonido
document.querySelector('.btn-sonido').addEventListener('click', function() {
    const img = this.querySelector('img');
    const activo = toggleSonido();
    img.src = activo ? "img/Varios/sound_on_3d.png" : "img/Varios/sound_off_3d.png";
    if (activo) reproducirMusicaFondo();
    else {
        const musica = document.getElementById('audio-lobby');
        if (musica) musica.pause();
    }
});

// Inicialización de canvas y modales
document.addEventListener("DOMContentLoaded", () => {
    crearModalBienvenida();
    initCanvas();
    initModalEvents();
    
    // INICIALIZAR con precarga avanzada
    CharacterManager.inicializar(0);
    CharacterManager.crearPersonaje('tito1', true, 0);
    avanzarEscena();
});

// Función principal para avanzar escenas
export function avanzarEscena() {
    const escena = escenas[escenaActual];
    if (!escena || !escena.personaje) return;
    resetGlobos();

    // PRECARGAR próximos personajes ANTES de cambiar
    CharacterManager.precargarEscenaCompleta(escenaActual + 1);

    if (escenaActual == 1) reproducirMusicaFondo();

    document.querySelectorAll(".element").forEach(el => el.onclick = null);
    document.querySelectorAll(".element img").forEach(img => img.classList.remove('animacion'));

    const btnDialogo = document.querySelector('.btn-dialogo');
    if (btnDialogo && escena.texto != null) btnDialogo.classList.add('hidden');

    if (escena.texto != null) {
        actualizarGlobo(escena, obtenerNombreGlobo(escena.personaje), escena.texto, function() {
            prepararSiguienteAccion(escena);
        });
    } else {
        prepararSiguienteAccion(escena);
    }
}

function prepararSiguienteAccion(escena) {
    // 1. Encontrar el siguiente elemento
    const personajeElemento = document.getElementById(escena.next);
    if (!personajeElemento) return; // Salir si no hay "next"

    // 2. Aplicar animación
    if (escena.next.startsWith('btn-')) {
        personajeElemento.classList.add('animacion');
    } else {
        const img = personajeElemento.querySelector('img');
        if (img) img.classList.add('animacion');
    }

    // 3. Asignar el handler ONCLICK (con el bug corregido)
    personajeElemento.onclick = async () => {
        // Ejecutar la acción de la escena (si existe)
        if (escena.alClic) {
            const resultado = escena.alClic(escenaActual);
            // AQUÍ CORREGIMOS EL BUG: usamos await
            if (resultado instanceof Promise) await resultado;
        }
        
        // Avanzar a la siguiente escena
        escenaActual++;
        avanzarEscena();
    };
}

document.getElementById("done-btn").onclick = () => {
    ocultar("paleta-colores");
    ocultar("done-btn");
    CharacterManager.eliminarPersonaje("tito1");
    CharacterManager.crearPersonaje("tito4");
    ocultar("modo-container");
    escenaActual++;
    avanzarEscena();
};

document.querySelector('.btn-dialogo').addEventListener('click', function() {
    this.classList.add('hidden');
    avanzarEscena();
});

document.querySelector('.btn-galeria').addEventListener('click', abrirModalSala);

export function animarItzelHablando() {
    return new Promise((resolve) => {
        const itzelElement = document.getElementById('itzel6');
        if (!itzelElement) return resolve();

        const imgItzel = itzelElement.querySelector('img');

        resetGlobos();

        itzelElement.onclick = null;

        imgItzel.classList.add('animacion-cabeza-hablando');

        let contadorSonido = 0;

        function reproducirSonidoHabla() {
            if (contadorSonido < 8) {
                playFluidSpeechSound(document.getElementById('audio-itzel-psic').src);
                contadorSonido++;
                setTimeout(reproducirSonidoHabla, 400);
            }
        }

        reproducirSonidoHabla();

        setTimeout(() => {
            imgItzel.classList.remove('animacion-cabeza-hablando');
            resolve();
        }, 3000);
    });
}