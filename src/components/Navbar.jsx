import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Navbar({ cartCount, usuario }) {
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && busqueda.trim() !== '') {
      // Redirige al catálogo pasando el término de búsqueda en la URL (query param)
      navigate(`/catalogo?busqueda=${encodeURIComponent(busqueda)}`);
      setBusqueda('');
    }
  };

  return (
    <header className="navbar">
      {/* 1. Logotipo a la izquierda */}
      <div className="navbar-logo">
        <Link to="/">Párrafo Segundo</Link>
      </div>

      {/* 2. Páginas / Enlaces en el medio */}
      <nav className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/novedades">Novedades</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/carrito">
          Carrito 🛒 <span className="badge">{cartCount}</span>
        </Link>
        <Link to={usuario ? "/perfil" : "/login"} className="navbar-cuenta">
          👤 {usuario ? "Mi Perfil" : "Mi Cuenta"}
        </Link>
      </nav>

      {/* 3. Barra de búsqueda a la derecha */}
      <div className="navbar-search">
        <input 
          type="text" 
          placeholder="Buscar libro..." 
          className="search-input"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
    </header>
  );
}