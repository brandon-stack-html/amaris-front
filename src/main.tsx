import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App'; // Importar el componente App
import FundsPage from './pages/FundsPage'; // Asegúrate de importar las páginas
import ClientsPage from './pages/ClientsPage';
import ServicesPage from './pages/ServicesPage';
import ProvidersPage from './pages/ProvidersPage';

// Define las rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "products",
        element: <FundsPage />,
      },
      {
        path: "clients",
        element: <ClientsPage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "providers",
        element: <ProvidersPage />,
      },
    ],
  },
]);

// Renderiza el enrutador
const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <RouterProvider router={router} />
);
