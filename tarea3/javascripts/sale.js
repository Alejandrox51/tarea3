const productos = [
  { id: 1, nombre: "Mezcla original 200g", precio: 500 },
  { id: 2, nombre: "Mezcla original 500g", precio: 900 },
  { id: 3, nombre: "Mezcla especial 200g", precio: 700 },
  { id: 4, nombre: "Mezcla especial 500g", precio: 1200 },
];

const productoSelect = document.getElementById("product");
const cantidadInput = document.getElementById("number");
let carrito = [];

// Función para agregar producto al carrito
function addToCart() {
  const productoId = parseInt(productoSelect.value);
  const producto = productos.find((item) => item.id === productoId);
  const cantidad = parseInt(cantidadInput.value);

  let itemCarrito = { producto: producto, cantidad: cantidad };

  const indexCarrito = carrito.findIndex(
    (item) => item.producto.id === itemCarrito.producto.id
  );

  if (carrito.length < 1 || indexCarrito === -1) {
    carrito.push(itemCarrito);
  } else {
    carrito[indexCarrito].cantidad += itemCarrito.cantidad;
  }

  alert(`${getCartMessage()}\nSubtotal: ${calculateSubtotal()} yenes.`);
  productoSelect.value = "";
  cantidadInput.value = "";
}

// Función para calcular subtotal
function calculateSubtotal() {
  return carrito.reduce((acumulado, itemCarrito) => {
    return acumulado + itemCarrito.producto.precio * itemCarrito.cantidad;
  }, 0);
}

// Función para mostrar mensaje con productos en el carrito
function getCartMessage() {
  return carrito
    .map((itemCarrito) => {
      return `${itemCarrito.producto.nombre} , ${itemCarrito.producto.precio} yenes : ${itemCarrito.cantidad} unidad(es).\n`;
    })
    .join("");
}

// Función para calcular el total a pagar, incluyendo gastos de envío
function calculateTotal() {
  const subtotal = calculateSubtotal();
  const costoEnvio = calculateShipping(subtotal);
  alert(
    `${getCartMessage()}\nSubtotal: ${subtotal} yenes.\nGastos de envío: ${costoEnvio} yenes.\nTotal: ${
      subtotal + costoEnvio
    } yenes.`
  );
  carrito = [];
  productoSelect.value = "";
  cantidadInput.value = "";
}

// Función para calcular gastos de envío
function calculateShipping(subtotal) {
  if (subtotal === 0 || subtotal >= 3000) {
    return 0;
  } else if (subtotal < 2000) {
    return 500;
  } else {
    return 250;
  }
}