import { createFileRoute } from "@tanstack/react-router";

import Header from "@/components/Header";
import Sidebar,{IDS as sidebarIds} from "@/components/Sidebar";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";


export const Route = createFileRoute("/")({
  component: Component,
});

function Component() {
  return (
    <SidebarProvider>
      <Sidebar currentPage={sidebarIds.main.home} parentPage={null} />
      <SidebarInset>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={10} className="h-full">
            <Header />
          </ResizablePanel>
          <Separator />
          <ResizablePanel defaultSize={90}>
          </ResizablePanel>
        </ResizablePanelGroup>
      </SidebarInset>
    </SidebarProvider>
  );
}
