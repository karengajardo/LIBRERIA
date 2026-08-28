// 1. Nuestros datos: Un arreglo de objetos con la información de cada libro
const catalogoLibros = [
    {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        precio: "$18.990",
        imagen: "https://images.cdn1.buscalibre.com/fit-in/660x660/a2/8c/a28c74c0fdb8c85fe576fac52491e119.jpg",
        categoria: "latinoamericanos"
    },
    {
        titulo: "1984",
        autor: "George Orwell",
        precio: "$14.500",
        imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/c9/ee/c9eef0bafc045010bfc431812ea5bbf8.jpg",
        categoria: "clasicos"
    },
    {
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        precio: "$9.900",
        imagen: "https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/681b63dd7d9dbb4c4ce5ae76_WJlUnXLgNrZqh3HN_u7WMEnTVs1tV0qKwtUkvXJ2JTk.jpeg",
        categoria: "clasicos"
    },
    {
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        precio: "$22.000",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFEC5rSQYIhmOJvnMXdQDkfs2UsRO0xbNYmuDLkLju-GEU6TaP_u7hVp6E&s=10",
        categoria: "clasicos"
    },
    {
        titulo: "Fahrenheit 451",
        autor: "Ray Bradbury",
        precio: "$15.200",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCZqcppciTLp2robBPBa7JMm5FMaDcbEzD28rEjelhTCqAQIHcdHFLUv7G&s=10",
        categoria: "clasicos"
    },
    {
        titulo: "Orgullo y Prejuicio",
        autor: "Jane Austen",
        precio: "$12.500",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr3RZC9kruGsbRu6lpS0-IP_6Rsic9hmCZ5A2GBM-Bqw&s",
        categoria: "clasicos"
    },
    {
        titulo: "El Jugador",
        autor: "Fiodor M. Dostoyevski",
        precio: "$28.000",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDEvnbgt_atlMISzAJu7cwXXyrHeeK8MngzkAsCyM_Fg&s=10",
        categoria: "clasicos"
    },
    {
        titulo: "Cometierra",
        autor: "Dolores Reyes",
        precio: "$12.000",
        imagen: "https://images.cdn2.buscalibre.com/fit-in/660x660/9e/5a/9e5a9a0556f662362cdc8145194efecc.jpg",
        categoria: "latinoamericanos"
    },
    {
        titulo: "Crimen y Castigo",
        autor: "Fiodor M. Dostoyevski",
        precio: "$39.900",
        imagen: "https://tajamar-editores.cl/cdn/shop/files/9788490653517.jpg?v=1720454141",
        categoria: "clasicos"
    },
    {
        titulo: "El Jardinero y la Muerte",
        autor: "Gueorgui Gopodínov",
        precio: "$34.900",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPAR1yZUP5ZMgOZH24-GYWu2H_JodvTiOU_orwsQoRr85hEA6c1rr55pWj&s=10",
        categoria: "contemporaneos"
    },
    {
        titulo: "Las Gratitudes",
        autor: "Delphine de Vigan",
        precio: "$20.000",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1jxN0sSVf03l4v1U4QsHnN23s_b31GBMKBb5eYQQlow&s=10",
        categoria: "contemporaneos"
    },
    {
        titulo: "Pura Pasión",
        autor: "Annie Ernaux",
        precio: "$24.900",
        imagen: "https://proassets.planetadelibros.cl/usuaris/libros/fotos/368/original/portada_pura-pasion_annie-ernaux_202210171830.jpg",
        categoria: "contemporaneos"
    },
    {
        titulo: "Carta de una Desconocida",
        autor: "Stefan Zweig",
        precio: "$19.900",
        imagen: "https://images.cdn3.buscalibre.com/fit-in/660x660/74/df/74dfb357e1e3b66a88cf9833458fa244.jpg",
        categoria: "clasicos"
    },
    {
        titulo: "Ya Nadie Escribe Cartas",
        autor: "Jang Eun-Jin",
        precio: "$19.900",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4fM9DvDE8Dem40owtU6rcX8XXo9NN4Hy1LISkJvkoVw&s",
        categoria: "asiaticos"
    },
    {
        titulo: "Nada Dentro",
        autor: "Asako Otani",
        precio: "$14.900",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQoJqIhdMwS-rviypO6txL1MdejtWOsksc7Xa1BxTdLw&s=10",
        categoria: "asiaticos"
    },
    {
        titulo: "Blanco",
        autor: "Han Kang",
        precio: "$21.000",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl4AikPdWNpNLxnVdFjYfzR8pSoLvM8v68ZyEeA7AfTA&s=10",
        categoria: "asiaticos"
    },
    {
        titulo: "La Vegetariana",
        autor: "Han Kang",
        precio: "$21.900",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGRrMFo9rRVxlaDz-18gf5CvqDvP-TFo2blX9-19JZyg&s=10",
        categoria: "asiaticos",
        novedad: true
    },
    {
        titulo: "El Coronel no tiene quién le escriba",
        autor: "Gabriel Garcia Marquez",
        precio: "$12.000",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Qu-rK5xciujdyV-ayeeUScE1f_axh0r4-ltcJY0qbg&s=10",
        categoria: "clasicos",
        novedad: true
    },
    {
        titulo: "Los peligros de fumar en la cama",
        autor: "Mariana Enriquez",
        precio: "$24.900",
        imagen: "https://cms.anagrama-ed.es/uploads/media/portadas/0001/27/0626dbb1eef4e0172728f155d02b860c2fcf396a.jpeg",
        categoria: "latinoamericanos"
    },
    {
        titulo: "Kentukis",
        autor: "Samantha Scheweblin",
        precio: "$20.000",
        imagen: "https://contrapunto.cl/cdn/shop/files/9789566248798.jpg?v=1771288538",
        categoria: "contemporaneos",
        novedad: true
    },
    {
        titulo: "Actos Humanos",
        autor: "Han Kang",
        precio: "$20.000",
        imagen: "https://www.libreriadelgam.cl/imagenes/9789566/978956624855.JPG",
        categoria: "asiaticos"
    },
    {
        titulo: "La Única Historia",
        autor: "Julian Barnes",
        precio: "$14.000",
        imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/bf/82/bf8235d8cb6116a8ed86faa69c37dbd7.jpg",
        categoria: "contemporaneos",
        novedad: true
    }
];

// 2. Seleccionamos el contenedor donde se dibujarán los libros
const contenedorLibros = document.querySelector('.book-grid');

// 3. Verificamos en qué página estamos:
// Si la página tiene el bloque de ".filter-buttons", es el Catálogo. Si no lo tiene, es Novedades.
const esPaginaCatalogo = document.querySelector('.filter-buttons') !== null;

// 4. Función inteligente para pintar los libros
function mostrarLibros(libros, mostrarEtiquetaNuevo = false) {
    if (!contenedorLibros) return; // Si no hay contenedor, no hace nada
    
    // Vaciamos el contenedor primero
    contenedorLibros.innerHTML = '';

    // Dibujamos las tarjetas
    libros.forEach(libro => {
        const etiquetaNuevo = mostrarEtiquetaNuevo ? `<span class="badge-nuevo">Nuevo</span>` : '';
        const tarjetaHTML = `
            <div class="book-card" data-category="${libro.categoria}">
                ${etiquetaNuevo}
                <div class="book-cover" style="background-image: url('${libro.imagen}');"></div>
                <div class="book-info">
                    <h3 class="book-title">${libro.titulo}</h3>
                    <p class="book-author">${libro.autor}</p>
                    <div class="book-price">${libro.precio}</div>
                </div>
            </div>
        `;
        contenedorLibros.innerHTML += tarjetaHTML;
    });
}

// 5. Lógica de renderizado según la página actual
if (esPaginaCatalogo) {
    // === CÓDIGO PARA CATÁLOGO ===
    const botonesFiltro = document.querySelectorAll('.filter-btn');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            // Quitar clase 'active' y ponérsela al clickeado
            botonesFiltro.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');

            const filtro = boton.getAttribute('data-filter');

            // Filtrar catálogo
            if (filtro === 'todos') {
                mostrarLibros(catalogoLibros, false); 
            } else {
                const librosFiltrados = catalogoLibros.filter(libro => libro.categoria === filtro);
                mostrarLibros(librosFiltrados, false); 
            }
        });
    });

    // Al entrar al catálogo por primera vez, pintar todos los libros sin la etiqueta "Nuevo"
    mostrarLibros(catalogoLibros, false);

} else {
    // === CÓDIGO PARA NOVEDADES ===
    // 1. Buscamos en el catálogo solo los que tienen "novedad: true"
    const librosNuevos = catalogoLibros.filter(libro => libro.novedad === true);
    // 2. Los pintamos y le decimos a la función que SÍ ponga la etiqueta "Nuevo" (pasando el true)
    mostrarLibros(librosNuevos, true);
}