<script>
  import { userInput } from './store.js'; // import the store

  let transactionInfo = null;
  let loading = false;
  let searchValue = '';
  let showDetails = false;

  function handleSubmit() {
    loading = true;
    showDetails = false;

    // Update the store with the user input
    userInput.set(searchValue);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'TRON-PRO-API-KEY': '7a11a8ca-bbbf-43d9-a340-272301ad396b' // Replace with your actual API key
      }
    };

    fetch(`https://api.trongrid.io/v1/accounts/${searchValue}/transactions`, options)
      .then(response => response.json())
      .then(response => {
        transactionInfo = response.data.slice(0, 1);
        loading = false;
        showDetails = true;
        console.log(transactionInfo);
      })
      .catch(err => console.error(err));
  }

  function copyToClipboard() {
    const formattedData = JSON.stringify(transactionInfo, null, 2);
    navigator.clipboard.writeText(formattedData)
      .then(() => {
        console.log('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy to clipboard:', err);
      });
  }
</script>

<div class="container mx-auto p-4 rounded shadow bg-gray-800 text-white">
  <h2 class="text-2xl font-bold mb-4">Last Transaction Info</h2>

  <!-- Search input and button -->
  <div class="flex mb-4">
    <input
      type="text"
      placeholder="Enter Sender Address"
      bind:value={searchValue}
      class="mr-2 p-2 border border-gray-300 rounded text-black"
    />
    <button on:click|preventDefault={handleSubmit} class="p-2 bg-red-800 text-white rounded">Search</button>
  </div>

  <!-- Loading state -->
  {#if loading}
    <p>Loading...</p>
  {:else if transactionInfo && transactionInfo.length > 0}
    <!-- Transaction details -->
    <div class="mt-4">
      <h3 class="text-lg text-red-500 font-bold mb-2">Transaction Details</h3>
      <div>
        {#each transactionInfo as transaction}
          <div class="flex mb-2">
            <div class="font-bold">Transaction ID:</div>
            <div class="ml-2 text-cyan-200">{transaction.txID}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Owner Address:</div>
            <div class="ml-2 text-cyan-200">{transaction.raw_data.contract[0].parameter.value.owner_address}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Reference Block Hash:</div>
            <div class="ml-2 text-cyan-200">{transaction.raw_data.ref_block_hash}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Reference Block Bytes:</div>
            <div class="ml-2 text-cyan-200">{transaction.raw_data.ref_block_bytes}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Reference Block Number:</div>
            <div class="ml-2 text-cyan-200">{transaction.blockNumber}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Expiration:</div>
            <div class="ml-2 text-cyan-200">{transaction.raw_data.expiration}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Timestamp:</div>
            <div class="ml-2 text-cyan-200">{transaction.block_timestamp}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Contract Version:</div>
            <div class="ml-2 text-cyan-200">{transaction.raw_data.contract[0].type}</div>
          </div>
        {/each}
      </div>
      {#if showDetails}
        <button on:click={copyToClipboard} class="mt-4 bg-red-800 text-cyan-200 rounded p-2">
          Copy Results to Clipboard
        </button>
      {/if}
    </div>
  {:else if transactionInfo && transactionInfo.length === 0}
    <p>No transactions found.</p>
  {/if}
</div>
