import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Login() { 

    const navigate = useNavigate();

    
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');

    
    const validateUser =() => {
        
        if (email && contrasena) {
            alert("Simulación: Ingreso exitoso");
            
            navigate("/dashboard", { state: { nombreUsuario: email } });
        } else {
            alert("Por favor, ingrese Email y Contraseña.");
        }
    }


    return (
        
        <div id="contenedorLogin"> 
            <h1>Bienvenido a Estebanquito</h1>
            <h2>Iniciar Sesión</h2>
            
            <input 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="inputLogin" 
                placeholder="Email Usuario"
            />
            <br />
            <input 
                type="password" // Tipo 'password' para ocultar
                value={contrasena} 
                onChange={(e) => setContrasena(e.target.value)} 
                className="inputLogin" 
                placeholder="Contraseña"
            />
            <br />
            
            {/* botón a la clase buttonStyles */}
            <button className="buttonStyles" onClick={validateUser}>
                Iniciar Sesión
            </button>

            {/* Enlace para ir al registro */}
            <p>
                ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </p>

        </div>
    );
}
export default Login;