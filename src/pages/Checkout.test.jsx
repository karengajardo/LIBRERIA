import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Checkout } from './Checkout';

const carrito = [
  { id: 1, titulo: 'Libro de prueba', precio: '$5.000', cantidad: 2 }
];

function renderCheckout(onRegistrarCompra) {
  return render(
    <MemoryRouter>
      <Checkout
        carrito={carrito}
        usuario="persona@example.com"
        nombreUsuario="Persona"
        onRegistrarCompra={onRegistrarCompra}
      />
    </MemoryRouter>
  );
}

describe('Checkout', () => {
  it('muestra la confirmación solo después de registrar el pedido', async () => {
    const onRegistrarCompra = vi.fn().mockResolvedValue({});
    renderCheckout(onRegistrarCompra);

    fireEvent.change(screen.getByLabelText('Dirección de despacho'), {
      target: { value: 'Av. Central 123' }
    });
    fireEvent.submit(screen.getByRole('button', { name: 'Confirmar y Pagar $10.000' }).closest('form'));

    expect(await screen.findByText('¡Compra realizada con éxito! 📚✨')).toBeInTheDocument();
    expect(onRegistrarCompra).toHaveBeenCalledWith(expect.objectContaining({
      cliente: { nombre: 'Persona', email: 'persona@example.com' },
      direccion: 'Av. Central 123',
      items: [{ id: 1, titulo: 'Libro de prueba', cantidad: 2, precio: '$5.000' }]
    }));
  });

  it('no confirma la compra si falla el registro del pedido', async () => {
    const onRegistrarCompra = vi.fn().mockRejectedValue(new Error('Gateway no disponible'));
    renderCheckout(onRegistrarCompra);

    fireEvent.submit(screen.getByRole('button', { name: 'Confirmar y Pagar $10.000' }).closest('form'));

    expect(await screen.findByRole('alert')).toHaveTextContent('Gateway no disponible');
    expect(screen.queryByText('¡Compra realizada con éxito! 📚✨')).not.toBeInTheDocument();
  });
});
