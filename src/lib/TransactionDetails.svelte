<script>
  import { onMount } from 'svelte';
  import { getTransactionDetails } from '../api'; // import from the correct location

  export let id; // this will be passed in as a prop from the router

  let transactionDetails = null;

  onMount(async () => {
    transactionDetails = await getTransactionDetails(id);
  });
</script>

{#if transactionDetails}
  <div>
    <!-- Display transaction details here -->
  </div>
{:else}
  <div>Loading...</div>
{/if}
