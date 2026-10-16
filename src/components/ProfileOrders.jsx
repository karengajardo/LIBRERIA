export function ProfileOrders({ compras = [] }) {
  if (compras.length === 0) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Aún no has realizado ninguna compra.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ fontFamily: "'Merriweather', serif", color: '#2c3e50', fontSize: '1.5rem', marginBottom: '10px' }}>
        Historial de Pedidos
      </h3>

      {compras.map((pedido, index) => (
        <div 
          key={index} 
          style={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e1e1e1', 
            borderRadius: '8px', 
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
            <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Pedido #{index + 1}</span>
            <span style={{ color: '#666', fontSize: '0.9rem' }}>{pedido.fecha}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
            {pedido.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                <span>{item.titulo} (Cant: {item.cantidad || 1})</span>
                <span style={{ fontWeight: '500' }}>{item.precio}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '10px', fontSize: '1.1rem', fontWeight: 'bold' }}>
            <span>Total pagado:</span>
            <span style={{ color: '#e74c3c' }}>{pedido.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
}