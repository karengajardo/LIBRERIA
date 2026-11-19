import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProfileOrders } from './ProfileOrders';

describe('ProfileOrders', () => {
  it('muestra el mensaje vacío cuando no hay compras', () => {
    render(<ProfileOrders compras={[]} usuario="ana@example.com" />);

    expect(screen.getByText('Aún no has realizado ninguna compra.')).toBeInTheDocument();
    expect(screen.queryByText('Historial de Pedidos')).not.toBeInTheDocument();
  });

  it('trata una respuesta nula como historial vacío', () => {
    render(<ProfileOrders compras={null} usuario="ana@example.com" />);

    expect(screen.getByText('Aún no has realizado ninguna compra.')).toBeInTheDocument();
  });

  it('filtra por el correo activo y renderiza detalleProductos', () => {
    render(
      <ProfileOrders
        usuario={{ email: 'ana@example.com' }}
        compras={[
          {
            id: 1,
            clienteEmail: 'ANA@example.com',
            fecha: '15 de octubre de 2026',
            estado: 'Pagado',
            total: '$10.000',
            detalleProductos: 'Primer libro (Cant: 2)'
          },
          {
            id: 2,
            clienteEmail: 'ana@example.com',
            fecha: '16 de octubre de 2026',
            total: '$8.000',
            detalleProductos: 'Segundo libro (Cant: 1)'
          },
          {
            id: 3,
            clienteEmail: 'otra@example.com',
            total: '$99.000',
            detalleProductos: 'Pedido de otra persona'
          }
        ]}
      />
    );

    expect(screen.getByText('Pedido #1')).toBeInTheDocument();
    expect(screen.getByText('Pedido #2')).toBeInTheDocument();
    expect(screen.getByText('Productos: Primer libro (Cant: 2)')).toBeInTheDocument();
    expect(screen.getByText('Productos: Segundo libro (Cant: 1)')).toBeInTheDocument();
    expect(screen.queryByText('Pedido de otra persona')).not.toBeInTheDocument();
  });

  it('renderiza de forma segura pedidos sin detalleProductos', () => {
    render(
      <ProfileOrders
        usuario="ana@example.com"
        compras={[
          {
            id: 7,
            clienteEmail: 'ana@example.com',
            fecha: '19 de noviembre de 2026',
            total: 12000
          }
        ]}
      />
    );

    expect(screen.getByText('Productos: Detalle no disponible.')).toBeInTheDocument();
    expect(screen.getByText('$12.000')).toBeInTheDocument();
  });
});
