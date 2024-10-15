
export interface Fund {
  fundId: string;
  amount: number;
  timestamp: string;
  name: string;
  MinimumInvestment: number;
}
export interface FundSubcription {
  fundId: string;
  name: string;
  MinimumInvestment: number; 
}



export interface FundsData {
  notSubscribedFunds: Fund[]; 
  subscriptions: Fund[];        
}

export const fetchFundsData = async (clientId: number): Promise<FundsData> => {
  try {
     const response = await fetch(`https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/funds/suscription/${clientId}`);
      
      if (!response.ok) {
          throw new Error('Error al obtener los fondos');
      }

      const data = await response.json();
      
      return {
          notSubscribedFunds: data.notSubscribedFunds as Fund[],
          subscriptions: data.subscriptions as Fund[],
      };
  } catch (error) {
      console.error('Error fetching funds data:', error);
      throw error; 
  }
};

