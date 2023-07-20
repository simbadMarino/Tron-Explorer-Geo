<!-- LoadingScreen.svelte -->
<script>
  export let isLoading;
</script>

<div class="loading-screen" class:visible={isLoading}>
  <!-- Add your loading screen content here -->
  <img src="../static/loading.gif" alt="Loading" />
  <h2>Loading...</h2>
</div>

<style>
  .loading-screen {
    display: none;
  }

  .visible {
    display: block;
  }
</style>
