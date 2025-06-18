import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuSub,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { cn } from "@/lib/utils";
import { useSidebarItems } from "@/hooks/useSidebarItems";
import type { MenuItemComponentProps } from "@/types/sidebar";

import { Command, ChevronRight } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

function SidebarMenuComponent({ data }: MenuItemComponentProps) {
  if (data.children) {
    const location = useLocation();
    const parent = location.pathname.split("/")[1];
    return (
      <SidebarMenu>
        <Collapsible
          defaultOpen={data.id == parent}
          className={cn(
            "group/collapsible",
            data.id === parent && "text-blue-400"
          )}
          asChild
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={data.label} asChild>
                <div className={cn("cursor-pointer flex items-center gap-2")}>
                  {data.icon && <data.icon className="size-5" />}
                  <span>{data.label}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </div>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {data.children?.map((subItem) => {
                  return (
                    <SidebarMenuSubItem key={subItem.id}>
                      <SidebarMenuSubButton asChild>
                        <Link
                          to={subItem.url}
                          activeProps={{ className: "bg-blue-400 text-white" }}
                        >
                          <span>{subItem.label}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={data.label} asChild>
          <Link
            to={data.url}
            activeProps={{ className: "bg-blue-400 text-white" }}
          >
            <div className="flex items-center gap-2">
              {data.icon && <data.icon className="size-5" />}
              <span>{data.label}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default function SidebarComponent() {
  const items = useSidebarItems();

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="offcanvas"
      className={cn("h-screen")}
    >
      <SidebarHeader>
        <SidebarMenu className="flex flex-row items-center justify-between border-b">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarTrigger />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuComponent data={items.home} />
          <SidebarMenuComponent data={items.inventory} />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenuComponent data={items.sales} />
          <SidebarMenuComponent data={items.purchases} />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenuComponent data={items.reports} />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
