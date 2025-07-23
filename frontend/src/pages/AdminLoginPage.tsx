import React, { useState } from 'react';
import {
  MdAdminPanelSettings, MdPerson, MdLock, MdVisibility, MdVisibilityOff, MdLogin,
  MdMenu, MdVerifiedUser, MdPeople, MdSettings, MdInsertChart, MdNotifications,
  MdCloudDownload, MdSecurity, MdStorage, MdCheckCircle, MdWarning,
  MdPersonAdd, MdBackup, MdLogout
} from 'react-icons/md';
import './CSS/AdminLoginPage.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

type InputFieldProps = {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  rightIcon?: React.ReactNode;
};

const InputField: React.FC<InputFieldProps> = ({
  icon, placeholder, value, onChange, type = 'text', rightIcon
}) => (
  <div className="input-container">
    {icon}
    <input
      className="input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
    />
    {rightIcon}
  </div>
);

type LoginFormProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  rememberMe: boolean;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({
  username, setUsername, password, setPassword,
  showPassword, setShowPassword, rememberMe, setRememberMe, handleLogin
}) => (
  <div className="login-container">
    <div className="login-header">
      <MdAdminPanelSettings size={60} color="#0A7764" />
      <h2>Iniciar Sesión</h2>
      <p>Accede al panel de administración</p>
    </div>

    <div className="form-container">
      <InputField
        icon={<MdPerson size={24} color="#0A7764" />}
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <InputField
        icon={<MdLock size={24} color="#0A7764" />}
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        rightIcon={
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="icon-button"
            type="button"
          >
            {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
          </button>
        }
      />

      <div className="remember-me">
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Recordar sesión
        </label>
      </div>

      <button className="login-button" onClick={handleLogin}>
        <MdLogin /> Iniciar Sesión
      </button>

      <button className="forgot-password" type="button">¿Olvidaste tu contraseña?</button>
    </div>
  </div>
);

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.token, rememberMe);
        Swal.fire('Inicio de sesión exitoso');
        navigate('/admin-dashboard');
      } else {
        const errorData = await res.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || 'Credenciales incorrectas'
        });
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    setUsername('');
    setPassword('');
    setRememberMe(false);
  };

  return (
    <div className="admin-page-with-menu">
      <aside className="side-menu">
        {/* Aquí puedes agregar tus opciones del menú si lo deseas */}
      </aside>

      {!isLoggedIn ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          handleLogin={handleLogin}
        />
      ) : (
        <div className="logged-in-message">
          <h2>Ya has iniciado sesión.</h2>
          <button
            className="logout"
            onClick={() => {
              Swal.fire({
                title: '¿Cerrar sesión?',
                text: '¿Estás seguro de que deseas cerrar tu sesión?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#0A7764',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, cerrar sesión',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                  handleLogout();
                  Swal.fire({
                    title: 'Sesión cerrada',
                    text: 'Has cerrado sesión exitosamente.',
                    icon: 'success',
                    confirmButtonColor: '#0A7764',
                  });
                }
              });
            }}
          >
            <MdLogout /> Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminLoginPage;
