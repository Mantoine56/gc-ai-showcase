import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Bot } from 'lucide-react';

interface ChatToggleButtonProps {
  onClick: () => void;
  hasNewMessage?: boolean;
}

const ChatToggleButton = ({ onClick, hasNewMessage = false }: ChatToggleButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={onClick}
        size="lg"
        className="h-14 w-14 rounded-full bg-gcds-color-blue-600 hover:bg-gcds-color-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 relative"
      >
        <div className="flex items-center justify-center">
          <Bot className="h-6 w-6" />
        </div>
        
        {/* New message indicator */}
        {hasNewMessage && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-red-500 hover:bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            1
          </Badge>
        )}
      </Button>
      
      {/* Tooltip */}
      <div className="absolute bottom-16 right-0 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gcds-text-primary text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
          GC AI Assistant
          <div className="absolute top-full right-4 border-4 border-transparent border-t-gcds-text-primary"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatToggleButton;