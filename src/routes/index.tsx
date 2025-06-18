import { createFileRoute } from "@tanstack/react-router";

import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";



export const Route = createFileRoute("/")({
  component: Component,
});

function Component() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
