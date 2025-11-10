import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../login/Login.css'; 

function Registro() {
    const navigate = useNavigate();
    
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [numCuenta, setNumCuenta] = useState('');
    const [tipoCuenta, setTipoCuenta] = useState('ahorros'); 

    const handleRegistro = () => {
        
        if (nombre && email && contrasena && numCuenta) {
            alert("Simulación: Registro Exitoso. Volviendo al Login.");
            navigate("/");
        } else {
            alert("Por favor, complete todos los campos.");
        }
    }

    return (
        <div id="contenedorLogin"> 
            <h1>Registro Estebanquito</h1>
            <h2>Crea tu cuenta</h2>
            
            <input 
                type="text"
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                className="inputLogin" 
                placeholder="Nombre Completo"
            />
            <input 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="inputLogin" 
                placeholder="Email"
            />
            <input 
                type="password"
                value={contrasena} 
                onChange={(e) => setContrasena(e.target.value)} 
                className="inputLogin" 
                placeholder="Contraseña"
            />
            <input 
                type="text"
                value={numCuenta} 
                onChange={(e) => setNumCuenta(e.target.value)} 
                className="inputLogin" 
                placeholder="Número de Cuenta (Celular)"
            />
            
            {/* Campo simple de selección (Select) */}
            <select 
                value={tipoCuenta} 
                onChange={(e) => setTipoCuenta(e.target.value)}
                className="inputLogin"
            >
                <option value="ahorros">Cuenta de Ahorros</option>
                <option value="corriente">Cuenta Corriente</option>
            </select>
            
            <br />
            <button className="buttonStyles" onClick={handleRegistro}>
                Registrarse
            </button>

            <p>
                ¿Ya tienes cuenta? <Link to="/">Volver a Iniciar Sesión</Link>
            </p>
        </div>
    );
}
export default Registro;