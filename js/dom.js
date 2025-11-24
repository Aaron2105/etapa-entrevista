// dom.js
import { CharacterManager } from './characterManager.js';
import { playBackgroundMusic } from './sound.js';

/**
 * Shows a DOM element or a managed character by its ID.
 * Delegates to CharacterManager if the ID belongs to a character configuration.
 * * @param {string} id - The ID of the element or character to show.
 */
export function show(id) {
    // Check if it's a character managed by the system
    // Note: We assume 'personajesConfig' will be renamed to 'characterConfig' 
    // in the upcoming refactor of characterManager.js
    if (CharacterManager.characterConfig && CharacterManager.characterConfig[id]) {
        return CharacterManager.showCharacter(id);
    }
    
    // Fallback for static DOM elements
    const element = document.getElementById(id);
    if (!element) return;
    
    element.classList.remove('hidden');
    element.classList.add('visible');
}

/**
 * Hides a DOM element or a managed character by its ID.
 * * @param {string} id - The ID of the element or character to hide.
 */
export function hide(id) {
    // Check if it's a character managed by the system
    if (CharacterManager.characterConfig && CharacterManager.characterConfig[id]) {
        return CharacterManager.removeCharacter(id);
    }
    
    // Fallback for static DOM elements
    const element = document.getElementById(id);
    if (!element) return;
    
    element.classList.add('hidden');
    element.classList.remove('visible');
}

/**
 * Resets (hides) the speech bubbles for the main characters.
 * Currently targets specific IDs: 'globo-tito', 'globo-itzel', 'globo-psicologa'.
 */
export function resetSpeechBubbles() {
    // Note: We keep the HTML IDs (globo-*) as is for now to avoid breaking CSS/HTML linkage.
    ["tito", "itzel", "psicologa"].forEach(name => {
        const bubble = document.getElementById(`globo-${name}`);
        if (bubble) {
            bubble.classList.remove("visible");
            bubble.classList.add("hidden");
        }
    });
}

/**
 * Closes a specific speech bubble element and re-enables the dialogue button.
 * * @param {HTMLElement} bubbleElement - The speech bubble DOM element to hide.
 */
export function closeSpeechBubble(bubbleElement) {
    if (bubbleElement) {
        bubbleElement.classList.add("hidden");
    }
    const dialogBtn = document.querySelector('.btn-dialogo');
    if (dialogBtn) dialogBtn.classList.remove('hidden');
}

/**
 * Opens the modal displaying the real-life photo of the interview room.
 * Dynamically injects the HTML content into the modal container.
 */
export function openRoomModal() {
    const modal = document.getElementById('modal-sala');
    if (!modal) return;

    const modalContent = modal.querySelector('.modal-contenido');
    
    // Inject modal content
    modalContent.innerHTML = `
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
    
    // Attach close event to the newly created button
    const closeBtn = modalContent.querySelector('.modal-cerrar');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
}

/**
 * Closes the room photo modal ('modal-sala').
 */
export function closeModal() {
    const modal = document.getElementById('modal-sala');
    if (modal) modal.classList.add('hidden');
}

/**
 * Closes the initial welcome/tutorial modal and starts the background music.
 */
export function closeWelcomeModal() {
    const modal = document.getElementById('bienvenida-modal');
    if (modal) modal.classList.add('hidden');
    playBackgroundMusic();
}

/**
 * Initializes global event listeners for modals.
 * Handles clicking outside the modal and pressing the Escape key.
 */
export function initModalEvents() {
    const modal = document.getElementById('modal-sala');
    if (modal) {
        modal.addEventListener('click', e => { 
            if (e.target === modal) closeModal(); 
        });
    }
    document.addEventListener('keydown', e => { 
        if (e.key === 'Escape') closeModal(); 
    });
}

/**
 * Creates and displays the welcome modal with the tutorial video.
 * Sets up event listeners for the 'Jugar' button and close icon.
 */
export function createWelcomeModal() {
    const modal = document.getElementById('bienvenida-modal');
    if (!modal) return;

    const modalContent = modal.querySelector('.modal-contenido');

    modalContent.innerHTML = `
        <button class="modal-cerrar">×</button>
        <h2 class="modal-titulo">Bienvenido/a</h2>
        <div class="modal-imagen">
            <video id="video-bienvenida" width="100%" autoplay muted loop playsinline>
                <source src="img/Varios/tutorial.mp4" type="video/mp4">
            </video>
        </div>
        <div class="modal-descripcion">
            BIENVENIDO a la Etapa de la Entrevista, una experiencia
            interactiva de la Fiscalía General del Estado de Yucatán.
            Para continuar con la progresión de la historia,
            deberás hacer click en los objetos que pulsen.
        </div>
        <div class="modal-footer animacion">
            <button id="btn-jugar" class="btn-jugar">Jugar</button>
        </div>
    `;
    
    modal.classList.remove('hidden');
    
    const closeBtn = modalContent.querySelector('.modal-cerrar');
    if (closeBtn) closeBtn.addEventListener('click', closeWelcomeModal);
    
    const playBtn = document.getElementById('btn-jugar');
    if (playBtn) playBtn.addEventListener('click', closeWelcomeModal);
}