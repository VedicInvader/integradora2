import React, { useState, useEffect } from 'react';
import {
  MdSchool,
  MdCloud,
  MdGroups,
  MdContactMail,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdPerson,
} from 'react-icons/md';
import { Menu, X } from 'lucide-react';

import './CSS/AboutScreen.css';

const AboutScreen = () => {
  const [isWeb, setIsWeb] = useState(window.innerWidth > 768);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsWeb(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <div className="container">
      {/* Header */}
      <header className={`navbar ${isWeb ? 'navbar-web' : ''}`}>
        <div className="empty-space" />
      </header>

      {/* Drawer para navegación (solo simulación, sin rutas) */}
      {drawerOpen && !isWeb && (
        <nav
          id="navigation-drawer"
          className="drawer"
          role="navigation"
          aria-label="Navegación principal"
        >
          <ul className="drawer-list">
            <li><a href="#proyecto" onClick={() => setDrawerOpen(false)}>Nuestro Proyecto</a></li>
            <li><a href="#equipo" onClick={() => setDrawerOpen(false)}>Equipo de Desarrollo</a></li>
            <li><a href="#contacto" onClick={() => setDrawerOpen(false)}>Contacto</a></li>
          </ul>
        </nav>
      )}

      {/* Header principal */}
      <section className="header-section">
        <div className="header-content">
          <h1 className="main-title">Sobre Nosotros</h1>
          <p className="main-subtitle">
            Conoce más sobre nuestro sistema meteorológico y el equipo que lo desarrolla
          </p>
        </div>
      </section>

      <main className={`content ${isWeb ? 'content-web' : ''}`}>
        <div className="content-wrapper">
          <section id="proyecto" className="section-header">
            <h2 className="section-title-main">Nuestro Proyecto</h2>
            <p className="section-subtitle">
              Un sistema desarrollado con tecnología de vanguardia para el monitoreo meteorológico
            </p>
          </section>

          <section className="grid-container">
            <article className={`card ${isWeb ? 'card-web' : ''}`}>
              <header className="card-header">
                <MdSchool size={28} color="#0A7764" className="card-icon" />
                <h3 className="card-title">Universidad Tecnológica de Durango</h3>
              </header>
              <p className="card-text">
                La Universidad Tecnológica de Durango es una institución comprometida con la excelencia académica
                y la formación de profesionales capaces de enfrentar los retos del mundo actual.
              </p>
            </article>

            <article className={`card ${isWeb ? 'card-web' : ''}`}>
              <header className="card-header">
                <MdCloud size={28} color="#0A7764" className="card-icon" />
                <h3 className="card-title">Sistema Meteorológico</h3>
              </header>
              <p className="card-text">
                Este sistema fue desarrollado por estudiantes y profesores de la UTD para monitorear las condiciones
                climáticas en tiempo real y proporcionar datos históricos para investigación y análisis.
              </p>
            </article>

            <article id="equipo" className={`card ${isWeb ? 'card-web' : ''}`}>
              <header className="card-header">
                <MdGroups size={28} color="#0A7764" className="card-icon" />
                <h3 className="card-title">Equipo de Desarrollo</h3>
              </header>
              <div className="team-list">
                {[
                  'Solís Guereca Alina Alecxandra',
                  'Sosa Villa Leslie Joselin',
                  'Robles Quezada Jacqueline',
                  'González Espino Marco Antonio',
                  'Delgado Cabrera Miguel Angel',
                ].map((member) => (
                  <div className="team-member" key={member}>
                    <div
                      className="member-avatar"
                      aria-label={`Avatar de ${member}`}
                      role="img"
                    >
                      {member.split(' ')[0].charAt(0)}
                      {member.split(' ')[1]?.charAt(0) || ''}
                    </div>
                    <div className="member-info">
                      <p className="member-name">{member}</p>
                      <p className="member-role">Desarrollador</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article id="contacto" className={`card ${isWeb ? 'card-web' : ''}`}>
              <header className="card-header">
                <MdContactMail size={28} color="#0A7764" className="card-icon" />
                <h3 className="card-title">Contacto</h3>
              </header>
              <div className="contact-list">
                <div className="contact-item">
                  <MdEmail size={24} color="#0A7764" className="contact-icon" />
                  <div className="contact-content">
                    <p className="contact-label">Email</p>
                    <a
                      href="mailto:meteorologia@utd.edu.mx"
                      className="contact-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      meteorologia@utd.edu.mx
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <MdPhone size={24} color="#0A7764" className="contact-icon" />
                  <div className="contact-content">
                    <p className="contact-label">Teléfono</p>
                    <a
                      href="tel:+526181234567"
                      className="contact-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +52 618 123 4567
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <MdLocationOn size={24} color="#0A7764" className="contact-icon" />
                  <div className="contact-content">
                    <p className="contact-label">Dirección</p>
                    <address className="contact-text">
                      Durango - Mezquital, 34308 Gabino Santillán, Dgo.
                    </address>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">© 2023 Sistema Meteorológico UTD - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutScreen;
