import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  FolderOpen,
  BookOpen,
  Info,
  Settings,
  TrendingUp,
  Users,
  Building2,
  GitBranch,
  Star,
  Calendar,
  Plus,
  Upload,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "All Projects", url: "/projects", icon: FolderOpen },
  { title: "Resources", url: "/resources", icon: BookOpen },
  { title: "About", url: "/about", icon: Info },
];

const discover = [
  { title: "Trending", url: "/trending", icon: TrendingUp },
  { title: "Featured", url: "/featured", icon: Star },
  { title: "Recent", url: "/recent", icon: Calendar },
];

const categories = [
  { title: "Departments", url: "/departments", icon: Building2 },
  { title: "Tech Stack", url: "/tech", icon: GitBranch },
  { title: "Contributors", url: "/contributors", icon: Users },
];

const quickActions = [
  { title: "New Project", icon: Plus, action: () => console.log("New project") },
  { title: "Import Data", icon: Upload, action: () => console.log("Import data") },
  { title: "Advanced Search", icon: Search, action: () => console.log("Search") },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavCls = (path: string) =>
    isActive(path)
      ? "bg-gcds-background-accent text-gcds-text-primary font-medium border-r-2 border-gcds-color-blue-700"
      : "text-gcds-text-secondary hover:bg-gcds-background-accent/50 hover:text-gcds-text-primary";

  return (
    <Sidebar
      className="border-r border-gcds-border-secondary bg-gcds-background-primary"
      collapsible="icon"
    >
      <SidebarContent className="p-0">
        {/* Main Navigation */}
        <SidebarGroup className="px-2 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${getNavCls(item.url)}`}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Discover Section */}
        {!isCollapsed && (
          <SidebarGroup className="px-2">
            <SidebarGroupLabel className="text-xs uppercase tracking-wide text-gcds-text-secondary font-semibold mb-2">
              Discover
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {discover.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all ${getNavCls(item.url)}`}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Browse Section */}
        {!isCollapsed && (
          <SidebarGroup className="px-2">
            <SidebarGroupLabel className="text-xs uppercase tracking-wide text-gcds-text-secondary font-semibold mb-2">
              Browse
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {categories.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all ${getNavCls(item.url)}`}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Quick Actions */}
        {!isCollapsed && (
          <SidebarGroup className="px-2">
            <SidebarGroupLabel className="text-xs uppercase tracking-wide text-gcds-text-secondary font-semibold mb-2">
              Quick Actions
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.title}
                    variant="ghost"
                    size="sm"
                    onClick={action.action}
                    className="w-full justify-start text-gcds-text-secondary hover:text-gcds-text-primary hover:bg-gcds-background-accent h-8 px-3"
                  >
                    <action.icon className="mr-2 h-3 w-3" />
                    <span className="text-xs">{action.title}</span>
                  </Button>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Recent Activity */}
        {!isCollapsed && (
          <SidebarGroup className="px-2">
            <SidebarGroupLabel className="text-xs uppercase tracking-wide text-gcds-text-secondary font-semibold mb-2">
              Recent Activity
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2">
                <div className="text-xs text-gcds-text-secondary p-2 bg-gcds-background-accent rounded-md">
                  <div className="font-medium text-gcds-text-primary">New Project Added</div>
                  <div className="text-xs opacity-75">Citizen Service Chatbot</div>
                  <div className="text-xs opacity-50">2 hours ago</div>
                </div>
                <div className="text-xs text-gcds-text-secondary p-2 bg-gcds-background-accent rounded-md">
                  <div className="font-medium text-gcds-text-primary">Status Update</div>
                  <div className="text-xs opacity-75">Fraud Detection → Beta</div>
                  <div className="text-xs opacity-50">1 day ago</div>
                </div>
                <div className="text-xs text-gcds-text-secondary p-2 bg-gcds-background-accent rounded-md">
                  <div className="font-medium text-gcds-text-primary">New Department</div>
                  <div className="text-xs opacity-75">Innovation, Science</div>
                  <div className="text-xs opacity-50">3 days ago</div>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}