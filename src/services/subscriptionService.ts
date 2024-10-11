// fundsService.js
export const subscribeToFund = async (data: unknown) => {
    const response = await fetch('https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/funds/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  };
  