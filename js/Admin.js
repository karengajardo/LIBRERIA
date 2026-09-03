// js/admin.js

// Proteger ruta de administración
if (localStorage.getItem('esAdmin') !== 'true') {
    alert("Acceso denegado. Debes iniciar sesión como administrador.");
    window.location.href = 'catalogo.html';
}


document.addEventListener("DOMContentLoaded", () => {
    const formAdmin = document.getElementById("form-admin-libro");
    const contenedorLista = document.getElementById("admin-lista-libros");

    function renderizarListaAdmin() {
        if (!contenedorLista) return;
        contenedorLista.innerHTML = "";

        if (catalogoLibros.length === 0) {
            contenedorLista.innerHTML = "<p>No hay libros registrados.</p>";
            return;
        }

        catalogoLibros.forEach((libro, index) => {
            const item = document.createElement("div");
            item.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: #fff; padding: 12px 15px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 6px;";
            
            item.innerHTML = `
                <div>
                    <strong>${libro.titulo}</strong> <span style="color: #666; font-size: 0.9rem;">(${libro.autor})</span> - <b>${libro.precio}</b>
                </div>
                <button onclick="eliminarLibroSistema(${index})" style="background: #e11d48; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: 600;">Eliminar</button>
            `;
            contenedorLista.appendChild(item);
        });
    }

    if (formAdmin) {
        formAdmin.addEventListener("submit", (e) => {
            e.preventDefault();

            const nuevoLibro = {
                titulo: document.getElementById("admin-titulo").value,
                autor: document.getElementById("admin-autor").value,
                precio: document.getElementById("admin-precio").value,
                imagen: document.getElementById("admin-imagen").value,
                categoria: document.getElementById("admin-categoria").value,
                nuevo: document.getElementById("admin-nuevo").checked,
                descripcion: "Libro agregado desde el panel de administración."
            };

            catalogoLibros.push(nuevoLibro);
            guardarLibrosEnStorage();
            formAdmin.reset();
            renderizarListaAdmin();
            alert("¡Libro agregado exitosamente al catálogo!");
        });
    }

    window.eliminarLibroSistema = function(index) {
        if (confirm("¿Estás seguro de eliminar este libro del sistema?")) {
            catalogoLibros.splice(index, 1);
            guardarLibrosEnStorage();
            renderizarListaAdmin();
        }
    };

    renderizarListaAdmin();
});