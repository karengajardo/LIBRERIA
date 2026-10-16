import { ComunidadSection } from '../components/ComunidadSection';
import { ContactForm } from '../components/ContactForm';

export function Contacto() {
  return (
    <main className="contacto-page">
      {/* Banner Morado */}
      <section className="contacto-banner">
        <h2>Contacto</h2>
        <p>Estamos aquí para responder tus dudas y escucharte.</p>
      </section>

      {/* Componente Modular de Comunidad */}
      <ComunidadSection />

      {/* Componente Modular de Formulario e Info */}
      <ContactForm />
    </main>
  );
}