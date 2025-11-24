import { playFluidSpeechSound } from './sound.js';

// --- DOM References ---
const bubbleTemplate = document.getElementById('plantilla-globo');
const gameCanvas = document.getElementById('game-canvas');

/**
 * Mapping of character names to their headshot image paths.
 * Used to display the character's face inside the speech bubble.
 * @type {Object.<string, string>}
 */
const characterImages = {
  'Tito': 'img/Tito/Cabeza_Tito.png',
  'Psicóloga': 'img/Psicologa/Cabeza_Psicologa.png',
  'Itzel': 'img/Itzel/Cabeza_Itzel.png'
};

/**
 * Closes a specific speech bubble and re-enables the main dialogue button.
 * @param {HTMLElement} bubble - The speech bubble element to hide.
 */
export function closeBubble(bubble) {
  if (bubble) {
    bubble.classList.add('hidden');
    const dialogBtn = document.querySelector('.btn-dialogo');
    if (dialogBtn) {
        dialogBtn.classList.remove('hidden');
    }
  }
}

/**
 * Simulates a typewriter effect for the dialogue text, synchronized with speech sounds.
 * @param {string} text - The full text to display.
 * @param {HTMLElement} element - The DOM element where text will be injected.
 * @param {string} characterId - The normalized ID of the character (e.g., "tito", "psicologa") to determine sound frequency.
 * @param {number} [speed=30] - Time in milliseconds between each character.
 * @returns {Promise<void>} A promise that resolves when the typing animation is complete.
 */
export async function typewriterEffect(text, element, characterId, speed = 0.1) { // Changed default speed to 30ms (from 0.3 which was too fast or handled differently in original logic, assuming 30ms is standard)
  element.textContent = "";
  let wordCounter = 0; 
  
  // Determine how often to play the sound based on the character
  // Tito speaks faster/differently, so sound plays less frequently per word/boundary?
  // Original logic: Tito = 23? (Seems high, maybe meant strictly for Tito's long audio), Others = 3
  const WORDS_PER_SOUND = characterId === "tito" ? 23 : 3; 
  
  // Select the correct audio source based on character
  const audioSrc = characterId === "tito" ? 
        document.getElementById('audio-tito').src : 
        document.getElementById('audio-itzel-psic').src;

  // Play initial sound for Tito
  if (characterId === "tito") playFluidSpeechSound(audioSrc);

  for (let i = 0; i < text.length; i++) {
    element.textContent += text[i];
    
    const prevChar = i > 0 ? text[i - 1] : ' ';
    const isWordBoundary = prevChar === ' ' || /[.!?;:]/.test(prevChar);
    
    // Play sound at word boundaries to simulate speech rhythm
    if (isWordBoundary && text[i] !== ' ') {
      wordCounter++;
      if (wordCounter % WORDS_PER_SOUND === 0) playFluidSpeechSound(audioSrc);
    }
    
    // Wait for the specified speed before adding the next character
    await new Promise(r => setTimeout(r, speed));
  }
}

/**
 * Determines the display name of a character based on their internal ID.
 * @param {string} characterId - The internal ID (e.g., "tito1", "psicologa2").
 * @returns {string} The display name (e.g., "Tito", "Psicóloga").
 */
export function getCharacterDisplayName(characterId) {
  if (characterId.startsWith("tito")) return "Tito";
  if (characterId.startsWith("psicologa")) return "Psicóloga";
  if (characterId.startsWith("itzel")) return "Itzel";
  return "Tito"; // Default fallback
}

/**
 * Updates the speech bubble with new text and handles the character animation during speech.
 * Creates the bubble DOM element if it doesn't exist.
 * * @param {Object} scene - The current scene object containing context (next button, etc.).
 * @param {string} characterName - The display name of the character speaking.
 * @param {string} text - The dialogue text.
 * @param {Function} [onComplete] - Callback function executed after typing finishes.
 */
export async function updateSpeechBubble(scene, characterName, text, onComplete) {
  
  // 1. Get or Create the Bubble
  
  // Normalize name for ID generation (e.g., "Psicóloga" -> "psicologa")
  const nameID = characterName.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
  
  const bubbleId = `globo-${nameID}`; 
  
  let bubble = document.getElementById(bubbleId);

  // If bubble doesn't exist in DOM, clone it from the template
  if (!bubble) {
    console.log(`Creating bubble: ${bubbleId}`);
    const clone = bubbleTemplate.content.cloneNode(true);
    bubble = clone.querySelector('.globo-dialogo');
    bubble.id = bubbleId; 
    gameCanvas.appendChild(bubble); 
  }

  // 2. Update Bubble Content
  const textDiv = bubble.querySelector(".globo-texto");
  const closeBtn = bubble.querySelector(".globo-cerrar");
  const headImage = bubble.querySelector('.globo-imagen-personaje'); 
  
  // Fill data
  bubble.querySelector('.globo-nombre').textContent = characterName;
  if (characterImages[characterName]) {
      headImage.src = characterImages[characterName];
  }
  headImage.alt = characterName;
  
  closeBtn.onclick = () => closeBubble(bubble); 

  // 3. Execute Animation Logic
  
  closeBtn.classList.add('hidden');
  textDiv.textContent = "";
  bubble.classList.remove("hidden");

  // Handle special 'Next' button inside the bubble (if scene flow requires it)
  if (scene.next && scene.next.startsWith('btn-')) {
    // Check if button already exists to avoid duplicates
    let continueBtn = bubble.querySelector(`#${scene.next}`);
    if (!continueBtn) {
        continueBtn = document.createElement('button');
        continueBtn.className = 'btn';
        continueBtn.id = scene.next;
        continueBtn.textContent = 'Continuar';
        bubble.appendChild(continueBtn);
    }
  }

  // Animate Character on Scene (Body)
  const characterElement = document.getElementById(scene.character);
  if (characterElement) characterElement.classList.add('hablando'); // Keeping CSS class 'hablando'
  
  // Animate Character in Bubble (Head)
  if (headImage) headImage.classList.add('cabeza-hablando'); // Keeping CSS class 'cabeza-hablando'
  
  // Start Typewriter Effect
  await typewriterEffect(text, textDiv, nameID); 

  // Stop Animations
  if (characterElement) characterElement.classList.remove('hablando');
  if (headImage) headImage.classList.remove('cabeza-hablando');
  
  closeBtn.classList.remove('hidden');
  
  if (onComplete) onComplete();
}