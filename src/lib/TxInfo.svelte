<script>
	import { userInput } from './store.js'; // import the store

	let transactionInfo = null;
	let loading = false;
	let searchValue = '';
	let showDetails = false;
	let clipboardMessage = '';

	function handleSubmit() {
		loading = true;
		showDetails = false;

		// Update the store with the user input
		userInput.set(searchValue);

		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				'TRON-PRO-API-KEY': '7a11a8ca-bbbf-43d9-a340-272301ad396b' // Replace with your actual API key
			}
		};

		fetch(`https://api.trongrid.io/v1/accounts/${searchValue}/transactions`, options)
			.then((response) => response.json())
			.then((response) => {
				transactionInfo = response.data.slice(0, 1);
				loading = false;
				showDetails = true;
				console.log(transactionInfo);
			})
			.catch((err) => console.error(err));
	}

	function copyToClipboard() {
		const formattedData = JSON.stringify(transactionInfo, null, 2);
		navigator.clipboard
			.writeText(formattedData)
			.then(() => {
				clipboardMessage = 'Copied to clipboard!';
			})
			.catch((err) => {
				console.error('Failed to copy to clipboard:', err);
				clipboardMessage = 'Failed to copy to clipboard.';
			});
	}
</script>
