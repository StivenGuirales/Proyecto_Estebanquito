import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../dashboard/Dashboard.css';

function Transacciones() {
    
    const [tipo, setTipo] = useState('transferencia');
    const [monto, setMonto] = useState('');
    const [destino, setDestino] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Simulación de Transacción (${tipo}):\nMonto: $${monto}\nDestino/Concepto: ${destino}\n\n¡La lógica real se agregará después!`);
        
        setMonto('');
        setDestino('');
    }

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
                <h1>Realizar Transacciones (Transferencia, Depósito, Retiro)</h1>

                <form onSubmit={handleSubmit} className="formularioSimple">
                    
                    <div className="campoFormulario">
                        <label htmlFor="tipo">Tipo de Operación:</label>
                        <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            <option value="transferencia">Transferencia a otra Cuenta</option>
                            <option value="deposito">Depósito (a mi cuenta)</option>
                            <option value="retiro">Retiro</option>
                        </select>
                    </div>

                    <div className="campoFormulario">
                        <label htmlFor="monto">Monto:</label>
                        <input 
                            type="number" 
                            id="monto" 
                            placeholder="Ej: 50000" 
                            value={monto} 
                            onChange={(e) => setMonto(e.target.value)} 
                            required 
                        />
                    </div>

                    {/* El campo destino solo se muestra si es Transferencia */}
                    {tipo === 'transferencia' && (
                        <div className="campoFormulario">
                            <label htmlFor="destino">Número de Cuenta Destino:</label>
                            <input 
                                type="text" 
                                id="destino" 
                                placeholder="Número de cuenta del destinatario" 
                                value={destino} 
                                onChange={(e) => setDestino(e.target.value)} 
                                required 
                            />
                        </div>
                    )}

                    {/* Para Depósito o Retiro */}
                    {(tipo === 'deposito' || tipo === 'retiro') && (
                        <div className="campoFormulario">
                            <label htmlFor="concepto">Concepto (Opcional):</label>
                            <input 
                                type="text" 
                                id="concepto" 
                                placeholder="Ej: Pago de servicios / Cajero Automático" 
                                value={destino} 
                                onChange={(e) => setDestino(e.target.value)} 
                            />
                        </div>
                    )}


                    <button type="submit" className="botonAccion">
                        Confirmar {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                    </button>
                </form>

            </div>
        </div>
    );
}

export default Transacciones;