import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';
import { Message } from '../types';
import { useThemeStore } from '../store/themeStore';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  const { theme } = useThemeStore();

  const getStatusIcon = () => {
    if (!isOwn || !message.statuses || message.statuses.length === 0) return null;
    
    const status = message.statuses[0]?.status;
    
    switch (status) {
      case 'sent':
        return <Check size={14} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={14} className="text-gray-400" />;
      case 'read':
        return <CheckCheck size={14} className="text-blue-500" />;
      default:
        return <Check size={14} className="text-gray-400" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isOwn 
          ? 'bg-green-100 text-gray-800' 
          : 'bg-white text-gray-800 shadow-sm'
      }`}
      style={{
        backgroundColor: isOwn ? theme.colors.messageBubbleOwn : theme.colors.messageBubbleOther,
        color: theme.colors.text,
      }}>
        {!isOwn && message.sender && (
          <p className="text-xs font-semibold mb-1" style={{ color: theme.colors.primary }}>
            {message.sender.display_name}
          </p>
        )}
        
        <p className="text-sm leading-relaxed mb-1">
          {message.content}
        </p>
        
        <div className="flex items-center justify-end space-x-1 mt-1">
          <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
            {formatTime(message.created_at)}
          </span>
          {getStatusIcon()}
        </div>
      </div>
    </div>
  );
};