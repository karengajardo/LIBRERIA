export function CheckoutSummary({ carrito, total }) {
  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #e1e1e1', height: 'fit-content' }}>
      <h3 style={{ fontFamily: "'Merriweather', serif", color: '#2c3e50', marginBottom: '20px' }}>Resumen del pedido</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '300px', overflowY: 'auto', marginBottom: '20px', paddingRight: '5px' }}>
        {carrito.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            <div>
              <h4 style={{ fontSize: '1rem', color: '#333', margin: 0 }}>{item.titulo}</h4>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>Cantidad: {item.cantidad || 1}</span>
            </div>
            <strong style={{ color: '#2c3e50' }}>{item.precio}</strong>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '2px solid #ccc', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold', color: '#2c3e50' }}>
        <span>Total:</span>
        <span style={{ color: '#e74c3c' }}>{total}</span>
      </div>
    </div>
  );
}