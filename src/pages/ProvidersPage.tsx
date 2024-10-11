// src/pages/ProvidersPage.tsx
import Table from '../components/Table';

const ProvidersPage = () => {
  const providers = [
    { id: 1, name: 'Proveedor A', contact: 'contactoA@ejemplo.com', phone: '123-456-7890' },
    { id: 2, name: 'Proveedor B', contact: 'contactoB@ejemplo.com', phone: '234-567-8901' },
    { id: 3, name: 'Proveedor C', contact: 'contactoC@ejemplo.com', phone: '345-678-9012' },
    { id: 4, name: 'Proveedor D', contact: 'contactoD@ejemplo.com', phone: '456-789-0123' },
  ];

  return (
    <div className="table-container">
      <h3>Proveedores</h3>
      <Table
        data={providers}
        columns={[
          { header: 'ID', accessor: 'id' },
          { header: 'Nombre', accessor: 'name' },
          { header: 'Contacto', accessor: 'contact' },
          { header: 'Teléfono', accessor: 'phone' },
        ]}
        actionLabel="Suscribir"
      />
    </div>
  );
};

export default ProvidersPage;
