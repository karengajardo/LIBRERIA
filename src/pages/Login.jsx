import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';

export function Login({ onLoginSuccess, onRegister, redirectTo = '/perfil' }) {
  const navigate = useNavigate();
  const [esRegistro, setEsRegistro] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: ''
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensajeError('');

    if (esRegistro) {
      if (!formData.nombre.trim()) {
        setMensajeError('Ingresa tu nombre completo.');
        return;
      }

      if (formData.password !== formData.confirmarPassword) {
        setMensajeError('Las contraseñas no coinciden.');
        return;
      }

      const registroExitoso = onRegister({
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        password: formData.password
      });
      if (!registroExitoso) {
        setMensajeError('Ya existe una cuenta con ese correo electrónico.');
        return;
      }
    } else if (!onLoginSuccess(formData.email.trim(), formData.password)) {
      setMensajeError('Correo electrónico o contraseña incorrectos.');
      return;
    }

    navigate(redirectTo);
  };

  return (
    <main className="container" style={{ padding: '60px 20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ fontFamily: "'Merriweather', serif", color: '#2c3e50', fontSize: '2.2rem', marginBottom: '20px', textAlign: 'center' }}>
        {esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}
      </h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        {esRegistro
          ? 'Regístrate para guardar y consultar el historial de tus compras.'
          : 'Accede a tu cuenta de Párrafo Segundo para gestionar tus pedidos.'}
      </p>

      <div style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #e1e1e1' }}>
        <LoginForm 
          formData={formData} 
          onChange={handleChange} 
          onSubmit={handleSubmit} 
          esRegistro={esRegistro}
        />
        {mensajeError && (
          <p role="alert" style={{ color: '#c0392b', margin: '16px 0 0', textAlign: 'center' }}>
            {mensajeError}
          </p>
        )}
        <p style={{ textAlign: 'center', margin: '20px 0 0' }}>
          {esRegistro ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'}{' '}
          <button
            type="button"
            onClick={() => {
              setEsRegistro((actual) => !actual);
              setMensajeError('');
            }}
            style={{ border: 'none', background: 'none', color: '#2c3e50', textDecoration: 'underline', cursor: 'pointer', font: 'inherit', fontWeight: 'bold' }}
          >
            {esRegistro ? 'Inicia sesión' : 'Regístrate aquí'}
          </button>
        </p>
      </div>
    </main>
  );
}