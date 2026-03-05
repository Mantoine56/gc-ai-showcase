import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Home,
  BookOpen,
  Info,
  Plus,
  BarChart3,
  ClipboardCheck,
  Star,
  TrendingUp,
  Clock,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthProfile } from "@/hooks/useAuth";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const { data: authProfile } = useAuthProfile();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";
  const roles = new Set(authProfile?.roles || []);
  const canReview = roles.has('reviewer') || roles.has('admin');

  // Main navigation items - Projects section
  const projectsNavigation = [
    { title: t('nav.allProjects'), url: "/", icon: Home },
    { title: t('nav.featured'), url: "/?tab=featured", icon: Star },
    { title: "Open Source", url: "/?tab=opensource", icon: Github },
    { title: t('nav.trending'), url: "/?tab=trending", icon: TrendingUp },
    { title: t('nav.recent'), url: "/?tab=recent", icon: Clock },
  ];

  // Browse section
  const browseNavigation = [
    { title: t('nav.resources'), url: "/resources", icon: BookOpen },
    { title: t('nav.about'), url: "/about", icon: Info },
  ];

  // Other navigation items
  const otherNavigation = canReview
    ? [
        { title: t('nav.reviewQueue'), url: "/admin/review", icon: ClipboardCheck },
        { title: t('nav.adminStats'), url: "/admin/stats", icon: BarChart3 },
      ]
    : [];

  const isActive = (path: string) => {
    // Handle tab-based navigation (e.g., /?tab=featured)
    if (path.includes("?tab=")) {
      const [basePath, tabParam] = path.split("?tab=");
      if (currentPath === basePath) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentTab = urlParams.get("tab");
        return currentTab === tabParam;
      }
      return false;
    }
    
    // Handle root path
    if (path === "/" && currentPath === "/" && !window.location.search) return true;
    
    // Handle other paths
    if (path !== "/" && currentPath.startsWith(path)) return true;
    
    return false;
  };

  // Get navigation item classes based on active state
  const getNavCls = (path: string) => {
    const baseClasses = "flex items-center rounded-lg text-sm font-medium min-h-[44px] justify-center";
    const transitionClasses = "transition-all duration-[var(--gcds-transition-base)]";
    
    if (isActive(path)) {
      // Active state: Use GCDS button primary tokens with shadow for depth
      return `${baseClasses} ${transitionClasses} bg-[hsl(var(--gcds-button-primary-default-background))] text-[hsl(var(--gcds-button-primary-default-text))] shadow-[var(--gcds-shadow-sm)] font-semibold ${
        isCollapsed ? 'w-10 h-10 p-0' : 'gap-3 px-4 py-3'
      }`;
    }
    
    // Default state: Secondary text with hover accent background
    return `${baseClasses} ${transitionClasses} text-[hsl(var(--gcds-text-secondary))] hover:bg-[hsl(var(--gcds-background-accent))] hover:text-[hsl(var(--gcds-text-primary))] hover:shadow-[var(--gcds-shadow-sm)] ${
      isCollapsed ? 'w-10 h-10 p-0' : 'gap-3 px-4 py-3 hover:border hover:border-[hsl(var(--gcds-border-accent))]'
    }`;
  };

  // Render a navigation section
  const renderNavSection = (items: typeof projectsNavigation) => (
    <SidebarMenu className="space-y-[var(--gcds-spacing-200)]">
      {items.map((item) => (
        <SidebarMenuItem key={item.title} className="flex items-center justify-center">
          <SidebarMenuButton asChild>
            <NavLink
              to={item.url}
              className={getNavCls(item.url)}
              title={isCollapsed ? item.title : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="flex-1">{item.title}</span>}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar
      className="border-r border-[hsl(var(--gcds-border-secondary))] bg-[hsl(var(--gcds-background-primary))]"
      collapsible="icon"
    >
      <SidebarContent className="flex flex-col h-full">
        {/* Projects Section */}
        <SidebarGroup className="px-[var(--gcds-spacing-300)] pt-[var(--gcds-spacing-400)] pb-[var(--gcds-spacing-300)]">
          {!isCollapsed && (
            <SidebarGroupLabel className="text-[length:var(--gcds-font-sizes-caption)] font-semibold text-[hsl(var(--gcds-text-secondary))] uppercase tracking-wider px-2 mb-1.5">
              {t('sidebar.projects')}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            {renderNavSection(projectsNavigation)}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-[var(--gcds-spacing-300)] my-1" />

        {/* Browse Section */}
        <SidebarGroup className="px-[var(--gcds-spacing-300)] py-[var(--gcds-spacing-300)]">
          {!isCollapsed && (
            <SidebarGroupLabel className="text-[length:var(--gcds-font-sizes-caption)] font-semibold text-[hsl(var(--gcds-text-secondary))] uppercase tracking-wider px-2 mb-1.5">
              {t('sidebar.browse')}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            {renderNavSection(browseNavigation)}
          </SidebarGroupContent>
        </SidebarGroup>

        {otherNavigation.length > 0 && (
          <>
            <SidebarSeparator className="mx-[var(--gcds-spacing-300)] my-1" />

            <SidebarGroup className="px-[var(--gcds-spacing-300)] py-[var(--gcds-spacing-300)] flex-1">
              {!isCollapsed && (
                <SidebarGroupLabel className="text-[length:var(--gcds-font-sizes-caption)] font-semibold text-[hsl(var(--gcds-text-secondary))] uppercase tracking-wider px-2 mb-1.5">
                  {t('sidebar.more')}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                {renderNavSection(otherNavigation)}
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {/* Quick Action - Fixed at bottom */}
        {!isCollapsed && (
          <SidebarGroup className="px-[var(--gcds-spacing-300)] pb-[var(--gcds-spacing-400)] mt-auto">
            <SidebarGroupContent>
              <Button
                onClick={() => navigate('/submit')}
                className="w-full bg-[hsl(var(--gcds-button-primary-default-background))] hover:bg-[hsl(var(--gcds-button-primary-hover-background))] text-[hsl(var(--gcds-button-primary-default-text))] font-medium rounded-lg shadow-[var(--gcds-shadow-sm)] hover:shadow-[var(--gcds-shadow-md)] transition-all duration-[var(--gcds-transition-base)] h-10"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t('header.newProject')}
              </Button>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Collapsed state button */}
        {isCollapsed && (
          <SidebarGroup className="px-[var(--gcds-spacing-300)] pb-[var(--gcds-spacing-300)] mt-auto flex items-center justify-center">
            <SidebarGroupContent className="flex justify-center">
              <Button
                onClick={() => navigate('/submit')}
                size="icon"
                className="w-10 h-10 bg-[hsl(var(--gcds-button-primary-default-background))] hover:bg-[hsl(var(--gcds-button-primary-hover-background))] text-[hsl(var(--gcds-button-primary-default-text))] shadow-[var(--gcds-shadow-sm)] hover:shadow-[var(--gcds-shadow-md)] transition-all duration-[var(--gcds-transition-base)]"
                aria-label={t('header.newProject')}
                title={t('header.newProject')}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
