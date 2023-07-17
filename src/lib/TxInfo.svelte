<script>
  let transactionInfo = null;
  let loading = false;
  let searchValue = '';
  let showDetails = false;

  function handleSubmit() {
    loading = true;
    showDetails = false;

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
</script>

<div class="container">
  <h2 class="text-xl font-bold mb-4">Transaction Info</h2>
  <div class="flex mb-4">
    <input
      type="text"
      placeholder="Enter TRX Hash or Sender Address"
      bind:value={searchValue}
      class="mr-2 p-2 border border-gray-300 rounded text-black"
    />
    <button on:click|preventDefault={handleSubmit} class="p-2 bg-blue-500 text-white rounded">Search</button>
  </div>

  {#if loading}
    <p>Loading...</p>
  {:else if transactionInfo && transactionInfo.length > 0}
    <div class="mt-4">
      <h3 class="text-lg font-bold mb-2">Transaction Details</h3>
      <div>
        {#each transactionInfo as transaction}
          <div class="flex mb-2">
            <div class="font-bold">Transaction ID:</div>
            <div class="ml-2">{transaction.txID}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Owner Address:</div>
            <div class="ml-2">{transaction.raw_data.contract[0].parameter.value.owner_address}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Reference Block Hash:</div>
            <div class="ml-2">{transaction.raw_data.ref_block_hash}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Reference Block Bytes:</div>
            <div class="ml-2">{transaction.raw_data.ref_block_bytes}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Reference Block Number:</div>
            <div class="ml-2">{transaction.blockNumber}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Expiration:</div>
            <div class="ml-2">{transaction.raw_data.expiration}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Fee Limit:</div>
            <div class="ml-2">{transaction.raw_data.fee_limit}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Timestamp:</div>
            <div class="ml-2">{transaction.block_timestamp}</div>
          </div>
          <div class="flex mb-2">
            <div class="font-bold">Contract Version:</div>
            <div class="ml-2">{transaction.raw_data.contract[0].type}</div>
          </div>
        {/each}
      </div>
      {#if showDetails}
        <button on:click={() => showDetails = false} class="mt-4 bg-blue-500 text-white rounded p-2">
          Get More Transaction Details
        </button>
      {/if}
    </div>
  {:else if transactionInfo && transactionInfo.length === 0}
    <p>No transactions found.</p>
  {/if}
</div>

<style>
  .container {
    background-color: slate;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    padding: 20px;
    color: white;
  }

  .flex {
    display: flex;
    align-items: center;
  }

  .mb-2 {
    margin-bottom: 0.5rem;
  }

  .ml-2 {
    margin-left: 0.5rem;
  }

  .mt-4 {
    margin-top: 1rem;
  }
</style>
