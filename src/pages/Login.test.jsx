import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Login } from './Login';

function renderLogin(onLoginSuccess) {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route
          path="/login"
          element={<Login onLoginSuccess={onLoginSuccess} onRegister={vi.fn()} />}
        />
        <Route path="/perfil" element={<h1>Perfil</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Login', () => {
  it('espera el inicio de sesión antes de navegar', async () => {
    const onLoginSuccess = vi.fn().mockResolvedValue(true);
    renderLogin(onLoginSuccess);

    fireEvent.change(screen.getByRole('textbox', { name: 'Correo electrónico' }), {
      target: { value: 'persona@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'Password123!' }
    });
    fireEvent.submit(screen.getByRole('button', { name: 'Iniciar Sesión' }).closest('form'));

    expect(await screen.findByRole('heading', { name: 'Perfil' })).toBeInTheDocument();
    expect(onLoginSuccess).toHaveBeenCalledWith('persona@example.com', 'Password123!');
  });

  it('muestra errores de conexión que rechaza la API', async () => {
    const onLoginSuccess = vi.fn().mockRejectedValue(new Error('No se pudo conectar al servidor.'));
    renderLogin(onLoginSuccess);

    fireEvent.change(screen.getByRole('textbox', { name: 'Correo electrónico' }), {
      target: { value: 'persona@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'Password123!' }
    });
    fireEvent.submit(screen.getByRole('button', { name: 'Iniciar Sesión' }).closest('form'));

    expect(await screen.findByRole('alert')).toHaveTextContent('No se pudo conectar al servidor.');
  });

  it('pide iniciar sesión después de un registro que no devuelve token', async () => {
    const onRegister = vi.fn().mockResolvedValue('login-required');
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route
            path="/login"
            element={<Login onLoginSuccess={vi.fn()} onRegister={onRegister} />}
          />
          <Route path="/perfil" element={<h1>Perfil</h1>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Regístrate aquí' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Nombre completo' }), {
      target: { value: 'Persona de Prueba' }
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Correo electrónico' }), {
      target: { value: 'persona@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'Password123!' }
    });
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), {
      target: { value: 'Password123!' }
    });
    fireEvent.submit(screen.getByRole('button', { name: 'Crear Cuenta' }).closest('form'));

    expect(await screen.findByRole('status')).toHaveTextContent(
      'Cuenta creada. Inicia sesión para continuar.'
    );
    expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Perfil' })).not.toBeInTheDocument();
  });
});
