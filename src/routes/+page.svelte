<script>
  import TxTables from '../lib/TxTables.svelte';
  import TxTables2 from '../lib/TxTables2.svelte';
  import TxInfo from '../lib/TxInfo.svelte'; // Import TxInfo component
</script>

<div class="container w-auto mx-auto h-screen grid grid-cols-2 gap-4 p-4">
  <div>
    <img src="Tronmane.png" alt="Tronmane" class="h-full w-full object-cover">
  </div>
  
  <div class="bg-slate">
    <div class="h-half">
      <TxInfo />
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
