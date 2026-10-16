import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/inicio';
import { Catalogo } from './pages/Catalogo.jsx';
import { Novedades } from './pages/Novedades';
import { Contacto } from './pages/Contacto';
import { Carrito } from './pages/Carrito';
import { DetalleLibro } from './pages/DetalleLibro';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Perfil } from './pages/Perfil';
import { AdminDashboard } from './pages/AdminDashboard';
import { catalogoLibros } from './data/libros';
import { borrarSesion, guardarSesion, guardarUsuarios, leerSesion, leerUsuarios } from './data/usuarios';
import './css/estilos.css';

const ADMIN_EMAIL = 'parrafosegundo@admin.cl';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [toastMensaje, setToastMensaje] = useState(null);
  const [usuario, setUsuario] = useState(() => leerSesion());
  const [nombreUsuario, setNombreUsuario] = useState(() => {
    const emailSesion = leerSesion();
    return leerUsuarios().find((cuenta) => cuenta.email === emailSesion)?.nombre || '';
  });
  
  // Estado global mutable para los libros del catálogo e inventario
  const [libros, setLibros] = useState(catalogoLibros || []);

  const [comprasUsuario, setComprasUsuario] = useState(() => {
    const emailSesion = leerSesion();
    return leerUsuarios().find((cuenta) => cuenta.email === emailSesion)?.compras || [];
  });

  const mostrarToast = (mensaje) => {
    setToastMensaje(mensaje);
    setTimeout(() => {
      setToastMensaje(null);
    }, 3000);
  };

  const agregarAlCarrito = (itemOrTitulo, precio, imagen) => {
    let id, titulo, p, img, stockItem;

    if (typeof itemOrTitulo === 'object' && itemOrTitulo !== null) {
      id = itemOrTitulo.id;
      titulo = itemOrTitulo.titulo || itemOrTitulo.title;
      p = itemOrTitulo.precio || itemOrTitulo.price;
      img = itemOrTitulo.imagen || itemOrTitulo.coverUrl;
      stockItem = itemOrTitulo.stock ?? 10;
    } else {
      titulo = itemOrTitulo;
      p = precio;
      img = imagen;
      stockItem = 10;
    }

    const itemEnCarrito = carrito.find(
      (item) => (id && item.id === id) || item.titulo === titulo
    );
    const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

    if (cantidadEnCarrito >= stockItem) {
      mostrarToast(`⚠️ No hay más stock disponible de "${titulo}"`);
      return;
    }

    setCarrito((prevCarrito) => {
      const indexExistente = prevCarrito.findIndex(
        (item) => (id && item.id === id) || item.titulo === titulo
      );

      if (indexExistente >= 0) {
        return prevCarrito.map((item, index) =>
          index === indexExistente
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [
          ...prevCarrito,
          { id, titulo, precio: p, imagen: img, stock: stockItem, cantidad: 1 }
        ];
      }
    });

    mostrarToast(`📚 ¡"${titulo}" agregado al carrito!`);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    mostrarToast('🗑️ Carrito vaciado');
  };

  const aumentarCantidad = (identificador) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) => {
        if (item.id === identificador || item.titulo === identificador) {
          const stockLimite = item.stock ?? 10;
          if (item.cantidad < stockLimite) {
            return { ...item, cantidad: item.cantidad + 1 };
          } else {
            mostrarToast(`⚠️ Alcanzaste el límite de stock de "${item.titulo}"`);
          }
        }
        return item;
      })
    );
  };

  const disminuirCantidad = (identificador) => {
    setCarrito((prevCarrito) =>
      prevCarrito
        .map((item) =>
          item.id === identificador || item.titulo === identificador
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (identificador) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter(
        (item) => item.id !== identificador && item.titulo !== identificador
      )
    );
    mostrarToast('🗑️ Producto eliminado del carrito');
  };

  const finalizarCompra = () => {
    setCarrito([]);
    mostrarToast('🎉 ¡Gracias por tu compra! Tu pedido ha sido procesado.');
  };

  const handleLoginSuccess = (email, password) => {
    const emailNormalizado = email.trim().toLowerCase();
    if (emailNormalizado === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      guardarSesion(emailNormalizado);
      setUsuario(emailNormalizado);
      setNombreUsuario('Administrador');
      setComprasUsuario([]);
      mostrarToast('👑 ¡Bienvenido, Administrador!');
      return true;
    } else {
      const cuenta = leerUsuarios().find(
        (usuarioGuardado) => usuarioGuardado.email === emailNormalizado
          && usuarioGuardado.password === password
      );
      if (!cuenta) return false;

      guardarSesion(cuenta.email);
      setUsuario(cuenta.email);
      setNombreUsuario(cuenta.nombre);
      setComprasUsuario(cuenta.compras || []);
      mostrarToast('👋 ¡Sesión iniciada con éxito!');
      return true;
    }
  };

  const handleRegister = ({ nombre, email, password }) => {
    const emailNormalizado = email.trim().toLowerCase();
    const usuariosGuardados = leerUsuarios();
    if (
      !nombre
      || emailNormalizado === ADMIN_EMAIL
      || usuariosGuardados.some((cuenta) => cuenta.email === emailNormalizado)
    ) {
      return false;
    }

    const nuevaCuenta = {
      nombre,
      email: emailNormalizado,
      password,
      compras: []
    };
    guardarUsuarios([...usuariosGuardados, nuevaCuenta]);
    guardarSesion(emailNormalizado);
    setUsuario(emailNormalizado);
    setNombreUsuario(nombre);
    setComprasUsuario([]);
    mostrarToast('✅ Cuenta creada correctamente. ¡Bienvenido!');
    return true;
  };

  const handleLogout = () => {
    borrarSesion();
    setUsuario(null);
    setNombreUsuario('');
    setComprasUsuario([]);
    mostrarToast('🔒 Sesión cerrada');
  };

  const registrarCompra = (nuevoPedido) => {
    if (usuario && usuario !== ADMIN_EMAIL) {
      const usuariosGuardados = leerUsuarios();
      const cuenta = usuariosGuardados.find((usuarioGuardado) => usuarioGuardado.email === usuario);
      if (!cuenta) {
        throw new Error('No se encontró la cuenta activa para guardar la compra.');
      }

      const comprasActualizadas = [nuevoPedido, ...(cuenta.compras || [])];
      guardarUsuarios(usuariosGuardados.map((usuarioGuardado) => (
        usuarioGuardado.email === usuario
          ? { ...usuarioGuardado, compras: comprasActualizadas }
          : usuarioGuardado
      )));
      setComprasUsuario(comprasActualizadas);
    }

    setLibros((prev) =>
      prev.map((libro) => {
        const itemComprado = nuevoPedido.items.find((item) =>
          item.id != null && libro.id != null
            ? item.id === libro.id
            : item.titulo === libro.titulo
        );

        if (!itemComprado) return libro;

        return {
          ...libro,
          stock: Math.max(0, (libro.stock ?? 10) - (itemComprado.cantidad || 1))
        };
      })
    );
    setCarrito([]);
  };

  // Funciones de administración del inventario
  const agregarLibroAdmin = (nuevoLibro) => {
    setLibros((prev) => [{ id: Date.now(), ...nuevoLibro }, ...prev]);
    mostrarToast('📚 ¡Libro agregado al catálogo con éxito!');
  };

  const eliminarLibroAdmin = (id) => {
    setLibros((prev) => prev.filter((libro) => libro.id !== id));
    mostrarToast('🗑️ Libro eliminado del catálogo');
  };

  const actualizarStockAdmin = (id, nuevoStock) => {
    setLibros((prev) =>
      prev.map((libro) => (libro.id === id ? { ...libro, stock: Number(nuevoStock) } : libro))
    );
    mostrarToast('⚡ Stock actualizado correctamente');
  };

  return (
    <BrowserRouter>
      <Navbar
        cartCount={carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0)}
        usuario={usuario}
      />

      <Routes>
        <Route
          path="/"
          element={<Home libros={libros} carrito={carrito} onAddToCart={agregarAlCarrito} />}
        />
        
        {/* Pasamos los libros dinámicos al catálogo */}
        <Route
          path="/catalogo"
          element={<Catalogo libros={libros} carrito={carrito} onAddToCart={agregarAlCarrito} />}
        />
        
        <Route
          path="/novedades"
          element={<Novedades libros={libros} carrito={carrito} onAddToCart={agregarAlCarrito} />}
        />

        <Route
          path="/libro/:id"
          element={
            <DetalleLibro
              libros={libros}
              carrito={carrito}
              onAddToCart={agregarAlCarrito}
              onMostrarToast={mostrarToast}
            />
          }
        />

        <Route path="/contacto" element={<Contacto onMostrarToast={mostrarToast} />} />

        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} onRegister={handleRegister} />}
        />

        {/* Validación directa por correo para garantizar la apertura inmediata del panel */}
        <Route 
          path="/perfil" 
          element={
            usuario === ADMIN_EMAIL ? (
              <AdminDashboard 
                libros={libros}
                onAgregarLibro={agregarLibroAdmin}
                onEliminarLibro={eliminarLibroAdmin}
                onActualizarStock={actualizarStockAdmin}
                onLogout={handleLogout}
              />
            ) : usuario ? (
              <Perfil 
                usuario={usuario} 
                nombre={nombreUsuario}
                compras={comprasUsuario} 
                onLogout={handleLogout} 
              />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} onRegister={handleRegister} />
            )
          } 
        />

        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              onVaciar={vaciarCarrito}
              onAumentar={aumentarCantidad}
              onDisminuir={disminuirCantidad}
              onEliminar={eliminarDelCarrito}
              onComprar={finalizarCompra}
            />
          }
        />

        <Route
          path="/checkout"
          element={usuario
            ? <Checkout
                carrito={carrito}
                usuario={usuario}
                nombreUsuario={nombreUsuario}
                onRegistrarCompra={registrarCompra}
              />
            : <Login
                onLoginSuccess={handleLoginSuccess}
                onRegister={handleRegister}
                redirectTo="/checkout"
              />}
        />
      </Routes>

      {toastMensaje && (
        <div id="toast-container">
          <div className="toast">{toastMensaje}</div>
        </div>
      )}

      <Footer />
    </BrowserRouter>
  );
}