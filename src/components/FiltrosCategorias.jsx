export function FiltrosCategorias({ categorias, categoriaSeleccionada, onSeleccionarCategoria }) {
  return (
    <div className="filtros-categorias">
      {categorias.map((cat) => (
        <button
          key={cat}
          className={`btn-categoria ${categoriaSeleccionada === cat ? 'activo' : ''}`}
          onClick={() => onSeleccionarCategoria(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}