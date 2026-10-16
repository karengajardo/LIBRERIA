export function LoginForm({ formData, onChange, onSubmit, esRegistro = false }) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {esRegistro && (
        <div className="form-group">
          <label htmlFor="nombre" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Nombre completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            autoComplete="name"
            value={formData.nombre}
            onChange={onChange}
            placeholder="Tu nombre y apellido"
            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Correo electrónico</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          autoComplete="email"
          value={formData.email} 
          onChange={onChange}
          placeholder="tu@correo.com" 
          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Contraseña</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          required 
          minLength={esRegistro ? 8 : undefined}
          autoComplete={esRegistro ? 'new-password' : 'current-password'}
          value={formData.password} 
          onChange={onChange}
          placeholder="••••••••" 
          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      {esRegistro && (
        <div className="form-group">
          <label htmlFor="confirmarPassword" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Confirmar contraseña</label>
          <input
            type="password"
            id="confirmarPassword"
            name="confirmarPassword"
            required
            minLength={8}
            autoComplete="new-password"
            value={formData.confirmarPassword}
            onChange={onChange}
            placeholder="Repite tu contraseña"
            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
      )}

      <button 
        type="submit" 
        style={{ backgroundColor: '#2c3e50', color: 'white', padding: '15px', fontSize: '1.1rem', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
      >
        {esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}
      </button>
    </form>
  );
}