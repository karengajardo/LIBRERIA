export function ContactForm() {
  return (
    <div className="contact-wrapper">
      <div className="contact-form">
        <h2 className="form-title">Envíanos un mensaje</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input type="text" id="nombre" placeholder="Ej. Jane Austen" />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" placeholder="tu@correo.com" />
          </div>
          
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje" rows="4" placeholder="¿En qué te podemos ayudar?"></textarea>
          </div>
          
          <button type="submit" className="btn-submit">Enviar Mensaje</button>
        </form>
      </div>

      <div className="contact-info">
        <h2 className="form-title">Información de la Librería</h2>
        <ul>
          <li>📍 <strong>Dirección:</strong> <a href="https://www.google.com/maps/dir//Catálogo+Librería+-+6+Nte.+455,+2520136+Viña+del+Mar,+Valparaíso/@-33.0328145,-71.5367858,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x9689dde68e7999cb:0x95ee636a3fecc94a!2m2!1d-71.553639!2d-33.0167492?entry=ttu&g_ep=EgoyMDI2MDgyNC4wIKXMDSoASAFQAw%3D%3D">6 Nte. 455, Viña del Mar.</a></li>
          <li>📧 <strong>Email:</strong> parrafosegundo@gmail.com</li>
          <li>🕒 <strong>Horario:</strong> Lunes a Viernes de 10:00 a 19:00 hrs.</li>
        </ul>
      </div>
    </div>
  );
}