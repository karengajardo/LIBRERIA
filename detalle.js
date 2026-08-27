// 1. Obtener el ID de la URL
const urlParams = new URLSearchParams(window.location.search);
const idSeleccionado = urlParams.get('id');

// 2. Buscar el libro en listaLibros
const libro = listaLibros.find(item => item.id === idSeleccionado);

// 3. Renderizar la información si el libro existe
if (libro) {
    document.getElementById('libro-titulo').textContent = libro.titulo;
    document.getElementById('libro-autor').textContent = libro.autor;
    document.getElementById('libro-precio').textContent = libro.precio;
    document.getElementById('libro-descripcion').textContent = libro.descripcion;
    document.getElementById('libro-img').src = libro.imagen;

    // Acción del botón Carrito
    document.getElementById('btn-carrito').addEventListener('click', () => {
        alert(`¡${libro.titulo} se ha agregado al carrito!`);
    });
} else {
    document.querySelector('.container').innerHTML = '<h2>Libro no encontrado</h2>';
}