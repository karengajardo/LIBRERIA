import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProfileOrders } from './ProfileOrders';

describe('ProfileOrders', () => {
  it('muestra el mensaje vacío cuando no hay compras', () => {
    render(<ProfileOrders compras={[]} />);

    expect(screen.getByText('Aún no has realizado ninguna compra.')).toBeInTheDocument();
    expect(screen.queryByText('Historial de Pedidos')).not.toBeInTheDocument();
  });

  it('renderiza todos los pedidos y sus artículos recibidos', () => {
    render(
      <ProfileOrders
        compras={[
          {
            fecha: '15 de octubre de 2026',
            total: '$10.000',
            items: [{ titulo: 'Primer libro', cantidad: 2, precio: '$5.000' }]
          },
          {
            fecha: '16 de octubre de 2026',
            total: '$8.000',
            items: [{ titulo: 'Segundo libro', cantidad: 1, precio: '$8.000' }]
          }
        ]}
      />
    );

    expect(screen.getByText('Pedido #1')).toBeInTheDocument();
    expect(screen.getByText('Pedido #2')).toBeInTheDocument();
    expect(screen.getByText('Primer libro (Cant: 2)')).toBeInTheDocument();
    expect(screen.getByText('Segundo libro (Cant: 1)')).toBeInTheDocument();
  });
});
