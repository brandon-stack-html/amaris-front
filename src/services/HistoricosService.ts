
const BASE_URL = 'https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/funds/history';

export const fetchTransactions = async (fundId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${fundId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error; // Lanza el error para que sea manejado en el componente
  }
};
