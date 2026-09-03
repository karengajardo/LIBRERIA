// ==========================================
// 1. BASE DE DATOS DE LIBROS (Sincronizada con localStorage)
// ==========================================
const librosIniciales = [
    { 
        titulo: "Cien años de soledad", 
        autor: "Gabriel García Márquez", 
        precio: "$18.990", 
        imagen: "https://images.cdn1.buscalibre.com/fit-in/660x660/a2/8c/a28c74c0fdb8c85fe576fac52491e119.jpg", 
        categoria: "latinoamericanos",
        descripcion: "Señalada como 'categral gótica del lenguaje', este clásico del siglo XX es el enorme y espléndido tapiz de la saga de la familia Buendía, en la mítica aldea de Macondo. Uno de los cinco libros más importantes de los últimos 125 años, según el New York Times.",
        stock: 3 
    },
    { 
        titulo: "1984", 
        autor: "George Orwell", 
        precio: "$14.500", 
        imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/c9/ee/c9eef0bafc045010bfc431812ea5bbf8.jpg", 
        categoria: "clasicos" ,
        descripcion: "Novela distópica fundamental. La historia sigue a Winston Smith, un hombre que trabaja reescribiendo la historia en un mundo totalitario controlado por el Gran Hermano, donde la vigilancia es constante y el pensamiento libre es un crimen castigado. ",
        stock: 3
    },
    { 
        titulo: "El Principito", 
        autor: "Antoine de Saint-Exupéry", 
        precio: "$9.900", 
        imagen: "https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/681b63dd7d9dbb4c4ce5ae76_WJlUnXLgNrZqh3HN_u7WMEnTVs1tV0qKwtUkvXJ2JTk.jpeg", 
        categoria: "clasicos",
        descripcion: "Novela corta y cuento poético escrito por el aviador y escritor francés Antoine de Saint-Exupéry. ",
        stock: 3
    },
    { 
        titulo: "Don Quijote de la Mancha", 
        autor: "Miguel de Cervantes", 
        precio: "$22.000", 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFEC5rSQYIhmOJvnMXdQDkfs2UsRO0xbNYmuDLkLju-GEU6TaP_u7hVp6E&s=10", 
        categoria: "clasicos",
        descripcion: "Considerada la primera novela moderna y una obra maestra de la literatura universal.",
        stock: 3
    },
    { 
        titulo: "Fahrenheit 451", 
        autor: "Ray Bradbury", 
        precio: "$15.200", 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCZqcppciTLp2robBPBa7JMm5FMaDcbEzD28rEjelhTCqAQIHcdHFLUv7G&s=10", 
        categoria: "clasicos",
        descripcion: "Novela que nos presenta un futuro donde los libros están prohibidos y los bomberos se dedican a quemarlos. ",
        stock: 3
    },
    { 
        titulo: "Orgullo y Prejuicio", 
        autor: "Jane Austen", 
        precio: "$12.500", 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr3RZC9kruGsbRu6lpS0-IP_6Rsic9hmCZ5A2GBM-Bqw&s", 
        categoria: "clasicos",
        descripcion:"Novela clásica de 1813 que mezcla una brillante historia de amor con una aguda crítica social a la Inglaterra del siglo XIX. ",
        stock: 3
    },
    { 
        titulo: "El Jugador", 
        autor: "Fiodor M. Dostoyevski", 
        precio: "$28.000", 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDEvnbgt_atlMISzAJu7cwXXyrHeeK8MngzkAsCyM_Fg&s=10", 
        categoria: "clasicos" ,
        descripcion:"Es una intensa novela corta de carácter autobiográfico que retrata de manera magistral los abismos de la ludopatía y la obsesión amorosa.",
        stock: 3
    },
    { 
        titulo: "Cometierra", 
        autor: "Dolores Reyes", 
        precio: "$12.000", 
        imagen: "https://images.cdn2.buscalibre.com/fit-in/660x660/9e/5a/9e5a9a0556f662362cdc8145194efecc.jpg", 
        categoria: "latinoamericanos",
        descripcion:"Breve novela, de gran y profundo impacto que entrelaza el realismo mágico cn la descarnada realidad de la violencia de género en América Latina. ",
        stock: 3
    },
    { 
        titulo: "Crimen y Castigo", 
        autor: "Fiodor M. Dostoyevski", 
        precio: "$39.900", 
        imagen: "https://tajamar-editores.cl/cdn/shop/files/9788490653517.jpg?v=1720454141", 
        categoria: "clasicos",
        descripcion:"Publicada en 1866, es una de las cumbres de la literatura psicológica que explota la culpa, la moralidad y la redención humana. ",
        stock: 3
    },
    { 
        titulo: "El Jardinero y la Muerte", 
        autor: "Gueorgui Gopodínov", 
        precio: "$34.900", 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPAR1yZUP5ZMgOZH24-GYWu2H_JodvTiOU_orwsQoRr85hEA6c1rr55pWj&s=10", 
        categoria: "contemporaneos",
        descripcion:"Escritor por el autor búlgaro y ganador del Premio Booker Internacional, Gueorgui Gospodínov, es un conmovedor relato de autoficción y ensayo lírico sobre los últimos meses de vida de su padre, consumido por una enfermedad terminal. El libro arranca con una frase lapidaria y bellísima que impregna toda la obra: 'Mi padre era jardinero. Ahora es jardín'. ",
        stock: 3
    },
    { 
        titulo: "Las Gratitudes", 
        autor: "Delphine de Vigan", 
        precio: "$20.000", 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1jxN0sSVf03l4v1U4QsHnN23s_b31GBMKBb5eYQQlow&s=10", 
        categoria: "contemporaneos",
        descripcion: "Es una conmovedora novela corta sobre la vejez, la pérdida del lenguaje y la importancia de agradecer en vida. ",
        stock: 3
    },
    { 
        titulo: "Pura Pasión", 
        autor: "Annie Ernaux", 
        precio: "$24.900", 
        imagen: "https://proassets.planetadelibros.cl/usuaris/libros/fotos/368/original/portada_pura-pasion_annie-ernaux_202210171830.jpg", 
        categoria: "contemporaneos",
        descripcion:" Es un relato autobiográfico e íntimo de la esritora francesa Annie Ernaux, ganadora del Premio Nobel de Literatura. ",
        stock: 3
    },
    { 
        titulo: "Carta de una Desconocida", 
        autor: "Stefan Zweig", 
        precio: "$19.900", 
        imagen: "https://images.cdn3.buscalibre.com/fit-in/660x660/74/df/74dfb357e1e3b66a88cf9833458fa244.jpg", 
        categoria: "clasicos",
        descripcion:"Es una novela corta del escritor austriaco Stefan Zweig, publciada en 1922, que narra la desgarradora confesión de un amor obsesivo y unilateral. ",
        stock: 3
    },
    { 
        titulo: "Ya Nadie Escribe Cartas", 
        autor: "Jang Eun-jin", 
        precio: "$19.900", 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4fM9DvDE8Dem40owtU6rcX8XXo9NN4Hy1LISkJvkoVw&s", 
        categoria: "asiaticos",
        descripcion:"Es una novela contemplativa de la autora surcoreana Jang Eun-jin que explora la soledad, el viaje y la necesidad de la conexión humana a través de la correspondencia no enviada.",
        stock: 3
    },
    { 
        titulo: "Nada Dentro", 
        autor: "Asako Otani", 
        precio: "$14.900", 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQoJqIhdMwS-rviypO6txL1MdejtWOsksc7Xa1BxTdLw&s=10", 
        categoria: "asiaticos",
        descripcion:"Breve y sutil novela que explora la vida de dos mujeres que deciden vivir al margen de las normas y expectativas de la sociedad japonesa contemporánea. ",
        stock: 3
    },
    { 
        titulo: "Blanco", 
        autor: "Han Kang", 
        precio: "$21.000", 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl4AikPdWNpNLxnVdFjYfzR8pSoLvM8v68ZyEeA7AfTA&s=10", 
        categoria: "asiaticos",
        descripcion:"Es un conmovedor libro de la escritora surcoreana Han Kang, ganadora del Premio Nobel de Literatura, que explora el duelo, la fragilidad de la vida y la memoria a través de una lista de objetos blancos. ",
        stock: 3
    },
    { 
        titulo: "La Vegetariana", 
        autor: "Han Kang", 
        precio: "$21.900", 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGRrMFo9rRVxlaDz-18gf5CvqDvP-TFo2blX9-19JZyg&s=10", 
        categoria: "asiaticos", 
        descripcion:"Es una novela corta, perturbadora y profundamente simbólica. Narra la historia de Yeong-hye, una mujer ordinaria de Seúl que, tras sufrir pesadillas sangrientas, decide dejar de comer carne de manera radical, desatando el rechazo violento de su entorno familiar y social. ",
        stock: 3,
        novedad: true 
    },
    { 
        titulo: "Del amor y otros demonios", 
        autor: "Gabriel Garcia Marquez", 
        precio: "$12.000", 
        imagen: "https://images.cdn1.buscalibre.com/fit-in/660x660/d5/7f/d57fa2f6bf1ea3a0216f7b58b40711ca.jpg", 
        categoria: "latinoamericanos",
        descripcion:"Novela corta, intensa y trágica ambientada en la Cartagena de Indias colonial del siglo XVIII. ",
        stock: 3,
        novedad: true 
    },
    { 
        titulo: "Los peligros de fumar en la cama", 
        autor: "Mariana Enriquez", 
        precio: "$24.900", 
        imagen: "https://cms.anagrama-ed.es/uploads/media/portadas/0001/27/0626dbb1eef4e0172728f155d02b860c2fcf396a.jpeg", 
        categoria: "latinoamericanos",
        descripcion:"Es una aclamada antología de 12 cuentos de terror de la escritoira argentina Mariana Enriquez, publicada originalmente en 2009. ",
        stock: 3
    },
    { 
        titulo: "Kentukis", 
        autor: "Samantha Scheweblin", 
        precio: "$20.000", 
        imagen: "https://contrapunto.cl/cdn/shop/files/9789566248798.jpg?v=1771288538", 
        categoria: "contemporaneos", 
        descripcion:"Novela coral que explora nuestra relación con la tecnología, la intimidad y el voyerismo a través de un popular dispositivo de moda: los 'kentukis'. ",
        stock: 3,
        novedad: true 
    },
    { 
        titulo: "Actos Humanos", 
        autor: "Han Kang", 
        precio: "$20.000", 
        imagen: "https://www.libreriadelgam.cl/imagenes/9789566/978956624855.JPG", 
        categoria: "asiaticos",
        descripcion:"Narra la brutal represión militar de la revuelta popular en Gwangju, Corea del Sur, en mayo de 1980. A través de múltiples voces, la novela explone el impacto del trauma, la culpa de los supervivientes y la memoria de las víctimas. ",
        stock: 3
    },
    { 
        titulo: "La Única Historia", 
        autor: "Julian Barnes", 
        precio: "$14.000", 
        imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/bf/82/bf8235d8cb6116a8ed86faa69c37dbd7.jpg", 
        categoria: "contemporaneos",
        descripcion:"Publicada por Julian Barnes en 2018, es una novela conmovedora y lúcida sobre el primer amor, la memoria y el dolor inevitable que acompaña las grandes pasiones. ",
        stock: 3,
        novedad: true 
    }
];

// Cargamos los libros desde localStorage si existen, de lo contrario usamos la lista inicial
let catalogoLibros = JSON.parse(localStorage.getItem('misLibros')) || librosIniciales;

// ==========================================
// 2. CONFIGURACIÓN DE PÁGINAS
// ==========================================
const contenedorLibros = document.querySelector('.book-grid');
const esPaginaCatalogo = document.querySelector('.filter-buttons') !== null;
const encabezado = document.querySelector('.page-header h1');
const esPaginaNovedades = encabezado !== null && encabezado.textContent.includes('Llegadas');

// ==========================================
// 3. FUNCIÓN PARA PINTAR LIBROS
// ==========================================
function mostrarLibros(libros, mostrarEtiquetaNuevo = false) {
    if (!contenedorLibros) return; 
    
    contenedorLibros.innerHTML = '';

    libros.forEach(libro => {
        const etiquetaNuevo = (mostrarEtiquetaNuevo || libro.novedad) ? `<span class="badge-nuevo">Nuevo</span>` : '';
        const tarjetaHTML = `
            <div class="book-card" data-category="${libro.categoria}">
                ${etiquetaNuevo}
                
                <!-- ¡Clickeable hacia libro.html! -->
                <div class="book-cover" 
                     style="background-image: url('${libro.imagen}'); cursor: pointer;" 
                     onclick="window.location.href='libro.html?titulo=${encodeURIComponent(libro.titulo)}'">
                </div>
                
                <div class="book-info">
                    <!-- Título clickeable -->
                    <h3 class="book-title" 
                        style="cursor: pointer;" 
                        onclick="window.location.href='libro.html?titulo=${encodeURIComponent(libro.titulo)}'">
                        ${libro.titulo}
                    </h3>
                    
                    <p class="book-author">${libro.autor}</p>
                    <div class="book-price">${libro.precio}</div>
                    <button class="btn-agregar" onclick="agregarAlCarrito('${libro.titulo}', '${libro.precio}')">Agregar al carrito</button>
                </div>
            </div>
        `;
        contenedorLibros.innerHTML += tarjetaHTML;
    });
}

// ==========================================
// 4. LÓGICA DE CATÁLOGO Y NOVEDADES
// ==========================================
if (esPaginaCatalogo) {
    const parametrosURL = new URLSearchParams(window.location.search);
    const palabraBuscada = parametrosURL.get('buscar');
    const botonesFiltro = document.querySelectorAll('.filter-btn');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesFiltro.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');
            const buscadorGlobal = document.querySelector('#buscador-global');
            if (buscadorGlobal) buscadorGlobal.value = ''; 

            const filtro = boton.getAttribute('data-filter');
            if (filtro === 'todos') {
                mostrarLibros(catalogoLibros, false); 
            } else {
                const librosFiltrados = catalogoLibros.filter(libro => libro.categoria === filtro);
                mostrarLibros(librosFiltrados, false); 
            }
        });
    });

    if (palabraBuscada) {
        const buscadorGlobal = document.querySelector('#buscador-global');
        if (buscadorGlobal) buscadorGlobal.value = palabraBuscada;
        const textoBusqueda = palabraBuscada.toLowerCase();
        
        const librosBuscados = catalogoLibros.filter(libro => {
            return libro.titulo.toLowerCase().includes(textoBusqueda) || libro.autor.toLowerCase().includes(textoBusqueda);
        });
        mostrarLibros(librosBuscados, false);
    } else {
        mostrarLibros(catalogoLibros, false);
    }

} else if (esPaginaNovedades) {
    const librosNuevos = catalogoLibros.filter(libro => libro.novedad === true);
    mostrarLibros(librosNuevos, true);
}

// ==========================================
// 5. BUSCADOR GLOBAL
// ==========================================
const buscadorGlobal = document.querySelector('#buscador-global');
if (buscadorGlobal) {
    buscadorGlobal.addEventListener('keypress', (evento) => {
        if (evento.key === 'Enter') {
            const texto = buscadorGlobal.value.trim();
            if (texto !== '') {
                window.location.href = `catalogo.html?buscar=${encodeURIComponent(texto)}`;
            }
        }
    });

    if (esPaginaCatalogo) {
        buscadorGlobal.addEventListener('input', (evento) => {
            const textoBusqueda = evento.target.value.toLowerCase();
            const botonesFiltro = document.querySelectorAll('.filter-btn');
            botonesFiltro.forEach(b => b.classList.remove('active'));

            const librosBuscados = catalogoLibros.filter(libro => {
                return libro.titulo.toLowerCase().includes(textoBusqueda) || libro.autor.toLowerCase().includes(textoBusqueda);
            });
            mostrarLibros(librosBuscados, false);
        });
    }
}

// ==========================================
// 6. LÓGICA DEL CARRITO (Con validación de Stock)
// ==========================================
let carrito = JSON.parse(localStorage.getItem('carritoLibreria')) || [];

function agregarAlCarrito(titulo, precio) {
    // 1. Buscamos el libro en el catálogo maestro para ver su stock real
    const libroEnBD = catalogoLibros.find(libro => libro.titulo === titulo);
    
    // Si no le has puesto stock al libro en la base de datos, asumimos un máximo de 10
    const stockDisponible = libroEnBD && libroEnBD.stock !== undefined ? libroEnBD.stock : 10; 

    // 2. Revisamos cuántos de este libro ya están guardados en tu carrito
    const libroExistente = carrito.find(libro => libro.titulo === titulo);
    const cantidadActual = libroExistente ? libroExistente.cantidad : 0;

    // 3. LA REGLA DE INVENTARIO: Si ya tienes el tope, detenemos la acción
    if (cantidadActual >= stockDisponible) {
        mostrarToast(`¡Ups! Solo tenemos <strong>${stockDisponible}</strong> unidades de "${titulo}" disponibles.`);
        return; // El 'return' hace que la función termine aquí y no guarde nada
    }

    // 4. Si pasó la prueba de stock, seguimos con tu lógica original
    if (libroExistente) {
        libroExistente.cantidad += 1;
    } else {
        carrito.push({ titulo: titulo, precio: precio, cantidad: 1 });
    }

    localStorage.setItem('carritoLibreria', JSON.stringify(carrito));
    actualizarContadorCarrito();
    
    mostrarToast(`¡"<strong>${titulo}</strong>" agregado al carrito!`);
}

function actualizarContadorCarrito() {
    const contadores = document.querySelectorAll('#contador-carrito');
    
    // Sumamos el total de unidades (ej: 2 de uno + 1 de otro = 3)
    const totalUnidades = carrito.reduce((suma, libro) => suma + (libro.cantidad || 1), 0);
    
    contadores.forEach(contador => {
        contador.textContent = totalUnidades;
    });
}
actualizarContadorCarrito(); // Ejecutar al inicio en todas las páginas

function guardarLibrosEnStorage() {
    localStorage.setItem('misLibros', JSON.stringify(catalogoLibros));
}

