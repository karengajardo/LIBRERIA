import { useState } from 'react';

export function AdminForm({ onAgregarLibro }) {
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: '',
    autor: '',
    precio: '',
    categoria: 'Contemporáneos',
    stock: 10,
    imagen: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoLibro.titulo || !nuevoLibro.precio) return;
    onAgregarLibro(nuevoLibro);
    setNuevoLibro({ titulo: '', autor: '', precio: '', categoria: 'Contemporáneos', stock: 10, imagen: '' });
  };

  return (
    <section style={{ backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '8px', border: '1px solid #e1e1e1', marginBottom: '40px' }}>
      <h3 style={{ fontFamily: "'Merriweather', serif", color: '#2c3e50', marginBottom: '20px' }}>Agregar Nuevo Libro</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Título del libro" 
          value={nuevoLibro.titulo}
          onChange={(e) => setNuevoLibro({...nuevoLibro, titulo: e.target.value})}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="text" 
          placeholder="Autor" 
          value={nuevoLibro.autor}
          onChange={(e) => setNuevoLibro({...nuevoLibro, autor: e.target.value})}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="text" 
          placeholder="Precio (Ej: $15.990)" 
          value={nuevoLibro.precio}
          onChange={(e) => setNuevoLibro({...nuevoLibro, precio: e.target.value})}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="number" 
          placeholder="Stock inicial" 
          value={nuevoLibro.stock}
          onChange={(e) => setNuevoLibro({...nuevoLibro, stock: Number(e.target.value)})}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="text" 
          placeholder="URL de la imagen de portada" 
          value={nuevoLibro.imagen}
          onChange={(e) => setNuevoLibro({...nuevoLibro, imagen: e.target.value})}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', gridColumn: 'span 2' }}
        />
        <button 
          type="submit" 
          style={{ gridColumn: 'span 2', backgroundColor: '#27ae60', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Publicar Libro en el Catálogo
        </button>
      </form>
    </section>
  );
}