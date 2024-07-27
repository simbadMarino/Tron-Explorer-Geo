<script>
	import { writable, derived } from 'svelte/store';

	let transactionInfo = null;
	let loading = false;
	let searchValue = '';
	let selectedTransaction = null;
	let nextPageUrl = null;
	let previousPageUrl = null;

	const currentTime = writable(Date.now());
	setInterval(() => currentTime.set(Date.now()), 1000);

	const contractAge = derived(
		currentTime,
		($currentTime, set) => {
			if (selectedTransaction) {
				const ageInSeconds = Math.floor(
					($currentTime - selectedTransaction.raw_data.timestamp) / 1000
				);
				const days = Math.floor(ageInSeconds / (3600 * 24));
				const hours = Math.floor((ageInSeconds % (3600 * 24)) / 3600);
				const minutes = Math.floor((ageInSeconds % 3600) / 60);
				const seconds = ageInSeconds % 60;
				set({ days, hours, minutes, seconds });
			}
		},
		{ days: 0, hours: 0, minutes: 0, seconds: 0 }
	);

	async function fetchTransactions(url) {
		loading = true;
		selectedTransaction = null;

		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				'TRON-PRO-API-KEY': '7a11a8ca-bbbf-43d9-a340-272301ad396b' // Replace with your actual API key
			}
		};

		const response = await fetch(url, options);
		const data = await response.json();

		transactionInfo = data.data;
		nextPageUrl = data.meta.links.next;
		previousPageUrl = data.meta.links.prev;

		loading = false;
	}

	function handleSubmit() {
		const url = `https://api.trongrid.io/v1/accounts/${searchValue}/transactions`;
		fetchTransactions(url);
	}

	function handleNext() {
		if (nextPageUrl) {
			fetchTransactions(nextPageUrl);
		}
	}

	function handlePrevious() {
		if (previousPageUrl) {
			fetchTransactions(previousPageUrl);
		}
	}

	function selectTransaction(transaction) {
		if (selectedTransaction && selectedTransaction.txID === transaction.txID) {
			selectedTransaction = null; // Close the extra information if the same transaction is selected again
		} else {
			selectedTransaction = transaction; // Otherwise, select the new transaction
		}
	}
</script>
