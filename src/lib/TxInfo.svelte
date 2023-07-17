<script>
  let transactionInfo = null;
  let loading = false;
  let searchValue = '';

  function handleSubmit() {
  loading = true;

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
      transactionInfo = response.data;
      loading = false;
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
      <dl class="grid grid-cols-2 gap-2">
        {#each transactionInfo as transaction}
          <div>
            <dt>Transaction ID:</dt>
            <dd>{transaction.txID}</dd>
          </div>
          <div>
            <dt>Owner Address:</dt>
            <dd>{transaction.ownerAddress}</dd>
          </div>
          <div>
            <dt>Reference Block Hash:</dt>
            <dd>{transaction.raw_data.ref_block_hash}</dd> <!-- Update the property path -->
          </div>
          <div>
            <dt>Reference Block Bytes:</dt>
            <dd>{transaction.raw_data.ref_block_bytes}</dd> <!-- Update the property path -->
          </div>
          <div>
            <dt>Reference Block Number:</dt>
            <dd>{transaction.raw_data.ref_block_num}</dd> <!-- Update the property path -->
          </div>
          <div>
            <dt>Expiration:</dt>
            <dd>{transaction.raw_data.expiration}</dd> <!-- Update the property path -->
          </div>
          <div>
            <dt>Fee Limit:</dt>
            <dd>{transaction.raw_data.fee_limit}</dd> <!-- Update the property path -->
          </div>
          <div>
            <dt>Timestamp:</dt>
            <dd>{transaction.raw_data.timestamp}</dd> <!-- Update the property path -->
          </div>
          <div>
            <dt>Contract Version:</dt>
            <dd>{transaction.contract_version}</dd> <!-- Update the property path -->
          </div>
        {/each}
      </dl>
    </div>
  {:else if transactionInfo && transactionInfo.length === 0}
    <p>No transactions found.</p>
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
