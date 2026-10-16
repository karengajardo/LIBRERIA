import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LoginForm } from './LoginForm';

function LoginFormHarness({ onSubmit }) {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <>
      <LoginForm formData={formData} onChange={handleChange} onSubmit={onSubmit} />
      <output aria-label="Correo actualizado">{formData.email}</output>
    </>
  );
}

describe('LoginForm', () => {
  it('actualiza el estado del formulario cuando se escribe', () => {
    render(<LoginFormHarness onSubmit={vi.fn()} />);
    const email = screen.getByRole('textbox', { name: 'Correo electrónico' });

    fireEvent.change(email, { target: { value: 'persona@example.com' } });

    expect(email).toHaveValue('persona@example.com');
    expect(screen.getByLabelText('Correo actualizado')).toHaveTextContent('persona@example.com');
  });

  it('llama al evento submit recibido por props', () => {
    const onSubmit = vi.fn((event) => event.preventDefault());
    render(<LoginFormHarness onSubmit={onSubmit} />);

    fireEvent.submit(screen.getByRole('button', { name: 'Iniciar Sesión' }).closest('form'));

    expect(onSubmit).toHaveBeenCalledOnce();
  });
});
