import { escenas } from './escenas.js';

export class CharacterManager {
    static personajesConfig = {
        // Tito
        'tito1': { 
            src: 'img/Tito/Tito_1.png', 
            clases: ['element', 'personaje', 'sombra', 'visible'],
            alt: 'Tito 1'
        },
        'tito2': { 
            src: 'img/Tito/Tito_2.png', 
            clases: ['element', 'personaje', 'sombra', 'visible'],
            alt: 'Tito 2'
        },
        'tito3': { 
            src: 'img/Tito/Tito_3.png', 
            clases: ['element', 'personaje', 'sombra', 'visible'],
            alt: 'Tito 3'
        },
        'tito4': { 
            src: 'img/Tito/Tito_4.png', 
            clases: ['element', 'personaje', 'sombra', 'visible'],
            alt: 'Tito 4'
        },
        
        // Psicólogas
        'psicologa1': { 
            src: 'img/Psicologa/Psicologa_1.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Psicóloga 1'
        },
        'psicologa2': { 
            src: 'img/Psicologa/Psicologa_2.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Psicóloga 2'
        },
        'psicologa3': { 
            src: 'img/Psicologa/Psicologa_3.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Psicóloga 3'
        },
        'psicologa4': { 
            src: 'img/Psicologa/Psicologa_4.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Psicóloga 4'
        },
        'psicologa5': { 
            src: 'img/Psicologa/Psicologa_5.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Psicóloga 5'
        },
        'psicologa6': { 
            src: 'img/Psicologa/Psicologa_6.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Psicóloga 6'
        },
        
        // Itzel
        'itzel1': { 
            src: 'img/Itzel/Itzel_1.png', 
            clases: ['element', 'personaje', 'sombra', 'visible'],
            alt: 'Itzel 1'
        },
        'itzel2': { 
            src: 'img/Itzel/Itzel_2.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Itzel 2'
        },
        'itzel3': { 
            src: 'img/Itzel/Itzel_3.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Itzel 3'
        },
        'itzel4': { 
            src: 'img/Itzel/Itzel_4.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Itzel 4'
        },
        'itzel5': { 
            src: 'img/Itzel/Itzel_5.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Itzel 5'
        },
        'itzel6': { 
            src: 'img/Itzel/Itzel_6.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Itzel 6'
        },
        'itzel7': { 
            src: 'img/Itzel/Itzel_7.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Itzel 7'
        },
        'itzel8': { 
            src: 'img/Itzel/Itzel_8.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Itzel 8'
        },
        'itzel9': { 
            src: 'img/Itzel/Itzel_9.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Itzel 9'
        },
        
        // Extras
        'abogado': { 
            src: 'img/Extras/Abogado.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Abogado'
        },
        'abogada': { 
            src: 'img/Extras/Abogada.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Abogada'
        },
        'psicologo': { 
            src: 'img/Extras/Psicologo.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Psicólogo'
        },
        
        // Recuerdos y elementos especiales
        'recuerdo1': { 
            src: 'img/Varios/Recuerdo_1.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Recuerdo 1'
        },
        'recuerdo2': { 
            src: 'img/Varios/Recuerdo_2.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Recuerdo 2'
        },
        'nube-pensamiento': { 
            src: 'img/Varios/Nube_pensamiento.png', 
            clases: ['element', 'personaje', 'visible'],
            alt: 'Nube de pensamiento'
        }
    };

    static cache = new Map();
    static maxCacheSize = 10;
    static escenasParaMantener = 2;

    static crearPersonaje(id, mostrar = true, escenaActual = 0) {
        const config = this.personajesConfig[id];
        if (!config) {
            console.warn(`Configuración no encontrada para personaje: ${id}`);
            return null;
        }
        
        if (this.cache.has(id)) {
            const elemento = this.cache.get(id);
            elemento.lastUsed = escenaActual;
            
            if (mostrar) {
                elemento.div.classList.remove('hidden');
                elemento.div.classList.add('visible');
            }
            return elemento.div;
        }
        
        const div = document.createElement('div');
        div.id = id;
        div.className = config.clases.join(' ');
        
        if (!mostrar) {
            div.classList.add('hidden');
            div.classList.remove('visible');
        }
        
        const img = document.createElement('img');
        img.src = config.src;
        img.alt = config.alt;
        
        this.preloadImage(config.src);
        
        div.appendChild(img);
        document.querySelector('.fondo-amarillo').appendChild(div);
        
        this.cache.set(id, {
            div: div,
            lastUsed: escenaActual,
            created: Date.now()
        });
        
        this.limpiarCache(escenaActual);
        
        return div;
    }

    static preloadImage(src) {
        const img = new Image();
        img.src = src;
    }

    static precargarEscenaCompleta(escenaActual) {
        const escenasFuturas = this.obtenerEscenasFuturas(escenaActual);
        
        escenasFuturas.forEach(escena => {
            if (escena.personaje && !this.cache.has(escena.personaje)) {
                this.crearPersonaje(escena.personaje, false, escenaActual);
            }
            
            if (escena.next && !escena.next.startsWith('btn-') && !this.cache.has(escena.next)) {
                this.crearPersonaje(escena.next, false, escenaActual);
            }
            
            if (escena.alClic) {
                this.preloadFromAlClic(escena, escenaActual);
            }
        });
    }

    static preloadFromAlClic(escena, escenaActual) {
        const alClicStr = escena.alClic.toString();
        
        const cambiarMatches = alClicStr.match(/cambiarPersonaje\(["']([^"']+)["'],\s*["']([^"']+)["']/);
        if (cambiarMatches) {
            const [, idActual, idNuevo] = cambiarMatches;
            if (!this.cache.has(idNuevo)) {
                this.crearPersonaje(idNuevo, false, escenaActual);
            }
        }
        
        const crearMatches = alClicStr.match(/crearPersonaje\(["']([^"']+)["']/g);
        if (crearMatches) {
            crearMatches.forEach(match => {
                const id = match.match(/["']([^"']+)["']/)[1];
                if (!this.cache.has(id)) {
                    this.crearPersonaje(id, false, escenaActual);
                }
            });
        }
    }

    static obtenerEscenasFuturas(escenaActual) {
        const futuras = [];
        for (let i = escenaActual + 1; i <= escenaActual + 2; i++) {
            if (escenas[i]) {
                futuras.push(escenas[i]);
            }
        }
        return futuras;
    }

    static cambiarPersonaje(idActual, idNuevo, escenaActual) {
        if (!this.cache.has(idNuevo)) {
            this.crearPersonaje(idNuevo, false, escenaActual);
        }
        
        if (idActual) this.eliminarPersonaje(idActual);
        
        const nuevoElemento = this.crearPersonaje(idNuevo, true, escenaActual);
        
        this.precargarEscenaCompleta(escenaActual + 1);
        
        return nuevoElemento;
    }

    static eliminarPersonaje(id) {
        if (this.cache.has(id)) {
            const elemento = this.cache.get(id);
            elemento.div.classList.add('hidden');
            elemento.div.classList.remove('visible');
        }
    }

    static limpiarCache(escenaActual) {
        if (this.cache.size <= this.maxCacheSize) return;
        
        const elementosParaLimpiar = [];
        const elementosProximos = this.obtenerElementosProximos(escenaActual);
        
        this.cache.forEach((elemento, id) => {
            if (!elementosProximos.has(id) && 
                elemento.div.classList.contains('hidden')) {
                elementosParaLimpiar.push({ id, elemento });
            }
        });
        
        elementosParaLimpiar.sort((a, b) => a.elemento.lastUsed - b.elemento.lastUsed);
        
        while (this.cache.size > this.maxCacheSize && elementosParaLimpiar.length > 0) {
            const { id, elemento } = elementosParaLimpiar.shift();
            if (elemento.div.parentNode) {
                elemento.div.remove();
            }
            this.cache.delete(id);
        }
    }

    static obtenerElementosProximos(escenaActual) {
        const necesarios = new Set();
        for (let i = escenaActual; i < escenaActual + this.escenasParaMantener; i++) {
            if (escenas[i]) {
                if (escenas[i].personaje) necesarios.add(escenas[i].personaje);
                if (escenas[i].next) necesarios.add(escenas[i].next);
            }
        }
        return necesarios;
    }

    static inicializar(escenaActual = 0) {
        this.precargarEscenaCompleta(escenaActual);
    }

    static limpiarCacheCompleto() {
        this.cache.forEach((elemento, id) => {
            if (elemento.div.parentNode) {
                elemento.div.remove();
            }
        });
        this.cache.clear();
    }

    static debugCache() {
        console.log('=== CACHE STATUS ===');
        this.cache.forEach((elemento, id) => {
            const visible = elemento.div.classList.contains('visible');
            console.log(`${id}: usado en escena ${elemento.lastUsed}, visible: ${visible}`);
        });
        console.log(`Total en cache: ${this.cache.size}`);
    }
}