import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  Lightbulb,
  Loader2,
  Sparkles
} from 'lucide-react';
import { assistantApi } from '@/lib/api';
import { Link } from 'react-router-dom';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  projects?: any[];
  suggestions?: string[];
}

interface EnhancedAIChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const EnhancedAIChatSidebar = ({ isOpen, onToggle }: EnhancedAIChatSidebarProps) => {
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationStarters, setConversationStarters] = useState<string[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load conversation starters on mount
  useEffect(() => {
    const loadStarters = async () => {
      try {
        const response = await assistantApi.getStarters();
        setConversationStarters(response.starters);

        // Add welcome message
        setMessages([{
          id: '1',
          type: 'ai',
          content: 'Hello! I\'m the GC AI Assistant. I can help you explore AI projects across Government of Canada departments. Ask me about project status, compliance requirements, technologies, and more!',
          timestamp: new Date(),
          suggestions: response.starters.slice(0, 4),
        }]);
      } catch (error) {
        console.error('Failed to load conversation starters:', error);
      }
    };

    if (isOpen) {
      loadStarters();
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (queryText?: string) => {
    const query = queryText || message.trim();
    if (!query) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Query the AI assistant
      const response = await assistantApi.query(query);

      // Add AI response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.response.message,
        timestamp: new Date(),
        projects: response.response.projects,
        suggestions: response.response.suggestions,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI query failed:', error);

      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I apologize, but I encountered an error processing your request. Please try again or rephrase your question.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 lg:w-96 md:w-80 sm:w-full bg-gcds-background-primary border-l border-gcds-border-secondary shadow-xl z-50 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gcds-border-secondary bg-gradient-to-r from-gcds-color-blue-50 to-gcds-color-blue-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gcds-color-blue-600 rounded-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gcds-text-primary flex items-center gap-1">
              GC AI Assistant
              <Sparkles className="h-3 w-3 text-gcds-color-blue-600" />
            </h3>
            <p className="text-xs text-gcds-text-secondary">Powered by natural language</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 p-0"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Status Badge */}
          <div className="p-3 border-b border-gcds-border-secondary">
            <Badge variant="outline" className="text-xs bg-gcds-color-green-100 text-gcds-color-green-900 border-gcds-color-green-300">
              <div className="w-2 h-2 bg-gcds-color-green-600 rounded-full mr-2 animate-pulse"></div>
              Online - Ready to assist
            </Badge>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-2">
                  <div
                    className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.type === 'ai' && (
                      <div className="p-2 bg-gcds-color-blue-100 rounded-full shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-gcds-color-blue-700" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.type === 'user'
                          ? 'bg-gcds-color-blue-600 text-white ml-auto'
                          : 'bg-gcds-background-secondary text-gcds-text-primary'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      <p className={`text-xs mt-2 ${
                        msg.type === 'user' ? 'text-gcds-color-blue-100' : 'text-gcds-text-secondary'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {msg.type === 'user' && (
                      <div className="p-2 bg-gcds-color-blue-600 rounded-full shrink-0 mt-1">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Project Cards */}
                  {msg.projects && msg.projects.length > 0 && (
                    <div className="ml-11 space-y-2">
                      {msg.projects.map((project) => (
                        <Link key={project.id} to={`/project/${project.id}`}>
                          <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer border border-gcds-border-secondary">
                            <h4 className="font-semibold text-sm text-gcds-text-primary">{project.name}</h4>
                            <p className="text-xs text-gcds-text-secondary mt-1">{project.organization}</p>
                            <p className="text-xs text-gcds-text-secondary mt-1 line-clamp-2">{project.description}</p>
                            <Badge variant="secondary" className="mt-2 text-xs">
                              {project.status}
                            </Badge>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Suggestions */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="ml-11 space-y-1">
                      <div className="flex items-center gap-1 text-xs text-gcds-text-secondary mb-1">
                        <Lightbulb className="h-3 w-3" />
                        <span>Try asking:</span>
                      </div>
                      {msg.suggestions.map((suggestion, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full justify-start text-xs h-auto py-2 px-3 text-left"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="p-2 bg-gcds-color-blue-100 rounded-full shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-gcds-color-blue-700" />
                  </div>
                  <div className="bg-gcds-background-secondary text-gcds-text-primary rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          {/* Chat Input */}
          <div className="p-4">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about AI projects, departments, or get insights..."
                className="flex-1 border-gcds-border-secondary focus:border-gcds-color-blue-500"
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!message.trim() || isLoading}
                size="sm"
                className="bg-gcds-color-blue-600 hover:bg-gcds-color-blue-700 text-white px-3"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gcds-text-secondary mt-2 px-1">
              AI Assistant for Government of Canada AI projects
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EnhancedAIChatSidebar;
