import { AdminForm } from '../components/AdminForm';
import { AdminBookItem } from '../components/AdminBookItem';

export function AdminDashboard({
  libros = [],
  onAgregarLibro,
  onEliminarLibro,
  onActualizarLibro,
  onRefrescarCatalogo,
  refrescandoCatalogo = false,
  onLogout
}) {
  return (
    <main className="container" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div className="admin-header" style={{ backgroundColor: '#2c3e50', color: 'white', padding: '30px', borderRadius: '8px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: "'Merriweather', serif", fontSize: '2rem', marginBottom: '5px' }}>
            Panel de Administrador 👑
          </h2>
          <p style={{ margin: 0, opacity: 0.9 }}>Gestión completa de inventario, stock y catálogo de Párrafo Segundo.</p>
        </div>
        <div className="admin-header-actions">
          <button
            type="button"
            onClick={onRefrescarCatalogo}
            disabled={refrescandoCatalogo}
            style={{ backgroundColor: '#3182ce', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {refrescandoCatalogo ? 'Actualizando…' : 'Actualizar catálogo'}
          </button>
          <button
            type="button"
            onClick={onLogout}
            style={{ backgroundColor: '#e74c3c', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Formulario modularizado para agregar libros */}
      <AdminForm onAgregarLibro={onAgregarLibro} />

      {/* Listado de inventario modularizado */}
      <section>
        <h3 style={{ fontFamily: "'Merriweather', serif", color: '#2c3e50', marginBottom: '20px' }}>
          Inventario Actual ({libros.length} libros)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {libros.map((libro, index) => (
            <AdminBookItem 
              key={libro.id ?? index}
              libro={libro} 
              onActualizarLibro={onActualizarLibro}
              onEliminarLibro={onEliminarLibro} 
            />
          ))}
        </div>
      </section>
    </main>
  );
}