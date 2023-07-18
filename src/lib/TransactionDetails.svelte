<script>
  import { onMount } from 'svelte';
  import { userInput } from './store.js'; // import the store

  let input;
  let transactionDetails = null;

  // Subscribe to the store to get the user input
  userInput.subscribe(value => {
    input = value;
  });

  onMount(async () => {
    // Use the user input to fetch the transaction details
    transactionDetails = await getTransactionDetails(input);
  });
</script>

{#if transactionDetails}
  <div>
    <!-- Display transaction details here -->
  </div>
{:else}
  <div>Loading...</div>
{/if}
