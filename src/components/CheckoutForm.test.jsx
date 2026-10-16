import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CheckoutForm } from './CheckoutForm';

describe('CheckoutForm', () => {
  it('envía los datos de despacho al activar el submit', () => {
    const onSubmit = vi.fn((event) => event.preventDefault());
    const formData = {
      direccion: 'Av. Central 123',
      region: 'Valparaíso',
      ciudad: 'Viña del Mar'
    };
    const onChange = vi.fn();

    render(
      <CheckoutForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        total="$18.990"
      />
    );

    expect(screen.getByRole('combobox', { name: 'Región' })).toHaveValue('Valparaíso');
    expect(screen.getByRole('combobox', { name: 'Ciudad' })).toHaveValue('Viña del Mar');
    fireEvent.submit(screen.getByRole('button', { name: 'Confirmar y Pagar $18.990' }).closest('form'));

    expect(onSubmit).toHaveBeenCalledOnce();
  });
});
