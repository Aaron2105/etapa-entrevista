import { scenes } from './scenes.js'; // Asumimos que escenas.js será renombrado a scenes.js pronto

/**
 * @class CharacterManager
 * @description Static class responsible for managing the lifecycle, rendering, and caching 
 * of character assets and interactive elements in the DOM. 
 * It implements a caching strategy to keep the DOM light while ensuring assets are ready when needed.
 */
export class CharacterManager {

    /**
     * Configuration dictionary for all characters and interactive objects.
     * Maps an ID to its image source, CSS classes, and alt text.
     * @type {Object.<string, {src: string, cssClasses: string[], alt: string}>}
     */
    static characterConfig = {
        // --- Tito ---
        'tito1': { 
            src: 'img/Tito/Tito_1.png', 
            cssClasses: ['element', 'character', 'shadow', 'visible'],
            alt: 'Tito 1'
        },
        'tito2': { 
            src: 'img/Tito/Tito_2.png', 
            cssClasses: ['element', 'character', 'shadow', 'visible'],
            alt: 'Tito 2'
        },
        'tito3': { 
            src: 'img/Tito/Tito_3.png', 
            cssClasses: ['element', 'character', 'shadow', 'visible'],
            alt: 'Tito 3'
        },
        'tito4': { 
            src: 'img/Tito/Tito_4.png', 
            cssClasses: ['element', 'character', 'shadow', 'visible'],
            alt: 'Tito 4'
        },
        
        // --- Psychologist (Psicóloga) ---
        'psicologa1': { 
            src: 'img/Psicologa/Psicologa_1.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Psychologist 1'
        },
        'psicologa2': { 
            src: 'img/Psicologa/Psicologa_2.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Psychologist 2'
        },
        'psicologa3': { 
            src: 'img/Psicologa/Psicologa_3.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Psychologist 3'
        },
        'psicologa4': { 
            src: 'img/Psicologa/Psicologa_4.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Psychologist 4'
        },
        'psicologa5': { 
            src: 'img/Psicologa/Psicologa_5.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Psychologist 5'
        },
        'psicologa6': { 
            src: 'img/Psicologa/Psicologa_6.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Psychologist 6'
        },
        
        // --- Itzel ---
        'itzel1': { 
            src: 'img/Itzel/Itzel_1.png', 
            cssClasses: ['element', 'character', 'shadow', 'visible'],
            alt: 'Itzel 1'
        },
        'itzel2': { 
            src: 'img/Itzel/Itzel_2.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Itzel 2'
        },
        'itzel3': { 
            src: 'img/Itzel/Itzel_3.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Itzel 3'
        },
        'itzel4': { 
            src: 'img/Itzel/Itzel_4.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Itzel 4'
        },
        'itzel5': { 
            src: 'img/Itzel/Itzel_5.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Itzel 5'
        },
        'itzel6': { 
            src: 'img/Itzel/Itzel_6.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Itzel 6'
        },
        'itzel7': { 
            src: 'img/Itzel/Itzel_7.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Itzel 7'
        },
        'itzel8': { 
            src: 'img/Itzel/Itzel_8.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Itzel 8'
        },
        'itzel9': { 
            src: 'img/Itzel/Itzel_9.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Itzel 9'
        },
        
        // --- Extras ---
        'abogado': { 
            src: 'img/Extras/Abogado.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Lawyer (Male)'
        },
        'abogada': { 
            src: 'img/Extras/Abogada.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Lawyer (Female)'
        },
        'psicologo': { 
            src: 'img/Extras/Psicologo.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Psychologist (Male)'
        },
        
        // --- Memories & Special Elements ---
        'recuerdo1': { 
            src: 'img/Varios/Recuerdo_1.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Memory 1'
        },
        'recuerdo2': { 
            src: 'img/Varios/Recuerdo_2.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Memory 2'
        },
        'nube-pensamiento': { 
            src: 'img/Varios/Nube_pensamiento.png', 
            cssClasses: ['element', 'character', 'visible'],
            alt: 'Thought Cloud'
        }
    };

    /**
     * Internal cache to store active DOM elements.
     * @type {Map<string, {div: HTMLElement, lastUsed: number, created: number}>}
     */
    static cache = new Map();

    /** Maximum number of characters to keep in the DOM simultaneously. */
    static maxCacheSize = 10;

    /** Number of future scenes to look ahead for preloading assets. */
    static scenesToKeep = 2;

    /**
     * Creates a character element in the DOM or retrieves it from cache.
     * @param {string} id - The ID of the character to create (must exist in characterConfig).
     * @param {boolean} [show=true] - Whether to make the character visible immediately.
     * @param {number} [currentScene=0] - The index of the current scene (for cache management).
     * @returns {HTMLElement|null} The created or retrieved DOM element, or null if config is missing.
     */
    static createCharacter(id, show = true, currentScene = 0) {
        const config = this.characterConfig[id];
        if (!config) {
            console.warn(`Configuration not found for character ID: ${id}`);
            return null;
        }
        
        // Return from cache if available
        if (this.cache.has(id)) {
            const cachedItem = this.cache.get(id);
            cachedItem.lastUsed = currentScene;
            
            if (show) {
                cachedItem.div.classList.remove('hidden');
                cachedItem.div.classList.add('visible');
            }
            return cachedItem.div;
        }
        
        // Create new DOM element
        const div = document.createElement('div');
        div.id = id;
        div.className = config.cssClasses.join(' ');
        
        if (!show) {
            div.classList.add('hidden');
            div.classList.remove('visible');
        }
        
        const img = document.createElement('img');
        img.src = config.src;
        img.alt = config.alt;
        
        // Start loading image
        this.preloadImage(config.src);
        
        div.appendChild(img);
        document.querySelector('.fondo-amarillo').appendChild(div); // Assuming class 'fondo-amarillo' exists
        
        // Add to cache
        this.cache.set(id, {
            div: div,
            lastUsed: currentScene,
            created: Date.now()
        });
        
        this.cleanCache(currentScene);
        
        return div;
    }

    /**
     * Shows an existing character by ID (wrapper for createCharacter with show=true).
     * Used by dom.js.
     * @param {string} id - Character ID.
     * @returns {HTMLElement|null}
     */
    static showCharacter(id) {
        // We pass 0 or the last known scene index if we don't have context here, 
        // but usually, this is called from contexts where the character likely exists.
        return this.createCharacter(id, true); 
    }

    /**
     * Preloads an image into the browser memory.
     * @param {string} src - Image URL.
     */
    static preloadImage(src) {
        const img = new Image();
        img.src = src;
    }

    /**
     * Preloads assets for the current scene and upcoming scenes based on `scenesToKeep`.
     * Parses the 'onClick' handlers of future scenes to anticipate dynamic character changes.
     * @param {number} currentScene - Current scene index.
     */
    static preloadFullScene(currentScene) {
        const futureScenes = this.getFutureScenes(currentScene);
        
        futureScenes.forEach(scene => {
            // Preload main character of the scene
            if (scene.character && !this.cache.has(scene.character)) {
                this.createCharacter(scene.character, false, currentScene);
            }
            
            // Preload 'next' target if it's a character (not a UI button like 'btn-')
            if (scene.next && !scene.next.startsWith('btn-') && !this.cache.has(scene.next)) {
                this.createCharacter(scene.next, false, currentScene);
            }
            
            // Preload characters hidden inside the 'onClick' logic
            if (scene.onClick) {
                this.preloadFromOnClick(scene, currentScene);
            }
        });
    }

    /**
     * Parses the string representation of the onClick function to find `createCharacter` 
     * or `switchCharacter` calls and preload those assets.
     * @param {Object} scene - The scene object.
     * @param {number} currentScene - The current scene index.
     */
    static preloadFromOnClick(scene, currentScene) {
        const onClickStr = scene.onClick.toString();
        
        // Regex to find switchCharacter calls: switchCharacter("old", "NEW")
        const switchMatches = onClickStr.match(/switchCharacter\(["']([^"']+)["'],\s*["']([^"']+)["']/);
        if (switchMatches) {
            const [, , newId] = switchMatches;
            if (!this.cache.has(newId)) {
                this.createCharacter(newId, false, currentScene);
            }
        }
        
        // Regex to find createCharacter calls: createCharacter("NEW")
        const createMatches = onClickStr.match(/createCharacter\(["']([^"']+)["']/g);
        if (createMatches) {
            createMatches.forEach(match => {
                const id = match.match(/["']([^"']+)["']/)[1];
                if (!this.cache.has(id)) {
                    this.createCharacter(id, false, currentScene);
                }
            });
        }
    }

    /**
     * Helper to get the next N scenes from the configuration.
     * @param {number} currentScene 
     * @returns {Array} Array of scene objects.
     */
    static getFutureScenes(currentScene) {
        const future = [];
        for (let i = currentScene + 1; i <= currentScene + 2; i++) {
            if (scenes[i]) {
                future.push(scenes[i]);
            }
        }
        return future;
    }

    /**
     * Swaps one character for another (e.g., changing pose or expression).
     * Removes the old character and creates/shows the new one.
     * @param {string} currentId - ID of the character to remove.
     * @param {string} newId - ID of the character to show.
     * @param {number} currentScene - Current scene index.
     * @returns {HTMLElement} The new character element.
     */
    static switchCharacter(currentId, newId, currentScene) {
        if (!this.cache.has(newId)) {
            this.createCharacter(newId, false, currentScene);
        }
        
        if (currentId) this.removeCharacter(currentId);
        
        const newElement = this.createCharacter(newId, true, currentScene);
        
        // Trigger preload for the NEXT step
        this.preloadFullScene(currentScene + 1);
        
        return newElement;
    }

    /**
     * Hides a character element.
     * @param {string} id - Character ID.
     */
    static removeCharacter(id) {
        if (this.cache.has(id)) {
            const element = this.cache.get(id);
            element.div.classList.add('hidden');
            element.div.classList.remove('visible');
        }
    }

    /**
     * Garbage collection for the DOM. Removes elements that haven't been used recently
     * if the cache exceeds the maximum size.
     * @param {number} currentScene 
     */
    static cleanCache(currentScene) {
        if (this.cache.size <= this.maxCacheSize) return;
        
        const elementsToClean = [];
        const upcomingElements = this.getUpcomingElements(currentScene);
        
        this.cache.forEach((element, id) => {
            // Only clean if not upcoming and currently hidden
            if (!upcomingElements.has(id) && 
                element.div.classList.contains('hidden')) {
                elementsToClean.push({ id, element });
            }
        });
        
        // Sort by Last Used (asc) - Remove oldest first
        elementsToClean.sort((a, b) => a.element.lastUsed - b.element.lastUsed);
        
        while (this.cache.size > this.maxCacheSize && elementsToClean.length > 0) {
            const { id, element } = elementsToClean.shift();
            if (element.div.parentNode) {
                element.div.remove();
            }
            this.cache.delete(id);
            // console.log(`Cleaned ${id} from cache`);
        }
    }

    /**
     * Identifies characters needed for the immediate future to prevent them from being cleaned.
     * @param {number} currentScene 
     * @returns {Set<string>} Set of IDs.
     */
    static getUpcomingElements(currentScene) {
        const needed = new Set();
        for (let i = currentScene; i < currentScene + this.scenesToKeep; i++) {
            if (scenes[i]) {
                if (scenes[i].character) needed.add(scenes[i].character);
                if (scenes[i].next) needed.add(scenes[i].next);
            }
        }
        return needed;
    }

    /**
     * Initializes the manager and starts preloading the first scene.
     * @param {number} [currentScene=0] 
     */
    static initialize(currentScene = 0) {
        this.preloadFullScene(currentScene);
    }

    /**
     * Completely clears the cache and removes all managed elements from the DOM.
     * Useful for restarting the game or memory cleanup.
     */
    static clearFullCache() {
        this.cache.forEach((element) => {
            if (element.div.parentNode) {
                element.div.remove();
            }
        });
        this.cache.clear();
    }

    static debugCache() {
        console.log('=== CACHE STATUS ===');
        this.cache.forEach((element, id) => {
            const visible = element.div.classList.contains('visible');
            console.log(`${id}: used in scene ${element.lastUsed}, visible: ${visible}`);
        });
        console.log(`Total in cache: ${this.cache.size}`);
    }
}