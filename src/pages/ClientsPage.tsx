/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/HistoricosPage.tsx
import { useEffect, useState } from 'react';
import Table from '../components/Table';
import { fetchTransactions } from '../services/HistoricosService'; // Importar el servicio
import Pagination from '../components/Pagination'; // Importar el componente de paginación
import { useSearchParams } from "react-router-dom";

const HistoricosPage = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchParams] = useSearchParams();
  const client = searchParams.get('client') ?? "1"; // Si no hay 'client', usa "1"

  const transactionsPerPage = 5; // Cantidad de transacciones por página

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      try {
        const data = await fetchTransactions(client); // Cambia '1' por el ID correspondiente
        setTransactions(data);
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Calcular las transacciones actuales a mostrar
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Cambiar página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
      <h3>Transacciones de Clientes</h3>
      <Table
        data={currentTransactions}
        columns={[
          { header: 'Fecha', accessor: 'Timestamp' },
          { header: 'Fondo', accessor: 'FundId' },
          { header: 'Monto', accessor: 'Amount' },
          { header: 'Tipo', accessor: 'Type' },
        ]}
      />
      <Pagination
        transactionsPerPage={transactionsPerPage}
        totalTransactions={transactions.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default HistoricosPage;
