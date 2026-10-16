import { Link } from 'react-router-dom';

export function BookCard({
  id,
  title,
  author,
  price,
  coverUrl,
  stockDisponible = 10,
  onAddToCart
}) {
  const libroRuta = `/libro/${id || encodeURIComponent(title)}`;
  const sinStock = stockDisponible <= 0;

  const handleAgregar = (e) => {
    e.stopPropagation(); // Evita redirigir si se pulsa el botón
    if (!sinStock && onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <div className="book-card">
      <Link to={libroRuta}>
        <div
          className="book-cover"
          style={{ backgroundImage: `url('${coverUrl}')`, cursor: 'pointer' }}
        />
      </Link>

      <div className="book-info">
        <h3 className="book-title">
          <Link to={libroRuta} style={{ color: 'inherit', textDecoration: 'none' }}>
            {title}
          </Link>
        </h3>

        <p className="book-author">{author}</p>
        <div className="book-price">{price}</div>

        <button
          className="btn-agregar"
          onClick={handleAgregar}
          disabled={sinStock}
          style={{
            opacity: sinStock ? 0.5 : 1,
            cursor: sinStock ? 'not-allowed' : 'pointer',
            backgroundColor: sinStock ? '#7f8c8d' : undefined
          }}
        >
          {sinStock ? 'Sin stock' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
}