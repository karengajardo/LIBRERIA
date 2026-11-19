import { afterEach, describe, expect, it, vi } from 'vitest';
import { actualizarLibro, crearPedido } from './api';

describe('cliente API', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('adjunta el token almacenado a las solicitudes protegidas', async () => {
    localStorage.setItem('token', 'jwt-de-prueba');
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({ id: 'pedido-1' })
    });
    vi.stubGlobal('fetch', fetchMock);

    await crearPedido({ items: [] });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/pedidos$/),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer jwt-de-prueba'
        })
      })
    );
  });

  it('envía la edición del libro al endpoint PUT del catálogo', async () => {
    const libro = { id: 12, titulo: 'Título editado', stock: 7 };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => libro
    });
    vi.stubGlobal('fetch', fetchMock);

    await actualizarLibro(libro.id, libro);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/catalogo\/12$/),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(libro)
      })
    );
  });
});
