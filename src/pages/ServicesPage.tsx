// src/pages/ServicesPage.tsx
import Table from '../components/Table';

const ServicesPage = () => {
  const services = [
    { id: 1, name: 'Servicio A', price: 100, status: 'Disponible' },
    { id: 2, name: 'Servicio B', price: 200, status: 'No Disponible' },
    { id: 3, name: 'Servicio C', price: 300, status: 'Disponible' },
    { id: 4, name: 'Servicio D', price: 400, status: 'Disponible' },
  ];

  return (
    <div className="table-container">
      <h3>Servicios</h3>
      <Table
        data={services}
        columns={[
          { header: 'ID', accessor: 'id' },
          { header: 'Nombre', accessor: 'name' },
          { header: 'Precio', accessor: 'price' },
          { header: 'Estado', accessor: 'status' },
        ]}
        actionLabel="Suscribir"
      />
    </div>
  );
};

export default ServicesPage;
