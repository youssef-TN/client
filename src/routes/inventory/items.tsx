// src/routes/inventory/items.tsx

import { createFileRoute } from '@tanstack/react-router'

import fetchItems from '@/apis/inventory/fetchItems'

export const Route = createFileRoute('/inventory/items')({
  loader: fetchItems,
})
