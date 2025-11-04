function mostrar(id) {
  document.getElementById(id).classList.remove('hidden');
  document.getElementById(id).classList.add('visible');
}

function ocultar(id) {
  document.getElementById(id).classList.add('hidden');
  document.getElementById(id).classList.remove('visible');
}

let sonidoActivado = true;

document.querySelector('.btn-sonido').addEventListener('click', function() {
    const img = this.querySelector('img');

        sonidoActivado = !sonidoActivado;
    
    if (sonidoActivado) {
        img.src = "img/Varios/sound_on_3d.png";
        // Si se activa el sonido, reproducir música de fondo
        reproducirMusicaFondo();
    } else {
        img.src = "img/Varios/sound_off_3d.png";
        // Pausar música de fondo
        const musica = document.getElementById('audio-lobby');
        if (musica) {
            musica.pause();
        }
    }
});

function actualizarGlobo(escena, personaje, texto, onComplete) {
  const globo = document.getElementById(`globo-${personaje}`);
  const textoDiv = globo.querySelector(".globo-texto");
  const botonCerrar = globo.querySelector(".globo-cerrar");

  botonCerrar.classList.add('hidden');
  
  textoDiv.textContent = "";
  globo.classList.remove("hidden");

  if (escena.next && escena.next.startsWith('btn-')) {
    const botonContinuar = document.createElement('button');
    botonContinuar.className = 'btn';
    botonContinuar.id = escena.next;
    botonContinuar.textContent = 'Continuar';
    globo.appendChild(botonContinuar);
  }
  
  const elementoPersonaje = document.getElementById(escena.personaje);
  if (elementoPersonaje) {
    elementoPersonaje.classList.add('hablando');
  }
  
  const cabezaGlobo = globo.querySelector('img[class*="globo-imagen"]');
  if (cabezaGlobo) {
    cabezaGlobo.classList.add('cabeza-hablando');
  }
  
  // Usar el mismo sistema de tu amigo
  generarEfectoTyping(texto, textoDiv, personaje, 30)
    .then(() => {
      // Detener animaciones cuando termina
      if (elementoPersonaje) {
        elementoPersonaje.classList.remove('hablando');
      }
      if (cabezaGlobo) {
        cabezaGlobo.classList.remove('cabeza-hablando');
      }
      
      botonCerrar.classList.remove('hidden');
      
      if (onComplete) onComplete();
    });
}

// Nueva función igual a la de tu amigo
async function generarEfectoTyping(texto, elemento, characterName, velocidad = 30) {
    elemento.textContent = ""; 

    let wordCounter = 0; 
    const WORDS_PER_SOUND = 3; 

    // Determinar qué audio usar según el personaje
    const audioSrc = characterName === "tito" ? 
        document.getElementById('audio-tito').src : 
        document.getElementById('audio-itzel-psic').src;

    for (let i = 0; i < texto.length; i++) {
        elemento.textContent += texto[i];
        const prevChar = i > 0 ? texto[i - 1] : ' ';
        const isWordBoundary = prevChar === ' ' || /[.!?;:]/.test(prevChar);

        if (isWordBoundary && texto[i] !== ' ') {
            wordCounter++;
            if (wordCounter % WORDS_PER_SOUND === 0) {
                playFluidSpeechSound(audioSrc);
            }
        }
        await new Promise(resolve => setTimeout(resolve, velocidad));
    }
}

// Mantener tu función playFluidSpeechSound (que es igual a la de tu amigo)
function playFluidSpeechSound(url, volume = 0.7) {
    if (!sonidoActivado) return;
    
    const audio = new Audio(url); 
    const randomPitch = 0.8 + Math.random() * 0.4;
    
    audio.playbackRate = randomPitch; 
    audio.preservesPitch = false; 
    audio.volume = volume;
    audio.currentTime = 0;
    
    audio.play().catch(e => {
        console.error("Error al reproducir sonido fluido:", e);
    });
}


let escenaActual = 0;

function avanzarEscena() {
  const escena = escenas[escenaActual];
  if (!escena) return;
  if (!escena.personaje) return;
  resetGlobos();

  if (escenaActual == 1) {
    reproducirMusicaFondo();
  }

  document.querySelectorAll(".element").forEach(el => {
    el.onclick = null;
  });
  document.querySelectorAll(".element img").forEach(img => {
    img.classList.remove('animacion');
  });

  const btnDialogo = document.querySelector('.btn-dialogo');
  if (btnDialogo && escena.texto != null) {
    btnDialogo.classList.add('hidden');
  }

  if (escena.texto != null) {
    actualizarGlobo(escena, obtenerNombreGlobo(escena.personaje), escena.texto, function() {
      // Esto se ejecuta solo cuando termina de escribir
      const personajeElemento = document.getElementById(escena.next);
      if (escena.next.startsWith('btn-')) {
        document.getElementById(escena.next).classList.add('animacion');
      } else {
        const img = personajeElemento.querySelector('img');
        img.classList.add('animacion');
      }

      personajeElemento.onclick = async () => {
        if (escena.alClic) {
            const resultado = escena.alClic();
            // Si retorna una Promise, esperarla
            if (resultado instanceof Promise) {
              await resultado;
            }
            // Si no retorna Promise, continuar inmediatamente
          }
        escenaActual++;
        avanzarEscena();
      };
    });
  } else {
    ocultar(`globo-${obtenerNombreGlobo(escena.personaje)}`);
    // Si no hay texto, activar la animación inmediatamente
    const personajeElemento = document.getElementById(escena.next);
    const img = personajeElemento.querySelector('img');
    img.classList.add('animacion');

    personajeElemento.onclick = () => {
      if (escena.alClic) escena.alClic();
      escenaActual++;
      avanzarEscena();
    };
  }
}

function obtenerNombreGlobo(idPersonaje) {
  if (idPersonaje.startsWith("tito")) return "tito";
  if (idPersonaje.startsWith("psicologa")) return "psicologa";
  if (idPersonaje.startsWith("itzel")) return "itzel";
  return "tito";
}

function resetGlobos() {
    ["tito", "itzel", "psicologa"].forEach(nombre => { 
      const globo = document.getElementById(`globo-${nombre}`);
      if (globo) {
        globo.classList.remove("visible");
        globo.classList.add("hidden");
      }
  });
}

function cerrarGlobo(globo) {
    globo.classList.add("hidden");
    
    const btnDialogo = document.querySelector('.btn-dialogo');
    if (btnDialogo) {
        btnDialogo.classList.remove('hidden');
    }
}

document.getElementById("understand-btn").onclick = () => {
  ocultar("instructions-modal");
  mostrar("paleta-colores");
  mostrar("done-btn");
  mostrar("modo-container");
};

document.getElementById("done-btn").onclick = () => {
  ocultar("paleta-colores");
  ocultar("done-btn");
  ocultar("tito1");
  mostrar("tito4");
  ocultar("modo-container");
  escenaActual++;
  avanzarEscena();
};

document.querySelector('.btn-dialogo').addEventListener('click', function() {
  this.classList.add('hidden');
  avanzarEscena();
});

document.querySelector('.btn-galeria').addEventListener('click', abrirModalSala);

// Juego

const canvas = document.getElementById("canvas-colorear");
const ctx = canvas.getContext("2d");

const svgObject = document.getElementById("colorearSVG");

let colorSeleccionado = "black";
let modo = "relleno"; // por defecto estamos en modo relleno

// --- MODO SELECCIÓN ---
const toggleSwitch = document.getElementById("modoToggle");

toggleSwitch.addEventListener("click", () => {
  if (modo === "relleno") {
    // Cambiar a modo línea
    modo = "linea";
    toggleSwitch.classList.remove("modo-relleno");
    toggleSwitch.classList.add("modo-linea");
    canvas.style.pointerEvents = "auto"; // activa dibujo con línea
  } else {
    // Cambiar a modo relleno
    modo = "relleno";
    toggleSwitch.classList.remove("modo-linea");
    toggleSwitch.classList.add("modo-relleno");
    canvas.style.pointerEvents = "none"; // desactiva dibujo con línea
  }
});

// --- PALETA DE COLORES ---
document.querySelectorAll("#paleta-colores .element").forEach(el => {
  el.addEventListener("click", () => {
    colorSeleccionado = el.dataset.color;
  });
});

// --- LOGICA DE RELLENO SVG ---
svgObject.addEventListener("load", () => {
  const svgDoc = svgObject.contentDocument;
  const paths = svgDoc.querySelectorAll("[id]"); // solo los que tienen id

  paths.forEach(path => {
    path.style.cursor = "pointer";
    path.addEventListener("click", () => {
      if (modo === "relleno" && colorSeleccionado !== "eraser") {
        path.setAttribute("fill", colorSeleccionado);
      }
    });
  });
});

// --- LOGICA DE DIBUJO LIBRE ---
let pintando = false;
let lastX = 0, lastY = 0;

canvas.style.pointerEvents = "none";

canvas.addEventListener("mousedown", e => {
  if (modo !== "linea") return;
  pintando = true;
  const rect = canvas.getBoundingClientRect();
  // Ajustar por escala
  lastX = (e.clientX - rect.left) * (canvas.width / rect.width);
  lastY = (e.clientY - rect.top) * (canvas.height / rect.height);
});

canvas.addEventListener("mouseup", () => pintando = false);
canvas.addEventListener("mouseleave", () => pintando = false);

canvas.addEventListener("mousemove", e => {
  if (!pintando || modo !== "linea") return;
  
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);

  if (colorSeleccionado === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = 30; // Grosor borrador
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = colorSeleccionado;
    ctx.lineWidth = 7; // Grosor pincel
  }

  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
});

function reproducirMusicaFondo() {
  if (sonidoActivado) {
    const musica = document.getElementById('audio-lobby');
    if (musica) {
      musica.volume = 0.5;
      musica.loop = true;
      musica.play().catch(e => console.log('Error reproduciendo música de fondo:', e));
    }
  }
}

// Función para abrir el modal y cargar el contenido
function abrirModalSala() {
  const modal = document.getElementById('modal-sala');
  const modalContenido = modal.querySelector('.modal-contenido');
  
  // Limpiar contenido anterior
  modalContenido.innerHTML = '';
  
  // Crear y agregar el contenido dinámicamente
  modalContenido.innerHTML = `
    <button class="modal-cerrar" onclick="cerrarModal()">×</button>
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
  
  // Mostrar el modal
  modal.classList.remove('hidden');
}

// Las demás funciones igual
function cerrarModal() {
  const modal = document.getElementById('modal-sala');
  modal.classList.add('hidden');
}

// Cerrar modal al hacer clic fuera del contenido
document.getElementById('modal-sala').addEventListener('click', function(e) {
  if (e.target === this) {
    cerrarModal();
  }
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    cerrarModal();
  }
});


// Agua y pan

function inicializarObjetos() {
  // Cargar imágenes iniciales
  document.querySelector('#contenedor-pan img').src = 'img/Objetos/pan-entero.png';
  document.querySelector('#contenedor-agua img').src = 'img/Objetos/vaso-agua.png'; 
  document.querySelector('#contenedor-jarra img').src = 'img/Objetos/jarra-agua.png';
  document.querySelector('#contenedor-laptop img').src = 'img/Objetos/laptop.png';
  inicializarEventosComida();
}

function playEfectoSonido(idAudio) {
  const audio = document.getElementById(idAudio);
  if (audio) {
    audio.volume = 0.1;
    audio.currentTime = 0;
    audio.play().catch(e => console.log('Error sonido:', e));
  }
}

function mostrarLaptop() {
  document.querySelector('#contenedor-laptop img').src = 'img/Objetos/laptop.png';
  inicializarEventoLaptop();
}

function ocultarLaptop() {
  document.querySelector('#contenedor-laptop img').src = '';
}

function inicializarEventoLaptop() {
  document.querySelector('#contenedor-laptop img').onclick = function() {
    // Solo si tiene imagen
    if (!this.src) return;
    
    this.classList.add('animacion-laptop');
    setTimeout(() => this.classList.remove('animacion-laptop'), 1000);
    
    if (sonidoActivado) playEfectoSonido('audio-type');
  };
}

let vasoVacio = false;

function inicializarEventosComida() {
  // Pan
  document.querySelector('#contenedor-pan img').onclick = function() {
    this.classList.add('animacion-click');
    setTimeout(() => this.classList.remove('animacion-click'), 400);
    
    if (sonidoActivado) playEfectoSonido('audio-bite');
    
    if (this.src.includes('pan-entero.png')) {
      this.src = 'img/Objetos/pan-mordido.png';
    } else if (this.src.includes('pan-mordido.png')) {
      this.src = 'img/Objetos/pan-terminado.png';
    } else if (this.src.includes('pan-terminado.png')) {
      this.src = ''; // Quitar pan
    }
  };
  
  // Vaso de agua
  document.querySelector('#contenedor-agua img').onclick = function() {
    this.classList.add('animacion-click');
    setTimeout(() => this.classList.remove('animacion-click'), 400);
    
    if(this.src.includes('vaso-agua.png')) {
      if (sonidoActivado) playEfectoSonido('audio-swallow');
    }
    
    if (this.src.includes('vaso-agua.png')) {
      this.src = 'img/Objetos/vaso-vacio.png';
      vasoVacio = true;
    }
    // El vaso vacío se queda, no se quita
  };
  
  // Jarra
  document.querySelector('#contenedor-jarra img').onclick = function() {
    this.classList.add('animacion-click');
    setTimeout(() => this.classList.remove('animacion-click'), 400);
    
    if(vasoVacio) {
      if (sonidoActivado) playEfectoSonido('audio-refill');
    }
    
    // Si el vaso está vacío, rellenarlo
    const vasoImg = document.querySelector('#contenedor-agua img');
    if (vasoImg.src.includes('vaso-vacio.png')) {
      vasoImg.src = 'img/Objetos/vaso-agua.png';
      vasoVacio = false;
    }
  };
}

function limpiarObjetosComida() {
  document.querySelector('#contenedor-pan img').src = '';
  document.querySelector('#contenedor-agua img').src = '';
  document.querySelector('#contenedor-jarra img').src = '';
}

// Iniciar 

document.addEventListener("DOMContentLoaded", () => {
  avanzarEscena();
});