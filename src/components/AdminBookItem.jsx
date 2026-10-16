export function AdminBookItem({ libro, onActualizarStock, onEliminarLibro }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '15px 20px', borderRadius: '8px', border: '1px solid #e1e1e1' }}>
      <div>
        <h4 style={{ margin: 0, color: '#2c3e50', fontSize: '1.1rem' }}>{libro.titulo || libro.title}</h4>
        <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
          {libro.autor || libro.author} — <strong style={{ color: '#e74c3c' }}>{libro.precio || libro.price}</strong>
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Stock:</label>
          <input 
            type="number" 
            value={libro.stock ?? 10} 
            onChange={(e) => onActualizarStock(libro.id, e.target.value)}
            style={{ width: '60px', padding: '5px', textAlign: 'center', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <button 
          onClick={() => onEliminarLibro(libro.id)}
          style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}