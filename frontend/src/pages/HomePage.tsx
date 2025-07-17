import React, { useState, useEffect } from 'react';
import { Menu, School, MapPin, Navigation, QrCode, Target, Mountain } from 'lucide-react';

const HomePage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div style={styles.mainContainer}>
      <header style={styles.fixedHeader}>
        <button style={styles.menuButton} onClick={() => console.log('Abrir drawer')}>
          <Menu size={28} color="#fff" />
        </button>
        <div style={styles.headerContent}>
          <School size={24} color="#fff" />
          <span style={styles.universityText}>Universidad Tecnológica de Durango</span>
        </div>
      </header>

      <div style={styles.scrollContainer}>
        <div style={styles.headerSpacer} />

        <section style={styles.infoSection}>
          <div style={styles.locationContainer}>
            <MapPin size={20} color="#0A7764" />
            <span style={styles.locationText}>Estación Meteorológica UTD</span>
          </div>
        </section>

        <section style={styles.stationContainer}>
          <div style={styles.stationCard}>
            <h3 style={styles.sectionTitle}>Detalles de la Estación</h3>
            <div style={styles.stationDetails}>
              <div style={styles.detailRow}>
                <div style={styles.detailItem}>
                  <Navigation size={20} color="#0A7764" />
                  <span style={styles.detailLabel}>Ubicación</span>
                  <span style={styles.detailValue}>UTD Campus</span>
                </div>
                <div style={styles.detailItem}>
                  <QrCode size={20} color="#0A7764" />
                  <span style={styles.detailLabel}>Código</span>
                  <span style={styles.detailValue}>UTD-WS001</span>
                </div>
              </div>
              <div style={styles.detailRow}>
                <div style={styles.detailItem}>
                  <Target size={20} color="#0A7764" />
                  <span style={styles.detailLabel}>Coordenadas</span>
                  <span style={styles.detailValue}>24.027°N, 104.658°O</span>
                </div>
                <div style={styles.detailItem}>
                  <Mountain size={20} color="#0A7764" />
                  <span style={styles.detailLabel}>Altitud</span>
                  <span style={styles.detailValue}>1890 m</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Estilos en linea para asegurar que se apliquen correctamente
const styles = {
  mainContainer: {
    backgroundColor: '#F8F9FA',
    minHeight: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 999,
    overflow: 'auto'
  },
  
  fixedHeader: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    backgroundColor: '#0A7764',
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    zIndex: 1001,
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box'
  },
  
  menuButton: {
    background: 'none',
    border: 'none',
    marginRight: '16px',
    cursor: 'pointer',
    padding: '8px'
  },
  
  headerContent: {
    display: 'flex',
    alignItems: 'center'
  },
  
  universityText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: '10px'
  },
  
  scrollContainer: {
    paddingTop: '100px',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '100vh'
  },
  
  headerSpacer: {
    height: '20px'
  },
  
  infoSection: {
    padding: '20px',
    textAlign: 'center'
  },
  
  locationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15px'
  },
  
  locationText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0A7764',
    marginLeft: '8px'
  },
  
  stationContainer: {
    padding: '0 20px 40px 20px'
  },
  
  stationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #E3E3E3',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
    width: '100%'
  },
  
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#0A7764',
    textAlign: 'center',
    marginBottom: '20px',
    margin: '0 0 20px 0'
  },
  
  stationDetails: {
    marginTop: '10px'
  },
  
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
    gap: '12px'
  },
  
  detailItem: {
    flex: 1,
    backgroundColor: '#F0F4F3',
    borderRadius: '12px',
    padding: '18px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '80px',
    justifyContent: 'center'
  },
  
  detailLabel: {
    fontSize: '12px',
    color: '#5A5A5A',
    display: 'block',
    marginTop: '8px',
    marginBottom: '4px'
  },
  
  detailValue: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#2C2C2C'
  }
};

export default HomePage;