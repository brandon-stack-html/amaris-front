// // src/services/fundsService.ts

// export interface Fund {
//     fundId: string;
//     amount: number;
//     timestamp: string;
//   }
  
//   export interface NotSubscribedFund {
//     fundId: string;
//     name: string;
//     MinimumInvestment: number;
//   }
  
//   export interface FundsData {
//     subscriptions: Fund[];
//     notSubscribedFunds: NotSubscribedFund[];
//   }
  
//   export const fetchFundsData = async (clientId: number): Promise<FundsData> => {
//     const response = await fetch(`https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/funds/suscription/${clientId}`);
//     if (!response.ok) {
//       throw new Error('Error fetching funds data');
//     }
//     return response. ajson();
//   };
  


// services/fundsService.ts

// Definición de la interfaz Fund que representa un fondo
// export interface Fund {
//   fundId: number;             // ID único del fondo
//   name: string;               // Nombre del fondo
//   MinimumInvestment: number;  // Inversión mínima requerida
// }
export interface Fund {
  fundId: string;
  amount: number;
  timestamp: string; // o Date, según lo que necesites
  name: string;
  MinimumInvestment: number;
}
export interface FundSubcription {
  fundId: string;
  name: string;
  MinimumInvestment: number; // o Date, según lo que necesites
}



// Definición de la interfaz FundsData que contiene los fondos disponibles y suscritos
export interface FundsData {
  notSubscribedFunds: Fund[];  // Fondos no suscritos
  subscriptions: Fund[];        // Fondos suscritos
}

// Función para obtener datos de fondos basados en el clientId
export const fetchFundsData = async (clientId: number): Promise<FundsData> => {
  try {
     const response = await fetch(`https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/funds/suscription/${clientId}`);
      
      if (!response.ok) {
          throw new Error('Error al obtener los fondos');
      }

      const data = await response.json();
      
      // Asegúrate de que los datos sean del tipo correcto
      return {
          notSubscribedFunds: data.notSubscribedFunds as Fund[],
          subscriptions: data.subscriptions as Fund[],
      };
  } catch (error) {
      console.error('Error fetching funds data:', error);
      throw error; // Re-lanza el error para que pueda ser manejado en el componente
  }
};

