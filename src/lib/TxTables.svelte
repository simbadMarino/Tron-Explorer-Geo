<script>
	import { json } from '@sveltejs/kit';
	import { onMount, onDestroy } from 'svelte';
	import { is_promise } from 'svelte/internal';
	import TronWeb from 'tronweb';

	let transactions = [];
	let loading = false;
	let blockHeight = 0;
	let walletInfo = 0;
	let lastwalletName = '';
	let lastwalletAddress = '';
	let transactionCount = 0;
	let paused = false;
	let clientIP = '';

	// TronWeb configuration
	/*const HttpProvider = 'https://api.trongrid.io';
	const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY; // Vite injects env variables with "VITE_" prefix

	const fullNode = new TronWeb.providers.HttpProvider(HttpProvider);
	const solidityNode = new TronWeb.providers.HttpProvider(HttpProvider);
	const eventServer = new TronWeb.providers.HttpProvider(HttpProvider);

	const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);*/

	const fetchLatestBlock = async () => {
		if (paused) return;

		try {
			const latestBlock = await tronWeb.trx.getCurrentBlock();
			blockHeight = latestBlock.block_header.raw_data.number;
			transactions = latestBlock.transactions.map((transaction) => {
				const halfLength = Math.ceil(transaction.txID.length / 2);
				const firstHalf = transaction.txID.substring(0, halfLength);
				return {
					txID: firstHalf,
					senderAddress: transaction.raw_data.contract[0].parameter.value.owner_address
				};
			});
			transactionCount = transactions.length;
			loading = false;
		} catch (error) {
			console.error('Error fetching transactions:', error);
			loading = false;
		}
	};

	const getAddress = async () => {
		try {
			walletInfo = await tronWeb.defaultAddress;
			lastwalletAddress = walletInfo.base58;
			lastwalletName = walletInfo.name;

			console.log(walletInfo);
		} catch (error) {
			console.error('Error getting Address:', error);
		}
	};

	const togglePause = () => {
		paused = !paused;
	};

	function getIP() {
		fetch('https://api.ipify.org?format=json')
			.then((response) => response.json())
			.then((data) => {
				console.log(data.ip);
				clientIP = data.ip;
			})
			.catch((error) => {
				console.log('Error:', error);
			});
	}

	let intervalId;

	onMount(() => {
		getIP();
		getAddress();
		intervalId = setInterval(getIP, 5000); // Refresh every 0.9 seconds
		intervalId = setInterval(getAddress, 5000); // Attempt to get Addy every 0.9 seconds
	});

	onDestroy(() => {
		clearInterval(intervalId); // Clear the interval when the component is destroyed
	});
</script>

{#if loading}
	<p>Loading...</p>
{:else}
	<div class="container items-center">
		<h2 class="text-xl font-bold mb-4">
			Latest Tron Wallet Name: {lastwalletName}
		</h2>

		<h2 class="text-xl font-bold mb-4">
			Address: {lastwalletAddress}
		</h2>
		<h2 class="text-xl font-bold mb-4">
			Client IP: {clientIP}
		</h2>
	</div>
{/if}

<style>
	.scroll-container {
		max-height: 500px; /* Adjust this value to control the visible height of the container */
		overflow-y: auto;
	}
</style>
