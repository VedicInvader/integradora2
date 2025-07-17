import React, { useState } from 'react';
import { Calendar, Search, Thermometer, Droplets, Sun, TrendingUp } from 'lucide-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Popover } from '@mui/material';
import { es } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { getReadings } from '../services/readingService';
import type { Reading } from '../services/readingService';
import './CSS/TemperaturePage.css';

const TemperaturePage = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [currentPicker, setCurrentPicker] = useState<'start' | 'end'>('start');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [readings, setReadings] = useState<Reading[]>([]);

  const handleOpenPicker = (event: React.MouseEvent<HTMLButtonElement>, pickerType: 'start' | 'end') => {
    setCurrentPicker(pickerType);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePicker = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? 'date-picker-popover' : undefined;

  const formatDate = (date: Date) =>
    date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const formatDateForAPI = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleSearch = async () => {
    if (startDate > endDate) {
      alert('Error: La fecha final debe ser posterior o igual a la fecha inicial.');
      return;
    }
    
    setIsLoading(true);
    setShowResults(false);

    try {
      console.log('Enviando fechas:', formatDateForAPI(startDate), formatDateForAPI(endDate));

      const data = await getReadings(
        1,
        100,
        formatDateForAPI(startDate),
        formatDateForAPI(endDate)
      );
      setReadings(data.docs);
      setShowResults(true);
    } catch (error) {
      alert('Error al obtener datos de temperatura: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateTemperatureData = () => {
    return readings.map(r => ({
      time: new Date(r.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      temp: r.temp_prom,
      humidity: 0,  
      light: 0    
    }));
  };

  const tempData = generateTemperatureData();
  const currentTemp = tempData.length > 0 ? tempData[tempData.length - 1] : null;

  const renderCurrentData = () => {
    if (!currentTemp) return <p>No hay datos para mostrar.</p>;

    return (
      <div className="current-data-grid fade-in">
        <div className="current-data-card">
          <Thermometer className="current-data-icon" size={32} />
          <div className="current-data-label">Temperatura Actual</div>
          <div className="current-data-value">{currentTemp.temp}</div>
          <div className="current-data-unit">°C</div>
          <div className="current-data-description">
            {currentTemp.temp < 15 ? 'Frío' : currentTemp.temp < 25 ? 'Templado' : 'Cálido'}
          </div>
        </div>
        
        <div className="current-data-card">
          <Droplets className="current-data-icon" size={32} />
          <div className="current-data-label">Humedad</div>
          <div className="current-data-value">{currentTemp.humidity}</div>
          <div className="current-data-unit">%</div>
          <div className="current-data-description">
            {currentTemp.humidity < 40 ? 'Baja' : currentTemp.humidity < 70 ? 'Normal' : 'Alta'}
          </div>
        </div>
        
        <div className="current-data-card">
          <Sun className="current-data-icon" size={32} />
          <div className="current-data-label">Luminosidad</div>
          <div className="current-data-value">{currentTemp.light}</div>
          <div className="current-data-unit">lux</div>
          <div className="current-data-description">
            {currentTemp.light < 200 ? 'Baja' : currentTemp.light < 600 ? 'Media' : 'Alta'}
          </div>
        </div>
      </div>
    );
  };

  const renderChart = () => (
    <div className="chart-container slide-up">
      <h3 className="chart-title">Temperatura (°C)</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={tempData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              stroke="#7f8c8d"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#7f8c8d"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #d28c0c',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#d28c0c"
              strokeWidth={3}
              dot={{ 
                fill: '#d28c0c', 
                strokeWidth: 2, 
                stroke: '#fff',
                r: 6
              }}
              activeDot={{ 
                r: 8, 
                stroke: '#d28c0c',
                strokeWidth: 2,
                fill: '#fff'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderDataTable = () => (
    <div className="data-table-container slide-up">
      <div className="data-table-header">
        <h3 className="data-table-title">Resumen de Datos Registrados</h3>
      </div>
      <div className="data-table-columns">
        <div className="data-table-column">Fecha y Hora</div>
        <div className="data-table-column">Temp (°C)</div>
        <div className="data-table-column">Hum (%)</div>
        <div className="data-table-column">Luz (lx)</div>
      </div>
      {readings.length === 0 ? (
        <div className="data-table-empty">
          <TrendingUp className="data-table-empty-icon" />
          <p className="data-table-empty-text">
            Los datos detallados se cargarán aquí una vez procesada la consulta
          </p>
        </div>
      ) : (
        readings.map((r) => (
          <div key={r.id_lectura} className="data-table-row">
            <div className="data-table-column">{new Date(r.timestamp).toLocaleString('es-ES')}</div>
            <div className="data-table-column">{r.temp_prom}</div>
            <div className="data-table-column">--</div> 
            <div className="data-table-column">--</div> 
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="container">
      <div className="content">
        <h1 className="page-title">Datos de Temperatura</h1>
        
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <div className="date-controls-wrapper">
            <div className="date-controls-grid">
              <div className="date-field">
                <label className="date-field-label">Fecha inicial</label>
                <div 
                  className="date-input-wrapper"
                  onClick={(e) => handleOpenPicker(e as any, 'start')}
                >
                  <Calendar className="date-input-icon" size={20} />
                  <span className="date-input-text">{formatDate(startDate)}</span>
                  <span className="date-input-arrow">▼</span>
                </div>
              </div>

              <div className="date-field">
                <label className="date-field-label">Fecha final</label>
                <div 
                  className="date-input-wrapper"
                  onClick={(e) => handleOpenPicker(e as any, 'end')}
                >
                  <Calendar className="date-input-icon" size={20} />
                  <span className="date-input-text">{formatDate(endDate)}</span>
                  <span className="date-input-arrow">▼</span>
                </div>
              </div>
            </div>

            <button className="search-button" onClick={handleSearch} disabled={isLoading}>
              <Search className="search-icon" size={20} />
              {isLoading ? 'Consultando...' : 'Consultar Datos'}
            </button>
          </div>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePicker}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={{ 
              style: { 
                marginTop: 8, 
                borderRadius: 12, 
                boxShadow: '0px 8px 32px rgba(0,0,0,0.12)' 
              } 
            }}
          >
            <DatePicker
              value={currentPicker === 'start' ? startDate : endDate}
              onChange={(newValue) => {
                if (newValue) {
                  if (currentPicker === 'start') {
                    setStartDate(newValue);
                    if (endDate < newValue) setEndDate(newValue);
                  } else {
                    setEndDate(newValue);
                  }
                }
                handleClosePicker();
              }}
              maxDate={new Date()}
              minDate={currentPicker === 'end' ? startDate : undefined}
              disableFuture
            />
          </Popover>
        </LocalizationProvider>

        {isLoading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p className="loading-text">Cargando datos de temperatura...</p>
          </div>
        ) : showResults ? (
          <div className="results-container">
            {renderCurrentData()}
            {renderChart()}
            {renderDataTable()}
          </div>
        ) : (
          <div className="empty-state">
            <Thermometer className="empty-state-icon" />
            <p className="empty-state-text">
              Selecciona un rango de fechas y presiona "Consultar Datos" para visualizar la información de temperatura.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemperaturePage;
