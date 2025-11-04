// canvas.js
export let colorSeleccionado = "black";
export let modo = "relleno"; // "relleno" o "linea"

let pintando = false;
let lastX = 0, lastY = 0;
let canvas, ctx, svgObject;

export function initCanvas() {
  canvas = document.getElementById("canvas-colorear");
  ctx = canvas.getContext("2d");
  svgObject = document.getElementById("colorearSVG");

  // Modo por defecto: relleno
  canvas.style.pointerEvents = "none";

  initToggleModo();
  initPaletaColores();
  initSVGFill();
  initDibujoLibre();
}

function initToggleModo() {
  const toggleSwitch = document.getElementById("modoToggle");
  toggleSwitch.addEventListener("click", () => {
    if (modo === "relleno") {
      modo = "linea";
      toggleSwitch.classList.remove("modo-relleno");
      toggleSwitch.classList.add("modo-linea");
      canvas.style.pointerEvents = "auto";
    } else {
      modo = "relleno";
      toggleSwitch.classList.remove("modo-linea");
      toggleSwitch.classList.add("modo-relleno");
      canvas.style.pointerEvents = "none";
    }
  });
}

function initPaletaColores() {
  document.querySelectorAll("#paleta-colores .element").forEach(el => {
    el.addEventListener("click", () => {
      colorSeleccionado = el.dataset.color;
    });
  });
}

function initSVGFill() {
  svgObject.addEventListener("load", () => {
    const svgDoc = svgObject.contentDocument;
    const paths = svgDoc.querySelectorAll("[id]");
    paths.forEach(path => {
      path.style.cursor = "pointer";
      path.addEventListener("click", () => {
        if (modo === "relleno" && colorSeleccionado !== "eraser") {
          path.setAttribute("fill", colorSeleccionado);
        }
      });
    });
  });
}

function initDibujoLibre() {
  canvas.addEventListener("mousedown", e => {
    if (modo !== "linea") return;
    pintando = true;
    const rect = canvas.getBoundingClientRect();
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
      ctx.lineWidth = 30;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = colorSeleccionado;
      ctx.lineWidth = 7;
    }

    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
  });
}
