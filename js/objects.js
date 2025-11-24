import { isSoundEnabled, playSoundEffect } from './sound.js';

/**
 * State tracking for the water glass logic.
 * @type {boolean}
 */
let isGlassEmpty = false;

/**
 * Initializes the interactive food objects (bread, water glass, jug).
 * Sets their initial images and attaches click event listeners.
 */
export function initObjects() {
  const breadImg = document.querySelector('#contenedor-pan img');
  const waterImg = document.querySelector('#contenedor-agua img');
  const jugImg = document.querySelector('#contenedor-jarra img');

  if (breadImg) breadImg.src = 'img/Objetos/pan-entero.png';
  if (waterImg) waterImg.src = 'img/Objetos/vaso-agua.png'; 
  if (jugImg) jugImg.src = 'img/Objetos/jarra-agua.png';
  
  initFoodEvents();
}

/**
 * Initializes the laptop object.
 * Sets the image source and attaches the typing interaction event.
 */
export function initLaptop() {
  const laptopImg = document.querySelector('#contenedor-laptop img');
  if (laptopImg) {
      laptopImg.src = 'img/Objetos/laptop.png';
      initLaptopEvent();
  }
}

/**
 * Hides the laptop by removing its image source.
 */
export function hideLaptop() {
  const laptopImg = document.querySelector('#contenedor-laptop img');
  if (laptopImg) {
      laptopImg.src = '';
  }
}

/**
 * Attaches the click event listener to the laptop image.
 * Triggers a visual animation and a typing sound effect when clicked.
 */
function initLaptopEvent() {
  const laptopImg = document.querySelector('#contenedor-laptop img');
  if (!laptopImg) return;

  laptopImg.onclick = function() {
    // Prevent interaction if the element has no source (is hidden)
    if (!this.getAttribute('src')) return;
    
    this.classList.add('animacion-laptop');
    // Remove animation class after it finishes to allow re-triggering
    setTimeout(() => this.classList.remove('animacion-laptop'), 1000);
    
    if (isSoundEnabled) {
        playSoundEffect('audio-type');
    }
  };
}

/**
 * Helper function to attach click handlers to food items.
 */
function initFoodEvents() {
  const breadImg = document.querySelector('#contenedor-pan img');
  const glassImg = document.querySelector('#contenedor-agua img');
  const jugImg = document.querySelector('#contenedor-jarra img');

  if (breadImg) breadImg.onclick = () => onBreadClick(breadImg);
  if (glassImg) glassImg.onclick = () => onGlassClick(glassImg);
  if (jugImg) jugImg.onclick = () => onJugClick(glassImg, jugImg);
}

/**
 * Handles the click logic for the bread object.
 * Cycles through states: Whole -> Bitten -> Finished -> Disappears.
 * Plays a crunch sound effect.
 * @param {HTMLImageElement} breadImg - The DOM image element for the bread.
 */
function onBreadClick(breadImg) {
  breadImg.classList.add('animacion-click');
  setTimeout(() => breadImg.classList.remove('animacion-click'), 400);
  
  if (isSoundEnabled) playSoundEffect('audio-bite');

  // Logic to cycle bread state based on current image filename
  const src = breadImg.src;
  if (src.includes('pan-entero.png')) {
      breadImg.src = 'img/Objetos/pan-mordido.png';
  } else if (src.includes('pan-mordido.png')) {
      breadImg.src = 'img/Objetos/pan-terminado.png';
  } else {
      breadImg.src = ''; // Clear image to "eat" the last piece
  }
}

/**
 * Handles the click logic for the water glass.
 * If the glass has water, it empties it and plays a swallowing sound.
 * @param {HTMLImageElement} glassImg - The DOM image element for the glass.
 */
function onGlassClick(glassImg) {
  glassImg.classList.add('animacion-click');
  setTimeout(() => glassImg.classList.remove('animacion-click'), 400);
  
  // Only play sound if drinking (glass is not empty)
  if (glassImg.src.includes('vaso-agua.png') && isSoundEnabled) {
      playSoundEffect('audio-swallow');
  }

  if (glassImg.src.includes('vaso-agua.png')) {
    glassImg.src = 'img/Objetos/vaso-vacio.png';
    isGlassEmpty = true;
  }
}

/**
 * Handles the click logic for the water jug.
 * If the glass is empty, it refills it and plays a pouring sound.
 * @param {HTMLImageElement} glassImg - Reference to the glass element to check/update.
 * @param {HTMLImageElement} jugImg - The DOM image element for the jug (to animate).
 */
function onJugClick(glassImg, jugImg) {
  jugImg.classList.add('animacion-click');
  setTimeout(() => jugImg.classList.remove('animacion-click'), 400);

  // Only verify refill logic if the glass element exists
  if (!glassImg) return;

  if (isGlassEmpty && isSoundEnabled) {
      playSoundEffect('audio-refill');
  }

  if (glassImg.src.includes('vaso-vacio.png')) {
    glassImg.src = 'img/Objetos/vaso-agua.png';
    isGlassEmpty = false;
  }
}

/**
 * Clears all food objects from the scene (sets src to empty string).
 * Used when transitioning away from the interview room scene.
 */
export function clearFoodObjects() {
  const breadImg = document.querySelector('#contenedor-pan img');
  const glassImg = document.querySelector('#contenedor-agua img');
  const jugImg = document.querySelector('#contenedor-jarra img');

  if (breadImg) breadImg.src = '';
  if (glassImg) glassImg.src = '';
  if (jugImg) jugImg.src = '';
}