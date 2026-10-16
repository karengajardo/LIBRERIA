import { Link } from 'react-router-dom';
import { BookCard } from '../components/BookCard';

export function Home({ libros = [], carrito = [], onAddToCart }) {
  // Tomamos los primeros 3 o 6 libros como destacados
  const librosDestacados = libros.slice(0, 6);

  return (
    <div>
      {/* SECCIÓN HERO */}
      <section className="hero">
        <h1>Bienvenidos a Párrafo Segundo</h1>
        <p>Tu librería online favorita con las mejores historias a tu alcance.</p>
        <Link to="/catalogo" className="btn">
          Explorar Catálogo
        </Link>
      </section>

      {/* LIBROS DESTACADOS */}
      <main className="container">
        <h2 className="section-title">Destacados de la Semana</h2>

        <div className="book-grid">
          {librosDestacados.map((libro) => {
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