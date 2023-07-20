<script>
  import { onMount, afterUpdate } from 'svelte';
  import * as d3 from 'd3';
  import axios from 'axios';

  let data;
  let svg;

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
    // Get the width and height of the SVG element
    const width = svg.clientWidth;
    const height = svg.clientHeight;

    // Set the ranges
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, d => d.time))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.price)])
      .range([height, 0]);

    // Define the line
    const valueline = d3
      .line()
      .x(d => x(d.time))
      .y(d => y(d.price) * 60);

    // Add the valueline path.
    d3.select(svg)
      .select(".line") // Assuming you have a CSS class "line" to select the path element
      .datum(data)
      .attr("d", valueline)
      .attr("stroke", "url(#gradient)");
  }
</script>

<div class="container">
  <svg id="graph" bind:this={svg} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:green;stop-opacity:1" />
        <stop offset="100%" style="stop-color:red;stop-opacity:1" />
      </linearGradient>
    </defs>
    <path class="line"></path>
  </svg>

  {#if data}
    <svg id="graph" bind:this={svg}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:green;stop-opacity:1" />
          <stop offset="100%" style="stop-color:red;stop-opacity:1" />
        </linearGradient>
      </defs>
      <path class="line"></path>
    </svg>
  {:else}
    <p>Loading...</p>
  {/if}
</div>
