import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";


export const Route = createRootRoute({
  component: () => (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={10} className="h-full">
            <Header />
          </ResizablePanel>
          <Separator />
          <ResizablePanel defaultSize={90}>
            <Outlet />
          </ResizablePanel>
        </ResizablePanelGroup>
      </SidebarInset>
      <TanStackRouterDevtools />
    </SidebarProvider>
  ),
});
