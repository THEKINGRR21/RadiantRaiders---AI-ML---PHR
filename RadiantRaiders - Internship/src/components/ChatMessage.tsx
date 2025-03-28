import React from 'react';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage as ChatMessageType } from '../types';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={twMerge('flex gap-3 p-4 rounded-lg shadow-sm', isUser ? 'bg-gray-50' : 'bg-white')}> 
      <Avatar isUser={isUser} />
      <MessageContent message={message} isUser={isUser} />
    </div>
  );
}

function Avatar({ isUser }: { isUser: boolean }) {
  return (
    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: isUser ? '#DBEAFE' : '#EDE9FE' }}>
      {isUser ? <User className="w-6 h-6 text-blue-600" /> : <Bot className="w-6 h-6 text-purple-600" />}
    </div>
  );
}

function MessageContent({ message, isUser }: { message: ChatMessageType; isUser: boolean }) {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium text-gray-900">{isUser ? 'You' : 'Radiant Raiders'}</span>
        <span className="text-xs text-gray-500">{format(message.timestamp, 'HH:mm')}</span>
        {message.type && <MessageTypeBadge type={message.type} />}
      </div>
      <div className="prose prose-sm max-w-none text-gray-800">
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
    </div>
  );
}

function MessageTypeBadge({ type }: { type: ChatMessageType['type'] }) {
  return (
    <span className={twMerge('text-xs px-2 py-0.5 rounded font-medium', getTypeColor(type))}>
      {type}
    </span>
  );
}

function getTypeColor(type: ChatMessageType['type']): string {
  const typeColors: Record<string, string> = {
    jobs: 'bg-purple-100 text-purple-800',
    resume: 'bg-green-100 text-green-800',
    interview: 'bg-purple-100 text-purple-800',
    default: 'bg-gray-100 text-gray-800',
  };
  return typeColors[type] || typeColors.default;
}
