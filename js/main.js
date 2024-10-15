// Definición de la clase Producto
class Producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

// Cargar productos desde localStorage o crear un array vacío
let productos = JSON.parse(localStorage.getItem('productos')) || [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Eventos del DOM
document.getElementById('agregar').addEventListener('click', agregarProducto);
document.getElementById('buscar').addEventListener('click', buscarProducto);
document.getElementById('filtrar').addEventListener('click', filtrarPorPrecio);
document.getElementById('comprar').addEventListener('click', comprarProductos);
document.addEventListener('DOMContentLoaded', () => {
    mostrarListaProductos();
    actualizarCarrito();
});

