import { Link } from 'react-router-dom';
import { ProfileOrders } from '../components/ProfileOrders';

export function Perfil({ usuario, nombre, compras = [], onLogout }) {
  if (!usuario) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Merriweather', serif", color: '#2c3e50', fontSize: '2.2rem', marginBottom: '20px' }}>
          Acceso restringido
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '30px' }}>
          Debes iniciar sesión para ver tu perfil y tus compras.
        </p>
        <Link to="/login" className="btn" style={{ padding: '15px 35px', textDecoration: 'none', display: 'inline-block' }}>
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <main className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #e1e1e1', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: "'Merriweather', serif", color: '#2c3e50', fontSize: '2rem', marginBottom: '5px' }}>
            Mi Cuenta
          </h2>
          <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>
            {nombre && <>Nombre: <strong>{nombre}</strong><br /></>}
            Correo: <strong>{usuario}</strong>
          </p>
        </div>
        <button 
          onClick={onLogout}
          style={{ backgroundColor: '#e74c3c', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Componente modular del historial de compras */}
      <ProfileOrders compras={compras} />
    </main>
  );
}