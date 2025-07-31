import { ReactNode, useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Bell, Plus, Bot } from "lucide-react";
import Footer from "./Footer";
import AIChatSidebar from "@/components/chat/AIChatSidebar";
import ChatToggleButton from "@/components/chat/ChatToggleButton";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gcds-background-primary">
        <AppSidebar />
        
        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isChatOpen ? 'lg:mr-96 md:mr-80 sm:mr-0' : ''}`}>
          {/* Compact Header */}
          <header className="sticky top-0 z-50 bg-gcds-background-primary/95 backdrop-blur supports-[backdrop-filter]:bg-gcds-background-primary/60 border-b border-gcds-border-secondary">
            <div className="flex items-center justify-between h-14 px-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="p-1.5 hover:bg-gcds-background-accent rounded-md transition-colors" />
                <div>
                  <h1 className="text-lg font-semibold text-gcds-text-primary">GC AI Hub</h1>
                  <p className="text-xs text-gcds-text-secondary">Government of Canada AI Innovation</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gcds-background-accent"
                >
                  <Bell className="h-4 w-4 text-gcds-text-secondary" />
                </Button>
                
                <Button
                  variant={isChatOpen ? "default" : "ghost"}
                  size="sm"
                  onClick={toggleChat}
                  className={`h-8 px-3 text-xs font-medium transition-all duration-200 ${
                    isChatOpen 
                      ? "bg-gcds-color-blue-600 text-white hover:bg-gcds-color-blue-700" 
                      : "hover:bg-gcds-background-accent text-gcds-text-secondary hover:text-gcds-text-primary"
                  }`}
                  aria-label={isChatOpen ? "Close AI Assistant" : "Open AI Assistant"}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  AI Assistant
                  {isChatOpen && (
                    <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="h-8 w-8 p-0 hover:bg-gcds-background-accent"
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <Sun className="h-4 w-4 text-gcds-text-secondary" /> : <Moon className="h-4 w-4 text-gcds-text-secondary" />}
                </Button>
                
                <Button
                  size="sm"
                  className="bg-gcds-button-primary-default-background text-gcds-button-primary-default-text hover:bg-gcds-button-primary-hover-background h-8 px-3 text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Project
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 bg-gcds-background-secondary">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>

        {/* AI Chat Components */}
        <AIChatSidebar isOpen={isChatOpen} onToggle={toggleChat} />
        {!isChatOpen && <ChatToggleButton onClick={toggleChat} />}
      </div>
    </SidebarProvider>
  );
}