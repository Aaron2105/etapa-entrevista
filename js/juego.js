import { mostrar, ocultar } from './dom.js';
import { CharacterManager } from './characterManager.js';


export function crearJuegoDeDibujo() {
  const modoToggle = document.getElementById('modoToggle');
  const paletaContainer = document.getElementById('paleta-colores');
  const doneBtn = document.getElementById('done-btn');
  const instructionsModal = document.getElementById('instructions-modal');

  modoToggle.innerHTML = `
      <div class="toggle-slider"></div>
      <div class="toggle-images">
          <div class="toggle-img">
              <img src="img/Juego/btn_relleno.svg" width="40" height="8" alt="Relleno">
          </div>
          <div class="toggle-img">
              <img src="img/Juego/btn_linea.svg" width="8" height="8" alt="Línea">
          </div>
      </div>
  `;

  paletaContainer.innerHTML = `
    <div class="element" id="color-verde" data-color="#5af542">
      <img src="img/Juego/Color_verde.png" alt="Color verde">
    </div>
    <div class="element" id="color-verde-fuerte" data-color="#1b6e19">
      <img src="img/Juego/Color_verde_fuerte.png" alt="Color verde fuerte">
    </div>
    <div class="element" id="color-amarillo" data-color="yellow">
      <img src="img/Juego/Color_amarillo.png" alt="Color amarillo">
    </div>
    <div class="element" id="color-naranja" data-color="orange">
      <img src="img/Juego/Color_naranja.png" alt="Color naranja">
    </div>
    <div class="element" id="color-rojo" data-color="red">
      <img src="img/Juego/Color_rojo.png" alt="Color rojo">
    </div>
    <div class="element" id="color-morado" data-color="purple">
      <img src="img/Juego/Color_morado.png" alt="Color morado">
    </div>
    <div class="element" id="color-rosa" data-color="#d971ff">
      <img src="img/Juego/Color_rosa.png" alt="Color rosa">
    </div>
    <div class="element" id="color-azul" data-color="#2933f0">
      <img src="img/Juego/Color_azul.png" alt="Color azul">
    </div>
    <div class="element" id="color-azul-claro" data-color="#87CEEB">
      <img src="img/Juego/Color_azul_claro.png" alt="Color azul claro">
    </div>
    <div class="element" id="color-cafe" data-color="#8B4513">
      <img src="img/Juego/Color_cafe.png" alt="Color cafe">
    </div>
    <div class="element" id="color-negro" data-color="black">
      <img src="img/Juego/Color_negro.png" alt="Color negro">
    </div>
    <div class="element" id="color-gris" data-color="#D3D3D3">
      <img src="img/Juego/Color_gris.png" alt="Color gris">
    </div>
    <div class="element" id="color-blanco" data-color="#FFFFFF">
      <img src="img/Juego/Color_blanco.png" alt="Color blanco">
    </div>
    <div class="element" id="color-carne" data-color="#FFE0BD">
      <img src="img/Juego/Color_carne.png" alt="Color carne">
    </div>
    <div class="element" id="borrador" data-color="eraser">
      <img src="img/Juego/Borrador.png" alt="Borrador">
    </div>
  `;

  doneBtn.textContent = 'He terminado';

  instructionsModal.innerHTML = `
    <div class="modal-content">
      <h2><strong>Instrucciones</strong></h2>
      <div class="tito-face"><img src="img/Tito/Cabeza_Tito.png"></div>
      <p>Haz clic en un color y luego en una parte del dibujo para pintarla</p>
      <button class="btn" id="understand-btn">Entendido</button>
    </div>
  `;
}

export async function asignarEventosJuegoDibujo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const understandBtn = document.getElementById("understand-btn");
      if (understandBtn) {
        understandBtn.onclick = () => {
          ocultar("instructions-modal");
          mostrar("paleta-colores");
          mostrar("done-btn");
          mostrar("modo-container");
        };
      }
      
      resolve();
    }, 0);
  });
}
