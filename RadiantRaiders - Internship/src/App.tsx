import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { GraduationCap, BriefcaseIcon, FileText, MessagesSquare } from 'lucide-react';
import { handleMessage } from './utils/messageHandler';

function App() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      content: "Hi! I'm your AI-powered Career Assistant from Radiant Raiders. I can help you with:\n\n" +
        "- Finding internships and job opportunities\n" +
        "- Analyzing and improving your resume\n" +
        "- Preparing for interviews\n" +
        "- Providing career guidance\n\n" +
        "How can I assist you today?",
      role: 'assistant',
      timestamp: new Date(),
      type: 'general'
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await handleMessage(content);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error handling message:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
        status: 'error'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r hidden md:block">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            Radiant Raiders
          </h1>
        </div>
        <nav className="mt-4">
          <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50">
            <BriefcaseIcon className="w-5 h-5" />
            Find Opportunities
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50">
            <FileText className="w-5 h-5" />
            Resume Review
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50">
            <MessagesSquare className="w-5 h-5" />
            Interview Prep
          </a>
        </nav>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="p-4">
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;