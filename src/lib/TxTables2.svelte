<script>
  import { onMount, onDestroy } from 'svelte';
  import TronWeb from 'tronweb';
  import * as d3 from 'd3';

  let block = null;
  let loading = true;
  let data = Array(20).fill(0); // Initialize an array of 20 zeros

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
        data.push(block.transactions.length);
        if (data.length > 20) {
          data.shift(); // Keep only the last 20 transaction counts
        }
      }
      loading = false;

      const svg = d3.select('#chart');
      const width = +svg.attr('width');
      const height = +svg.attr('height');
      const x = d3.scaleBand().range([0, width]).padding(0.1);
      const y = d3.scaleLinear().range([height, 0]);

      const g = svg.append('g');

      g.selectAll('*').remove(); // Clear the chart

      x.domain(data.map((d, i) => i));
      y.domain([0, d3.max(data)]);

      g.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d, i) => x(i))
        .attr('y', d => y(d))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d));

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
  <div class="container items-center">
    <h2 class="text-xl font-bold mb-4">Latest Tron Block</h2>
    <div class="grid-container">
      <div class="grid-item">
        <p class="label">Block Height:</p>
        <p>{block.block_header.raw_data.number}</p>
      </div>
      <div class="grid-item">
        <p class="label">Number of Transactions:</p>
        <p>{block.transactions.length}</p>
      </div>
      <div class="grid-item">
        <p class="label">Block Date:</p>
        <p>{new Date(block.block_header.raw_data.timestamp).toLocaleDateString()}</p>
      </div>
      <div class="grid-item">
        <p class="label">Block Time:</p>
        <p>{new Date(block.block_header.raw_data.timestamp).toLocaleTimeString()}</p>
      </div>
      <div class="grid-item">
        <svg id="chart" width="400" height="200"></svg>
      </div>
    </div>
  </div>
{/if}

<style>
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .grid-item {
    border: 1px solid black;
    box-shadow: 2px 2px 4px #000;
    padding: 10px;
    background: transparent;
  }

  .label {
    font-weight: bold;
  }

  .bar {
    fill: red;
  }
</style>
