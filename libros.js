// 1. Nuestros datos: Un arreglo de objetos con la información de cada libro
const catalogoLibros = [
    {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        precio: "$18.990",
        imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80",
        categoria: "contemporaneos"
    },
    {
        titulo: "1984",
        autor: "George Orwell",
        precio: "$14.500",
        imagen: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80",
        categoria: "clasicos"
    },
    {
        titulo: "Ya nadie escribe cartas",
        autor: "Jang Eun-Jin",
        precio: "$19.900",
        imagen: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=500&q=80",
        categoria: "asiatica"
    }
    // NOTA: Aquí debes seguir agregando el resto de tus libros copiando este mismo bloque.
];

// 2. Seleccionamos el contenedor vacío del HTML
const contenedorLibros = document.querySelector('.book-grid');

// 3. Función para pintar los libros en el HTML
function mostrarLibros(libros) {
    // Vaciamos el contenedor primero
    contenedorLibros.innerHTML = '';

    // Recorremos la lista de libros y armamos el código HTML para cada uno
    libros.forEach(libro => {
        const tarjetaHTML = `
            <div class="book-card" data-category="${libro.categoria}">
                <div class="book-cover" style="background-image: url('${libro.imagen}');"></div>
                <div class="book-info">
                    <h3 class="book-title">${libro.titulo}</h3>
                    <p class="book-author">${libro.autor}</p>
                    <div class="book-price">${libro.precio}</div>
                </div>
            </div>
        `;
        // Inyectamos la tarjeta en el HTML
        contenedorLibros.innerHTML += tarjetaHTML;
    });
}

// 4. Lógica de los botones de filtro actualizada
const botonesFiltro = document.querySelectorAll('.filter-btn');

botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        // Quitar la clase 'active' de todos los botones y ponérsela al que clickeamos
        botonesFiltro.forEach(b => b.classList.remove('active'));
        boton.classList.add('active');

        const filtro = boton.getAttribute('data-filter');

        // Filtrar los datos y volver a pintar
        if (filtro === 'todos') {
            mostrarLibros(catalogoLibros); 
        } else {
            // Creamos una nueva lista solo con los libros que coincidan con la categoría
            const librosFiltrados = catalogoLibros.filter(libro => libro.categoria === filtro);
            mostrarLibros(librosFiltrados); 
        }
    });
});

// 5. Mostrar todos los libros al cargar la página por primera vez
mostrarLibros(catalogoLibros);