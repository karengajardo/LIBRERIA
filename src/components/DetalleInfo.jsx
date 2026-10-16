export function DetalleInfo({ libro, onAddToCart }) {
  return (
    <div className="detalle-info">
      <h1 className="detalle-titulo">{libro.titulo}</h1>
      <p className="detalle-autor">{libro.autor}</p>
      
      <p className="detalle-sinopsis">
        {libro.sinopsis || "Señalada como una obra cumbre de la narrativa contemporánea, este título cautiva desde la primera página con una prosa envolvente y personajes inolvidables que marcan un antes y un después en la literatura."}
      </p>

      <div className="detalle-precio">{libro.precio}</div>
      
      <div className="detalle-stock">
        Stock disponible: {libro.stock || "9"} unidades
      </div>

      <button 
        className="btn" 
        style={{ border: 'none', cursor: 'pointer', fontSize: '1.1rem', padding: '15px 35px', width: 'fit-content' }}
        onClick={() => onAddToCart(libro.titulo, libro.precio, libro.imagen || libro.coverUrl)}
      >
        Agregar al carrito
      </button>
    </div>
  );
}