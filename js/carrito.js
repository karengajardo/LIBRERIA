// ==========================================
// PÁGINA DEL CARRITO (Caja Registradora)
// ==========================================
const contenedorListaCarrito = document.querySelector('#lista-carrito');

function precioAEntero(precioStr) {
    return parseInt(precioStr.replace('$', '').replace('.', ''));
}

function enteroAPrecio(numero) {
    return '$' + numero.toLocaleString('es-CL');
}

if (contenedorListaCarrito) {
    function dibujarCarrito() {
        contenedorListaCarrito.innerHTML = ''; 
        let totalPagar = 0; 

        if (carrito.length === 0) {
            contenedorListaCarrito.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío. ¡Ve al catálogo para agregar libros!</p>';
            return; 
        }

        carrito.forEach((libro, index) => {
            const cantidad = libro.cantidad || 1; 
            const precioUnitario = precioAEntero(libro.precio);
            const subtotal = precioUnitario * cantidad;
            
            totalPagar += subtotal;

            const itemHTML = `
                <div class="item-carrito">
                    <div>
                        <h3 style="margin: 0; font-family: 'Merriweather', serif;">${libro.titulo}</h3>
                        <p style="margin: 5px 0 10px 0; color: #555;">Precio un.: ${libro.precio} | Subtotal: <strong style="color: #2c3e50;">${enteroAPrecio(subtotal)}</strong></p>
                        
                        <!-- Botones de cantidad -->
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)">-</button>
                            <span style="font-weight: bold; width: 25px; text-align: center; font-size: 1.1rem;">${cantidad}</span>
                            <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">+</button>
                        </div>
                    </div>
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            `;
            contenedorListaCarrito.innerHTML += itemHTML;
        });

        const totalHTML = `
            <div style="text-align: right; padding: 25px 15px; border-top: 2px solid #ddd; margin-top: 20px;">
                <h2 style="margin: 0; font-family: 'Merriweather', serif; color: #2c3e50;">Total a pagar: <span style="color: #e74c3c;">${enteroAPrecio(totalPagar)}</span></h2>
                <button class="btn-agregar" style="margin-top: 15px; background-color: #27ae60; width: auto; padding: 10px 40px; font-size: 1.1rem;" onclick="alert('¡Gracias por tu compra en Párrafo Segundo!')">Finalizar Compra</button>
            </div>
        `;
        contenedorListaCarrito.innerHTML += totalHTML;
    }

    dibujarCarrito();
}

// ----------------------------------------------------
// NUEVA FUNCIÓN: Sumar o restar unidades
// ----------------------------------------------------
function cambiarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;

    // Si la cantidad llega a cero, borramos el libro directamente
    if (carrito[index].cantidad <= 0) {
        eliminarDelCarrito(index);
        return; 
    }

    // 1. Guardamos el cambio en la memoria
    localStorage.setItem('carritoLibreria', JSON.stringify(carrito));
    // 2. Actualizamos el número rojo del menú superior (¡gracias a libros.js!)
    actualizarContadorCarrito(); 
    // 3. Volvemos a dibujar la lista para que el precio total cambie al instante
    dibujarCarrito(); 
}

// ----------------------------------------------------
// MEJORA: Eliminar sin parpadear la pantalla
// ----------------------------------------------------
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carritoLibreria', JSON.stringify(carrito));
    actualizarContadorCarrito(); 
    dibujarCarrito(); // Redibuja al instante en lugar de usar window.location.reload()
}