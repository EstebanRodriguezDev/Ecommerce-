// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // RUTA DEL ARCHIVO JSON
  // Ruta del archivo JSON que contiene la información de los instrumentos
  const rutaJson = "../data/base_datos.json";

  // ELEMENTOS DEL DOM
  // Elementos del DOM para mostrar instrumentos, categorías y carrito
  const contenedorInstrumentos = document.getElementById(
    "productos__contenedor"
  );
  const selectCategorias = document.getElementById("categorias");
  const carritoContainer = document.getElementById("carrito-container");

  // FUNCIÓN PARA CARGAR Y RENDERIZAR INSTRUMENTOS
  function renderizarInstrumentos(instrumentos) {
    // Limpiar el contenedor antes de agregar nuevos elementos
    contenedorInstrumentos.innerHTML = "";

    // Iterar sobre la lista de instrumentos y crear elementos HTML para cada uno
    instrumentos.forEach((instrumento) => {
      const elementoInstrumento = document.createElement("div");
      elementoInstrumento.classList.add("producto");

      // Crear el HTML para cada instrumento
      elementoInstrumento.innerHTML = `
        <img class="producto__imagen" src="${instrumento.imagen}" alt="imagen ${instrumento.marca} ${instrumento.modelo}">
        <div class="producto__contenido">
          <h3 class="producto__nombre">${instrumento.marca} ${instrumento.modelo}</h3>
          <p class="producto__descripcion">${instrumento.descripcion}</p>
          <p class="producto__precio">${instrumento.precio}</p>
          <a class="producto__enlace agregar-carrito" data-id="${instrumento.id}">Agregar al Carrito</a>
        </div>
      `;

      // Agregar el elemento al contenedor de instrumentos
      contenedorInstrumentos.appendChild(elementoInstrumento);
    });
  }

  // FUNCIÓN PARA CARGAR Y RENDERIZAR PRODUCTOS SEGÚN LA CATEGORÍA SELECCIONADA
  function cargarYRenderizarProductos(categoria) {
    // Realizar una solicitud fetch para obtener los datos del archivo JSON
    fetch(rutaJson)
      .then((response) => response.json())
      .then((data) => {
        let instrumentos = [];

        // Filtrar instrumentos según la categoría seleccionada
        if (categoria === "guitarrasElectricas") {
          instrumentos = data.guitarrasElectricas;
        } else if (categoria === "guitarrasClasicas") {
          instrumentos = data.guitarrasClasicas;
        } else if (categoria === "baterias") {
          instrumentos = data.baterias;
        } else {
          // Si la categoría seleccionada es "Todos", mostrar todos los productos
          instrumentos = [
            ...data.guitarrasElectricas,
            ...data.guitarrasClasicas,
            ...data.baterias,
          ];
        }

        // Llamar a la función para renderizar los instrumentos
        renderizarInstrumentos(instrumentos);
      })
      .catch((error) =>
        console.error("Error al cargar y renderizar productos", error)
      );
  }

  // CARGAR Y RENDERIZAR TODOS LOS PRODUCTOS AL PRINCIPIO
  cargarYRenderizarProductos("todos");

  // MANEJAR CAMBIOS EN EL SELECT DE CATEGORÍAS
  selectCategorias.addEventListener("change", function () {
    // Obtener el valor seleccionado en el select
    const categoriaSeleccionada = selectCategorias.value;

    // Cargar y renderizar productos según la categoría seleccionada
    cargarYRenderizarProductos(categoriaSeleccionada);
  });

  // CARRITO DE COMPRAS
  // Obtener el carrito almacenado en localStorage o inicializarlo como un array vacío
  const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

  // FUNCIÓN PARA CARGAR Y RENDERIZAR PRODUCTOS EN EL CARRITO DESDE LOCALSTORAGE
  function cargarYRenderizarCarrito() {
    // Limpiar el contenedor del carrito antes de agregar nuevos elementos
    carritoContainer.innerHTML = "";

    // Iterar sobre la lista de productos en el carrito y crear elementos HTML para cada uno
    carritoGuardado.forEach((producto) => {
      const elementoProductoCarrito = document.createElement("li");
      const elementoNombreProducto = document.createElement("li");
      const elementoPrecioProducto = document.createElement("li");
      const elementoEliminarProducto = document.createElement("span");

      elementoProductoCarrito.classList.add("carrito__elemento");
      elementoNombreProducto.classList.add("carrito__producto");
      elementoPrecioProducto.classList.add("carrito__precio");
      elementoEliminarProducto.classList.add("eliminar-producto");

      // Asignar contenido a los elementos del carrito
      elementoNombreProducto.textContent = producto.nombre;
      elementoPrecioProducto.textContent = `Precio: ${producto.precio}`;
      elementoEliminarProducto.textContent = "X";

      // Agregar elementos al contenedor del carrito
      elementoProductoCarrito.appendChild(elementoNombreProducto);
      elementoProductoCarrito.appendChild(elementoPrecioProducto);
      elementoProductoCarrito.appendChild(elementoEliminarProducto);
      carritoContainer.appendChild(elementoProductoCarrito);
    });
  }

  // CARGAR Y RENDERIZAR PRODUCTOS EN EL CARRITO AL PRINCIPIO
  cargarYRenderizarCarrito();

  // MANEJAR CLICS EN EL BOTÓN "AGREGAR AL CARRITO"
  contenedorInstrumentos.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("agregar-carrito")) {
      // Obtener información del producto desde el DOM
      const productoId = target.getAttribute("data-id");
      const productoNombre =
        target.parentElement.querySelector(".producto__nombre").textContent;
      const productoPrecio =
        target.parentElement.querySelector(".producto__precio").textContent;

      // Verificar si el producto ya está en el carrito
      const productoExistente = carritoGuardado.find(
        (producto) => producto.nombre === productoNombre
      );

      // Si el producto ya está en el carrito, no hacer nada
      if (productoExistente) {
        return;
      }

      // Crear un nuevo producto y agregarlo al carrito
      const nuevoProducto = {
        nombre: productoNombre,
        precio: productoPrecio,
      };

      // Agregar el nuevo producto al array del carrito
      carritoGuardado.push(nuevoProducto);

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem("carrito", JSON.stringify(carritoGuardado));

      // Llamar a la función para cargar y renderizar el carrito
      cargarYRenderizarCarrito();
    }
  });

  // MANEJAR CLICS EN EL BOTÓN "ELIMINAR" DENTRO DEL CARRITO
  carritoContainer.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("eliminar-producto")) {
      // Obtener el elemento padre (li) que contiene el producto
      const elementoProductoCarrito = target.closest(".carrito__elemento");

      // Obtener el nombre del producto desde el carrito
      const productoNombre =
        elementoProductoCarrito.querySelector(".carrito__producto").textContent;

      // Encontrar el índice del producto en el carrito
      const indiceProducto = carritoGuardado.findIndex(
        (producto) => producto.nombre === productoNombre
      );

      // Si se encuentra el producto, eliminarlo del carrito y actualizar localStorage
      if (indiceProducto !== -1) {
        carritoGuardado.splice(indiceProducto, 1);
        localStorage.setItem("carrito", JSON.stringify(carritoGuardado));

        // Llamar a la función para cargar y renderizar el carrito
        cargarYRenderizarCarrito();
      }
    }
  });
});
