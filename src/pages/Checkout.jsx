import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckoutForm } from '../components/CheckoutForm';
import { CheckoutSummary } from '../components/CheckoutSummary';

export function Checkout({ carrito = [], usuario, nombreUsuario, onRegistrarCompra }) {
  const [formData, setFormData] = useState({
    nombre: nombreUsuario || '',
    email: usuario || '',
    direccion: '',
    region: 'Valparaíso',
    ciudad: 'Viña del Mar',
    metodoPago: 'tarjeta'
  });

  const [compraExitosa, setCompraExitosa] = useState(false);

  const calcularTotal = () => {
    let total = 0;
    carrito.forEach(libro => {
      const precioNum = typeof libro.precio === 'string' 
        ? parseInt(libro.precio.replace('$', '').replace(/\./g, '')) 
        : libro.precio;
      const cantidad = libro.cantidad || 1;
      if (!isNaN(precioNum)) total += precioNum * cantidad;
    });
    return "$" + total.toLocaleString('es-CL');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      ...(name === 'region' ? { ciudad: '' } : {})
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (carrito.length === 0) return;

    onRegistrarCompra({
      cliente: {
        nombre: formData.nombre,
        email: formData.email
      },
      fecha: new Date().toLocaleDateString('es-CL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      total: calcularTotal(),
      items: carrito.map(({ id, titulo, cantidad, precio }) => ({
        id,
        titulo,
        cantidad: cantidad || 1,
        precio
      }))
    });
    setCompraExitosa(true);
  };

  if (compraExitosa) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Merriweather', serif", color: '#27ae60', fontSize: '2.5rem', marginBottom: '20px' }}>
          ¡Compra realizada con éxito! 📚✨
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '30px' }}>
          Muchas gracias por tu compra, <strong>{formData.nombre}</strong>. Hemos enviado los detalles de tu pedido a <strong>{formData.email}</strong>.
        </p>
        <Link to="/catalogo" className="btn" style={{ padding: '15px 35px', textDecoration: 'none', display: 'inline-block' }}>
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <main className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
      <h2 style={{ fontFamily: "'Merriweather', serif", color: '#2c3e50', fontSize: '2.2rem', marginBottom: '30px', textAlign: 'center' }}>
        Finalizar Compra (Checkout)
      </h2>

      {carrito.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>No tienes libros en el carrito para procesar una compra.</p>
          <Link to="/catalogo" className="btn">Ir al catálogo</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <CheckoutForm 
            formData={formData} 
            onChange={handleChange} 
            onSubmit={handleSubmit} 
            total={calcularTotal()} 
          />

          <CheckoutSummary 
            carrito={carrito} 
            total={calcularTotal()} 
          />
        </div>
      )}
    </main>
  );
}