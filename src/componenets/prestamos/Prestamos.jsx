import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../dashboard/Dashboard.css';

function Prestamos() {
    
    const [monto, setMonto] = useState('');
    const [plazo, setPlazo] = useState('12');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Simulación de Solicitud de Préstamo:\nMonto: $${monto}\nPlazo: ${plazo} meses\n\n¡La simulación es exitosa!`);
        
        setMonto('');
    }
    
    const deuda = {
        montoPendiente: 850000.00,
        cuotasPendientes: 10,
        pagoMensual: 85000.00
    };

    return (
        <div className="contenedorDashboard">
            <div className="menuLateral">
                <h2>Estebanquito</h2>
                <p>Hola, **Usuario**</p>
                <nav>
                    <Link to="/cuentas" className="linkMenu">Mis Cuentas</Link>
                    <Link to="/transacciones" className="linkMenu">Hacer Transacción</Link>
                    <Link to="/prestamos" className="linkMenu">Solicitar Préstamo</Link>
                    <Link to="/reportes" className="linkMenu">Reportes Financieros</Link>
                </nav>
                <button className="botonCerrarSesion">Cerrar Sesión</button>
            </div>

            <div className="contenidoPrincipal">
                <h1>Solicitar Préstamo</h1>

                {/* Sección para ver la deuda actual */}
                <div className="seccionContenido">
                    <h2>Deuda de Préstamo Actual</h2>
                    <div className="mensajeDeuda">
                        <p><strong>Deuda Pendiente:</strong> ${deuda.montoPendiente.toLocaleString('es-CO')} COP</p>
                        <p><strong>Cuotas Restantes:</strong> {deuda.cuotasPendientes}</p>
                        <p><strong>Pago Mensual:</strong> ${deuda.pagoMensual.toLocaleString('es-CO')} COP</p>
                    </div>
                </div>

                {/* Sección para solicitar un nuevo préstamo */}
                <div className="seccionContenido" style={{marginTop: '30px'}}>
                    <h2>Nueva Solicitud</h2>
                    <form onSubmit={handleSubmit} className="formularioSimple">
                        
                        <div className="campoFormulario">
                            <label htmlFor="monto">Monto Deseado (COP):</label>
                            <input 
                                type="number" 
                                id="monto" 
                                placeholder="Ej: 1000000" 
                                value={monto} 
                                onChange={(e) => setMonto(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="campoFormulario">
                            <label htmlFor="plazo">Plazo (Meses):</label>
                            <select id="plazo" value={plazo} onChange={(e) => setPlazo(e.target.value)}>
                                <option value="6">6 meses</option>
                                <option value="12">12 meses</option>
                                <option value="24">24 meses</option>
                                <option value="36">36 meses</option>
                            </select>
                        </div>

                        <button type="submit" className="botonAccion">
                            Solicitar Préstamo
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Prestamos;