# 🏛️ Explora el Tribunal: Etapa de Entrevista

> Una experiencia narrativa interactiva diseñada para guiar a niños y niñas a través del proceso de entrevista en un entorno judicial seguro y amigable.

![Estado](https://img.shields.io/badge/Estado-Completado-success?style=flat-square&logo=check)
![Versión](https://img.shields.io/badge/Versión-1.0.0-blue?style=flat-square)
![Licencia](https://img.shields.io/badge/Licencia-UADY%20%7C%20Reservada-lightgrey?style=flat-square)

---

## 📖 Descripción General

**Explora el Tribunal** es una aplicación web de tipo *Visual Novel* (Novela Visual) desarrollada con tecnologías web estándar modernas. Su objetivo principal es familiarizar a los menores con la **Sala de Entrevista** de la Fiscalía General del Estado de Yucatán, reduciendo la ansiedad y el estrés asociados al proceso judicial mediante la gamificación, la narrativa guiada y el refuerzo positivo.

El usuario es acompañado por personajes empáticos ("Tito", "Itzel" y la Psicóloga) a través de una historia lineal que incluye interacciones con objetos, diálogos simulados y actividades creativas.

---

## ✨ Características Principales

* **🎭 Narrativa Interactiva:** Sistema de flujo de escenas lineal con diálogos dinámicos y gestión de estados.
* **🔊 Sistema de Audio Inmersivo:**
    * Efectos de sonido sincronizados con el texto (*Typewriter sound effect*) para simular el habla fluida.
    * Música de fondo ambiental y efectos de interacción contextuales (comer, beber, escribir).
* **🎨 Minijuego de Arte:**
    * Módulo de dibujo integrado con **SVG** y **Canvas HTML5**.
    * Soporte para modos "Relleno" (Paint bucket) y "Línea libre" (Freehand drawing) con paleta de colores personalizada.
* **📱 Diseño Responsivo Avanzado:**
    * Layout fluido optimizado para múltiples relaciones de aspecto (16:9, 16:10, 4:3).
    * Compatibilidad total desde tablets pequeñas hasta monitores 4K y configuraciones Ultrawide.
* **⚡ Rendimiento Optimizado:**
    * Gestor de personajes (`CharacterManager`) con sistema de **caché inteligente** y recolección de basura del DOM.
    * Precarga de activos (Lazy Loading & Preloading) predictiva basada en el flujo de la historia.

---

## 🛠️ Tecnologías y Arquitectura

Este proyecto prescinde de frameworks pesados, optando por una arquitectura **Vanilla JS modular (ES6)** para garantizar la máxima ligereza, control y compatibilidad futura.

### Stack Tecnológico
* **HTML5 Semántico:** Estructura base, uso de etiquetas `<template>` y SVG inline.
* **CSS3 Moderno:** Arquitectura basada en variables (`:root`), Flexbox, Grid y un sistema complejo de Media Queries.
* **JavaScript (ES6 Modules):** Lógica de negocio desacoplada en módulos funcionales con JSDoc.

### Estructura de Módulos (JS)
* `main.js`: Punto de entrada (`entry point`) y orquestador del ciclo de vida de la aplicación.
* `characterManager.js`: Motor de renderizado. Gestiona la creación, caché y destrucción de elementos DOM para personajes.
* `scenes.js`: Base de datos de la narrativa (Script). Define el flujo, diálogos y eventos de cada paso.
* `sound.js`: Controlador global de audio y sintetizador de efectos de voz.
* `canvas.js`: Lógica del motor de dibujo y manipulación de contextos 2D.
* `dialogs.js`: Sistema de control para globos de texto y animaciones de tipado.
* `dom.js` & `game.js`: Utilidades para manipulación del DOM e inyección de UI.

---

## 📂 Estructura del Proyecto

```text
.
├── audio/                 # Recursos de audio (mp3, m4a)
├── css/
│   ├── base.css           # Normalización y estilos base
│   ├── characters.css     # Estilos y animaciones de personajes
│   ├── components.css     # Componentes UI (Header, Modales, Botones)
│   ├── game.css           # Estilos específicos del minijuego
│   ├── responsive.css     # Sistema de breakpoints y adaptabilidad
│   ├── style.css          # Manifiesto de estilos (Imports)
│   └── variables.css      # Tokens de diseño (Colores, Z-Index, Fuentes)
├── img/                   # Activos gráficos organizados por categoría
├── js/
│   ├── canvas.js
│   ├── characterManager.js
│   ├── dialogs.js
│   ├── dom.js
│   ├── game.js
│   ├── main.js
│   ├── objects.js
│   ├── scenes.js
│   └── sound.js
└── index.html             # Documento principal
````

-----

## 🚀 Instalación y Ejecución

Al utilizar **Módulos ES6** nativos (`import`/`export`), el proyecto requiere ser servido a través del protocolo HTTP/HTTPS para evitar errores de política de seguridad CORS (Cross-Origin Resource Sharing). **No funcionará abriendo directamente el archivo `index.html`**.

### Opción A: Visual Studio Code (Recomendada)

1.  Clona el repositorio o descarga el código.
2.  Instala la extensión **Live Server** de Ritwick Dey.
3.  Haz clic derecho en el archivo `index.html` y selecciona **"Open with Live Server"**.

### Opción B: Python

Si tienes Python instalado en tu sistema, puedes levantar un servidor local rápido:

```bash
# Navega a la carpeta raíz del proyecto
cd ruta/al/proyecto

# Ejecuta el servidor
python -m http.server 8000
```

Accede a `http://localhost:8000` en tu navegador.

### Opción C: Node.js (http-server)

```bash
npx http-server .
```

-----

## 🧠 Detalles de Implementación

### Sistema de Escenas

El flujo se controla mediante un array de objetos en `scenes.js`. Cada escena es una unidad lógica que define:

  * `character`: ID del personaje que habla.
  * `text`: Contenido del diálogo.
  * `next`: ID del elemento DOM que detonará el avance a la siguiente escena.
  * `onClick`: *Callback* asíncrono para ejecutar lógica compleja (cambios de personaje, inicio de minijuegos, etc.).

### Optimización de Recursos

El `CharacterManager` implementa una estrategia de **Pre-fetching predictivo**. Al entrar en una escena, el sistema analiza las siguientes 2 escenas futuras y comienza a cargar las imágenes necesarias en memoria silenciosamente. Esto elimina los tiempos de carga visibles ("parpadeos") cuando el usuario avanza en la historia.

-----

## 👥 Créditos

Desarrollado en colaboración para la **Universidad Autónoma de Yucatán (UADY)** y la **Fiscalía General del Estado de Yucatán**.

  * **Ingeniería Frontend & Arquitectura:** [Tu Nombre / Usuario]
  * **Diseño Gráfico & Arte:** [Nombre del Artista]
  * **Guion & Asesoría Psicológica:** [Equipo de Psicología]

-----

© Todos los derechos reservados. Prohibida su reproducción total o parcial sin autorización expresa.

```
```