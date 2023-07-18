// store.js
import { writable } from 'svelte/store';

export const userInput = writable(null);

// Subscribe to the userInput store and log its value
userInput.subscribe(value => {
  console.log(value); // Log the value whenever it changes
});
