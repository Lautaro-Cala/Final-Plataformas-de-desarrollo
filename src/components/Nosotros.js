import React from 'react';
import '../Nosotros.css';
import { FaPhone, FaEnvelope, FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Nosotros = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Acerca de EasyList</h1>
      </header>
      <main className="about-content">
        <section className="about-description">
          <p>
            Bienvenido a <strong>EasyList</strong>, tu solución fácil y eficiente para gestionar tus listas de compras. 
            Nuestra misión es simplificar tus compras y ayudarte a organizar tus productos de manera efectiva.
          </p>
          <p>
            La aplicación te permite crear, gestionar y seguir el progreso de tus listas, asegurando que no olvides 
            ningún artículo importante. Con una interfaz amigable y funcionalidades útiles, EasyList está aquí 
            para hacer tus compras más fáciles.
          </p>
        </section>

        <section className="about-contact">
          <h2>Contacto</h2>
          <div className="contact-info">
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <p>+123 456 7890 (Soporte)</p>
            </div>
            <div className="contact-item">
              <FaWhatsapp className="contact-icon" />
              <p>+123 456 7890 (WhatsApp)</p>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <p>support@easylist.com</p>
            </div>
          </div>
        </section>

        <section className="about-location">
          <h2>Ubicación</h2>
          <div className="location-info">
            <FaMapMarkerAlt className="location-icon" />
            <p>123 Calle Falsa, Ciudad, País</p>
          </div>
        </section>

        <section className="about-hours">
          <h2>Horario de Atención</h2>
          <div className="hours-info">
            <FaClock className="hours-icon" />
            <p>Lunes a Viernes: 9:00 AM - 5:00 PM</p>
          </div>
        </section>

        <section className="about-social">
          <h2>Síguenos en Redes Sociales</h2>
          <div className="social-icons">
            <FaFacebook className="social-icon" />
            <FaInstagram className="social-icon" />
            <FaTwitter className="social-icon" />
          </div>
        </section>

        <p className="about-footer">
          <strong>¡Gracias por usar EasyList!</strong>
        </p>
      </main>
    </div>
  );
};

export default Nosotros;
