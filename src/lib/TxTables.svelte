<script>
  import { onMount, onDestroy } from 'svelte';
  import TronWeb from 'tronweb';

  let transactions = [];
  let loading = true;
  let blockHeight = 0;
  let transactionCount = 0;
  let paused = false;

  const HttpProvider = 'https://api.trongrid.io';
  const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY; // Vite injects env variables with "VITE_" prefix

  const fullNode = new TronWeb.providers.HttpProvider(HttpProvider);
  const solidityNode = new TronWeb.providers.HttpProvider(HttpProvider);
  const eventServer = new TronWeb.providers.HttpProvider(HttpProvider);

  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

  const fetchLatestBlock = async () => {
    if (paused) return;

    try {
      const latestBlock = await tronWeb.trx.getCurrentBlock();
      blockHeight = latestBlock.block_header.raw_data.number;
      transactions = latestBlock.transactions.map(transaction => {
        const halfLength = Math.ceil(transaction.txID.length / 2);
        const firstHalf = transaction.txID.substring(0, halfLength);
        return {
          txID: firstHalf,
          senderAddress: transaction.raw_data.contract[0].parameter.value.owner_address
        };
      });
      transactionCount = transactions.length;
      loading = false;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      loading = false;
    }
  };

  const togglePause = () => {
    paused = !paused;
  };

  let intervalId;

  onMount(() => {
    fetchLatestBlock();
    intervalId = setInterval(fetchLatestBlock, 900); // Refresh every 0.9 seconds
  });

  onDestroy(() => {
    clearInterval(intervalId); // Clear the interval when the component is destroyed
  });
</script>

<style>
  .scroll-container {
    max-height: 500px; /* Adjust this value to control the visible height of the container */
    overflow-y: auto;
  }
</style>

{#if loading}
  <p>Loading...</p>
{:else}
  <div class="container items-center">
    <h2 class="text-xl font-bold mb-4">Latest Tron Block Transactions: [Block Height]: {blockHeight} [#TX]: {transactionCount}</h2>
    <div class="scroll-container">
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">Transaction Hash</th>
            <th class="px-4 py-2">Sender Address</th>
          </tr>
        </thead>
        <tbody>
          {#each transactions as transaction}
            <tr>
              <td>{transaction.txID}</td>
              <td>{transaction.senderAddress}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <button on:click={togglePause} class="mt-4 bg-blue-500 text-white rounded p-2">
      {paused ? 'Resume' : 'Pause'}
    </button>
  </div>
{/if}
