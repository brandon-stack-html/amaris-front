// fundsService.ts
  export const cancelFund = async ({ userId, fundId }: { userId: string; fundId: string; }) => {
    const response = await fetch('https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/funds/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, fundId }),
    });
    return response;
  };
  