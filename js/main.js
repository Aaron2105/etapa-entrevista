import { hide, show, initModalEvents, openRoomModal, resetSpeechBubbles, createWelcomeModal } from './dom.js';
import { toggleSound, playBackgroundMusic, playFluidSpeechSound } from './sound.js';
import { updateSpeechBubble, getCharacterDisplayName } from './dialogs.js';
import { scenes } from './scenes.js';
import { CharacterManager } from './characterManager.js';
import { initCanvas } from './canvas.js';

/**
 * Index tracking the current scene in the story flow.
 * @type {number}
 */
let currentSceneIndex = 0;

/**
 * Initializes the application logic once the DOM is fully loaded.
 * Sets up modals, canvas, character manager, and starts the first scene.
 */
document.addEventListener("DOMContentLoaded", () => {
    createWelcomeModal();
    initCanvas();
    initModalEvents();

    // Initialize CharacterManager and preload assets for the first scene
    CharacterManager.initialize(0);
    CharacterManager.createCharacter('tito1', true, 0);

    // Start the scene flow
    advanceScene();
});

// --- Event Listeners ---

// Sound Toggle Button
const soundBtn = document.querySelector('.btn-sonido');
if (soundBtn) {
    soundBtn.addEventListener('click', function() {
        const img = this.querySelector('img');
        const isEnabled = toggleSound();

        img.src = isEnabled ? "img/Varios/sound_on_3d.png" : "img/Varios/sound_off_3d.png";

        if (isEnabled) {
            playBackgroundMusic();
        } else {
            const music = document.getElementById('audio-lobby');
            if (music) music.pause();
        }
    });
}

// 'Done' Button (Drawing Game)
const doneBtn = document.getElementById("done-btn");
if (doneBtn) {
    doneBtn.onclick = () => {
        hide("paleta-colores");
        hide("done-btn");
        CharacterManager.removeCharacter("tito1");
        CharacterManager.createCharacter("tito4");
        hide("modo-container");
        
        currentSceneIndex++;
        advanceScene();
    };
}

// Dialogue Button (Manual advance if bubble closed)
const dialogBtn = document.querySelector('.btn-dialogo');
if (dialogBtn) {
    dialogBtn.addEventListener('click', function() {
        this.classList.add('hidden');
        advanceScene();
    });
}

// Gallery Button
const galleryBtn = document.querySelector('.btn-galeria');
if (galleryBtn) {
    galleryBtn.addEventListener('click', openRoomModal);
}

// --- Core Logic ---

/**
 * Advances the game to the current scene index defined in 'scenes'.
 * Handles dialogue updates, character visibility, and prepares interaction events.
 */
export function advanceScene() {
    const scene = scenes[currentSceneIndex];
    
    // Safety check: validation of scene existence
    if (!scene || !scene.character) return;

    resetSpeechBubbles();

    // Preload assets for the upcoming scenes to ensure smooth transitions
    CharacterManager.preloadFullScene(currentSceneIndex + 1);

    // Special case: Start music on scene 1 (after initial click)
    if (currentSceneIndex === 1) {
        playBackgroundMusic();
    }

    // Reset previous interactive elements
    document.querySelectorAll(".element").forEach(el => el.onclick = null);
    document.querySelectorAll(".element img").forEach(img => img.classList.remove('animacion'));

    // Hide manual dialog button if the scene has text (bubble will handle flow)
    if (dialogBtn && scene.text != null) {
        dialogBtn.classList.add('hidden');
    }

    // Display dialogue or setup direct interaction
    if (scene.text != null) {
        updateSpeechBubble(
            scene, 
            getCharacterDisplayName(scene.character), 
            scene.text, 
            function() {
                prepareNextAction(scene);
            }
        );
    } else {
        prepareNextAction(scene);
    }
}

/**
 * Sets up the interaction logic for moving to the next scene.
 * Applies animations to the target element and attaches the click handler.
 * @param {Object} scene - The current scene object.
 */
function prepareNextAction(scene) {
    // 1. Find the element that triggers the next action
    const targetElement = document.getElementById(scene.next);
    if (!targetElement) return; 

    // 2. Apply visual cue (bounce animation)
    if (scene.next.startsWith('btn-')) {
        targetElement.classList.add('animacion');
    } else {
        const img = targetElement.querySelector('img');
        if (img) img.classList.add('animacion');
    }

    // 3. Attach Click Event
    targetElement.onclick = async () => {
        // Execute custom scene logic (like switching characters) if defined
        if (scene.onClick) {
            const result = scene.onClick(currentSceneIndex);
            // Await the result in case it's an async operation (like animations)
            if (result instanceof Promise) {
                await result;
            }
        }
        
        // Move to next scene
        currentSceneIndex++;
        advanceScene();
    };
}

/**
 * Orchestrates a specific animation sequence for Itzel speaking.
 * Used in scenes where Itzel narrates a longer story part.
 * @returns {Promise<void>} Resolves when the animation sequence finishes.
 */
export function animateItzelSpeaking() {
    return new Promise((resolve) => {
        const itzelElement = document.getElementById('itzel6');
        if (!itzelElement) return resolve();

        const imgItzel = itzelElement.querySelector('img');

        resetSpeechBubbles();

        // Remove click interaction temporarily
        itzelElement.onclick = null;

        // CSS Animation
        imgItzel.classList.add('animacion-cabeza-hablando');

        let soundCount = 0;
        const maxSounds = 8;

        function playSpeechLoop() {
            if (soundCount < maxSounds) {
                const audioSrc = document.getElementById('audio-itzel-psic')?.src;
                if (audioSrc) playFluidSpeechSound(audioSrc);
                
                soundCount++;
                setTimeout(playSpeechLoop, 400);
            }
        }

        playSpeechLoop();

        // End animation after 3 seconds
        setTimeout(() => {
            imgItzel.classList.remove('animacion-cabeza-hablando');
            resolve();
        }, 3000);
    });
}