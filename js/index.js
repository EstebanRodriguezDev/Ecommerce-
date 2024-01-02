// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // VARIABLES PARA EL MENÚ RESPONSIVO
  // Elementos del DOM para el menú responsivo
  const navegacion = document.querySelector("#navegacion");
  const menu_responsive = document.querySelector("#header__responsive");
  const menu__boton = document.querySelector("#header__btn");

  // VARIABLES PARA VALIDACIÓN DEL FORMULARIO
  // Elementos del DOM para el formulario y mensajes
  const formulario = document.getElementById("miFormulario");
  const nombreInput = document.getElementById("nombreInput");
  const emailInput = document.getElementById("emailInput");
  const mensajeInput = document.getElementById("mensajeInput");
  const mensajeResultado = document.getElementById("mensajeResultado");

  // Función para gestionar el scroll y desaparecer el botón del menú en ciertos pixeles
  const posicionDesaparicion = 600;
  function gestionarScroll() {
    const posicionScroll = window.scrollY || window.pageYOffset;
    if (posicionScroll >= posicionDesaparicion) {
      menu__boton.style.display = "none";
    } else {
      menu__boton.style.display = "flex";
    }
  }
  // Escucha el evento de scroll y llama a la función de gestión
  window.addEventListener("scroll", gestionarScroll);

  // Agrega transición al menú (al abrir y al cerrar)
  menu__boton.addEventListener("click", () => {
    // Transición para mostrar/ocultar el menú
    navegacion.style.transition = "display 0.3s ease-in-out";
    navegacion.style.display =
      navegacion.style.display === "none" || navegacion.style.display === ""
        ? "flex"
        : "none";

    // Transición para el fondo del menú responsivo
    menu_responsive.style.transition = "background 0.3s ease-in-out";
    menu_responsive.style.background =
      navegacion.style.display === "none" ? "transparent" : "#f2f2f2";

    // Transición para el ícono del botón del menú
    menu__boton.style.transition = "transform 0.3s ease-in-out";
    menu__boton.classList.toggle("bx-menu-alt-right");
    menu__boton.classList.toggle("bx-x");
  });

  // Cierra el menú si se hace clic fuera de él
  document.addEventListener("click", (e) => {
    if (
      navegacion.style.display === "flex" &&
      !navegacion.contains(e.target) &&
      e.target !== menu__boton
    ) {
      cerrarMenu();
    }
  });

  // Función para cerrar el menú
  function cerrarMenu() {
    navegacion.style.display = "none";
    menu_responsive.style.background = "transparent";
    menu__boton.classList.remove("bx-x");
    menu__boton.classList.add("bx-menu-alt-right");
  }

  // Cierra el menú al hacer clic en los enlaces, excepto en el último (especial)
  const enlacesMenu = document.querySelectorAll(".navegacion__enlace");
  enlacesMenu.forEach((enlace, index) => {
    enlace.addEventListener("click", function (e) {
      if (index === enlacesMenu.length - 1) {
        return false;
      }
      cerrarMenu();
    });
  });

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
