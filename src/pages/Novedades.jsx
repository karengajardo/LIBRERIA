import { BookCard } from '../components/BookCard';

export function Novedades({ libros = [], carrito = [], onAddToCart }) {
  // Obtenemos los libros catalogados como novedades o recién llegados
  const librosNovedades = libros.filter(
    (libro) => libro.esNovedad || libro.nuevo || true // Si no hay propiedad esNovedad muestra la lista
  );

  return (
    <div className="novedades-container">
      {/* BANNER NOVEDADES */}
      <div className="novedades-banner">
        <h2>Novedades y Lanzamientos</h2>
        <p>Descubre los últimos títulos recién llegados a nuestras estanterías.</p>
      </div>

      <main className="container" style={{ marginTop: '40px' }}>
        <div className="book-grid">
          {librosNovedades.map((libro) => {
            // Calcular stock disponible en tiempo real según el carrito
            const idLibro = libro.id || libro.titulo;
            const itemEnCarrito = carrito.find(
              (item) => item.id === idLibro || item.titulo === (libro.titulo || libro.title)
            );
            const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
            const stockTotal = libro.stock ?? 10;
            const stockDisponible = Math.max(0, stockTotal - cantidadEnCarrito);

            return (
              <BookCard
                key={libro.id}
                id={libro.id}
                title={libro.titulo || libro.title}
                author={libro.autor || libro.author}
                price={libro.precio || libro.price}
                coverUrl={libro.imagen || libro.coverUrl}
                stockDisponible={stockDisponible}
                onAddToCart={() => onAddToCart && onAddToCart(libro)}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}