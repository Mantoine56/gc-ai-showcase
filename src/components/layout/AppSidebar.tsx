import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  FolderOpen,
  BookOpen,
  Info,
  Plus,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "All Projects", url: "/", icon: FolderOpen },
  { title: "Resources", url: "/resources", icon: BookOpen },
  { title: "About", url: "/about", icon: Info },
  { title: "Admin Stats", url: "/admin/stats", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavCls = (path: string) =>
    isActive(path)
      ? "bg-gcds-color-blue-600 text-white font-semibold shadow-sm"
      : "text-gcds-text-secondary hover:bg-gcds-background-accent hover:text-gcds-text-primary";

  return (
    <Sidebar
      className="border-r border-gcds-border-secondary bg-gcds-background-primary"
      collapsible="icon"
    >
      <SidebarContent className="flex flex-col h-full">
        {/* Main Navigation */}
        <SidebarGroup className="px-3 py-4 flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${getNavCls(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Action - Fixed at bottom */}
        {!isCollapsed && (
          <SidebarGroup className="px-3 pb-4 mt-auto">
            <SidebarGroupContent>
              <Button
                onClick={() => navigate('/submit')}
                className="w-full bg-gcds-color-blue-700 hover:bg-gcds-color-blue-800 text-white font-medium py-2.5 rounded-lg shadow-sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
