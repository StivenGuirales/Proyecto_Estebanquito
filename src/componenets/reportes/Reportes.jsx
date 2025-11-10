import React from 'react';
import { Link } from 'react-router-dom';
import '../dashboard/Dashboard.css';

function Reportes() {
    
    const historico = {
        ingresosTotales: 5800000.00,
        egresosTotales: 3100000.00,
        deudaPendiente: 850000.00
    };

    const historialDetallado = [
        { fecha: "2025-10-18", tipo: "Depósito", concepto: "Pago de nómina", monto: 2000000, estado: "Completado" },
        { fecha: "2025-10-17", tipo: "Transferencia", concepto: "Arriendo", monto: -800000, estado: "Completado" },
        { fecha: "2025-10-10", tipo: "Préstamo", concepto: "Primer desembolso", monto: 1000000, estado: "Aprobado" },
        { fecha: "2025-10-05", tipo: "Retiro", concepto: "Cajero", monto: -50000, estado: "Completado" },
    ];

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
                <h1>Reportes Financieros e Historial</h1>

                {/* Reporte de Totales */}
                <div className="seccionContenido">
                    <h2>Resumen Histórico</h2>
                    <table className="tablaHistorial">
                        <tbody>
                            <tr>
                                <th>Ingresos Totales (Histórico)</th>
                                <td style={{ color: 'green', fontWeight: 'bold' }}>
                                    $ {historico.ingresosTotales.toLocaleString('es-CO')} COP
                                </td>
                            </tr>
                            <tr>
                                <th>Egresos Totales (Histórico)</th>
                                <td style={{ color: 'red', fontWeight: 'bold' }}>
                                    $ {historico.egresosTotales.toLocaleString('es-CO')} COP
                                </td>
                            </tr>
                            <tr>
                                <th>Deuda Pendiente</th>
                                <td style={{ color: 'orange', fontWeight: 'bold' }}>
                                    $ {historico.deudaPendiente.toLocaleString('es-CO')} COP
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Historial Detallado */}
                <div className="seccionContenido" style={{marginTop: '30px'}}>
                    <h2>Historial Detallado de Movimientos</h2>
                    <table className="tablaHistorial">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Concepto</th>
                                <th>Monto</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historialDetallado.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.fecha}</td>
                                    <td>{item.tipo}</td>
                                    <td>{item.concepto}</td>
                                    <td style={{ color: item.monto > 0 ? 'green' : 'red' }}>
                                        $ {item.monto.toLocaleString('es-CO')}
                                    </td>
                                    <td>{item.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Reportes;