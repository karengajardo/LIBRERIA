// Proteger ruta de administración
const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion') || '{}');
const esAdminFlag = localStorage.getItem('esAdmin') === 'true';

const esAdminValido = esAdminFlag || 
                      usuarioSesion.rol === 'admin' || 
                      (usuarioSesion.email && usuarioSesion.email.includes('admin'));

if (!esAdminValido) {
    alert("Acceso denegado. Debes iniciar sesión como administrador.");
    window.location.href = 'cuenta.html';
}

document.addEventListener("DOMContentLoaded", () => {
    const formAdmin = document.getElementById("form-admin-libro");
    const contenedorLista = document.getElementById("admin-lista-libros");

    // Modal de edición
    const modalEditar = document.getElementById("modal-editar-libro");
    const formEditar = document.getElementById("form-editar-libro");
    const btnCancelarEditar = document.getElementById("btn-cancelar-editar");

    // Renderizar la lista de libros con Stock y botones Modificar/Eliminar
    function renderizarListaAdmin() {
        if (!contenedorLista) return;
        contenedorLista.innerHTML = "";

        if (typeof catalogoLibros === "undefined" || catalogoLibros.length === 0) {
            contenedorLista.innerHTML = "<p>No hay libros registrados en el catálogo.</p>";
            return;
        }

        catalogoLibros.forEach((libro, index) => {
            const stockActual = libro.stock !== undefined ? libro.stock : 10;
            const item = document.createElement("div");
            
            item.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: #fff; padding: 14px 18px; margin-bottom: 12px; border: 1px solid #e2e8f0; border-radius: 8px; flex-wrap: wrap; gap: 10px;";
            
            item.innerHTML = `
                <div style="flex: 1; min-width: 250px;">
                    <div style="font-size: 1.05rem; font-weight: 600; color: #1e293b;">${libro.titulo}</div>
                    <div style="color: #64748b; font-size: 0.9rem;">
                        <span>✍️ ${libro.autor}</span> | 
                        <span>💰 ${libro.precio}</span> | 
                        <strong style="color: ${stockActual > 3 ? '#16a34a' : '#dc2626'};">📦 Stock: ${stockActual} uds.</strong>
                    </div>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button onclick="abrirEditarLibro(${index})" style="background: #2b6cb0; color: white; border: none; padding: 8px 14px; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 0.88rem;">✏️ Editar</button>
                    <button onclick="eliminarLibroSistema(${index})" style="background: #e11d48; color: white; border: none; padding: 8px 14px; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 0.88rem;">🗑️ Eliminar</button>
                </div>
            `;
            contenedorLista.appendChild(item);
        });
    }

    // Agregar nuevo libro
    if (formAdmin) {
        formAdmin.addEventListener("submit", (e) => {
            e.preventDefault();

            const nuevoLibro = {
                titulo: document.getElementById("admin-titulo").value.trim(),
                autor: document.getElementById("admin-autor").value.trim(),
                precio: document.getElementById("admin-precio").value.trim(),
                stock: parseInt(document.getElementById("admin-stock").value) || 0,
                imagen: document.getElementById("admin-imagen").value.trim(),
                categoria: document.getElementById("admin-categoria").value,
                nuevo: document.getElementById("admin-nuevo").checked,
                descripcion: "Libro registrado en el catálogo."
            };

            catalogoLibros.push(nuevoLibro);

            if (typeof guardarLibrosEnStorage === "function") {
                guardarLibrosEnStorage();
            } else {
                localStorage.setItem('catalogoLibros', JSON.stringify(catalogoLibros));
            }

            formAdmin.reset();
            renderizarListaAdmin();
            alert("¡Libro guardado exitosamente!");
        });
    }

    // Abrir ventana para Editar Nombre, Autor o Stock
    window.abrirEditarLibro = function(index) {
        const libro = catalogoLibros[index];
        if (!libro) return;

        document.getElementById("edit-index").value = index;
        document.getElementById("edit-titulo").value = libro.titulo;
        document.getElementById("edit-autor").value = libro.autor;
        document.getElementById("edit-precio").value = libro.precio;
        document.getElementById("edit-stock").value = libro.stock !== undefined ? libro.stock : 10;
        document.getElementById("edit-categoria").value = libro.categoria || "clasicos";
        document.getElementById("edit-imagen").value = libro.imagen || "";

        modalEditar.style.display = "flex";
    };

    // Cancelar/Cerrar Modal de Edición
    if (btnCancelarEditar) {
        btnCancelarEditar.addEventListener("click", () => {
            modalEditar.style.display = "none";
        });
    }

    // Guardar los cambios editados
    if (formEditar) {
        formEditar.addEventListener("submit", (e) => {
            e.preventDefault();
            const index = document.getElementById("edit-index").value;

            catalogoLibros[index].titulo = document.getElementById("edit-titulo").value.trim();
            catalogoLibros[index].autor = document.getElementById("edit-autor").value.trim();
            catalogoLibros[index].precio = document.getElementById("edit-precio").value.trim();
            catalogoLibros[index].stock = parseInt(document.getElementById("edit-stock").value) || 0;
            catalogoLibros[index].categoria = document.getElementById("edit-categoria").value;
            catalogoLibros[index].imagen = document.getElementById("edit-imagen").value.trim();

            if (typeof guardarLibrosEnStorage === "function") {
                guardarLibrosEnStorage();
            } else {
                localStorage.setItem('catalogoLibros', JSON.stringify(catalogoLibros));
            }

            modalEditar.style.display = "none";
            renderizarListaAdmin();
            alert("¡Libro actualizado correctamente!");
        });
    }

    // Eliminar libro
    window.eliminarLibroSistema = function(index) {
        if (confirm(`¿Estás seguro de eliminar "${catalogoLibros[index].titulo}" del sistema?`)) {
            catalogoLibros.splice(index, 1);
            if (typeof guardarLibrosEnStorage === "function") {
                guardarLibrosEnStorage();
            } else {
                localStorage.setItem('catalogoLibros', JSON.stringify(catalogoLibros));
            }
            renderizarListaAdmin();
        }
    };

    renderizarListaAdmin();
});