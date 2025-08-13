import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, CssBaseline, IconButton, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import InfoIcon from '@mui/icons-material/Info';
import SensorsIcon from '@mui/icons-material/Sensors';
import LockIcon from '@mui/icons-material/AdminPanelSettings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import AppRoutes from '../routes/AppRoutes';
import { useAuth } from '../context/AuthContext';
import './css/Navbar.css';
import Swal from 'sweetalert2';
import logoUTD from '../assets/Logoutd.webp';

const drawerWidth = 280;
const drawerWidthClosed = 72;

const useDrawerAutoClose = (
  isOpen: boolean,
  onClose: () => void,
  drawerRef: React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return;
      
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        const isMenuButton = (event.target as HTMLElement).closest('[data-menu-button]');
        if (!isMenuButton) {
          onClose();
        }
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (window.innerWidth <= 768 || isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose, drawerRef]);
};

const AppNavigator = () => {
  const { isLoggedIn, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const drawerRef = useRef(null);

  useDrawerAutoClose(drawerOpen, () => setDrawerOpen(false), drawerRef);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { path: '/', icon: <HomeIcon />, label: 'Inicio', className: 'home', show: true },
    { path: '/temperatura', icon: <ThermostatIcon />, label: 'Temperatura', className: 'temperature', show: true },
    { path: '/viento', icon: <AirIcon />, label: 'Viento', className: 'wind', show: true },
    { path: '/radiacion', icon: <WbSunnyIcon />, label: 'Radiación Solar', className: 'solar', show: true },
    { path: '/about', icon: <InfoIcon />, label: 'Sobre Nosotros', className: 'about', show: true },
    { path: '/login', icon: <LockIcon />, label: 'Login', className: 'login', show: !isLoggedIn },
    { path: '/sensores', icon: <SensorsIcon />, label: 'Sensores IoT', className: 'sensors', show: isLoggedIn },
    { path: '/admin-dashboard', icon: <LockIcon />, label: 'Agregar Usuarios', className: 'dashboard', show: isLoggedIn },
  ];

  return (
    <Box sx={{ 
      display: 'flex',
      // Ocultar scrollbars globalmente
      '& *': {
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none'
      }
    }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ 
        zIndex: 1300, 
        backgroundColor: '#0A7764', // Color verde original
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
        ml: drawerOpen ? `${drawerWidth}px` : 0,
      }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label={drawerOpen ? 'Cerrar menú lateral' : 'Abrir menú lateral'}
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
            data-menu-button
          >
            {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
            Estación Meteorológica UTD
          </Typography>
        </Toolbar>
      </AppBar>

      {drawerOpen && window.innerWidth <= 768 && (
        <Box
          className="drawer-overlay"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1200,
            opacity: 0,
            animation: 'fadeIn 0.3s ease forwards',
            '@keyframes fadeIn': {
              to: { opacity: 1 }
            },
          }}
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <Drawer
        ref={drawerRef}
        variant="permanent"
        sx={{
          width: drawerOpen ? drawerWidth : drawerWidthClosed,
          flexShrink: 0,
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            width: drawerOpen ? drawerWidth : drawerWidthClosed,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff', // Fondo blanco siempre
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            borderRight: '1px solid rgba(10, 119, 100, 0.1)',
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
            zIndex: drawerOpen ? 1400 : 1200,
            // Ocultar scrollbars en el drawer
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
          },
        }}
      >
        {/* Toolbar con espacio ajustado */}
        <Box sx={{ height: drawerOpen ? '16px' : '64px' }} /> {/* Menos espacio cuando está abierto */}

        {/* Título dinámico cuando drawer está abierto */}
        {drawerOpen && (
          <Box sx={{
            textAlign: 'center',
            padding: '1px 2px 1px 2px',
            
            color: 'white',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '2px'
            }
          }}>
            <Typography 
              variant="h6" 
              sx={{
                fontSize: '1px',
                fontWeight: 600,
               
              }}
            >
            </Typography>
          </Box>
        )}

        {/* Header del Drawer */}
        <Box 
          sx={{
            textAlign: 'center',
            padding: drawerOpen ? '12px 20px 16px 20px' : '12px 10px', // Padding reducido cuando abierto
            background: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid rgba(10, 119, 100, 0.1)',
            marginTop: drawerOpen ? '0px' : '8px' // Sin margen cuando está abierto
          }}
        >
          <img 
            src={logoUTD} 
            alt="Logo UTD" 
            style={{
              width: drawerOpen ? '85px' : '40px', // Ligeramente más pequeño cuando abierto
              height: drawerOpen ? '85px' : '40px',
              margin: drawerOpen ? '0 auto 10px auto' : '0 auto', // Menos margen inferior
              borderRadius: '10px',
              boxShadow: drawerOpen ? '0 4px 20px rgba(10, 119, 100, 0.3)' : '0 2px 12px rgba(10, 119, 100, 0.2)',
              objectFit: 'contain',
              transition: 'all 0.3s ease',
              border: drawerOpen ? '2px solid rgba(10, 119, 100, 0.1)' : 'none'
            }}
          />
          {drawerOpen && (
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h6" 
                sx={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#0A7764',
                  marginBottom: '2px',
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                Sistema Meteorológico
              </Typography>
              <Typography 
                variant="subtitle2" 
                sx={{
                  fontSize: '13px',
                  color: '#50807d',
                  fontWeight: 400,
                  opacity: 0.9
                }}
              >
                Universidad Tecnológica de Durango
              </Typography>
            </Box>
          )}
        </Box>

        {/* Contenido del Drawer */}
        <Box sx={{ 
          flex: 1, 
          overflowY: 'auto',
          // Ocultar scrollbars
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        }}>
          <List sx={{ padding: '8px 0' }}>
            {navItems.filter(item => item.show).map(({ path, icon, label, className }) => (
              <Link
                to={path}
                key={path}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItem
                  button
                  sx={{
                    padding: drawerOpen ? '12px 24px' : '12px 8px',
                    margin: '4px 12px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    justifyContent: drawerOpen ? 'flex-start' : 'center',
                    backgroundColor: location.pathname === path ? 'rgba(10, 119, 100, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(10, 119, 100, 0.08)',
                      transform: drawerOpen ? 'translateX(4px)' : 'scale(1.1)'
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: drawerOpen ? '40px' : 'auto',
                      color: className === 'home' ? '#0A7764' :
                            className === 'temperature' ? '#F39C12' :
                            className === 'wind' ? '#17A2B8' :
                            className === 'solar' ? '#F1C40F' :
                            className === 'about' ? '#62a096' :
                            className === 'login' ? '#6C757D' :
                            className === 'sensors' ? '#28A745' :
                            '#0A7764',
                      justifyContent: 'center',
                      fontSize: drawerOpen ? '24px' : '20px'
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  {drawerOpen && (
                    <ListItemText 
                      primary={label} 
                      sx={{
                        '& .MuiTypography-root': {
                          fontWeight: 500,
                          color: '#2C3E50', // Color de texto original
                          fontSize: '15px'
                        }
                      }}
                    />
                  )}
                </ListItem>
              </Link>
            ))}
          </List>

          {isLoggedIn && (
            <>
              <Divider sx={{ 
                margin: '8px 24px',
                backgroundColor: 'rgba(10, 119, 100, 0.1)'
              }} />
              <ListItem
                button
                onClick={logout}
                sx={{
                  padding: drawerOpen ? '12px 24px' : '12px 8px',
                  margin: '4px 12px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  justifyContent: drawerOpen ? 'flex-start' : 'center',
                  '&:hover': {
                    backgroundColor: 'rgba(176, 0, 32, 0.08)',
                    transform: drawerOpen ? 'translateX(4px)' : 'scale(1.1)'
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: drawerOpen ? '40px' : 'auto', 
                  color: '#B00020', 
                  justifyContent: 'center',
                  fontSize: drawerOpen ? '24px' : '20px'
                }}>
                  <ExitToAppIcon />
                </ListItemIcon>
                {drawerOpen && (
                  <ListItemText 
                    primary="Cerrar Sesión" 
                    sx={{
                      '& .MuiTypography-root': {
                        fontWeight: 500,
                        color: '#B00020',
                        fontSize: '15px'
                      }
                    }}
                  />
                )}
              </ListItem>
            </>
          )}
        </Box>

        {/* Footer del Drawer */}
        {drawerOpen && (
          <Box sx={{ 
            padding: '16px',
            textAlign: 'center',
            borderTop: '1px solid rgba(10, 119, 100, 0.1)'
          }}>
            <Typography variant="caption" sx={{ 
              color: '#6c757d', 
              fontSize: '12px' 
            }}>
              © {new Date().getFullYear()} UTD - Todos los derechos reservados
            </Typography>
          </Box>
        )}
      </Drawer>

      {/* Contenido Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: drawerOpen ? `${drawerWidth}px` : `${drawerWidthClosed}px`,
          transition: 'margin-left 0.3s ease',
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#f5f7fa',
          // Ocultar todas las barras de desplazamiento
          overflow: 'hidden',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        }}
      >
        <AppRoutes />
      </Box>
    </Box>
  );
};

export default AppNavigator;