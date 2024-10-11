import { Link, Outlet } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      {/* Barra lateral */}
      <div className="sidebar">
        <h2>Opciones</h2>
        <ul>
          <li>
            <Link to="/products">Productos</Link>
          </li>
          <li>
            <Link to="/clients">Historicos</Link>
          </li>
      
        </ul>
      </div>

      <div className="content">
        <header className="header">
          <h1>Gestión de Aplicaciones</h1>
          <button className="logout-button">Cerrar Sesión</button>
        </header>

        {/* Sección principal donde se renderizan las rutas */}
        <Outlet />
      </div>
    </div>
  );
};

export default App;
