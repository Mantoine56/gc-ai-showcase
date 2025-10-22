import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Plus, Bot } from "lucide-react";
import Footer from "./Footer";
import EnhancedAIChatSidebar from "@/components/chat/EnhancedAIChatSidebar";
import ChatToggleButton from "@/components/chat/ChatToggleButton";
import gcLogo from "@/assets/gc-logo.png";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[hsl(var(--gcds-background-primary))]">
        <AppSidebar />
        
        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-[var(--gcds-transition-base)] ${isChatOpen ? 'lg:mr-96 md:mr-80 sm:mr-0' : ''}`}>
          {/* Header with Logo and Actions */}
          <header className="sticky top-0 z-50 bg-[hsl(var(--gcds-background-primary))]/.95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--gcds-background-primary))]/60 border-b border-[hsl(var(--gcds-border-secondary))] shadow-[var(--gcds-shadow-sm)]">
            <div className="flex items-center justify-between h-14 px-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="p-1.5 hover:bg-[hsl(var(--gcds-background-accent))] rounded-md transition-all duration-[var(--gcds-transition-fast)] text-[hsl(var(--gcds-text-secondary))] hover:text-[hsl(var(--gcds-text-primary))]" />
                
                {/* GC AI Hub Branding */}
                <div className="flex items-center gap-[var(--gcds-spacing-300)]">
                  <img 
                    src={gcLogo} 
                    alt="Government of Canada" 
                    className="h-8 w-8 flex-shrink-0"
                  />
                  <div className="hidden sm:flex flex-col">
                    <span className="text-[length:var(--gcds-font-sizes-h6)] font-bold text-[hsl(var(--gcds-text-primary))] leading-tight">
                      GC AI Hub
                    </span>
                    <span className="text-[length:var(--gcds-font-sizes-caption)] text-[hsl(var(--gcds-text-secondary))] leading-tight">
                      Innovation Hub
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 hover:bg-[hsl(var(--gcds-background-accent))] transition-all duration-[var(--gcds-transition-fast)] min-h-[44px] md:min-h-0"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4 text-[hsl(var(--gcds-text-secondary))]" />
                </Button>

                <Button
                  variant={isChatOpen ? "default" : "ghost"}
                  size="sm"
                  onClick={toggleChat}
                  className={`h-9 px-3 text-xs font-medium transition-all duration-[var(--gcds-transition-base)] min-h-[44px] md:min-h-0 ${
                    isChatOpen
                      ? "bg-[hsl(var(--gcds-button-primary-default-background))] text-[hsl(var(--gcds-button-primary-default-text))] hover:bg-[hsl(var(--gcds-button-primary-hover-background))] shadow-[var(--gcds-shadow-sm)]"
                      : "hover:bg-[hsl(var(--gcds-background-accent))] text-[hsl(var(--gcds-text-secondary))] hover:text-[hsl(var(--gcds-text-primary))]"
                  }`}
                  aria-label={isChatOpen ? "Close AI Assistant" : "Open AI Assistant"}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">AI Assistant</span>
                  {isChatOpen && (
                    <div className="ml-2 w-2 h-2 bg-[hsl(142_76%_36%)] rounded-full animate-pulse"></div>
                  )}
                </Button>

                <Button
                  size="sm"
                  onClick={() => navigate('/submit')}
                  className="bg-[hsl(var(--gcds-button-primary-default-background))] text-[hsl(var(--gcds-button-primary-default-text))] hover:bg-[hsl(var(--gcds-button-primary-hover-background))] h-9 px-3 text-xs shadow-[var(--gcds-shadow-sm)] hover:shadow-[var(--gcds-shadow-md)] transition-all duration-[var(--gcds-transition-base)] min-h-[44px] md:min-h-0"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Add Project</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 bg-[hsl(var(--gcds-background-secondary))]">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>

        {/* AI Chat Components */}
        <EnhancedAIChatSidebar isOpen={isChatOpen} onToggle={toggleChat} />
        {!isChatOpen && <ChatToggleButton onClick={toggleChat} />}
      </div>
    </SidebarProvider>
  );
}