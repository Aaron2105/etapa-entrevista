/**
 * @module SoundManager
 * @description Manages all audio-related functionalities including background music,
 * sound effects, and dynamic speech synthesis simulation (fluid speech).
 */

/**
 * Global state for sound.
 * Determines if audio should be played throughout the application.
 * @type {boolean}
 */
export let isSoundEnabled = true;

/**
 * Toggles the global sound state between enabled and disabled.
 * Useful for UI mute/unmute buttons.
 * * @returns {boolean} The new state of sound (true = enabled, false = disabled).
 */
export function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  return isSoundEnabled;
}

/**
 * Plays a sound file with a randomized pitch to simulate natural, fluid speech bubbling.
 * Used primarily for character dialogue effects (like "Animal Crossing" style speech).
 * * @param {string} url - The source URL of the audio file to play.
 * @param {number} [volume=0.7] - The volume level (0.0 to 1.0). Defaults to 0.7.
 */
export function playFluidSpeechSound(url, volume = 0.7) {
  if (!isSoundEnabled) return;

  const audio = new Audio(url);
  
  // Randomize playback rate slightly to create a "bubbling" voice effect
  // Range: 0.8 to 1.2 speed
  audio.playbackRate = 0.8 + Math.random() * 0.4;
  
  // Ensure pitch changes with speed (standard behavior, but explicit here)
  audio.preservesPitch = false;
  
  audio.volume = volume;
  audio.currentTime = 0;
  
  audio.play().catch(error => {
    console.error("Error playing fluid speech sound:", error);
  });
}

/**
 * Plays the main background music loop for the lobby/interview room.
 * Requires an <audio> element with ID 'audio-lobby' in the DOM.
 */
export function playBackgroundMusic() {
  if (!isSoundEnabled) return;

  const music = document.getElementById('audio-lobby');
  if (music) {
    music.volume = 0.5;
    music.loop = true;
    music.play().catch(error => {
      // Auto-play policy might block this if no user interaction occurred yet
      console.log('Error playing background music (check auto-play policy):', error);
    });
  } else {
    console.warn("Background music element 'audio-lobby' not found in DOM.");
  }
}

/**
 * Plays a specific one-shot sound effect.
 * * @param {string} audioId - The DOM ID of the <audio> element to play.
 * @param {number} [volume=0.5] - The volume level (0.0 to 1.0). Defaults to 0.5.
 */
export function playSoundEffect(audioId, volume = 0.5) {
  const audio = document.getElementById(audioId);
  if (audio) {
    audio.volume = volume;
    audio.currentTime = 0; // Reset to start to allow rapid re-triggering
    audio.play().catch(error => {
      console.log(`Error playing sound effect '${audioId}':`, error);
    });
  } else {
    console.warn(`Sound effect element '${audioId}' not found.`);
  }
}