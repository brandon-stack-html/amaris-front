// fundsService.js
export const subscribeToFund = async (data: unknown) => {
  const response = await fetch('https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/funds/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // Verifica si la respuesta es exitosa
  if (!response.ok) {
      // Lanza un error con el mensaje del servidor, si está disponible
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al suscribirse al fondo');
  }

  // Retorna la respuesta si es exitosa
  return await response.json();
};
