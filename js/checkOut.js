document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el carrito de la memoria del navegador
    const carrito = JSON.parse(localStorage.getItem('carritoLibreria')) || [];
    
    // 2. Calcular el total a pagar
    let totalPagar = 0;
    
    carrito.forEach(libro => {
        // Limpiamos el texto del precio (Transformamos "$12.000" a 12000 matemático)
        const precioLimpio = parseInt(libro.precio.replace('$', '').replace('.', ''));
        const cantidad = libro.cantidad || 1;
        
        totalPagar += (precioLimpio * cantidad);
    });
    
    // 3. Formateamos el número de vuelta a dinero chileno (ej: 12000 -> "$12.000")
    const totalFormateado = '$' + totalPagar.toLocaleString('es-CL');
    
    // 4. Lo inyectamos en el HTML (buscando el ID 'total-checkout')
    const elementoTotal = document.getElementById('total-checkout');
    if (elementoTotal) {
        elementoTotal.textContent = totalFormateado;
    }

    // ==========================================
    // LÓGICA DEL BOTÓN CONFIRMAR Y PAGAR
    // ==========================================
    const formulario = document.getElementById('formulario-pago');
    
    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault(); // Evita que la página parpadee

            if (carrito.length === 0) {
                alert("Tu carrito está vacío. ¡Agrega algunos libros primero!");
                window.location.href = 'catalogo.html';
                return;
            }

            // 1. Mensaje exacto que pediste
            alert('¡Tu compra ha sido exitosa!, por favor revisa tu correo. ');
           
// --- NUEVO: SIMULAR BASE DE DATOS Y ACTUALIZAR STOCK ---
            // Leemos el inventario actual desde sessionStorage
            let inventarioActual = JSON.parse(sessionStorage.getItem('inventarioLibreria')) || catalogoLibros;
            
            // Por cada libro en el carrito, le restamos la cantidad al stock del inventario
            carrito.forEach(itemCarrito => {
                let libroDB = inventarioActual.find(l => l.titulo === itemCarrito.titulo);
                if (libroDB) {
                    libroDB.stock -= (itemCarrito.cantidad || 1);
                    if (libroDB.stock < 0) libroDB.stock = 0; 
                }
            });
            
            // Guardamos el nuevo inventario temporalmente en sessionStorage
            sessionStorage.setItem('inventarioLibreria', JSON.stringify(inventarioActual));
            // -------------------------------------------------------
            
            // Guardamos el nuevo inventario en la memoria del navegador
            localStorage.setItem('inventarioLibreria', JSON.stringify(inventarioActual));
            // -------------------------------------------------------
            
            // 2. Vaciamos la memoria del carrito (Checkout completado)
            localStorage.removeItem('carritoLibreria');
            
            // 3. Redirigimos a la página de inicio
            window.location.href = 'index.html';
        });
    }
});