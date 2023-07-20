<script>
  import { onMount, afterUpdate } from 'svelte';
  import * as d3 from 'd3';
  import axios from 'axios';

  let data;
  let svg;
  let maxVal = 0;

  onMount(async () => {
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {
        interval: '5min',
        function: 'TIME_SERIES_INTRADAY',
        symbol: 'TRX',
        datatype: 'json',
        output_size: 'compact'
      },
      headers: {
        'X-RapidAPI-Key': '4064815201msh3a12cd8c90799b4p1a7446jsn536df58cd3b1',
        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const timeSeries = response.data['Time Series (5min)'];

      // Convert the time series object into an array of objects with 'time' and 'price' properties
      data = Object.entries(timeSeries).map(([time, item]) => ({
        time: new Date(time),
        price: parseFloat(item['4. close'])
      }));

      if (data.length === 1) {
        maxVal = data[0].price * 2; // Set the maximum value to be 1.5 times the first value
      }

    } catch (error) {
      console.error(error);
    }
  });

  afterUpdate(() => {
    if (data) {
      drawGraph(data);
    }
  });

  function drawGraph(data) {
    // Create a D3 selection from the SVG element
    const svgD3 = d3.select(svg);

    // Get the width and height of the SVG element
    const width = svg.clientWidth;
    const height = svg.clientHeight;

    const x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, maxVal])
      .range([height, 0]);

    svgD3.selectAll('*').remove(); // Clear the chart

    svgD3.selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d.price))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.price))
      .attr('fill', 'slate'); // Set the color of the bars to white
}

</script>

<div class="container h-full">
 <svg id="graph" bind:this={svg} class="w-full" >
  </svg>

  {#if data}
    <svg id="graph" bind:this={svg}>
    </svg>
  {:else}
    <p>Loading...</p>
  {/if}
</div>
