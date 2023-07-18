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
  
  <div class="bg-slate">
    <TxTables />
  </div>
  
  <div class="bg-slate">
    <TxTables2 />
  </div>
</div>
