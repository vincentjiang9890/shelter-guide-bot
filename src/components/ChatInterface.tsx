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

//const STORAGE_KEY = 'chat_conversation_history';

const ChatInterface = () => {
  const STORAGE_KEY = 'chat_conversation_history';
  
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (e) {
        console.error('Failed to parse saved messages:', e);
      }
    }
    return [{
      id: '1',
      text: "Hello! I'm here to help you find resources and support. What do you need assistance with today?",
      sender: 'assistant',
      timestamp: new Date(),
    }];
  });

  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);

  const addMessage = (text: string, sender: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => {
      const updated = [...prev, newMessage];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); // save to local storage
      return updated;
    });
    //setMessages(prev => [...prev, newMessage]); without local storage
  };

  const sendToBackend = async (text: string) => { 
    setSending(true);
    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          //conversation_history: messages.slice(-10) // local storage
          conversation_history: messages.slice(-10).map(msg => ({
          sender: msg.sender,
          text: msg.text,
          timestamp: msg.timestamp
        }))
        }),
      });
      
      console.log('Response status:', res.status); //test line

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      addMessage(data.response ?? 'Sorry, empty response from server.', 'assistant');
    } catch (err) {
      console.error('Fetch error:', err);
      addMessage('Sorry, there was an error processing your request.', 'assistant');
    } finally {
      setSending(false);
    }
  };
  
  /* using vite api url env variable
  const sendToBackend = async (text: string) => {
    setSending(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiBase}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      addMessage(data.response ?? 'Sorry, empty response from server.', 'assistant');
    } catch (err) {
      console.error(err);
      addMessage('Sorry, there was an error processing your request.', 'assistant');
    } finally {
      setSending(false);
    }
  };
  */
  const handleSendMessage = () => {
    if (!inputValue.trim() || sending) return;

    addMessage(inputValue, 'user');
    const text = inputValue;
    setInputValue('');
    sendToBackend(text);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      shelter: "I need help finding emergency shelter",
      food: "Where can I find food assistance?",
      healthcare: "I need healthcare services",
      map: "Show me services near my location",
    } as const;

    const msg = actionMessages[action as keyof typeof actionMessages];
    addMessage(msg, 'user');
    sendToBackend(msg);
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
            disabled={sending}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || sending}
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