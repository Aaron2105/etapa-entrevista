// objetos.js
import { sonidoActivado, playEfectoSonido } from './sonido.js';

let vasoVacio = false;

export function inicializarObjetos() {
  document.querySelector('#contenedor-pan img').src = 'img/Objetos/pan-entero.png';
  document.querySelector('#contenedor-agua img').src = 'img/Objetos/vaso-agua.png'; 
  document.querySelector('#contenedor-jarra img').src = 'img/Objetos/jarra-agua.png';
  inicializarEventosComida();
}

export function inicializarLaptop() {
  document.querySelector('#contenedor-laptop img').src = 'img/Objetos/laptop.png';
  inicializarEventoLaptop();
}

export function ocultarLaptop() {
  document.querySelector('#contenedor-laptop img').src = '';
}

function inicializarEventoLaptop() {
  const laptopImg = document.querySelector('#contenedor-laptop img');
  laptopImg.onclick = function() {
    if (!this.src) return;
    this.classList.add('animacion-laptop');
    setTimeout(() => this.classList.remove('animacion-laptop'), 1000);
    if (sonidoActivado) playEfectoSonido('audio-type');
  };
}

function inicializarEventosComida() {
  const panImg = document.querySelector('#contenedor-pan img');
  const vasoImg = document.querySelector('#contenedor-agua img');
  const jarraImg = document.querySelector('#contenedor-jarra img');

  panImg.onclick = () => clickPan(panImg);
  vasoImg.onclick = () => clickVaso(vasoImg);
  jarraImg.onclick = () => clickJarra(vasoImg, jarraImg);
}

function clickPan(panImg) {
  panImg.classList.add('animacion-click');
  setTimeout(() => panImg.classList.remove('animacion-click'), 400);
  if (sonidoActivado) playEfectoSonido('audio-bite');

  if (panImg.src.includes('pan-entero.png')) panImg.src = 'img/Objetos/pan-mordido.png';
  else if (panImg.src.includes('pan-mordido.png')) panImg.src = 'img/Objetos/pan-terminado.png';
  else panImg.src = '';
}

function clickVaso(vasoImg) {
  vasoImg.classList.add('animacion-click');
  setTimeout(() => vasoImg.classList.remove('animacion-click'), 400);
  if (vasoImg.src.includes('vaso-agua.png') && sonidoActivado) playEfectoSonido('audio-swallow');

  if (vasoImg.src.includes('vaso-agua.png')) {
    vasoImg.src = 'img/Objetos/vaso-vacio.png';
    vasoVacio = true;
  }
}

function clickJarra(vasoImg, jarraImg) {
  jarraImg.classList.add('animacion-click');
  setTimeout(() => jarraImg.classList.remove('animacion-click'), 400);

  if (vasoVacio && sonidoActivado) playEfectoSonido('audio-refill');

  if (vasoImg.src.includes('vaso-vacio.png')) {
    vasoImg.src = 'img/Objetos/vaso-agua.png';
    vasoVacio = false;
  }
}

export function limpiarObjetosComida() {
  document.querySelector('#contenedor-pan img').src = '';
  document.querySelector('#contenedor-agua img').src = '';
  document.querySelector('#contenedor-jarra img').src = '';
}
