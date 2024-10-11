export interface ClientData {
    Balance: string;
    PK: string;
    ContactNumber: string;
    ClientName: string;
    Email: string;
}

export const fetchClientsData = async (): Promise<ClientData[]> => {
    const response = await fetch('https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/resource?resource_type=clients');
    if (!response.ok) {
        throw new Error('Error al cargar los datos de clientes');
    }
    const data: ClientData[] = await response.json();
    return data;
};

export const getClientBalanceByPK = async (clientPK: string): Promise<number | null> => {
    const clients = await fetchClientsData();
    const client = clients.find(client => client.PK === clientPK);
    return client ? Number(client.Balance) : 0;
};
