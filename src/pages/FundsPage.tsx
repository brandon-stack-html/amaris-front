import Table from '../components/Table';
import { useEffect, useState } from 'react';
import { fetchFundsData, FundsData, Fund } from '../services/fundsService';
import { getClientBalanceByPK } from '../services/clientService';
import { subscribeToFund } from '../services/subscriptionService';
import { cancelFund } from '../services/cancelService';
import { useSearchParams } from "react-router-dom";

const FundsPage = () => {
  const [searchParams] = useSearchParams();
  const client = searchParams.get('client') ?? "1"; // Si no hay 'client', usa "1"

  const [balance, setBalance] = useState(0);
  const [fundsData, setFundsData] = useState<FundsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showErrorCard, setShowErrorCard] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [data, balance] = await Promise.all([
          fetchFundsData(Number(client)),
          getClientBalanceByPK(client),
        ]);
        setFundsData(data);
        setBalance(Number(balance));
      } catch (err) {
        console.error(err);
        setError('Error al cargar los fondos');
        setShowErrorCard(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [client]);

  if (isLoading) return <div>Cargando...</div>;

  const availableFunds = fundsData?.notSubscribedFunds || [];
  const subscribedFunds = fundsData?.subscriptions || [];

  const updateBalance = async () => {
    try {
      const balance = await getClientBalanceByPK(client);
      setBalance(Number(balance));
    } catch (err) {
      console.error('Error al actualizar el saldo:', err);
    }
  };

  const handleFundClick = async (item: typeof availableFunds[0]) => {
    try {
      const response = await subscribeToFund({ userId: client, fundId: item.fundId });
      if (response.status === 200) {
        // Asegúrate de obtener el nuevo objeto que se debe añadir a las suscripciones
        const newFund = { ...item, amount: item.MinimumInvestment, timestamp: new Date().toISOString() };
          
        // Actualiza fundsData de manera correcta
        setFundsData(prevData => {
          // const updatedAvailableFunds = prevData?.notSubscribedFunds.filter(fund => fund.fundId !== item.fundId) || [];
          const newSubscribedFunds = [...(prevData?.subscriptions || []), newFund];
          return {
            ...prevData,
            // notSubscribedFunds: updatedAvailableFunds,
            subscriptions: newSubscribedFunds,
          } as FundsData;
        });

        await updateBalance(); // Actualiza el saldo después de suscribirse
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al suscribirse al fondo');
      }
    } catch (err) {
      console.error('Error en la suscripción:', err);
      setError('Error al suscribirse al fondo');
      setShowErrorCard(true);
    }
  };

  const handleSubscribedClick = async (item: typeof subscribedFunds[0]) => {
    try {
      const response = await cancelFund({ userId: client, fundId: item.fundId });
      if (response.status === 200) {
        // Actualiza fundsData de manera correcta
        setFundsData(prevData => {
          const updatedSubscribedFunds = prevData?.subscriptions.filter(fund => fund.fundId !== item.fundId) || [];
          const newAvailableFunds = [...(prevData?.notSubscribedFunds || []), { ...item }];
          return {
            ...prevData,
            subscriptions: updatedSubscribedFunds,
            notSubscribedFunds: newAvailableFunds,
          } as FundsData;
        });
        await updateBalance(); // Actualiza el saldo después de cancelar la suscripción
      } else {
        throw new Error('No se pudo cancelar la suscripción. Por favor, verifica los datos e inténtalo de nuevo.');
      }
    } catch (err) {
      console.error(err);
      setError('Error al cancelar la suscripción');
      setShowErrorCard(true);
    }
  };

  // Función para cerrar la tarjeta de error
  const closeErrorCard = () => {
    setShowErrorCard(false);
    setError(null); // Resetea el mensaje de error al cerrar
  };

  return (
    <div className="table-container">
      {showErrorCard && error && (
        <div className="error-card">
          <p>{error}</p>
          <button onClick={closeErrorCard}>Cerrar</button>
        </div>
      )}
      <div className="saldo-card">
        <h2>Saldo Disponible: ${balance}</h2>
      </div>
      <h3>Fondos Disponibles</h3>
      <Table<Fund>
        data={availableFunds}
        columns={[
          { header: 'ID', accessor: 'fundId' },
          { header: 'Nombre', accessor: 'name' },
          { header: 'Valor', accessor: 'MinimumInvestment' },
        ]}
        actionLabel="Suscribirse"
        onActionClick={handleFundClick}
      />
      <h3>Fondos Suscritos</h3>
      <Table<Fund>
        data={subscribedFunds}
        columns={[
          { header: 'ID', accessor: 'fundId' },
          { header: 'Valor', accessor: 'amount' },
          { header: 'Fecha de Suscripción', accessor: 'timestamp' },
        ]}
        actionLabel="Cancelar Suscripción"
        onActionClick={handleSubscribedClick}
      />
    </div>
  );
};

export default FundsPage;
