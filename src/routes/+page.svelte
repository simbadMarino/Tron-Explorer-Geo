<script>
  import { onMount } from 'svelte';
  import TxTables from '../lib/TxTables.svelte';
  import TxTables2 from '../lib/TxTables2.svelte';
  import TxInfo from '../lib/TxInfo.svelte';
  import IntroWidget from '../lib/IntroWidget.svelte';
  import TxInfoBelow from '../lib/TxInfoBelow.svelte';
  import FindHash from '../lib/FindHash.svelte'; // Import the new component

  let isLoading = true; // Set the initial loading state

  onMount(() => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      isLoading = false; // Set loading state to false when the operation is complete
    }, 3000); // Adjust the duration as needed
  });
</script>

<div class="container w-auto mx-auto h-screen grid grid-cols-2 gap-4 p-4">
  <!-- Render the loading screen based on the loading state -->
  {#if isLoading}
    <div class="loading-screen">
      <img src="/loading.gif" alt="Loading" />
      <h2>Loading...</h2>
    </div>
  {:else}
    <div class="relative">
      <div class="glowing-logo"></div>
      <img src="Tronmane.png" alt="Tronmane" class="h-full w-full object-cover">
    </div>

    <div class="bg-slate">
      <div class="h-half">
        <IntroWidget />
      </div>
      <div class="h-half">
        <TxInfo />
      </div>
    </div>

    <div class="bg-slate border-p">
      <TxTables />
    </div>

    <div class="bg-slate tx-tables-2 max-width: 300px relative">
      <TxTables2 />
    </div>

    <div class="bg-slate h-screen w-screen flex">
      <div>
        <div class="bg-slate">
          <div class="flex">
            <TxInfoBelow />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  {/if}
</div>

<style>
  .loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f8f8;
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
