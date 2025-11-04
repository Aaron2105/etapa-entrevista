// dom.js
import { CharacterManager } from './characterManager.js';

export function mostrar(id) {
    // Si es un personaje dinámico, usar CharacterManager
    if (CharacterManager.personajesConfig[id]) {
        return CharacterManager.mostrarPersonaje(id);
    }
    
    // Para elementos estáticos, usar lógica original
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('hidden');
    el.classList.add('visible');
}

export function ocultar(id) {
    // Si es un personaje dinámico, eliminar completamente
    if (CharacterManager.personajesConfig[id]) {
        return CharacterManager.eliminarPersonaje(id);
    }
    
    // Para elementos estáticos, solo ocultar
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('hidden');
    el.classList.remove('visible');
}

export function resetGlobos() {
    ["tito", "itzel", "psicologa"].forEach(nombre => {
        const globo = document.getElementById(`globo-${nombre}`);
        if (globo) {
            globo.classList.remove("visible");
            globo.classList.add("hidden");
        }
    });
}

export function cerrarGlobo(globo) {
    globo.classList.add("hidden");
    const btnDialogo = document.querySelector('.btn-dialogo');
    if (btnDialogo) btnDialogo.classList.remove('hidden');
}

export function abrirModalSala() {
    const modal = document.getElementById('modal-sala');
    const modalContenido = modal.querySelector('.modal-contenido');
    modalContenido.innerHTML = `
        <button class="modal-cerrar">×</button>
        <h2 class="modal-titulo">Sala de Entrevista</h2>
        <div class="modal-imagen">
            <img src="img/Varios/Foto_sala_entrevista.jpg" alt="Sala de entrevista"
                onload="this.style.opacity='1'" 
                style="opacity:0; transition: opacity 0.3s;">
        </div>
        <div class="modal-descripcion">
            Esta es una imagen real de cómo se ve la sala de entrevista en la vida real. 
            De esta manera, si un día llegas a ir, ¡ya sabrás cómo es!
        </div>
    `;
    modal.classList.remove('hidden');
    const cerrarBtn = modalContenido.querySelector('.modal-cerrar');
    cerrarBtn.addEventListener('click', cerrarModal);
}

export function cerrarModal() {
    const modal = document.getElementById('modal-sala');
    modal.classList.add('hidden');
}

// Cerrar modal al hacer clic fuera del contenido o con Escape
export function initModalEvents() {
    const modal = document.getElementById('modal-sala');
    modal.addEventListener('click', e => { if (e.target === modal) cerrarModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarModal(); });
}