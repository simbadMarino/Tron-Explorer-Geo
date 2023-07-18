export async function getTransactionDetails(id) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'TRON-PRO-API-KEY': '7a11a8ca-bbbf-43d9-a340-272301ad396b' // Replace with your actual API key
      }
    };
  
    const response = await fetch(`https://api.trongrid.io/v1/accounts/${id}/transactions`, options);
    const data = await response.json();
  
    return data.data;
  }
  