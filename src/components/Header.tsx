import { Link } from "@tanstack/react-router";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
export default function Header() {
  const sidebar=useSidebar();
  console.log(sidebar)
  
  return (
    <div className="@container p-2 flex flex-wrap gap-2 justify-start">
          {(sidebar.state=="collapsed"||sidebar.state=="expanded" && sidebar.isMobile)&&<SidebarTrigger />}
          
    </div>
  );
}
