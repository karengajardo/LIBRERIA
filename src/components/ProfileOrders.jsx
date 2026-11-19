export function ProfileOrders({ compras = [], usuario }) {
  const correoUsuario = (typeof usuario === 'string'
    ? usuario
    : usuario?.email || usuario?.correo || '').trim().toLowerCase();
  const pedidos = Array.isArray(compras)
    ? compras.filter((pedido) => (
        correoUsuario
        && typeof pedido?.clienteEmail === 'string'
        && pedido.clienteEmail.trim().toLowerCase() === correoUsuario
      ))
    : [];

  if (pedidos.length === 0) {
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

      {pedidos.map((pedido, index) => {
        const detalleProductos = typeof pedido.detalleProductos === 'string'
          ? pedido.detalleProductos
          : Array.isArray(pedido.detalleProductos)
            ? pedido.detalleProductos.join(', ')
            : '';
        const total = typeof pedido.total === 'number'
          ? `$${pedido.total.toLocaleString('es-CL')}`
          : pedido.total || '—';

        return (
          <div
            key={pedido.id ?? index}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #e1e1e1',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
              <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Pedido #{pedido.id ?? index + 1}</span>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>{pedido.estado}</span>
            </div>

            {pedido.fecha && <p>Fecha: {pedido.fecha}</p>}
            <p>Productos: {detalleProductos || 'Detalle no disponible.'}</p>
            {pedido.direccion && (
              <p>Envío: {pedido.direccion}{pedido.ciudad && `, ${pedido.ciudad}`}{pedido.region && ` (${pedido.region})`}</p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '10px', fontSize: '1.1rem', fontWeight: 'bold' }}>
              <span>Total:</span>
              <span style={{ color: '#e74c3c' }}>{total}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}