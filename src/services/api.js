const BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://54.210.169.235:8080'
).replace(/\/+$/, '');

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Error HTTP ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  return contentType && contentType.includes('application/json')
    ? response.json()
    : response.text();
}

export const registrarUsuario = (datos) =>
  request('/api/usuarios/registro', {
    method: 'POST',
    body: JSON.stringify(datos)
  });

export const loginUsuario = (credenciales) =>
  request('/api/usuarios/login', {
    method: 'POST',
    body: JSON.stringify(credenciales)
  });

export const obtenerUsuario = (id) =>
  request(`/api/usuarios/${encodeURIComponent(id)}`);

export const listarCatalogo = () => request('/api/catalogo');

export const actualizarLibro = (id, libro) =>
  request(`/api/catalogo/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(libro)
  });

export const crearPedido = (pedido) =>
  request('/api/pedidos', {
    method: 'POST',
    body: JSON.stringify(pedido)
  });

export const listarPedidos = () => request('/api/pedidos');
