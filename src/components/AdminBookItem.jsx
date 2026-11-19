import { useState } from 'react';

export function AdminBookItem({ libro, onActualizarLibro, onEliminarLibro }) {
  const [libroEditado, setLibroEditado] = useState(null);
  const [guardandoEdicion, setGuardandoEdicion] = useState(false);
  const [errorEdicion, setErrorEdicion] = useState('');

  const abrirEdicion = () => {
    setErrorEdicion('');
    setLibroEditado({
      titulo: libro.titulo || libro.title || '',
      autor: libro.autor || libro.author || '',
      precio: libro.precio || libro.price || '',
      stock: libro.stock ?? 10,
      categoria: libro.categoria || '',
      imagen: libro.imagen || libro.coverUrl || ''
    });
  };

  const actualizarCampo = (campo, valor) => {
    setLibroEditado((actual) => ({ ...actual, [campo]: valor }));
  };

  const guardarEdicion = async (evento) => {
    evento.preventDefault();
    setGuardandoEdicion(true);
    setErrorEdicion('');

    try {
      await onActualizarLibro(libro, {
        ...libroEditado,
        stock: Number(libroEditado.stock)
      });
      setLibroEditado(null);
    } catch (error) {
      setErrorEdicion(error instanceof Error ? error.message : 'No se pudo actualizar el libro.');
    } finally {
      setGuardandoEdicion(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '15px 20px', borderRadius: '8px', border: '1px solid #e1e1e1' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
        <div>
          <h4 style={{ margin: 0, color: '#2c3e50', fontSize: '1.1rem' }}>{libro.titulo || libro.title}</h4>
          <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
            {libro.autor || libro.author} — <strong style={{ color: '#e74c3c' }}>{libro.precio || libro.price}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <strong>Stock: {libro.stock ?? 10}</strong>
          <button
            type="button"
            disabled={guardandoEdicion}
            onClick={abrirEdicion}
            style={{ backgroundColor: '#2b6cb0', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Editar
          </button>
          <button
            type="button"
            disabled={guardandoEdicion}
            onClick={() => onEliminarLibro(libro)}
            style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Eliminar
          </button>
        </div>
      </div>

      {libroEditado && (
        <form onSubmit={guardarEdicion} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '18px' }}>
          <label>
            Título
            <input
              aria-label="Título"
              value={libroEditado.titulo}
              disabled={guardandoEdicion}
              onChange={(e) => actualizarCampo('titulo', e.target.value)}
              required
            />
          </label>
          <label>
            Autor
            <input
              aria-label="Autor"
              value={libroEditado.autor}
              disabled={guardandoEdicion}
              onChange={(e) => actualizarCampo('autor', e.target.value)}
              required
            />
          </label>
          <label>
            Precio
            <input
              aria-label="Precio"
              value={libroEditado.precio}
              disabled={guardandoEdicion}
              onChange={(e) => actualizarCampo('precio', e.target.value)}
              required
            />
          </label>
          <label>
            Stock
            <input
              aria-label="Stock"
              type="number"
              min="0"
              value={libroEditado.stock}
              disabled={guardandoEdicion}
              onChange={(e) => actualizarCampo('stock', e.target.value)}
              required
            />
          </label>
          <label>
            Categoría
            <input
              aria-label="Categoría"
              value={libroEditado.categoria}
              disabled={guardandoEdicion}
              onChange={(e) => actualizarCampo('categoria', e.target.value)}
            />
          </label>
          <label>
            Imagen
            <input
              aria-label="Imagen"
              value={libroEditado.imagen}
              disabled={guardandoEdicion}
              onChange={(e) => actualizarCampo('imagen', e.target.value)}
            />
          </label>
          {errorEdicion && <p role="alert" style={{ gridColumn: '1 / -1', color: '#c0392b' }}>{errorEdicion}</p>}
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={guardandoEdicion}>
              {guardandoEdicion ? 'Guardando…' : 'Guardar cambios'}
            </button>
            <button type="button" disabled={guardandoEdicion} onClick={() => setLibroEditado(null)}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
}