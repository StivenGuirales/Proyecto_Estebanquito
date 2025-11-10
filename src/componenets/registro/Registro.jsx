import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../../services/api';
import '../login/Login.css';

function Registro() {
    const navigate = useNavigate();
    
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [numCuenta, setNumCuenta] = useState('');
    const [tipoCuenta, setTipoCuenta] = useState('ahorros');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleRegistro = async () => {
        // Limpiar errores previos
        setError('');
        
        // Validación básica
        if (!nombre || !email || !contrasena || !numCuenta) {
            setError('Por favor, complete todos los campos.');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor, ingrese un email válido.');
            return;
        }
        
        // Validar contraseña (mínimo 6 caracteres)
        if (contrasena.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        
        setCargando(true);
        
        try {
            // Llamar al servicio de registro
            const response = await authService.registro({
                nombre,
                email,
                contrasena,
                numeroCuenta: numCuenta,
                tipoCuenta
            });
            
            if (response.success) {
                alert(`¡Registro exitoso! Bienvenido ${response.usuario.nombre}`);
                
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
            setError(error.mensaje || 'Error al registrar usuario');
        } finally {
            setCargando(false);
        }
    }

    return (
        <div id="contenedorLogin"> 
            <h1>Registro Estebanquito Bank</h1>
            <h2>Crea tu cuenta</h2>
            
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
                type="text"
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                className="inputLogin" 
                placeholder="Nombre Completo"
                disabled={cargando}
            />
            <input 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="inputLogin" 
                placeholder="Email"
                disabled={cargando}
            />
            <input 
                type="password"
                value={contrasena} 
                onChange={(e) => setContrasena(e.target.value)} 
                className="inputLogin" 
                placeholder="Contraseña (mínimo 6 caracteres)"
                disabled={cargando}
            />
            <input 
                type="text"
                value={numCuenta} 
                onChange={(e) => setNumCuenta(e.target.value)} 
                className="inputLogin" 
                placeholder="Número de Cuenta (10 dígitos)"
                maxLength="10"
                disabled={cargando}
            />
            
            <select 
                value={tipoCuenta} 
                onChange={(e) => setTipoCuenta(e.target.value)}
                className="inputLogin"
                disabled={cargando}
            >
                <option value="ahorros">Cuenta de Ahorros</option>
                <option value="corriente">Cuenta Corriente</option>
            </select>
            
            <br />
            <button 
                className="buttonStyles" 
                onClick={handleRegistro}
                disabled={cargando}
            >
                {cargando ? 'Registrando...' : 'Registrarse'}
            </button>

            <p>
                ¿Ya tienes cuenta? <Link to="/">Volver a Iniciar Sesión</Link>
            </p>
        </div>
    );
}

export default Registro;