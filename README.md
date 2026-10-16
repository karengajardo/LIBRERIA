# React + Vite

## Cuentas e historial de compras

El registro, la sesión y el historial de compras se guardan en `localStorage` del navegador. Es una persistencia de demostración: los datos no se comparten entre dispositivos ni navegadores, y las contraseñas no están protegidas como lo estarían en un backend. No usar este mecanismo para cuentas o información real. Para comprar, se debe iniciar sesión o crear una cuenta; los pedidos quedan asociados a esa cuenta.

## Acceso de administrador de demostración

Configura `VITE_ADMIN_PASSWORD` en un archivo local `.env.local` (no lo subas a Git). Puedes usar `.env.example` como referencia. El correo de administrador es `parrafosegundo@admin.cl`.

Esta variable solo evita escribir la contraseña en el repositorio: al ser una aplicación frontend, la contraseña puede descubrirse en el código JavaScript servido al navegador. No uses este mecanismo en producción; la autenticación de administrador requiere un backend.

## Pruebas

Las pruebas unitarias de componentes usan Vitest y React Testing Library. Ejecuta `npm test` para correrlas; el archivo `src/test/setup.js` limpia el DOM, `localStorage` y los mocks entre pruebas.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
