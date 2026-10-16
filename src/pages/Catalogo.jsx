import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookCard } from '../components/BookCard';
import { FiltrosCategorias } from '../components/FiltrosCategorias';

// Recibimos 'libros' como prop para mostrar las actualizaciones en tiempo real del admin
export function Catalogo({ libros = [], carrito = [], onAddToCart }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [searchParams] = useSearchParams();
  const filtroBusqueda = searchParams.get('busqueda')?.toLowerCase() || '';

  const listaLibros = libros || [];

  const categorias = [
    'Todos',
    ...new Set(listaLibros.map((libro) => libro.categoria).filter(Boolean))
  ];

  // Filtramos por categoría y permitimos buscar tanto por título como por autor
  const librosFiltrados = listaLibros.filter((libro) => {
    const tituloLibro = (libro.titulo || libro.title || '').toLowerCase();
    const autorLibro = (libro.autor || libro.author || '').toLowerCase();
    const categoriaLibro = libro.categoria || '';

    const coincideCategoria = 
      categoriaSeleccionada === 'Todos' || categoriaLibro === categoriaSeleccionada;
    
    const coincideBusqueda = 
      tituloLibro.includes(filtroBusqueda) || autorLibro.includes(filtroBusqueda);

    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="catalogo-container">
      <div className="catalogo-banner">
        <h2>Catálogo Completo</h2>
        <p>Explora toda nuestra colección de libros disponibles.</p>
      </div>

      <main className="container">
        <FiltrosCategorias
          categorias={categorias}
          categoriaSeleccionada={categoriaSeleccionada}
          onSeleccionarCategoria={setCategoriaSeleccionada}
        />

        {filtroBusqueda && (
          <div style={{ marginBottom: '20px', fontSize: '1.1rem', color: '#555' }}>
            Resultados de búsqueda para: <strong>"{filtroBusqueda}"</strong>
          </div>
        )}

        {librosFiltrados.length > 0 ? (
          <div className="book-grid">
            {librosFiltrados.map((libro) => {
              const idLibro = libro.id || libro.titulo;
              const itemEnCarrito = carrito.find(
                (item) => item.id === idLibro || item.titulo === (libro.titulo || libro.title)
              );
              const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
              const stockTotal = libro.stock ?? 10;
              const stockDisponible = Math.max(0, stockTotal - cantidadEnCarrito);

              return (
                <BookCard
                  key={libro.id || libro.titulo}
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
        ) : (
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            {filtroBusqueda 
              ? `No se encontraron libros que coincidan con "${filtroBusqueda}".` 
              : `No hay libros disponibles en la categoría "${categoriaSeleccionada}".`}
          </p>
        )}
      </main>
    </div>
  );
}