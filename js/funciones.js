// Función para agregar un producto
function agregarProducto() {
    const nombre = document.getElementById('nombre').value.trim();
    const precio = parseFloat(document.getElementById('precio').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);

    if (!nombre || isNaN(precio) || isNaN(cantidad) || precio < 0 || cantidad <= 0) {
        alert("Por favor, complete los campos con valores válidos.");
        return;
    }

    const producto = new Producto(nombre, precio, cantidad);
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));

    mostrarListaProductos();
    limpiarFormulario();
}

// Función para mostrar la lista de productos
function mostrarListaProductos() {
    const listaProductosDiv = document.getElementById('lista-productos');
    listaProductosDiv.innerHTML = '';

    if (productos.length === 0) {
        listaProductosDiv.innerHTML = "No hay productos en la tienda.";
        return;
    }

    productos.forEach((producto, index) => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            ${producto.nombre} - $${producto.precio.toFixed(2)} (Cantidad: ${producto.cantidad})
            <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        listaProductosDiv.appendChild(div);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(index) {
    const productoSeleccionado = productos[index];
    const cantidad = parseInt(prompt(`¿Cuántos ${productoSeleccionado.nombre} deseas agregar al carrito?`));

    if (isNaN(cantidad) || cantidad <= 0 || cantidad > productoSeleccionado.cantidad) {
        alert("Cantidad no válida o supera el stock disponible.");
        return;
    }

    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(producto => producto.nombre === productoSeleccionado.nombre);

    if (productoEnCarrito) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        productoEnCarrito.cantidad += cantidad;
    } else {
        // Si no está, añadirlo al carrito con la cantidad especificada
        carrito.push({ ...productoSeleccionado, cantidad: cantidad });
    }

    // Actualizar el stock del producto en la tienda
    productos[index].cantidad -= cantidad;

    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('productos', JSON.stringify(productos));
    
    actualizarCarrito();
    mostrarListaProductos(); // Refrescar la lista de productos disponibles
}


// Función para mostrar el carrito de compras
function actualizarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    const totalCarritoSpan = document.getElementById('total-carrito');
    carritoDiv.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        carritoDiv.innerHTML = "El carrito está vacío.";
        totalCarritoSpan.textContent = "0.00";
        return;
    }

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            ${producto.nombre} - $${producto.precio.toFixed(2)} x ${producto.cantidad} = $${subtotal.toFixed(2)}
            <button onclick="eliminarDelCarrito(${index})">Eliminar del carrito</button>
        `;
        carritoDiv.appendChild(div);
        total += subtotal;
    });

    totalCarritoSpan.textContent = total.toFixed(2);
}


// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    const productoEliminado = carrito[index];
    
    // Devolver la cantidad eliminada al stock original
    const productoOriginal = productos.find(producto => producto.nombre === productoEliminado.nombre);
    if (productoOriginal) {
        productoOriginal.cantidad += productoEliminado.cantidad;
    }
    
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('productos', JSON.stringify(productos));

    actualizarCarrito();
    mostrarListaProductos(); // Refrescar la lista de productos disponibles
}


// Función para comprar productos
function comprarProductos() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    alert("Gracias por su compra. ¡Disfrute sus productos!");
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para buscar un producto por nombre
function buscarProducto() {
    const nombre = document.getElementById('buscar-nombre').value.trim().toLowerCase();
    const resultadoDiv = document.getElementById('resultado-busqueda');
    resultadoDiv.innerHTML = '';

    const productoEncontrado = productos.find(producto => producto.nombre.toLowerCase() === nombre);

    if (productoEncontrado) {
        resultadoDiv.innerHTML = `Producto encontrado: ${productoEncontrado.nombre} - $${productoEncontrado.precio.toFixed(2)} (Cantidad: ${productoEncontrado.cantidad})`;
    } else {
        resultadoDiv.innerHTML = "Producto no encontrado.";
    }
}

// Función para filtrar productos por precio
function filtrarPorPrecio() {
    const minPrecio = parseFloat(document.getElementById('min-precio').value);
    const maxPrecio = parseFloat(document.getElementById('max-precio').value);
    const resultadoFiltrado = document.getElementById('resultado-filtrado');
    resultadoFiltrado.innerHTML = '';

    if (isNaN(minPrecio) || isNaN(maxPrecio) || minPrecio < 0 || maxPrecio < 0 || minPrecio > maxPrecio) {
        resultadoFiltrado.innerHTML = "Por favor, ingrese un rango de precios válido.";
        return;
    }

    const productosFiltrados = productos.filter(producto => producto.precio >= minPrecio && producto.precio <= maxPrecio);

    if (productosFiltrados.length === 0) {
        resultadoFiltrado.innerHTML = "No se encontraron productos en el rango de precios.";
        return;
    }

    productosFiltrados.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)} (Cantidad: ${producto.cantidad})`;
        resultadoFiltrado.appendChild(div);
    });
}

// Función para eliminar un producto
function eliminarProducto(index) {
    productos.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarListaProductos();
}

// Función para limpiar el formulario después de agregar un producto
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('cantidad').value = '';
}
