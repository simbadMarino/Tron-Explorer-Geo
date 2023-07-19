<script>
  import { writable } from 'svelte/store';

  let walletAssets = null;
  let loading = false;
  let searchValue = '';

  function handleSubmit() {
    loading = true;
    walletAssets = null;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'TRON-PRO-API-KEY': 'your-api-key' // Replace with your actual API key
      }
    };

    fetch(`https://api.shasta.trongrid.io/v1/assets/${searchValue}`, options)
      .then(response => response.json())
      .then(response => {
        walletAssets = response.data; // Get the wallet assets
        loading = false;
      })
      .catch(err => console.error(err));
  }

  console.log(walletAssets);
</script>

<div class="container mx-auto p-4 rounded shadow bg-slate text-white">
  <h2 class="text-2xl font-bold mb-4">Wallet Assets</h2>
  <div class="flex mb-4">
    <input
      type="text"
      placeholder="Enter Wallet Address"
      bind:value={searchValue}
      class="mr-2 p-2 border border-slate-300 rounded text-black"
    />
    <button on:click|preventDefault={handleSubmit} class="p-2 bg-red-800 text-white rounded">Search</button>
  </div>

  {#if loading}
    <p>Loading...</p>
  {:else if walletAssets}
    <div class="mt-4">
      <h3 class="text-lg  text-red-500 font-bold mb-2">Wallet Assets</h3>
      <div>
       
          {#each walletAssets as asset (asset.id)}
  <div>
    <h4>{asset.name}</h4> <!-- Replace 'name' with the actual property name -->
    <p>{asset.description}</p> <!-- Replace 'description' with the actual property name -->
    <!-- Add more properties as needed -->
    

  </div>
{/each}

        
      </div>
    </div>
  {/if}
</div>
