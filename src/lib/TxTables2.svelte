<script>
  import { onMount, onDestroy } from 'svelte';
  import TronWeb from 'tronweb';
  import * as d3 from 'd3';

  let block = null;
  let loading = true;
  let data = []; // Initialize an empty array
  let maxVal = 0;

  const HttpProvider = 'https://api.trongrid.io';
  const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY;

  const fullNode = new TronWeb.providers.HttpProvider(HttpProvider);
  const solidityNode = new TronWeb.providers.HttpProvider(HttpProvider);
  const eventServer = new TronWeb.providers.HttpProvider(HttpProvider);

  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

  const fetchLatestBlock = async () => {
    try {
      block = await tronWeb.trx.getCurrentBlock();
      if (block.transactions) {
        const txCount = block.transactions.length;
        data.push(txCount);
        if (data.length > 27) {
          data.shift(); // Keep only the last 27 transaction counts
        }
        if (data.length === 1) {
          maxVal = txCount * 2; // Set the maximum value to be 1.5 times the first value
        }
      }
      loading = false;

      const svg = d3.select('#chart');
      const width = +svg.attr('width');
      const height = +svg.attr('height');

      const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, maxVal])
        .range([height, 0]);

      svg.selectAll('*').remove(); // Clear the chart

      svg.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', (d, i) => x(i))
        .attr('y', d => y(d))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d))
        .attr('fill', 'slate'); // Set the color of the bars to white

    } catch (error) {
      console.error('Error fetching block:', error);
      loading = false;
    }
  };

  let intervalId;

  onMount(async () => {
    fetchLatestBlock();
    intervalId = setInterval(fetchLatestBlock, 900); // Refresh every 0.9 seconds
  });

  onDestroy(() => {
    clearInterval(intervalId); // Clear the interval when the component is destroyed
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else}
  <div class="container mx-auto my-4">
    <h2 class="text-2xl font-bold mb-4">Latest Tron Block</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="border border-black shadow-md p-4 bg-transparent">
        <p class="font-bold">Block Height:</p>
        <p>{block.block_header.raw_data.number}</p>
      </div>
      <div class="border border-black shadow-md p-4 bg-transparent">
        <p class="font-bold">Number of Transactions:</p>
        <p>{block.transactions.length}</p>
      </div>
      <div class="border border-black shadow-md p-4 bg-transparent">
        <p class="font-bold">Block Date:</p>
        <p>{new Date(block.block_header.raw_data.timestamp).toLocaleDateString()}</p>
      </div>
      <div class="border border-black shadow-md p-4 bg-transparent">
        <p class="font-bold">Block Time:</p>
        <p>{new Date(block.block_header.raw_data.timestamp).toLocaleTimeString()}</p>
      </div>
      <div class="border border-black shadow-md p-4 bg-transparent col-span-2">
        <div class="chart-container overflow-x-auto overflow-y-hidden">
          <svg id="chart" width="700" height="300"></svg>
        </div>
        <p class="font-bold mt-2">Relative Block Size:</p>
      </div>
    </div>
  </div>
{/if}
