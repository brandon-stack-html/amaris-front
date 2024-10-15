// fundsService.ts
export const cancelFund = async ({ userId, fundId }: { userId: string; fundId: string; }) => {
  const response = await fetch('https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/funds/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, fundId }),
  });

  // Verifica si la respuesta es exitosa
  if (!response.ok) {
      // Lanza un error con el mensaje del servidor, si está disponible
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al cancelar la suscripción');
  }

  // Retorna la respuesta si es exitosa
  return await response.json();
};
