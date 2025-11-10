import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./componenets/login/Login";
import Dashboard from "./componenets/dashboard/Dashboard";
import Cuentas from "./componenets/cuentas/Cuentas";
import Transacciones from "./componenets/transacciones/Transacciones"; 
import Prestamos from "./componenets/prestamos/Prestamos"; 
import Reportes from "./componenets/reportes/Reportes";
import Registro from "./componenets/registro/Registro";

function App() {
      
 return (
  <BrowserRouter>
  <Routes>
    <Route path = "/" element ={<Login />} />
    <Route path = "/registro" element ={<Registro />} /> {/* Ruta para el registro */}
    <Route path = "/dashboard" element ={<Dashboard />} />         
    <Route path = "/cuentas" element ={<Cuentas />} />
    <Route path = "/transacciones" element ={<Transacciones />} />
    <Route path = "/prestamos" element ={<Prestamos />} />
    <Route path = "/reportes" element ={<Reportes />} />
  </Routes>
  </BrowserRouter>
  )
}

export default App;