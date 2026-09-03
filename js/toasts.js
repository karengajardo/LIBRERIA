// ==========================================
// SISTEMA DE NOTIFICACIONES (TOASTS)
// ==========================================
function mostrarToast(mensaje) {
    let contenedorToast = document.getElementById('toast-container');
    if (!contenedorToast) {
        contenedorToast = document.createElement('div');
        contenedorToast.id = 'toast-container';
        document.body.appendChild(contenedorToast);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="font-size: 1.2rem;">📚</span> ${mensaje}`;

    contenedorToast.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('oculto');
        setTimeout(() => toast.remove(), 300); 
    }, 3000);
}