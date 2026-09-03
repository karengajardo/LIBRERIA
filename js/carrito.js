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

            // EL TRUCO: Buscamos la imagen del libro en el catálogo principal
            const libroEnBD = catalogoLibros.find(item => item.titulo === libro.titulo);
            // Si lo encuentra, usa su imagen. Si no, usa una imagen en blanco por defecto.
            const imagenLibro = libroEnBD ? libroEnBD.imagen : '';

            const itemHTML = `
                <div class="item-carrito" style="display: flex; gap: 20px; padding: 20px 0; border-bottom: 1px solid #eee;">
                    
                    <!-- 1. Columna Izquierda: La Imagen (¡Ahora es clickeable!) -->
                    <div style="flex-shrink: 0; cursor: pointer;" onclick="window.location.href='libro.html?titulo=${encodeURIComponent(libro.titulo)}'">
                        <img src="${imagenLibro}" alt="Portada de ${libro.titulo}" style="width: 75px; height: auto; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    </div>

                    <!-- 2. Columna Derecha: Toda la información y botones -->
                    <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                        
                        <!-- Título también clickeable -->
                        <h3 style="margin: 0 0 8px 0; font-family: 'Merriweather', serif; font-size: 1.3rem; cursor: pointer;" onclick="window.location.href='libro.html?titulo=${encodeURIComponent(libro.titulo)}'">
                            ${libro.titulo}
                        </h3>
                        
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 12px; flex-wrap: wrap;">
                            <p style="margin: 0; color: #555;">Precio un.: ${libro.precio} | Subtotal: <strong style="color: #2c3e50;">${enteroAPrecio(subtotal)}</strong></p>
                            <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})" style="padding: 4px 12px; font-size: 0.85rem; border-radius: 20px; background-color: #e74c3c; color: white; border: none; cursor: pointer;">Eliminar</button>
                        </div>
                        
                        <!-- Botones de cantidad (+ / -) -->
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)">-</button>
                            <span style="font-weight: bold; width: 25px; text-align: center; font-size: 1.1rem;">${cantidad}</span>
                            <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">+</button>
                        </div>
                    </div>
                    
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
// FUNCIÓN: Sumar o restar unidades (Con validación)
// ----------------------------------------------------
function cambiarCantidad(index, cambio) {
    // Si el usuario intenta sumar (cambio === 1)
    if (cambio === 1) {
        const tituloLibro = carrito[index].titulo;
        
        // Buscamos el stock en la base de datos principal (catalogoLibros)
        const libroEnBD = catalogoLibros.find(item => item.titulo === tituloLibro);
        const stockDisponible = libroEnBD && libroEnBD.stock !== undefined ? libroEnBD.stock : 10;

        // Si ya alcanzó el límite, mostramos el aviso y detenemos la suma
        if (carrito[index].cantidad >= stockDisponible) {
            mostrarToast(`No puedes agregar más. El stock máximo de "${tituloLibro}" es de ${stockDisponible} unidades.`);
            return; 
        }
    }

    // Si todo está bien, o si está restando, hacemos la matemática
    carrito[index].cantidad += cambio;

    // Si la cantidad llega a cero, borramos el libro
    if (carrito[index].cantidad <= 0) {
        eliminarDelCarrito(index);
        return; 
    }

    localStorage.setItem('carritoLibreria', JSON.stringify(carrito));
    actualizarContadorCarrito(); 
    dibujarCarrito(); 
}

// ----------------------------------------------------
// MEJORA: Eliminar con notificación Toast
// ----------------------------------------------------
function eliminarDelCarrito(index) {
    // 1. Rescatamos el título del libro antes de que desaparezca
    const tituloEliminado = carrito[index].titulo;

    // 2. Lo borramos de la memoria del carrito
    carrito.splice(index, 1);
    localStorage.setItem('carritoLibreria', JSON.stringify(carrito));
    
    // 3. Actualizamos el número rojo y la lista en pantalla
    actualizarContadorCarrito(); 
    dibujarCarrito(); 

    // 4. ¡Disparamos tu Toast elegante!
    mostrarToast(`¡"<strong>${tituloEliminado}</strong>" eliminado satisfactoriamente!`);
}