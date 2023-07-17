<script>
  import { onMount } from 'svelte';
  import TronWeb from 'tronweb';

  let transactions = [];
  let loading = true;

  const HttpProvider = 'https://api.trongrid.io';
  const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY; // Vite injects env variables with "VITE_" prefix

  const fullNode = new TronWeb.providers.HttpProvider(HttpProvider);
  const solidityNode = new TronWeb.providers.HttpProvider(HttpProvider);
  const eventServer = new TronWeb.providers.HttpProvider(HttpProvider);

  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

  const fetchLatestBlock = async () => {
    try {
      const latestBlock = await tronWeb.trx.getCurrentBlock();
      transactions = latestBlock.transactions;
      loading = false;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      loading = false;
    }
  };

  onMount(fetchLatestBlock);
</script>

{#if loading}
  <p>Loading...</p>
{:else}
  <div class="container items-center">
    <h2 class="text-xl  font-bold mb-4">Latest Tron Block Transactions</h2>
    <button class="mb-4 px-4 py-2 bg-blue-500 text-center text-white rounded" on:click={fetchLatestBlock}>Refresh</button>
    <table class="w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Transaction Hash</th>
        </tr>
      </thead>
      <tbody>
        {#each transactions as transaction}
          <tr>
            <td>{transaction.txID}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
