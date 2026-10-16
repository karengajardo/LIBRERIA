const ciudadesPorRegion = {
  "Arica y Parinacota": ["Arica", "Putre"],
  Tarapacá: ["Iquique", "Alto Hospicio", "Pozo Almonte"],
  Antofagasta: ["Antofagasta", "Calama", "Tocopilla", "Mejillones"],
  Atacama: ["Copiapó", "Vallenar", "Caldera", "Chañaral"],
  Coquimbo: ["La Serena", "Coquimbo", "Ovalle", "Illapel"],
  Valparaíso: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio", "Los Andes"],
  "Metropolitana de Santiago": ["Santiago", "Puente Alto", "Maipú", "Las Condes", "San Bernardo"],
  "Libertador General Bernardo O'Higgins": ["Rancagua", "San Fernando", "Rengo", "Pichilemu"],
  Maule: ["Talca", "Curicó", "Linares", "Constitución"],
  "Ñuble": ["Chillán", "San Carlos", "Bulnes"],
  "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Coronel"],
  "La Araucanía": ["Temuco", "Villarrica", "Angol", "Pucón"],
  "Los Ríos": ["Valdivia", "La Unión", "Río Bueno"],
  "Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Ancud"],
  "Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Puerto Aysén", "Chile Chico"],
  "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Puerto Natales", "Porvenir"]
};

export function CheckoutForm({ formData, onChange, onSubmit, total }) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ fontFamily: "'Merriweather', serif", color: '#2c3e50' }}>Datos de Envío</h3>
      
      <div className="form-group">
        <label htmlFor="direccion" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Dirección de despacho</label>
        <input 
          type="text" 
          id="direccion" 
          name="direccion" 
          required 
          value={formData.direccion} 
          onChange={onChange}
          placeholder="Calle, número, depto." 
          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="region" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Región</label>
        <select
          id="region"
          name="region"
          required
          value={formData.region}
          onChange={onChange}
          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Selecciona una región</option>
          {Object.keys(ciudadesPorRegion).map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="ciudad" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Ciudad</label>
        <select
          id="ciudad"
          name="ciudad"
          required
          value={formData.ciudad}
          onChange={onChange}
          disabled={!formData.region}
          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Selecciona una ciudad</option>
          {(ciudadesPorRegion[formData.region] || []).map((ciudad) => (
            <option key={ciudad} value={ciudad}>{ciudad}</option>
          ))}
        </select>
      </div>

      <button 
        type="submit" 
        style={{ backgroundColor: '#27ae60', color: 'white', padding: '15px', fontSize: '1.1rem', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
      >
        Confirmar y Pagar {total}
      </button>
    </form>
  );
}