import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { actualizarLibro, crearPedido, listarCatalogo, listarPedidos, loginUsuario } from './services/api';

vi.mock('./services/api', () => ({
  actualizarLibro: vi.fn(),
  crearPedido: vi.fn(),
  listarCatalogo: vi.fn(),
  listarPedidos: vi.fn(),
  loginUsuario: vi.fn(),
  registrarUsuario: vi.fn()
}));

const libroPrueba = {
  id: 1,
  titulo: 'Cien años de soledad',
  autor: 'Gabriel García Márquez',
  precio: '$18.990',
  imagen: '/portada.jpg',
  categoria: 'Clásicos',
  stock: 10
};

function crearToken(payload) {
  const base64 = btoa(JSON.stringify(payload))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return `header.${base64}.signature`;
}

describe('flujo de compra de App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.replaceState({}, '', '/catalogo');
    localStorage.setItem('token', crearToken({ email: 'persona@example.com', nombre: 'Persona' }));
    localStorage.setItem('usuario', JSON.stringify({ email: 'persona@example.com' }));
    localStorage.setItem('parrafo-segundo.usuarios', JSON.stringify([]));
    localStorage.setItem('parrafo-segundo.sesion', 'persona@example.com');
    localStorage.setItem('parrafo-segundo.pedidos.persona%40example.com', JSON.stringify([]));
    listarCatalogo.mockResolvedValue([libroPrueba]);
    listarPedidos.mockResolvedValue([]);
    crearPedido.mockResolvedValue({ id: 'pedido-1' });
  });

  it('guarda el token cuando el login responde con el formato data.token', async () => {
    window.history.replaceState({}, '', '/login');
    loginUsuario.mockResolvedValue({
      data: {
        token: 'jwt-de-prueba',
        usuario: { email: 'persona@example.com', nombre: 'Persona' }
      }
    });

    render(<App />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Correo electrónico' }), {
      target: { value: 'persona@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'Password123!' }
    });
    fireEvent.submit(screen.getByRole('button', { name: 'Iniciar Sesión' }).closest('form'));

    expect(await screen.findByText('Mi Cuenta')).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBe('jwt-de-prueba');
    expect(localStorage.length).toBe(1);
  });

  it('envía el pedido y lo muestra en el perfil tras confirmar la compra', async () => {
    render(<App />);

    fireEvent.click((await screen.findAllByRole('button', { name: 'Agregar al carrito' }))[0]);
    fireEvent.click(screen.getByRole('link', { name: /Carrito/ }));
    fireEvent.click(await screen.findByRole('link', { name: 'Finalizar Compra' }));

    fireEvent.change(screen.getByLabelText('Dirección de despacho'), {
      target: { value: 'Av. Central 123' }
    });
    fireEvent.submit(screen.getByRole('button', { name: /Confirmar y Pagar/ }).closest('form'));

    expect(await screen.findByText('¡Compra realizada con éxito! 📚✨')).toBeInTheDocument();
    expect(crearPedido).toHaveBeenCalledWith(expect.objectContaining({
      cliente: { nombre: 'Persona', email: 'persona@example.com' },
      direccion: 'Av. Central 123'
    }));

    fireEvent.click(screen.getByRole('link', { name: 'Volver al catálogo' }));
    fireEvent.click(await screen.findByRole('link', { name: /Mi Perfil/ }));

    expect(await screen.findByText('Historial de Pedidos')).toBeInTheDocument();
    expect(screen.getByText('Productos: Cien años de soledad (Cant: 1)')).toBeInTheDocument();
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem('token')).toBeTruthy();
  });

  it('guarda las ediciones del admin en el backend y actualiza la lista con la respuesta', async () => {
    window.history.replaceState({}, '', '/perfil');
    localStorage.setItem('token', crearToken({ email: 'parrafosegundo@admin.cl', nombre: 'Admin' }));
    const libroActualizado = { ...libroPrueba, titulo: 'Título actualizado', stock: 4 };
    actualizarLibro.mockResolvedValue(libroActualizado);

    render(<App />);

    expect(await screen.findByText('Inventario Actual (1 libros)')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Editar' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Título' }), {
      target: { value: 'Título actualizado' }
    });
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Stock' }), {
      target: { value: '4' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));

    expect(await screen.findByRole('heading', { name: 'Título actualizado' })).toBeInTheDocument();
    expect(actualizarLibro).toHaveBeenCalledWith(1, expect.objectContaining({
      titulo: 'Título actualizado',
      stock: 4
    }));
  });

  it('recarga el catálogo desde el botón del panel admin', async () => {
    window.history.replaceState({}, '', '/perfil');
    localStorage.setItem('token', crearToken({ email: 'parrafosegundo@admin.cl', nombre: 'Admin' }));
    const catalogoActualizado = [{ ...libroPrueba, titulo: 'Libro recién actualizado' }];
    listarCatalogo.mockResolvedValueOnce([libroPrueba]).mockResolvedValueOnce(catalogoActualizado);

    render(<App />);

    expect(await screen.findByText('Inventario Actual (1 libros)')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Actualizar catálogo' }));

    expect(await screen.findByRole('heading', { name: 'Libro recién actualizado' })).toBeInTheDocument();
  });
});
