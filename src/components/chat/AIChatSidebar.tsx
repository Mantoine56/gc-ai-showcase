import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2,
  Maximize2
} from 'lucide-react';

/**
 * GC AI Assistant Chat Sidebar
 * 
 * Professional AI chat interface designed for Government of Canada applications.
 * Features:
 * - Government of Canada design system compliance
 * - Sample conversation for senior management demonstrations  
 * - Responsive design for desktop and mobile
 * - Minimizable/expandable interface
 * - Professional messaging UI with timestamps
 * 
 * This component serves as a UI demonstration and can be enhanced with:
 * - Real AI integration (Azure OpenAI, AWS Bedrock, etc.)
 * - Authentication and user management
 * - Message persistence and history
 * - File upload and document analysis capabilities
 */

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AIChatSidebar = ({ isOpen, onToggle }: AIChatSidebarProps) => {
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Sample conversation for demo purposes
  const [messages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m the GC AI Assistant. I can help you find information about AI projects, answer questions about government initiatives, and provide insights on our innovation portfolio. How can I assist you today?',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      type: 'user',
      content: 'Can you tell me about the Document Intelligence System project?',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      type: 'ai',
      content: 'The Document Intelligence System is a Beta-stage project by Canada Revenue Agency. It uses automated document classification and information extraction from tax forms and financial documents using computer vision. The tech stack includes Python, TensorFlow, OpenCV, and FastAPI. Would you like more details about its implementation or other similar projects?',
      timestamp: new Date(Date.now() - 180000)
    },
    {
      id: '4',
      type: 'user',
      content: 'How many AI projects are currently in production across government departments?',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: '5',
      type: 'ai',
      content: 'Based on current data, there are 3 AI projects in production status across government departments. These include the Citizen Service Chatbot (Service Canada), Real-time Translation Service, and Web Accessibility Validator. These production systems are actively serving citizens and improving government services. Would you like details about any specific production system?',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real implementation, this would send the message and get AI response
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 lg:w-96 md:w-80 sm:w-full bg-gcds-background-primary border-l border-gcds-border-secondary shadow-xl z-50 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gcds-border-secondary bg-gcds-color-blue-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gcds-color-blue-100 rounded-lg">
            <Bot className="h-5 w-5 text-gcds-color-blue-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gcds-text-primary">GC AI Assistant</h3>
            <p className="text-xs text-gcds-text-secondary">Government of Canada</p>
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
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Online - Ready to assist
            </Badge>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
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
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <p className={`text-xs mt-2 ${
                      msg.type === 'user' ? 'text-blue-100' : 'text-gcds-text-secondary'
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
              ))}
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
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                size="sm"
                className="bg-gcds-color-blue-600 hover:bg-gcds-color-blue-700 text-white px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gcds-text-secondary mt-2 px-1">
              AI Assistant for Government of Canada projects and insights
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatSidebar;