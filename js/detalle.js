// ==========================================
// LÓGICA DE LA PÁGINA DE DETALLE
// ==========================================

// 1. Obtener el TÍTULO de la URL
const urlParams = new URLSearchParams(window.location.search);
const tituloSeleccionado = urlParams.get('titulo');

// 2. Buscar el libro en tu arreglo 'catalogoLibros' (que viene desde libros.js)
const libro = catalogoLibros.find(item => item.titulo === tituloSeleccionado);

// 3. Renderizar la información si el libro existe
if (libro) {
    document.getElementById('libro-titulo').textContent = libro.titulo;
    document.getElementById('libro-autor').textContent = libro.autor;
    document.getElementById('libro-precio').textContent = libro.precio;
    document.getElementById('libro-descripcion').textContent = libro.descripcion || "Una increíble obra literaria que no te puedes perder. Explora sus páginas y sumérgete en esta fascinante historia.";
    document.getElementById('libro-img').src = libro.imagen;

    // NUEVA FUNCIÓN: Calcula y dibuja el stock en tiempo real
    function actualizarStockVisual() {
        const stockTotal = libro.stock !== undefined ? libro.stock : 10;
        
        // Revisamos cuántos de este libro ya tienes en el carrito global
        const libroEnCarrito = carrito.find(item => item.titulo === libro.titulo);
        const cantidadEnCarrito = libroEnCarrito ? libroEnCarrito.cantidad : 0;
        
        // La matemática sencilla
        const stockRestante = stockTotal - cantidadEnCarrito;
        const elementoStock = document.getElementById('libro-stock');
        const botonAgregar = document.getElementById('btn-carrito');
        
        if (stockRestante <= 0) {
            elementoStock.textContent = "¡Agotado temporalmente!";
            elementoStock.style.color = "#7f8c8d"; // Un gris sutil
            
            // Toque profesional: Desactivamos el botón para que no puedan hacer más clics
            botonAgregar.disabled = true;
            botonAgregar.style.backgroundColor = "#bdc3c7";
            botonAgregar.style.cursor = "not-allowed";
        } else if (stockRestante === 1) {
            elementoStock.textContent = "¡Última unidad disponible!";
        } else {
            elementoStock.textContent = `Stock disponible: ${stockRestante} unidades`;
        }
    }

    // 1. Llamamos a la función al cargar la página por primera vez
    actualizarStockVisual();

    // 2. Acción del botón conectada a la caja registradora real
    document.getElementById('btn-carrito').addEventListener('click', () => {
        agregarAlCarrito(libro.titulo, libro.precio); 
        
        // 3. ¡La Magia! Volvemos a calcular el stock justo después de agregar al carrito
        actualizarStockVisual();
    });

} else {
    // ... el resto de tu código de "Libro no encontrado" se queda igual ...{
    // Si escriben mal la URL o el libro no existe
    const contenedor = document.querySelector('#contenedor-detalle') || document.querySelector('.container');
    contenedor.innerHTML = `
        <div style="text-align: center; margin: 100px 0;">
            <h2>Libro no encontrado</h2>
            <p>Lo sentimos, no pudimos encontrar el libro que buscas.</p>
            <a href="catalogo.html" class="btn">Volver al Catálogo</a>
        </div>
    `;
}