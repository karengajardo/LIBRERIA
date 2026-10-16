import { useParams, Link } from 'react-router-dom';

export function DetalleLibro({ libros = [], carrito = [], onAddToCart }) {
  const { id } = useParams();

  // Búsqueda inteligente por ID o por título
  const paramLimpio = decodeURIComponent(id || '').toLowerCase();
  const libro = libros.find((item) => {
    const coincideId = String(item.id) === String(id);
    const tituloItem = (item.titulo || item.title || '').toLowerCase();
    return coincideId || tituloItem === paramLimpio;
  });

  if (!libro) {
    return (
      <main className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>📖 Libro no encontrado</h2>
        <p style={{ margin: '20px 0' }}>El libro que buscas no existe o fue removido.</p>
        <Link to="/catalogo" className="btn" style={{ textDecoration: 'none' }}>
          Volver al Catálogo
        </Link>
      </main>
    );
  }

  // 1. Buscamos cuántas unidades de este libro ya están en el carrito
  const idLibro = libro.id || libro.titulo;
  const itemEnCarrito = carrito.find(
    (item) => item.id === idLibro || item.titulo === (libro.titulo || libro.title)
  );
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

  // 2. Calculamos el stock disponible restante (Stock inicial base - lo que hay en carrito)
  const stockInicial = libro.stock ?? 10; // Si no tiene stock definido en el objeto, asume 10 por defecto
  const stockDisponible = Math.max(0, stockInicial - cantidadEnCarrito);

  const handleAgregar = () => {
    if (stockDisponible > 0) {
      if (onAddToCart) onAddToCart(libro);
    }
  };

  return (
    <main className="container" id="contenedor-detalle">
      <div className="detalle-layout">
        {/* PORTADA DEL LIBRO */}
        <div className="detalle-portada">
          <img
            id="libro-img"
            src={libro.imagen || libro.coverUrl}
            alt={`Portada de ${libro.titulo || libro.title}`}
          />
        </div>

        {/* INFORMACIÓN DEL LIBRO */}
        <div className="detalle-info">
          <h1 id="libro-titulo" className="detalle-titulo">
            {libro.titulo || libro.title}
          </h1>
          <h2 id="libro-autor" className="detalle-autor">
            {libro.autor || libro.author}
          </h2>
          <p id="libro-descripcion" className="detalle-sinopsis">
            {libro.descripcion || libro.sinopsis || 'Sin descripción disponible.'}
          </p>
          <h3 id="libro-precio" className="detalle-precio">
            {typeof libro.precio === 'number'
              ? `$${libro.precio.toLocaleString('es-CL')}`
              : libro.precio || libro.price}
          </h3>

          {/* INDICADOR DINÁMICO DE STOCK */}
          <p
            id="libro-stock"
            className="detalle-stock"
            style={{ color: stockDisponible > 0 ? '#e74c3c' : '#7f8c8d' }}
          >
            {stockDisponible > 0
              ? `Disponible: ${stockDisponible} unidades`
              : '❌ Sin stock disponible'}
          </p>

          <button
            id="btn-carrito"
            className="btn-agregar"
            style={{
              width: 'fit-content',
              padding: '15px 40px',
              fontSize: '1.1rem',
              opacity: stockDisponible <= 0 ? 0.5 : 1,
              cursor: stockDisponible <= 0 ? 'not-allowed' : 'pointer'
            }}
            onClick={handleAgregar}
            disabled={stockDisponible <= 0}
          >
            {stockDisponible > 0 ? 'Agregar al carrito' : 'Límite alcanzado'}
          </button>
        </div>
      </div>
    </main>
  );
}