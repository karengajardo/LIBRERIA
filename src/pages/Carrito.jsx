import { Link } from 'react-router-dom';
import { CartItem } from '../components/CartItem';
import { CarritoActions } from '../components/CarritoActions';

export function Carrito({
  carrito = [],
  onVaciar,
  onAumentar,
  onDisminuir,
  onEliminar
}) {
  
  // Cálculo del total multiplicando precio unitario por cantidad
  const calcularTotal = () => {
    let total = 0;
    carrito.forEach((libro) => {
      const precioNum =
        typeof libro.precio === 'string'
          ? parseInt(libro.precio.replace('$', '').replace(/\./g, ''))
          : libro.precio;

      const cantidad = libro.cantidad || 1;

      if (!isNaN(precioNum)) {
        total += precioNum * cantidad;
      }
    });
    return '$' + total.toLocaleString('es-CL');
  };

  return (
    <main className="carrito-page">
      <section className="carrito-banner">
        <h2>Tu Carrito de Compras</h2>
        <p>Revisa los libros que has seleccionado antes de finalizar.</p>
      </section>

      <section className="carrito-content">
        {carrito.length === 0 ? (
          <div className="carrito-vacio-mensaje">
            Tu carrito está vacío. ¡Ve al <Link to="/catalogo">catálogo</Link> para agregar libros!
          </div>
        ) : (
          <div className="carrito-container">
            
            {/* Acciones del carrito (Vaciar) */}
            <CarritoActions onVaciar={onVaciar} />

            {/* Listado de items del carrito */}
            <div className="lista-carrito">
              {carrito.map((libro) => (
                <CartItem
                  key={libro.id || libro.titulo}
                  libro={libro}
                  onAumentar={onAumentar}
                  onDisminuir={onDisminuir}
                  onEliminar={onEliminar}
                />
              ))}
            </div>
            
            {/* Resumen final y botón de redirección al Checkout */}
            <div style={{ textAlign: 'center', margin: '50px 0 20px 0' }}>
              <h2 style={{ fontSize: '2.2rem', color: '#2c3e50', fontFamily: "'Merriweather', serif" }}>
                Total a pagar: <span style={{ color: '#e74c3c' }}>{calcularTotal()}</span>
              </h2>
              <Link
                to="/checkout"
                style={{
                  backgroundColor: '#27ae60',
                  color: 'white',
                  padding: '15px 40px',
                  fontSize: '1.2rem',
                  border: 'none',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  marginTop: '20px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Finalizar Compra
              </Link>
            </div>

          </div>
        )}
      </section>
    </main>
  );
}