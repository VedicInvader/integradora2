import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, CssBaseline, IconButton } from '@mui/material';
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

import OpacityIcon from '@mui/icons-material/Opacity';
import SpeedIcon from '@mui/icons-material/Speed';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import AppRoutes from '../routes/AppRoutes';
import { useAuth } from '../context/AuthContext';
import './css/Navbar.css';

import logoUTD from '../assets/Logoutd.webp';

const drawerWidth = 280;
const drawerWidthClosed = 72;

const AppNavigator = () => {
  const { isLoggedIn, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const location = useLocation();

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
    { path: '/admin-dashboard', icon: <LockIcon />, label: 'Dashboard', className: 'dashboard', show: isLoggedIn },

  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1300, backgroundColor: '#0A7764' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label={drawerOpen ? 'Cerrar menú lateral' : 'Abrir menú lateral'}
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Estación Meteorológica UTD
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerOpen ? drawerWidth : drawerWidthClosed,
          flexShrink: 0,
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            width: drawerOpen ? drawerWidth : drawerWidthClosed,
            boxSizing: 'border-box',
            backgroundColor: '#ffffffcc',
            backdropFilter: 'blur(6px)',
            transition: 'width 0.3s ease',
            overflow: 'hidden',
          },
        }}
      >
        <Toolbar />

        {/* Header mejorado con gradiente y animaciones */}
        <Box className={`drawerHeader ${drawerOpen ? 'expanded' : 'collapsed'}`}>
          <img src={logoUTD} alt="UTD Logo" className="logo" />
          {drawerOpen && (
            <Box className="headerText">
              <Typography variant="h6" className="appTitle">
                Sistema Meteorológico
              </Typography>
              <Typography variant="body2" className="appSubtitle">
                Universidad Tecnológica de Durango
              </Typography>
            </Box>
          )}
        </Box>

        {/* Contenedor de navegación con nuevos estilos */}
        <Box className="drawerContent">
          <List sx={{ padding: '8px 0' }}>
            {navItems
              .filter(item => item.show)
              .map(({ path, icon, label, className }) => (
                <Link
                  to={path}
                  className={`drawerItem ${className} ${drawerOpen ? 'expanded' : 'collapsed'} ${
                    location.pathname === path ? 'active' : ''
                  }`}
                  key={path}
                  data-tooltip={label}
                  aria-current={location.pathname === path ? 'page' : undefined}
                >
                  <ListItem
                    sx={{
                      padding: drawerOpen ? '16px 24px' : '16px 12px',
                      margin: drawerOpen ? '2px 16px' : '2px 8px',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      justifyContent: drawerOpen ? 'initial' : 'center',
                      '&:hover': {
                        background:
                          'linear-gradient(135deg, rgba(10, 119, 100, 0.08) 0%, rgba(46, 139, 87, 0.08) 100%)',
                        transform: drawerOpen ? 'translateX(4px)' : 'scale(1.1)',
                        boxShadow: '0 4px 12px rgba(10, 119, 100, 0.15)',
                      },
                      '&:active': {
                        transform: drawerOpen ? 'translateX(2px)' : 'scale(1.05)',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: drawerOpen ? '40px' : 'auto',
                        opacity: 0.8,
                        justifyContent: 'center',
                        '& .MuiSvgIcon-root': {
                          fontSize: '24px',
                          color: '#0A7764',
                        },
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    {drawerOpen && (
                      <ListItemText
                        primary={label}
                        sx={{
                          '& .MuiTypography-root': {
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#2C3E50',
                            letterSpacing: '0.3px',
                          },
                        }}
                      />
                    )}
                  </ListItem>
                </Link>
              ))}

            {/* Separador visual */}
            {drawerOpen && (
              <Box
                className="drawerSeparator"
                sx={{
                  height: '1px',
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(224, 224, 224, 0.5) 50%, transparent 100%)',
                  margin: '8px 24px',
                }}
              />
            )}

            {/* Botón de logout mejorado */}
            {isLoggedIn && (
              <ListItem
                component="button"
                onClick={logout}
                aria-label="Cerrar sesión"
                className={`drawerItem logout ${drawerOpen ? 'expanded' : 'collapsed'}`}
                sx={{
                  padding: drawerOpen ? '16px 24px' : '16px 12px',
                  margin: drawerOpen ? '2px 16px' : '2px 8px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                  width: '100%',
                  textAlign: 'left',
                  justifyContent: drawerOpen ? 'initial' : 'center',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, rgba(176, 0, 32, 0.08) 0%, rgba(220, 53, 69, 0.08) 100%)',
                    transform: drawerOpen ? 'translateX(4px)' : 'scale(1.1)',
                    boxShadow: '0 4px 12px rgba(176, 0, 32, 0.15)',
                  },
                  '&:active': {
                    transform: drawerOpen ? 'translateX(2px)' : 'scale(1.05)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: drawerOpen ? '40px' : 'auto',
                    opacity: 0.8,
                    justifyContent: 'center',
                    '& .MuiSvgIcon-root': {
                      fontSize: '24px',
                      color: '#B00020',
                    },
                  }}
                >
                  <ExitToAppIcon />
                </ListItemIcon>
                {drawerOpen && (
                  <ListItemText
                    primary="Cerrar Sesión"
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#B00020',
                        letterSpacing: '0.3px',
                      },
                    }}
                  />
                )}
              </ListItem>
            )}
          </List>
        </Box>

        {/* Footer mejorado */}
        {drawerOpen && (
          <Box
            className="footer"
            sx={{
              padding: '20px',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              marginTop: 'auto',
              textAlign: 'center',
              borderTop: '1px solid rgba(10, 119, 100, 0.1)',
            }}
          >
            <Typography
              variant="caption"
              className="footerText"
              sx={{
                fontSize: '12px',
                color: '#6c757d',
                marginBottom: '8px',
                fontWeight: 400,
                display: 'block',
              }}
            >
              © {new Date().getFullYear()} UTD - Todos los derechos reservados
            </Typography>
            <Typography
              variant="caption"
              className="footerLink"
              sx={{
                color: '#0A7764',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.3px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#2E8B57',
                  textShadow: '0 1px 2px rgba(10, 119, 100, 0.2)',
                },
              }}
            >
              Más información
            </Typography>
          </Box>
        )}
      </Drawer>

      {/* Contenido principal */}
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
        }}
      >
        <AppRoutes />
      </Box>
    </Box>
  );
};

export default AppNavigator;
