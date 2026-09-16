document.addEventListener('DOMContentLoaded', () => {
    const contenedorLoginRegistro = document.getElementById('contenedor-login-registro');
    const contenedorPerfil = document.getElementById('contenedor-perfil');

    const tabLogin = document.getElementById('tab-login');
    const tabRegistro = document.getElementById('tab-registro');
    const vistaLogin = document.getElementById('vista-login');
    const vistaRegistro = document.getElementById('vista-registro');

    const formLogin = document.getElementById('formulario-login');
    const formRegistro = document.getElementById('formulario-registro');
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    const btnIrAdmin = document.getElementById('btn-ir-admin');

    function verificarEstadoSesion() {
        const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion') || 'null');

        if (usuarioSesion) {
            if (contenedorLoginRegistro) contenedorLoginRegistro.style.display = 'none';
            if (contenedorPerfil) contenedorPerfil.style.display = 'block';

            // Obtener o inferir el nombre
            let nombreFinal = usuarioSesion.nombre;
            if (!nombreFinal || nombreFinal.trim() === '') {
                const parteCorreo = usuarioSesion.email.split('@')[0];
                nombreFinal = parteCorreo.charAt(0).toUpperCase() + parteCorreo.slice(1);
            }

            const esAdmin = usuarioSesion.rol === 'admin';

            // Inyectar datos en el HTML
            const elemNombre = document.getElementById('perfil-nombre');
            const elemEmail = document.getElementById('perfil-email');
            const elemRol = document.getElementById('perfil-rol');

            if (elemNombre) elemNombre.textContent = nombreFinal;
            if (elemEmail) elemEmail.textContent = usuarioSesion.email;
            if (elemRol) elemRol.textContent = esAdmin ? 'Administrador ⚙️' : 'Cliente Registrado';

            // Mostrar u ocultar el botón del Panel Admin
            if (btnIrAdmin) {
                btnIrAdmin.style.display = esAdmin ? 'block' : 'none';
            }
        } else {
            if (contenedorPerfil) contenedorPerfil.style.display = 'none';
            if (contenedorLoginRegistro) contenedorLoginRegistro.style.display = 'block';
        }
    }

    // Cambiar Pestañas Login / Registro
    if (tabLogin && tabRegistro) {
        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('active');
            tabRegistro.classList.remove('active');
            vistaLogin.style.display = 'block';
            vistaRegistro.style.display = 'none';
        });

        tabRegistro.addEventListener('click', () => {
            tabRegistro.classList.add('active');
            tabLogin.classList.remove('active');
            vistaRegistro.style.display = 'block';
            vistaLogin.style.display = 'none';
        });
    }

    // Registrar Usuario
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('reg-nombre').value.trim();
            const email = document.getElementById('reg-email').value.trim().toLowerCase();
            const password = document.getElementById('reg-password').value;

            const usuariosGuardados = JSON.parse(localStorage.getItem('usuariosRegistrados') || '{}');
            usuariosGuardados[email] = { nombre: nombre, email: email, password: password };
            localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosGuardados));

            alert(`¡Cuenta creada para ${nombre}! Ya puedes iniciar sesión.`);
            if (tabLogin) tabLogin.click();
            formRegistro.reset();
        });
    }

    // Iniciar Sesión (SIN REDIRECCIÓN AUTOMÁTICA)
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim().toLowerCase();
            const esAdmin = email === 'admin@parrafosegundo.cl' || email.includes('admin');

            const usuariosGuardados = JSON.parse(localStorage.getItem('usuariosRegistrados') || '{}');
            const usuarioExistente = usuariosGuardados[email];

            const nombreUsuario = usuarioExistente ? usuarioExistente.nombre : (esAdmin ? 'Administrador Sistema' : '');

            const usuario = {
                nombre: nombreUsuario,
                email: email,
                rol: esAdmin ? 'admin' : 'cliente'
            };

            localStorage.setItem('usuarioSesion', JSON.stringify(usuario));
            localStorage.setItem('esAdmin', esAdmin ? 'true' : 'false');

            // Muestra la vista de perfil en la misma página independientemente de si es Admin o Cliente
            verificarEstadoSesion();
        });
    }

    // Botón manual para ir al Admin
    if (btnIrAdmin) {
        btnIrAdmin.addEventListener('click', () => {
            window.location.href = 'admin.html';
        });
    }

    // Cerrar Sesión
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            localStorage.removeItem('usuarioSesion');
            localStorage.removeItem('esAdmin');
            verificarEstadoSesion();
        });
    }

    verificarEstadoSesion();
});