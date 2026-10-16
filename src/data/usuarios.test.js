import { describe, expect, it } from 'vitest';
import {
  borrarSesion,
  guardarSesion,
  guardarUsuarios,
  leerSesion,
  leerUsuarios
} from './usuarios';

describe('persistencia de usuarios y sesión', () => {
  it('guarda y recupera las cuentas y su historial desde localStorage', () => {
    const usuarios = [
      {
        nombre: 'Ana Pérez',
        email: 'ana@example.com',
        password: 'clave-segura',
        compras: [{ total: '$10.000', items: [] }]
      }
    ];

    guardarUsuarios(usuarios);

    expect(leerUsuarios()).toEqual(usuarios);
  });

  it('guarda y elimina la sesión activa', () => {
    guardarSesion('ana@example.com');
    expect(leerSesion()).toBe('ana@example.com');

    borrarSesion();
    expect(leerSesion()).toBeNull();
  });
});
