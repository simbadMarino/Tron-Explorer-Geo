<script>
  import { onMount, onDestroy } from 'svelte';
  import TronWeb from 'tronweb';
  import { LinkedChart, LinkedLabel, LinkedValue } from "svelte-tiny-linked-charts"

  let block = null;
  let loading = true;
  let data = {};

  const HttpProvider = 'https://api.trongrid.io';
  const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY; // Vite injects env variables with "VITE_" prefix

  const fullNode = new TronWeb.providers.HttpProvider(HttpProvider);
  const solidityNode = new TronWeb.providers.HttpProvider(HttpProvider);
  const eventServer = new TronWeb.providers.HttpProvider(HttpProvider);

  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

  const fetchLatestBlock = async () => {
    try {
      block = await tronWeb.trx.getCurrentBlock();
      if (block.transactions) {
        block.transactions.forEach(transaction => {
          data[transaction.txID] = transaction.raw_data.contract[0].parameter.value.amount;
        });
      }
      loading = false;
    } catch (error) {
      console.error('Error fetching block:', error);
      loading = false;
    }
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

{#if loading}
  <p>Loading...</p>
{:else}
  <div class="container items-center">
    <h2 class="text-xl font-bold mb-4">Latest Tron Block</h2>
    <div class="grid-container">
      <div class="grid-item">
        <p class="label">Block Height:</p>
        <p>{block.block_header.raw_data.number}</p>
      </div>
      <div class="grid-item">
        <p class="label">Number of Transactions:</p>
        <p>{block.transactions.length}</p>
      </div>
      <div class="grid-item">
        <p class="label">Block Date:</p>
        <p>{new Date(block.block_header.raw_data.timestamp).toLocaleDateString()}</p>
      </div>
      <div class="grid-item">
        <p class="label">Block Time:</p>
        <p>{new Date(block.block_header.raw_data.timestamp).toLocaleTimeString()}</p>
      </div>
      <div class="grid-item">
        {#if Object.keys(data).length > 0}
          <LinkedChart {data} />
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .grid-item {
    border: 1px solid black;
    box-shadow: 2px 2px 4px #000;
    padding: 10px;
    background: transparent;
  }

  .label {
    font-weight: bold;
  }
</style>
