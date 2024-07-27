<script>
	import { onMount, onDestroy } from 'svelte';
	import TronWeb from 'tronweb';
	import * as d3 from 'd3';

	let block = null;
	let loading = true;
	let data = []; // Initialize an empty array
	let maxVal = 0;

	// TronWeb configuration
	const HttpProvider = 'https://api.trongrid.io';
	const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY;

	const fullNode = new TronWeb.providers.HttpProvider(HttpProvider);
	const solidityNode = new TronWeb.providers.HttpProvider(HttpProvider);
	const eventServer = new TronWeb.providers.HttpProvider(HttpProvider);

	const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

	const fetchLatestBlock = async () => {
		try {
			// Fetch the latest block
			block = await tronWeb.trx.getCurrentBlock();
			console.log(block);
		} catch (error) {
			console.error('Error fetching block:', error);
			loading = false;
		}
	};

	let intervalId;

	onMount(async () => {
		loading = false;
		fetchLatestBlock();
		intervalId = setInterval(fetchLatestBlock, 900); // Refresh every 0.9 seconds
	});

	onDestroy(() => {
		clearInterval(intervalId); // Clear the interval when the component is destroyed
	});
</script>

{#if loading}
	<p>Loading...</p>
{:else}{/if}
