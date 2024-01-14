// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // VARIABLES PARA EL MENÚ RESPONSIVO
  // Elementos del DOM para el menú responsivo
  const navegacion = document.querySelector("#navegacion");
  const menu_responsive = document.querySelector("#header__responsive");
  const menu__boton = document.querySelector("#header__btn");
  const carrito__container = document.querySelector("#carrito-container");

  // VARIABLES PARA VALIDACIÓN DEL FORMULARIO
  // Elementos del DOM para el formulario y mensajes
  const formulario = document.getElementById("miFormulario");
  const nombreInput = document.getElementById("nombreInput");
  const emailInput = document.getElementById("emailInput");
  const mensajeInput = document.getElementById("mensajeInput");
  const mensajeResultado = document.getElementById("mensajeResultado");

  // Agrega transición al menú (al abrir y al cerrar)

  menu__boton.addEventListener("click", (e) => {
    e.preventDefault();

    // Transición para mostrar/ocultar el menú
    menu_responsive.style.transition = "width 0.3s ease-in-out";

    if (
      menu_responsive.style.width === "0%" ||
      menu_responsive.style.width === ""
    ) {
      // Si el menú está oculto, mostrarlo y ajustar el ancho al 70%
      menu_responsive.style.width = "70%";
      navegacion.style.display = "flex";
    } else {
      // Si el menú está visible, ocultarlo y devolver el ancho a 0%
      menu_responsive.style.width = "0%";
      navegacion.style.display = "none";
    }

    // Transición para el fondo del menú responsivo
    menu_responsive.style.background =
      menu_responsive.style.width === "0%" ? "transparent" : "#f2f2f2";

    // Transición para el ícono del botón del menú
    menu__boton.style.transition = "transform 0.3s ease-in-out";
    menu__boton.classList.toggle("bx-menu-alt-right");
    menu__boton.classList.toggle("bx-x");
  });

  // Función para cerrar el menú
  function cerrarMenu() {
    navegacion.style.display = "none";
    menu_responsive.style.background = "transparent";
    menu__boton.classList.remove("bx-x");
    menu__boton.classList.add("bx-menu-alt-right");
  }

  // VALIDACIÓN DEL FORMULARIO
  // Escucha el evento de envío del formulario
  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Validación de campos del formulario
    if (
      nombreInput.value.trim() === "" ||
      emailInput.value.trim() === "" ||
      mensajeInput.value.trim() === ""
    ) {
      // Muestra un mensaje de error si algún campo está vacío
      mostrarMensaje("Por favor, complete todos los campos.", "error");
    } else {
      // Muestra un mensaje de éxito si el formulario se envía correctamente
      mostrarMensaje("¡Formulario enviado con éxito!", "exito");
    }
  });

  // Función para mostrar mensajes en la interfaz
  function mostrarMensaje(mensaje, tipo) {
    mensajeResultado.textContent = mensaje;
    mensajeResultado.className = tipo;

    // Oculta el mensaje después de 5 segundos
    setTimeout(function () {
      mensajeResultado.textContent = "";
      mensajeResultado.className = "";
    }, 5000);
  }
});
