import React from 'react';
import { Link } from 'react-router-dom';
import '../dashboard/Dashboard.css'; // Usamos el CSS del Dashboard para el layout

function Cuentas() {
    // Datos de ejemplo para el diseño
    const cuenta = {
        nombre: "Stiven Guirales",
        email: "sguirales@corre.iue.edu.com",
        numero: "123-456-7890",
        tipo: "Ahorros",
        saldo: 1500000.00
    };

    const transaccionesRecientes = [
        { tipo: "Depósito", monto: 500000, fecha: "2025-10-18" },
        { tipo: "Retiro", monto: 100000, fecha: "2025-10-17" },
        { tipo: "Transferencia", monto: 200000, fecha: "2025-10-16" },
    ];

    return (
        <div className="contenedorDashboard">
            {/* El menú lateral (puedes crear un componente aparte, pero por simplicidad lo replicamos) */}
            <div className="menuLateral">
                <h2>Estebanquito Bank</h2>
                <p>Hola, **{cuenta.nombre}**</p>
                <nav>
                    <Link to="/cuentas" className="linkMenu">Mis Cuentas</Link>
                    <Link to="/transacciones" className="linkMenu">Hacer Transacción</Link>
                    <Link to="/prestamos" className="linkMenu">Solicitar Préstamo</Link>
                    <Link to="/reportes" className="linkMenu">Reportes Financieros</Link>
                </nav>
                <button className="botonCerrarSesion">Cerrar Sesión</button>
            </div>

            <div className="contenidoPrincipal">
                <h1>Gestión de Cuentas y Perfil</h1>
                
                <div className="seccionContenido">
                    <h2>Detalles de la Cuenta</h2>
                    <p><strong>Titular:</strong> {cuenta.nombre}</p>
                    <p><strong>Email:</strong> {cuenta.email}</p>
                    <p><strong>Número de Cuenta:</strong> {cuenta.numero}</p>
                    <p><strong>Tipo de Cuenta:</strong> {cuenta.tipo}</p>
                    <p><strong>SALDO ACTUAL:</strong> <span className="saldoValor">${cuenta.saldo.toLocaleString('es-CO')} COP</span></p>
                </div>

                <div className="seccionContenido" style={{marginTop: '30px'}}>
                    <h2>Últimas Transacciones (Vista Rápida)</h2>
                    <table className="tablaHistorial">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transaccionesRecientes.map((t, index) => (
                                <tr key={index}>
                                    <td>{t.fecha}</td>
                                    <td>{t.tipo}</td>
                                    <td style={{ color: t.tipo === 'Retiro' || t.tipo === 'Transferencia' ? 'red' : 'green' }}>
                                        $ {t.monto.toLocaleString('es-CO')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p style={{marginTop: '15px'}}>
                        <Link to="/reportes">Ver historial completo en Reportes</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Cuentas;