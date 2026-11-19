import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import { actualizarLibro, crearPedido, listarCatalogo, listarPedidos, loginUsuario, registrarUsuario } from './services/api';

const ADMIN_EMAIL = 'parrafosegundo@admin.cl';

function leerDatosRespuesta(respuesta) {
  return respuesta?.data ?? respuesta;
}

function leerListaRespuesta(respuesta, propiedades) {
  const datos = leerDatosRespuesta(respuesta);
  if (Array.isArray(datos)) return datos;

  const lista = propiedades
    .map((propiedad) => datos?.[propiedad])
    .find(Array.isArray);
  if (lista) return lista;

  throw new Error('El servidor devolvió una lista con un formato no válido.');
}

async function cargarCatalogoServidor() {
  const respuesta = await listarCatalogo();
  return leerListaRespuesta(respuesta, ['libros', 'catalogo', 'content']);
}

function leerTokenRespuesta(respuesta) {
  return leerDatosRespuesta(respuesta)?.token || respuesta?.token;
}

function leerIdentidadToken(token) {
  if (!token) return {};

  const payload = token.split('.')[1];
  if (!payload) return {};

  try {
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const binario = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
    const bytes = Uint8Array.from(binario, (caracter) => caracter.charCodeAt(0));
    const claims = JSON.parse(new TextDecoder().decode(bytes));
    return {
      usuario: claims.email || claims.preferred_username || claims.sub || null,
      nombre: claims.nombre || claims.name || claims.given_name || ''
    };
  } catch {
    return {};
  }
}

function limpiarDatosLocalesAntiguos() {
  const clavesAntiguas = ['usuario', 'parrafo-segundo.usuarios', 'parrafo-segundo.sesion'];
  clavesAntiguas.forEach((clave) => localStorage.removeItem(clave));

  for (let indice = localStorage.length - 1; indice >= 0; indice -= 1) {
    const clave = localStorage.key(indice);
    if (clave?.startsWith('parrafo-segundo.pedidos.')) {
      localStorage.removeItem(clave);
    }
  }
}

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [toastMensaje, setToastMensaje] = useState(null);
  const [usuario, setUsuario] = useState(() => {
    const identidad = leerIdentidadToken(localStorage.getItem('token'));
    return identidad.usuario;
  });
  const [nombreUsuario, setNombreUsuario] = useState(() => (
    leerIdentidadToken(localStorage.getItem('token')).nombre
  ));
  const [libros, setLibros] = useState([]);
  const [cargandoCatalogo, setCargandoCatalogo] = useState(true);
  const [refrescandoCatalogo, setRefrescandoCatalogo] = useState(false);
  const [errorCatalogo, setErrorCatalogo] = useState('');
  const [comprasUsuario, setComprasUsuario] = useState([]);
  const [cargandoCompras, setCargandoCompras] = useState(() => (
    Boolean(leerIdentidadToken(localStorage.getItem('token')).usuario)
  ));
  const [errorCompras, setErrorCompras] = useState('');

  useEffect(() => {
    limpiarDatosLocalesAntiguos();
  }, []);

  useEffect(() => {
    let activo = true;
    let solicitudEnCurso = false;
    let primeraCarga = true;

    const actualizarCatalogo = async () => {
      if (document.visibilityState !== 'visible') return;
      if (solicitudEnCurso) return;
      solicitudEnCurso = true;

      try {
        const catalogo = await cargarCatalogoServidor();
        if (activo) {
          setLibros(catalogo);
          setErrorCatalogo('');
        }
      } catch (error) {
        if (activo) {
          setErrorCatalogo(error instanceof Error
            ? `No se pudo actualizar el catálogo: ${error.message}`
            : 'No se pudo actualizar el catálogo.');
        }
      } finally {
        solicitudEnCurso = false;
        if (activo && primeraCarga) {
          primeraCarga = false;
          setCargandoCatalogo(false);
        }
      }
    };

    const actualizarAlVolver = () => {
      if (document.visibilityState === 'visible') actualizarCatalogo();
    };

    actualizarCatalogo();
    const intervalo = window.setInterval(actualizarCatalogo, 30000);
    window.addEventListener('focus', actualizarAlVolver);
    document.addEventListener('visibilitychange', actualizarAlVolver);

    return () => {
      activo = false;
      window.clearInterval(intervalo);
      window.removeEventListener('focus', actualizarAlVolver);
      document.removeEventListener('visibilitychange', actualizarAlVolver);
    };
  }, []);

  useEffect(() => {
    let activo = true;

    if (!usuario) {
      return () => {
        activo = false;
      };
    }

    listarPedidos()
      .then((respuesta) => leerListaRespuesta(respuesta, ['pedidos', 'orders', 'content']))
      .then((pedidos) => {
        if (activo) {
          setComprasUsuario(pedidos);
          setCargandoCompras(false);
        }
      })
      .catch((error) => {
        if (activo) {
          setErrorCompras(error instanceof Error ? error.message : 'No se pudo cargar el historial.');
          setCargandoCompras(false);
        }
      })

    return () => {
      activo = false;
    };
  }, [usuario]);

  const mostrarToast = (mensaje) => {
    setToastMensaje(mensaje);
    setTimeout(() => {
      setToastMensaje(null);
    }, 3000);
  };

  const guardarSesionApi = (respuesta, emailFallback) => {
    const datos = leerDatosRespuesta(respuesta);
    const cuenta = datos?.usuario || datos?.user || datos;
    const emailCuenta = cuenta?.email || emailFallback;
    const token = leerTokenRespuesta(respuesta);

    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }

    setCargandoCompras(true);
    setErrorCompras('');
    setUsuario(emailCuenta);
    setNombreUsuario(cuenta?.nombre || cuenta?.name || (emailCuenta === ADMIN_EMAIL ? 'Administrador' : ''));
    mostrarToast(emailCuenta === ADMIN_EMAIL
      ? '👑 ¡Bienvenido, Administrador!'
      : '👋 ¡Sesión iniciada con éxito!');
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

  const refrescarCatalogo = async () => {
    setRefrescandoCatalogo(true);
    try {
      setLibros(await cargarCatalogoServidor());
      setErrorCatalogo('');
    } catch (error) {
      setErrorCatalogo(error instanceof Error
        ? `No se pudo actualizar el catálogo: ${error.message}`
        : 'No se pudo actualizar el catálogo.');
    } finally {
      setRefrescandoCatalogo(false);
    }
  };

  const handleLoginSuccess = async (email, password) => {
    const emailNormalizado = email.trim().toLowerCase();
    const respuesta = await loginUsuario({ email: emailNormalizado, password });
    if (!leerTokenRespuesta(respuesta)) {
      throw new Error('El servidor inició sesión sin devolver un token de acceso.');
    }
    guardarSesionApi(respuesta, emailNormalizado);
    return true;
  };

  const handleRegister = async ({ nombre, email, password }) => {
    const emailNormalizado = email.trim().toLowerCase();
    const respuesta = await registrarUsuario({
      nombre,
      email: emailNormalizado,
      password
    });

    if (!leerTokenRespuesta(respuesta)) return 'login-required';

    guardarSesionApi(respuesta, emailNormalizado);
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
    setNombreUsuario('');
    setComprasUsuario([]);
    setCargandoCompras(false);
    setErrorCompras('');
    mostrarToast('🔒 Sesión cerrada');
  };

  const registrarCompra = async (nuevoPedido) => {
    const respuesta = await crearPedido(nuevoPedido);
    const pedidoRespuesta = respuesta?.pedido || respuesta?.order || respuesta;
    const pedidoConfirmado = pedidoRespuesta && typeof pedidoRespuesta === 'object'
      ? {
          ...nuevoPedido,
          ...pedidoRespuesta,
          items: Array.isArray(pedidoRespuesta.items) ? pedidoRespuesta.items : nuevoPedido.items,
          clienteEmail: pedidoRespuesta.clienteEmail
            || pedidoRespuesta.cliente?.email
            || nuevoPedido.cliente?.email,
          detalleProductos: pedidoRespuesta.detalleProductos
            || nuevoPedido.detalleProductos
            || nuevoPedido.items?.map((item) => `${item.titulo} (Cant: ${item.cantidad || 1})`).join(', ')
        }
      : nuevoPedido;

    if (usuario && usuario !== ADMIN_EMAIL) {
      setComprasUsuario((pedidos) => [pedidoConfirmado, ...pedidos]);
    }

    setCarrito([]);

    try {
      setLibros(await cargarCatalogoServidor());
      setErrorCatalogo('');
    } catch (error) {
      setErrorCatalogo(error instanceof Error
        ? `El pedido se registró, pero el catálogo no se pudo actualizar: ${error.message}`
        : 'El pedido se registró, pero no se pudo actualizar el catálogo.');
    }
  };

  // Funciones de administración del inventario
  const agregarLibroAdmin = (nuevoLibro) => {
    setLibros((prev) => [{ id: Date.now(), ...nuevoLibro }, ...prev]);
    mostrarToast('📚 ¡Libro agregado al catálogo con éxito!');
  };

  const eliminarLibroAdmin = (libroAEliminar) => {
    setLibros((prev) => prev.filter((libro) => libro !== libroAEliminar));
    mostrarToast('🗑️ Libro eliminado del catálogo');
  };

  const actualizarLibroAdmin = async (libroOriginal, cambios) => {
    if (libroOriginal.id == null) {
      throw new Error('No se puede actualizar un libro sin identificador.');
    }

    const libroEnviado = { ...libroOriginal, ...cambios };
    const respuesta = await actualizarLibro(libroOriginal.id, libroEnviado);
    const datos = leerDatosRespuesta(respuesta);
    const libroActualizado = datos?.libro || datos?.book || datos;

    if (!libroActualizado || typeof libroActualizado !== 'object' || libroActualizado.id == null) {
      throw new Error('El servidor no devolvió el libro actualizado.');
    }

    setLibros((actuales) =>
      actuales.map((libro) => (
        String(libro.id) === String(libroActualizado.id) ? libroActualizado : libro
      ))
    );
    mostrarToast('✏️ Libro actualizado correctamente');
  };

  return (
    <BrowserRouter>
      <Navbar
        cartCount={carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0)}
        usuario={usuario}
      />

      {cargandoCatalogo && <p role="status" style={{ textAlign: 'center', padding: '12px' }}>Cargando catálogo…</p>}
      {errorCatalogo && <p role="alert" style={{ textAlign: 'center', padding: '12px', color: '#c0392b' }}>{errorCatalogo}</p>}

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
                onActualizarLibro={actualizarLibroAdmin}
                onRefrescarCatalogo={refrescarCatalogo}
                refrescandoCatalogo={refrescandoCatalogo}
                onLogout={handleLogout}
              />
            ) : usuario ? (
              <Perfil 
                usuario={usuario} 
                nombre={nombreUsuario}
                compras={comprasUsuario} 
                cargandoCompras={cargandoCompras}
                errorCompras={errorCompras}
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