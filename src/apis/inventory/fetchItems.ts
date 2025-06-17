

export default async function fetchItems() {
	  // Simulate fetching items from an API
  return new Promise((resolve) => {
	setTimeout(() => {
	  resolve([
		{ id: 1, name: 'Item 1', quantity: 10 },
		{ id: 2, name: 'Item 2', quantity: 5 },
		{ id: 3, name: 'Item 3', quantity: 20 },
	  ]);
	}, 1000);
  });
}