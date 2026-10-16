export function CartItem({ libro, onAumentar, onDisminuir, onEliminar }) {
  const idLibro = libro.id || libro.titulo;
  const stockMaximo = libro.stock ?? 10;
  const cantidad = libro.cantidad || 1;
  const sinStock = cantidad >= stockMaximo;

  return (
    <div className="item-carrito">
      {/* Portada e Información */}
      <div className="item-info">
        <img
          src={libro.imagen || libro.coverUrl}
          alt={libro.titulo || libro.title}
          className="item-imagen"
        />
        <div>
          <h4 className="item-titulo">{libro.titulo || libro.title}</h4>
          <p className="item-precio">{libro.precio}</p>
        </div>
      </div>

      {/* Controles de Cantidad y Eliminación */}
      <div className="item-controles">
        <button
          className="btn-cantidad"
          onClick={() => onDisminuir && onDisminuir(idLibro)}
        >
          -
        </button>

        <span>{cantidad}</span>

        <button
          className="btn-cantidad"
          onClick={() => onAumentar && onAumentar(idLibro)}
          disabled={sinStock}
          title={sinStock ? 'Stock máximo alcanzado' : 'Aumentar unidad'}
        >
          +
        </button>

        {onEliminar && (
          <button
            className="btn-eliminar"
            onClick={() => onEliminar(idLibro)}
            title="Eliminar producto"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}