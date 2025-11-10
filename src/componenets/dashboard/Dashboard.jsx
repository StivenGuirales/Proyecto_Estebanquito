import { useLocation, Link } from "react-router-dom";
import './Dashboard.css';

function Dashboard (){
    const location = useLocation();    
    const nombreUsuario = location.state?.nombreUsuario || "Usuario"; 
        
    const cerrarSesion = () => {
        alert("Cerrando Sesión...");
        // Redirige al Login
        window.location.href = "/";
    }

    return(
        <div className="contenedorDashboard">
            
            {/* brra lateral de navegación simple */}
            <div className="menuLateral">
                <h2>Estebanquito</h2>
                <p>Hola, **{nombreUsuario}**</p>
                
                {/* menu de navegación a las secciones */}
                <nav>
                    {/* links navegación */}
                    <Link to="/cuentas" className="linkMenu">Mis Cuentas</Link>
                    <Link to="/transacciones" className="linkMenu">Hacer Transacción</Link>
                    <Link to="/prestamos" className="linkMenu">Solicitar Préstamo</Link>
                    <Link to="/reportes" className="linkMenu">Reportes Financieros</Link>
                </nav>

                <button className="botonCerrarSesion" onClick={cerrarSesion}>
                    Cerrar Sesión
                </button>
            </div>

            {/* area principal del contenido */}
            <div className="contenidoPrincipal">
                <h1>Panel Principal (Dashboard)</h1>
                <p>
                    Bienvenido al sistema de banca en línea Estebanquito. 
                    Usa el menú lateral para acceder a tus servicios.
                </p>

                {/* vista previa simple tarjeta de Saldo */}
                <div className="vistaPreviaTarjeta">
                    <h3>Saldo Total Disponible</h3>
                    <p className="saldoValor">$ 1.500.000 COP</p>
                    <p>Último movimiento: Transferencia recibida (+ $250.000)</p>
                </div>

            </div>
        </div>
    );
}
export default Dashboard;