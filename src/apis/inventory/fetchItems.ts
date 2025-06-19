import type { Item } from "@/types/item";

export default async function fetchItems(): Promise<Item[]> {
	  // Simulate fetching items from an API
  return new Promise((resolve) => {
	setTimeout(() => {
	  resolve([
		{ id: 1, name: 'Item 1', cost: 5, price: 10, category: 'Category A', quantity: 10 },
		{ id: 2, name: 'Item 2', cost: 3, price: 7, category: 'Category B', quantity: 5 },
		{ id: 3, name: 'Item 3', cost: 8, price: 15, category: 'Category A', quantity: 20 },
	  ]);
	}, 1000);
  });
}