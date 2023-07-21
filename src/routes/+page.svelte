<script>
  import { onMount } from 'svelte';
  import TxTables from '../lib/TxTables.svelte';            // Middle-left component
  import TxTables2 from '../lib/TxTables2.svelte';          // Middle-right component
  import TxInfo from '../lib/TxInfo.svelte';                // Top-right component
  import IntroWidget from '../lib/IntroWidget.svelte';      // Top-right component
  import TxInfoBelow from '../lib/TxInfoBelow.svelte';      // Bottom-left component
  import FindHash from '../lib/FindHash.svelte';            // Bottom search component

  let isLoading = true; // Set the initial loading state

  onMount(() => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      isLoading = false; // Set loading state to false when the operation is complete
    }, 3000); // Adjust the duration as needed
  });
</script>

<div class="container w-auto mx-auto h-screen grid grid-cols-2 gap-4 p-4">
  {#if isLoading}
    <div class="loading-screen">
      <img src="/loading.gif" alt="Loading" />
      <h2>Scanning Tron Chain...</h2>
    </div>
  {:else}
    <div class="relative">
      <img src="Tronmane.png" alt="Tronmane" class="h-full w-full object-cover">
    </div>

    <div class="bg-slate">
      <div>
        <IntroWidget />
      </div>
      <div>
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
          <div>
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
    background-color: transparent;
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 1;
    transition: opacity 1s ease-in-out;
  }

  .loading-screen img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 1;
    animation: fadeOut 2s forwards;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
