/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "../components/Table";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchFundsData, Fund } from "../services/fundsService";
import { getClientBalanceByPK } from "../services/clientService";
import { subscribeToFund } from "../services/subscriptionService";
import { cancelFund } from "../services/cancelService";
import { useSearchParams } from "react-router-dom";

const FundsPage = () => {
  const [searchParams] = useSearchParams();
  const client = searchParams.get("client") ?? "1"; // Si no hay 'client', usa "1"

  // Consultar los fondos
  const {
    data: fundsData,
    isLoading: isFundsLoading,
    error: fundsError,
    refetch: refetchFunds,
  } = useQuery({
    queryKey: ["funds", client],
    queryFn: () => fetchFundsData(Number(client)),
    enabled: !!client,
  });

  // Consultar el saldo
  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    error: balanceError,
    refetch: refetchBalance,
  } = useQuery({
    queryKey: ["balance", client],
    queryFn: () => getClientBalanceByPK(client),
    enabled: !!client,
  });

  const [balance, setBalance] = useState(0);
  const [showErrorCard, setShowErrorCard] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para el mensaje de éxito
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (balanceData) {
      setBalance(Number(balanceData));
    }
  }, [balanceData]);

  const subscribeMutation = useMutation({
    mutationFn: subscribeToFund,
    onSuccess: () => {
      refetchBalance();
      refetchFunds();
      setShowSuccessMessage(true); // Mostrar mensaje de éxito
      setTimeout(() => setShowSuccessMessage(false), 3000); // Ocultar mensaje después de 3 segundos
    },
    onError: (error: any) => {
      console.error("Error en la suscripción:", error);
      setError(error.message || "Error al suscribirse al fondo");
      setShowErrorCard(true);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: cancelFund,
    onSuccess: () => {
      refetchBalance();
      refetchFunds();
      setShowSuccessMessage(true); // Mostrar mensaje de éxito al cancelar
      setTimeout(() => setShowSuccessMessage(false), 3000); // Ocultar mensaje después de 3 segundos
    },
    onError: (error: any) => {
      console.error("Error al cancelar la suscripción:", error);
      setError(error.message || "Error al cancelar la suscripción");
      setShowErrorCard(true);
    },
  });

  if (isFundsLoading || isBalanceLoading) return <div>Cargando...</div>;

  // Muestra los errores de las consultas
  if (fundsError) {
    console.error("Error en la consulta de fondos:", fundsError);
    return <div>Error al cargar los fondos: {fundsError.message}</div>;
  }

  if (balanceError) {
    console.error("Error en la consulta de saldo:", balanceError);
    return <div>Error al cargar el saldo: {balanceError.message}</div>;
  }

  const availableFunds = fundsData?.notSubscribedFunds || [];
  const subscribedFunds = fundsData?.subscriptions || [];

  const handleFundClick = async (item: Fund) => {
    await subscribeMutation.mutateAsync({
      userId: client,
      fundId: item.fundId,
    });
  };

  const handleSubscribedClick = async (item: Fund) => {
    await cancelMutation.mutateAsync({ userId: client, fundId: item.fundId });
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
      {showSuccessMessage && (
        <div className="success-message">
          <span role="img" aria-label="success">
            ✅
          </span>{" "}
          {/* Icono de éxito */}
          <p>Correo enviado exitosamente!</p>
        </div>
      )}
      <div className="saldo-card">
        <h2>Saldo Disponible: ${balance}</h2>
      </div>
      <h3>Fondos Disponibles</h3>
      <Table<Fund>
        data={availableFunds}
        columns={[
          { header: "ID", accessor: "fundId" },
          { header: "Nombre", accessor: "name" },
          { header: "Valor", accessor: "MinimumInvestment" },
        ]}
        actionLabel="Suscribirse"
        onActionClick={handleFundClick}
      />
      <h3>Fondos Suscritos</h3>
      <Table<Fund>
        data={subscribedFunds}
        columns={[
          { header: "ID", accessor: "fundId" },
          { header: "Valor", accessor: "amount" },
          { header: "Fecha de Suscripción", accessor: "timestamp" },
        ]}
        actionLabel="Cancelar Suscripción"
        onActionClick={handleSubscribedClick}
      />
    </div>
  );
};

export default FundsPage;
