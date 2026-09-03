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
    
    // Si no le has puesto 'descripcion' en libros.js, mostrará un texto por defecto
    document.getElementById('libro-descripcion').textContent = libro.descripcion || "Una increíble obra literaria que no te puedes perder. Explora sus páginas y sumérgete en esta fascinante historia.";
    
    document.getElementById('libro-img').src = libro.imagen;

    // Conectamos el botón a la función real del carrito
    document.getElementById('btn-carrito').addEventListener('click', () => {
        agregarAlCarrito(libro.titulo, libro.precio); 
    });
} else {
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