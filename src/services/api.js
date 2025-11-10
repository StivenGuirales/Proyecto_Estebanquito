import axios from 'axios';

// Configuración base de axios
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  // Login
  login: async (email, contrasena) => {
    try {
      const response = await api.post('/auth/login', { email, contrasena });
      
      if (response.data.success) {
        // Guardar token y datos del usuario en localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error de conexión' };
    }
  },
  
  // Registro
  registro: async (datos) => {
    try {
      const response = await api.post('/auth/registro', datos);
      
      if (response.data.success) {
        // Guardar token y datos del usuario en localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error de conexión' };
    }
  },
  
  // Obtener perfil
  obtenerPerfil: async () => {
    try {
      const response = await api.get('/auth/perfil');
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error de conexión' };
    }
  },
  
  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },
  
  // Verificar si hay sesión activa
  estaAutenticado: () => {
    return !!localStorage.getItem('token');
  },
  
  // Obtener usuario actual del localStorage
  obtenerUsuarioActual: () => {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
};

export default api;