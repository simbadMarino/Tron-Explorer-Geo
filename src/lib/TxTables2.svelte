<script>
  import { onMount, onDestroy } from 'svelte';
  import TronWeb from 'tronweb';

  let transactions = [];
  let loading = true;
  let txHash = '';

  const HttpProvider = 'https://api.trongrid.io';
  const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY; // Vite injects env variables with "VITE_" prefix

  const fullNode = new TronWeb.providers.HttpProvider(HttpProvider);
  const solidityNode = new TronWeb.providers.HttpProvider(HttpProvider);
  const eventServer = new TronWeb.providers.HttpProvider(HttpProvider);

  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

  const fetchLatestBlock = async () => {
    try {
      const latestBlock = await tronWeb.trx.getCurrentBlock();
      txHash = latestBlock.blockID;
      transactions = latestBlock.transactions.map(transaction => {
        const halfLength = Math.ceil(transaction.txID.length / 2);
        const lastHalf = transaction.txID.substring(halfLength);
        const fromAddress = transaction.raw_data.contract[0].parameter.value.owner_address;
        return {
          txID: lastHalf,
          from: fromAddress
        };
      });
      loading = false;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      loading = false;
    }
  };

  let intervalId;

  onMount(() => {
    fetchLatestBlock();
    intervalId = setInterval(fetchLatestBlock, 600); // Fetch every 2 seconds
  });

  onDestroy(() => {
    clearInterval(intervalId); // Clear the interval when the component is destroyed
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else}
  <div class="container items-center">
    <h2 class="text-xl font-bold mb-4">{txHash}</h2>
    <table class="w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Transaction Hash</th>
          <th class="px-4 py-2">From Address</th>
        </tr>
      </thead>
      <tbody>
        {#each transactions as transaction}
          <tr>
            <td>{transaction.txID}</td>
            <td class="text-right">{transaction.from}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
