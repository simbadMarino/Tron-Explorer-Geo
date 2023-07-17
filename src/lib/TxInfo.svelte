<script>
  import { onMount } from 'svelte';
  import TronWeb from 'tronweb';

  let searchValue = '';
  let transactionInfo = null;
  let loading = false;

  const HttpProvider = 'https://api.trongrid.io';
  const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY; // Vite injects env variables with "VITE_" prefix

  const fullNode = new TronWeb.providers.HttpProvider(HttpProvider);
  const solidityNode = new TronWeb.providers.HttpProvider(HttpProvider);
  const eventServer = new TronWeb.providers.HttpProvider(HttpProvider);

  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

  const fetchTransactionInfo = async () => {
    try {
      loading = true;
      transactionInfo = null;

      if (!searchValue.trim()) {
        console.error('No transaction hash or address provided');
        loading = false;
        return;
      }

      console.log('Fetching transaction for:', searchValue.trim()); // Add logging
      const transaction = await tronWeb.trx.getTransaction(searchValue.trim());
      console.log('Fetched transaction:', transaction); // Add logging

      if (transaction) {
        // ... rest of your code
      }

      loading = false;
    } catch (error) {
      console.error('Error fetching transaction info:', error);
      loading = false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    fetchTransactionInfo();
  };

  onMount(() => {
    // Perform any initial setup or data fetching if needed
  });
</script>

<div class="container">
  <h2 class="text-xl font-bold mb-4">Transaction Info</h2>
  <div class="flex mb-4">
    <input type="text" placeholder="Enter TRX Hash or Sender Address" bind:value={searchValue} class="mr-2 p-2 border border-gray-300 rounded text-black">
    <button on:click|preventDefault={handleSubmit} class="p-2 bg-blue-500 text-white rounded">Search</button>
  </div>

  {#if loading}
    <p>Loading...</p>
  {:else if transactionInfo}
    <div class="mt-4">
      <h3 class="text-lg font-bold mb-2">Transaction Details</h3>
      <dl class="grid grid-cols-2 gap-2">
        <div>
          <dt>Transaction ID:</dt>
          <dd>{transactionInfo.txID}</dd>
        </div>
        <div>
          <dt>Owner Address:</dt>
          <dd>{transactionInfo.ownerAddress}</dd>
        </div>
        <div>
          <dt>Reference Block Hash:</dt>
          <dd>{transactionInfo.refBlockHash}</dd>
        </div>
        <div>
          <dt>Reference Block Bytes:</dt>
          <dd>{transactionInfo.refBlockBytes}</dd>
        </div>
        <div>
          <dt>Reference Block Number:</dt>
          <dd>{transactionInfo.refBlockNum}</dd>
        </div>
        <div>
          <dt>Expiration:</dt>
          <dd>{transactionInfo.expiration}</dd>
        </div>
        <div>
          <dt>Fee Limit:</dt>
          <dd>{transactionInfo.feeLimit}</dd>
        </div>
        <div>
          <dt>Timestamp:</dt>
          <dd>{transactionInfo.timestamp}</dd>
        </div>
        <div>
          <dt>Contract Version:</dt>
          <dd>{transactionInfo.contractVersion}</dd>
        </div>
      </dl>
    </div>
  {/if}
</div>

<style>
  .container {
    background-color: black;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    padding: 20px;
    color: white;
  }
</style>
