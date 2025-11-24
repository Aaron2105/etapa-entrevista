/**
 * @module CanvasManager
 * @description Manages the interactive coloring game, including SVG filling and freehand canvas drawing.
 */

/**
 * The currently selected color for drawing or filling.
 * @type {string}
 */
export let selectedColor = "black";

/**
 * The current interaction mode.
 * @type {'fill'|'line'} - 'fill' for SVG bucket fill, 'line' for canvas drawing.
 */
export let mode = "fill";

// Internal state
let isDrawing = false;
let lastX = 0, lastY = 0;
let canvas, ctx, svgObject;

/**
 * Initializes the canvas, context, and attaches event listeners for drawing modes.
 * Sets initial pointer events to none (fill mode).
 */
export function initCanvas() {
  canvas = document.getElementById("canvas-colorear");
  ctx = canvas.getContext("2d");
  svgObject = document.getElementById("colorearSVG");

  // Initially in fill mode, canvas interactions disabled to allow clicking through to SVG
  canvas.style.pointerEvents = "none";

  initModeToggle();
  initSVGFill();
  initFreeDrawing();
}

/**
 * Initializes the toggle switch between 'Fill' and 'Line' modes.
 * Updates the global 'mode' state and toggles CSS classes.
 */
export function initModeToggle() {
  const toggleSwitch = document.getElementById("modoToggle");
  if (!toggleSwitch) return;

  toggleSwitch.addEventListener("click", () => {
    if (mode === "fill") {
      // Switch to Line Mode
      mode = "line";
      toggleSwitch.classList.remove("modo-relleno"); // Keep original CSS class for now
      toggleSwitch.classList.add("modo-linea");
      canvas.style.pointerEvents = "auto"; // Enable canvas for drawing
    } else {
      // Switch to Fill Mode
      mode = "fill";
      toggleSwitch.classList.remove("modo-linea");
      toggleSwitch.classList.add("modo-relleno");
      canvas.style.pointerEvents = "none"; // Disable canvas to click SVG underneath
    }
  });
}

/**
 * Initializes the color palette selection events.
 * Updates 'selectedColor' when a palette element is clicked.
 */
export function initColorPalette() {
  document.querySelectorAll("#paleta-colores .element").forEach(el => {
    el.addEventListener("click", () => {
      selectedColor = el.dataset.color;
    });
  });

  initSVGFill();
}

/**
 * Initializes the SVG logic to allow clicking paths to fill them with color.
 * Waits for the SVG object to load its content document.
 */
export function initSVGFill() {
  if (!svgObject) return;

  svgObject.addEventListener("load", () => {
    const svgDoc = svgObject.contentDocument;
    if (!svgDoc) return;

    // Select all elements with an ID inside the SVG (usually the fillable areas)
    const paths = svgDoc.querySelectorAll("[id]");
    paths.forEach(path => {
      path.style.cursor = "pointer";
      path.addEventListener("click", () => {
        // Only fill if in fill mode and not using the eraser
        if (mode === "fill" && selectedColor !== "eraser") {
          path.setAttribute("fill", selectedColor);
        }
      });
    });
  });
}

/**
 * Initializes free-hand drawing logic on the canvas (for 'line' mode).
 * Handles mousedown, mouseup, and mousemove events to draw lines.
 */
export function initFreeDrawing() {
  if (!canvas) return;

  canvas.addEventListener("mousedown", e => {
    if (mode !== "line") return;
    isDrawing = true;
    
    const rect = canvas.getBoundingClientRect();
    // Calculate correct coordinates considering canvas scaling
    lastX = (e.clientX - rect.left) * (canvas.width / rect.width);
    lastY = (e.clientY - rect.top) * (canvas.height / rect.height);
  });

  const stopDrawing = () => isDrawing = false;
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);

  canvas.addEventListener("mousemove", e => {
    if (!isDrawing || mode !== "line") return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    if (selectedColor === "eraser") {
      // Eraser logic: remove pixels
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)"; // Color doesn't matter for destination-out
      ctx.lineWidth = 30;
    } else {
      // Drawing logic: add pixels
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = selectedColor;
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