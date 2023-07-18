<script>
  import TxTables from '../lib/TxTables.svelte';
  import TxTables2 from '../lib/TxTables2.svelte';
  import TxInfo from '../lib/TxInfo.svelte';
  import IntroWidget from '../lib/IntroWidget.svelte';
</script>

<style>
  .container {
    position: relative;
  }

  /* Hide TxTables2 when the screen width is less than 1500px */
  @media (max-width: 300px) {
    .tx-tables-2 {
      display: none;
    }
  }
</style>

<div class="container w-auto mx-auto h-screen grid grid-cols-2 gap-4 p-4">
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
  
  <div class="bg-slate tx-tables-2">
    <TxTables2 />
  </div>
</div>
