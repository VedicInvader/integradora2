  import React, { useState } from 'react';
  import {
    Calendar,
    Search,
    Thermometer,
    Download,
    TrendingUp
  } from 'lucide-react';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import { Popover } from '@mui/material';
  import { es } from 'date-fns/locale';
  import { getReadings } from '../services/readingService';
  import type { Reading } from '../services/readingService';
  import TemperatureChart from '../components/LineChart';
  import GenericTable from '../components/Table';
  import * as XLSX from 'xlsx';
  import './CSS/TemperaturePage.css'; // Asegúrate de que este CSS esté bien configurado


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
    };

    const handleSearch = async () => {
      if (startDate > endDate) {
        alert('Error: La fecha final debe ser posterior o igual a la fecha inicial.');
        return;
      }

      setIsLoading(true);
      setShowResults(false);

      try {
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

    const downloadExcel = () => {
      if (readings.length === 0) {
        alert('No hay datos para descargar. Por favor, realice una consulta primero.');
        return;
      }

      const data = readings.map(r => ({
        'Fecha y Hora': new Date(r.timestamp).toLocaleString('es-ES'),
        'Temperatura (°C)': r.ptemp_c_avg,
        
      
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Datos de Temperatura");
      XLSX.writeFile(wb, `datos_temperatura_${formatDateForAPI(startDate)}_${formatDateForAPI(endDate)}.xlsx`);
    };

    const generateTemperatureData = () => {
      return readings.map(r => ({
        time: new Date(r.timestamp).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        temp: r.ptemp_c_avg
      }));
    };

    const tempData = generateTemperatureData();

    return (
      <div className="weather-container">
        <div className="weather-content">
          <div className="weather-header-container">
            <h1 className="weather-page-title">Datos de Temperatura</h1>
            <button
              className="download-button"
              onClick={downloadExcel}
              disabled={readings.length === 0}
            >
              <Download size={18} />
              Descargar Excel
            </button>
          </div>

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
  <div className="weather-controls-wrapper">
    <div className="weather-controls-grid">
      <div className="weather-date-field">
        <label className="weather-date-label">Fecha inicial</label>
        <div className="custom-datepicker">
          <DatePicker
            value={startDate}
            onChange={(newValue) => {
              if (newValue) {
                setStartDate(newValue);
                if (endDate < newValue) setEndDate(newValue);
              }
            }}
            maxDate={new Date()}
            disableFuture
            format="dd/MM/yyyy"
            slots={{
              openPickerIcon: Calendar,
            }}
            slotProps={{
              textField: {
                variant: 'outlined',
                fullWidth: true,
              },
              openPickerButton: {
                sx: {
                  color: '#D78909',
                  borderRadius: '120px',
                },
              },
              inputAdornment: {
                position: 'start',
              },
            }}
            sx={{
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(215, 137, 9, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(215, 137, 9, 0.15)',
    },
    '& fieldset': {
      borderColor: 'rgba(215, 137, 9, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: '#D78909',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#D78909',
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    padding: '14px 14px 14px 0',
    color: '#2c3e50',
    fontWeight: '500',
  },
}}
          />
        </div>
      </div>

      <div className="weather-date-field">
        <label className="weather-date-label">Fecha final</label>
        <div className="custom-datepicker">
          <DatePicker
            value={endDate}
            onChange={(newValue) => {
              if (newValue) {
                setEndDate(newValue);
              }
            }}
            minDate={startDate}
            maxDate={new Date()}
            disableFuture
            format="dd/MM/yyyy"
            slots={{
              openPickerIcon: Calendar,
            }}
            slotProps={{
              textField: {
                variant: 'outlined',
                fullWidth: true,
              },
              openPickerButton: {
                sx: {
                  color: '#D78909',
                },
              },
              inputAdornment: {
                position: 'start',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'rgba(215, 137, 9, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(215, 137, 9, 0.15)',
                },
                '& fieldset': {
                  borderColor: 'rgba(215, 137, 9, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: '#D78909',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#D78909',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputBase-input': {
                padding: '14px 14px 14px 0',
                color: '#2c3e50',
                fontWeight: '500',
              },
            }}
          />
        </div>
      </div>
    </div>

    <button
      className="weather-search-button"
      style={{
        background: 'linear-gradient(135deg, #D78909, #f39c12)',
        color: 'white',
        border: 'none',
        boxShadow: '0 8px 25px rgba(215, 137, 9, 0.3)'
      }}
      onClick={handleSearch}
      disabled={isLoading}
    >
      <Search className="weather-search-icon" size={20} />
      {isLoading ? 'Consultando...' : 'Consultar Datos'}
    </button>
  </div>
</LocalizationProvider>

          {isLoading ? (
            <div className="weather-loading-state">
              <div className="weather-loading-spinner"></div>
              <p className="weather-loading-text">Cargando datos de temperatura...</p>
            </div>
          ) : showResults ? (
            <div className="weather-results-container">
              <TemperatureChart data={tempData} />
              <GenericTable
                data={readings}
                title="Resumen de Temperaturas"
                columns={[
                  {
                    header: 'Fecha y Hora',
                    accessor: (r: { timestamp: string | number | Date; }) => new Date(r.timestamp).toLocaleString('es-ES'),
                  },
                  {
                    header: 'Temp (°C)',
                    accessor: (r: { ptemp_c_avg: number; }) => r.ptemp_c_avg,
                  },
                
                ]}
                emptyIcon={<TrendingUp className="weather-table-empty-icon" />}
                emptyMessage="Los datos se cargarán aquí después de procesar la consulta."
              />
            </div>
          ) : (
            <div className="weather-empty-state">
              <Thermometer className="weather-empty-icon" />
              <p className="weather-empty-text">
                Selecciona un rango de fechas y presiona "Consultar Datos" para visualizar la información de temperatura.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default TemperaturePage;
