const USUARIOS_STORAGE_KEY = 'parrafo-segundo.usuarios';
const SESION_STORAGE_KEY = 'parrafo-segundo.sesion';

export function leerUsuarios() {
  const usuariosGuardados = localStorage.getItem(USUARIOS_STORAGE_KEY);
  if (usuariosGuardados === null) return [];

  const usuarios = JSON.parse(usuariosGuardados);
  if (!Array.isArray(usuarios)) {
    throw new Error('Los datos de usuarios guardados no tienen un formato válido.');
  }

  return usuarios;
}

export function guardarUsuarios(usuarios) {
  localStorage.setItem(USUARIOS_STORAGE_KEY, JSON.stringify(usuarios));
}

export function leerSesion() {
  return localStorage.getItem(SESION_STORAGE_KEY);
}

export function guardarSesion(email) {
  localStorage.setItem(SESION_STORAGE_KEY, email);
}

export function borrarSesion() {
  localStorage.removeItem(SESION_STORAGE_KEY);
}
