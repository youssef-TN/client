// src/routes/inventory/items.lazy.tsx

import { createLazyFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/inventory/items")({
  component: RouteComponent,
});

function RouteComponent() {
  const loaderData = useLoaderData({ from: "/inventory/items" });
  console.log(loaderData);
  return <div>meow</div>;
}
