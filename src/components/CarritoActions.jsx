export function CarritoActions({ onVaciar }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <h3 style={{ fontFamily: "'Merriweather', serif", color: 'var(--primary-color)' }}>
        Libros seleccionados
      </h3>
      <button className="btn-vaciar" onClick={onVaciar}>
        Vaciar carrito
      </button>
    </div>
  );
}