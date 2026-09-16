document.addEventListener('DOMContentLoaded', () => {
    // 1. Inyecta el modal con Login, Registro y Mi Cuenta si no existe
    if (!document.getElementById('modal-login')) {
        const modalHTML = `
        <div id="modal-login" class="modal-overlay">
            <div class="modal-contenedor">
                <button id="btn-cerrar-modal" class="btn-cerrar-modal">&times;</button>
                
                <!-- Pestañas superiores (solo se ven si NO ha iniciado sesión) -->
                <div id="modal-tabs" class="modal-tabs">
                    <button id="tab-login" class="tab-btn active">Iniciar Sesión</button>
                    <button id="tab-registro" class="tab-btn">Registrarse</button>
                </div>

                <!-- VISTA 1: INICIAR SESIÓN -->
                <div id="vista-login">
                    <form id="formulario-login">
                        <div class="form-group">
                            <label for="login-email">Correo Electrónico</label>
                            <input type="email" id="login-email" required placeholder="tucorreo@dominio.cl">
                        </div>
                        <div class="form-group">
                            <label for="login-password">Contraseña</label>
                            <input type="password" id="login-password" required placeholder="********">
                        </div>
                        <button type="submit" class="btn-submit">Ingresar</button>
                        <p class="texto-cambio-vista">
                            ¿No tienes cuenta? <a href="#" id="link-ir-a-registro">Regístrate aquí</a>
                        </p>
                    </form>
                </div>

                <!-- VISTA 2: REGISTRO -->
                <div id="vista-registro" style="display: none;">
                    <form id="formulario-registro">
                        <div class="form-group">
                            <label for="reg-nombre">Nombre Completo</label>
                            <input type="text" id="reg-nombre" required placeholder="Tu nombre y apellido">
                        </div>
                        <div class="form-group">
                            <label for="reg-email">Correo Electrónico</label>
                            <input type="email" id="reg-email" required placeholder="tucorreo@dominio.cl">
                        </div>
                        <div class="form-group">
                            <label for="reg-password">Contraseña</label>
                            <input type="password" id="reg-password" required placeholder="Crea una contraseña">
                        </div>
                        <div class="form-group">
                            <label for="reg-confirm-password">Confirmar Contraseña</label>
                            <input type="password" id="reg-confirm-password" required placeholder="Repite tu contraseña">
                        </div>
                        <button type="submit" class="btn-submit">Crear Cuenta</button>
                        <p class="texto-cambio-vista">
                            ¿Ya tienes una cuenta? <a href="#" id="link-ir-a-login">Inicia sesión</a>
                        </p>
                    </form>
                </div>

                <!-- VISTA 3: MI CUENTA / PERFIL DE USUARIO -->
                <div id="vista-perfil" style="display: none;">
                    <h2 style="text-align: center; margin-bottom: 20px; color: var(--primary-color);">Mi Cuenta</h2>
                    
                    <div class="perfil-bloque">
                        <h3>👤 Datos Personales</h3>
                        <p><strong>Email:</strong> <span id="perfil-email">-</span></p>
                        <p><strong>Tipo de Cuenta:</strong> <span id="perfil-rol">Cliente</span></p>
                    </div>

                    <div class="perfil-bloque">
                        <h3>📍 Direcciones Guardadas</h3>
                        <ul class="lista-perfil">
                            <li><strong>Casa:</strong> Av. Providencia #1234, Depto 402, Santiago</li>
                            <li><strong>Oficina:</strong> Av. Andrés Bello #2688, Las Condes</li>
                        </ul>
                    </div>

                    <div class="perfil-bloque">
                        <h3>📦 Compras Realizadas</h3>
                        <div class="historial-pedidos">
                            <div class="pedido-item">
                                <div>
                                    <strong>Pedido #00124</strong> - <i>10 Sep, 2026</i>
                                    <p style="font-size: 0.85rem; color: #666; margin: 2px 0 0 0;">Cien años de soledad, 1984</p>
                                </div>
                                <span class="badge-estado entregado">Entregado</span>
                            </div>
                            <div class="pedido-item">
                                <div>
                                    <strong>Pedido #00098</strong> - <i>28 Ago, 2026</i>
                                    <p style="font-size: 0.85rem; color: #666; margin: 2px 0 0 0;">El Principito</p>
                                </div>
                                <span class="badge-estado entregado">Entregado</span>
                            </div>
                        </div>
                    </div>

                    <button id="btn-cerrar-sesion" class="btn-submit" style="background-color: #e74c3c; margin-top: 15px;">Cerrar Sesión</button>
                </div>

            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Elementos del DOM
    const modal = document.getElementById('modal-login');
    const btnAbrir = document.getElementById('btn-abrir-login');
    const btnCerrar = document.getElementById('btn-cerrar-modal');

    const tabs = document.getElementById('modal-tabs');
    const tabLogin = document.getElementById('tab-login');
    const tabRegistro = document.getElementById('tab-registro');
    
    const vistaLogin = document.getElementById('vista-login');
    const vistaRegistro = document.getElementById('vista-registro');
    const vistaPerfil = document.getElementById('vista-perfil');

    const linkIrARegistro = document.getElementById('link-ir-a-registro');
    const linkIrALogin = document.getElementById('link-ir-a-login');

    const formLogin = document.getElementById('formulario-login');
    const formRegistro = document.getElementById('formulario-registro');
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');

    // Función para actualizar qué vista mostrar dentro del modal
    function actualizarModalSegunSesion() {
        const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion') || 'null');

        if (usuarioSesion) {
            // Usuario con sesión activa
            tabs.style.display = 'none';
            vistaLogin.style.display = 'none';
            vistaRegistro.style.display = 'none';
            vistaPerfil.style.display = 'block';

            document.getElementById('perfil-email').textContent = usuarioSesion.email;
            document.getElementById('perfil-rol').textContent = usuarioSesion.rol === 'admin' ? 'Administrador ⚙️' : 'Cliente Registrado';
        } else {
            // Usuario sin sesión
            tabs.style.display = 'flex';
            vistaPerfil.style.display = 'none';
            mostrarLogin();
        }
    }

    function mostrarLogin() {
        tabLogin.classList.add('active');
        tabRegistro.classList.remove('active');
        vistaLogin.style.display = 'block';
        vistaRegistro.style.display = 'none';
    }

    function mostrarRegistro() {
        tabRegistro.classList.add('active');
        tabLogin.classList.remove('active');
        vistaRegistro.style.display = 'block';
        vistaLogin.style.display = 'none';
    }

    if (tabLogin) tabLogin.addEventListener('click', mostrarLogin);
    if (tabRegistro) tabRegistro.addEventListener('click', mostrarRegistro);
    if (linkIrARegistro) linkIrARegistro.addEventListener('click', (e) => { e.preventDefault(); mostrarRegistro(); });
    if (linkIrALogin) linkIrALogin.addEventListener('click', (e) => { e.preventDefault(); mostrarLogin(); });

    // Abrir modal y verificar sesión en el momento
    if (btnAbrir) {
        btnAbrir.addEventListener('click', (e) => {
            e.preventDefault();
            actualizarModalSegunSesion();
            modal.classList.add('active');
        });
    }

    if (btnCerrar) {
        btnCerrar.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    // Login Form Event
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim().toLowerCase();
            const esAdmin = email === 'admin@parrafosegundo.cl' || email.includes('admin');

            const usuario = {
                email: email,
                rol: esAdmin ? 'admin' : 'cliente'
            };

            localStorage.setItem('usuarioSesion', JSON.stringify(usuario));
            localStorage.setItem('esAdmin', esAdmin ? 'true' : 'false');

            if (esAdmin) {
                window.location.href = '../html/admin.html';
            } else {
                actualizarModalSegunSesion();
                formLogin.reset();
            }
        });
    }

    // Registro Form Event
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('reg-nombre').value;
            alert(`Cuenta creada exitosamente para ${nombre}. Ya puedes iniciar sesión.`);
            mostrarLogin();
            formRegistro.reset();
        });
    }

    // Cerrar Sesión Event
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            localStorage.removeItem('usuarioSesion');
            localStorage.removeItem('esAdmin');
            actualizarModalSegunSesion();
            modal.classList.remove('active');

            // Si está en admin.html lo redirige a inicio al cerrar sesión
            if (window.location.pathname.includes('admin.html')) {
                window.location.href = 'index.html';
            }
        });
    }
});