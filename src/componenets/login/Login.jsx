import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../../services/api';
import './Login.css';

function Login() { 
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const validateUser = async () => {
        // Limpiar errores previos
        setError('');
        
        // Validación básica
        if (!email || !contrasena) {
            setError('Por favor, ingrese Email y Contraseña.');
            return;
        }
        
        setCargando(true);
        
        try {
            // Llamar al servicio de login
            const response = await authService.login(email, contrasena);
            
            if (response.success) {
                // Login exitoso
                alert(`¡Bienvenido ${response.usuario.nombre}!`);
                
                // Navegar al dashboard con los datos del usuario
                navigate("/dashboard", { 
                    state: { 
                        nombreUsuario: response.usuario.nombre,
                        usuario: response.usuario 
                    } 
                });
            }
        } catch (error) {
            // Mostrar error del servidor o un mensaje genérico
            setError(error.mensaje || 'Error al iniciar sesión');
        } finally {
            setCargando(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            validateUser();
        }
    }

    return (
        <div id="contenedorLogin"> 
            <h1>Bienvenido a Estebanquito Bank</h1>
            <h2>Iniciar Sesión</h2>
            
            {/* Mostrar mensaje de error si existe */}
            {error && (
                <div style={{
                    padding: '10px',
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    borderRadius: '5px',
                    marginBottom: '10px',
                    width: '90%'
                }}>
                    {error}
                </div>
            )}
            
            <input 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                onKeyPress={handleKeyPress}
                className="inputLogin" 
                placeholder="Email Usuario"
                disabled={cargando}
            />
            <br />
            <input 
                type="password"
                value={contrasena} 
                onChange={(e) => setContrasena(e.target.value)} 
                onKeyPress={handleKeyPress}
                className="inputLogin" 
                placeholder="Contraseña"
                disabled={cargando}
            />
            <br />
            
            <button 
                className="buttonStyles" 
                onClick={validateUser}
                disabled={cargando}
            >
                {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>

            {/* Información de usuarios de prueba (quitar en producción) */}
            <div style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#d1ecf1',
                color: '#0c5460',
                borderRadius: '5px',
                width: '90%',
                fontSize: '14px'
            }}>
                <strong>Usuarios de prueba:</strong><br/>
                📧 juan.perez@email.com / 🔑 password123<br/>
                📧 maria.lopez@email.com / 🔑 maria2024
            </div>

            <p>
                ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </p>
        </div>
    );
}

export default Login;