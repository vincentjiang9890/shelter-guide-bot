import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, MapPin, Home, Utensils, Heart, Phone, MessageCircle, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const QuickActions = ({ onActionClick }: { onActionClick: (action: string) => void }) => {
  const actions = [
    { icon: Home, label: 'Find Shelter', action: 'shelter', variant: 'urgent' as const },
    { icon: Utensils, label: 'Food Resources', action: 'food', variant: 'support' as const },
    { icon: Heart, label: 'Healthcare', action: 'healthcare', variant: 'success' as const },
    { icon: MapPin, label: 'Services Near Me', action: 'map', variant: 'quick-action' as const },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {actions.map((action) => (
        <Button
          key={action.action}
          variant={action.variant}
          onClick={() => onActionClick(action.action)}
          className="flex flex-col items-center gap-2 h-16 text-sm"
        >
          <action.icon className="h-5 w-5" />
          {action.label}
        </Button>
      ))}
    </div>
  );
};

const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Bot className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      
      <div className={`max-w-[70%] ${isUser ? 'order-1' : 'order-2'}`}>
        <Card className={`${
          isUser 
            ? 'bg-chat-user text-chat-user-foreground' 
            : 'bg-chat-assistant text-chat-assistant-foreground'
        } border-0 shadow-sm`}>
          <CardContent className="p-3">
            <p className="text-sm leading-relaxed">{message.text}</p>
            <div className="text-xs opacity-70 mt-2">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center order-2">
          <User className="h-4 w-4 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm here to help you find resources and support. What do you need assistance with today?",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const addMessage = (text: string, sender: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    addMessage(inputValue, 'user');
    setInputValue('');
    
    // Simulate assistant response
    setTimeout(() => {
      const responses = [
        "I understand you need help. Let me find the best resources available in your area.",
        "I'm here to support you. What specific type of assistance are you looking for?",
        "I can help you locate services nearby. Would you like me to show you a map of available resources?",
      ];
      addMessage(responses[Math.floor(Math.random() * responses.length)], 'assistant');
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      shelter: "I need help finding emergency shelter",
      food: "Where can I find food assistance?",
      healthcare: "I need healthcare services",
      map: "Show me services near my location",
    };
    
    addMessage(actionMessages[action as keyof typeof actionMessages], 'user');
    
    setTimeout(() => {
      const responses = {
        shelter: "I'll help you find emergency shelter options. There are several facilities in your area that provide immediate assistance. Would you like me to show you the nearest locations?",
        food: "There are food banks and meal programs available. Many serve meals daily and some offer food packages. Let me find the closest options for you.",
        healthcare: "I can help you locate free and low-cost healthcare services including community health centers and mobile clinics. What type of care do you need?",
        map: "I'll show you a map with all available services in your area including shelters, food assistance, healthcare, and other support services.",
      };
      addMessage(responses[action as keyof typeof responses], 'assistant');
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      
      {/* Quick Actions */}
      <div className="p-4 border-t bg-muted/30">
        <QuickActions onActionClick={handleQuickAction} />
        
        {/* Message Input */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;