// main.js
import { mostrar, ocultar, initModalEvents, abrirModalSala, resetGlobos, cerrarGlobo } from './dom.js';
import { toggleSonido, reproducirMusicaFondo } from './sonido.js';
import { actualizarGlobo, obtenerNombreGlobo } from './dialogos.js';
import { initCanvas } from './canvas.js';
import { escenas } from './escenas.js';
import { playFluidSpeechSound } from './sonido.js';
import { CharacterManager } from './characterManager.js';

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

document.getElementById('globo-itzel').querySelector('.globo-cerrar').addEventListener('click', () => cerrarGlobo(document.getElementById('globo-itzel')));
document.getElementById('globo-tito').querySelector('.globo-cerrar').addEventListener('click', () => cerrarGlobo(document.getElementById('globo-tito')));
document.getElementById('globo-psicologa').querySelector('.globo-cerrar').addEventListener('click', () => cerrarGlobo(document.getElementById('globo-psicologa')));


// Inicialización de canvas y modales
document.addEventListener("DOMContentLoaded", () => {
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
            const personajeElemento = document.getElementById(escena.next);
            if (escena.next.startsWith('btn-')) {
                document.getElementById(escena.next).classList.add('animacion');
            } else if (personajeElemento) {
                const img = personajeElemento.querySelector('img');
                if (img) img.classList.add('animacion');
            }

            if (personajeElemento) personajeElemento.onclick = async () => {
                if (escena.alClic) {
                    const resultado = escena.alClic();
                    if (resultado instanceof Promise) await resultado;
                }
                escenaActual++;
                avanzarEscena();
            };
        });
    } else {
        const personajeElemento = document.getElementById(escena.next);
        if (personajeElemento) {
            const img = personajeElemento.querySelector('img');
            if (img) img.classList.add('animacion');
            personajeElemento.onclick = () => {
                if (escena.alClic) {
                    // Pasar escenaActual a las funciones alClic
                    const resultado = escena.alClic(escenaActual);
                    if (resultado instanceof Promise) resultado;
                }
                escenaActual++;
                avanzarEscena();
            };
        }
    }
}

// Botones estáticos
document.getElementById("understand-btn").onclick = () => {
    ocultar("instructions-modal");
    mostrar("paleta-colores");
    mostrar("done-btn");
    mostrar("modo-container");
};

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