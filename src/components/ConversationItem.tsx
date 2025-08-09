import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Check, CheckCheck, Volume2 } from 'lucide-react';
import { Conversation } from '../types';
import { useThemeStore } from '../store/themeStore';

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isSelected,
  onClick,
}) => {
  const { theme } = useThemeStore();

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? 'bg-gray-100' : ''
      }`}
      style={{
        backgroundColor: isSelected ? theme.colors.background : 'transparent',
      }}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0 mr-3">
        <img
          src={conversation.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.name || 'User')}&background=00a884&color=fff`}
          alt={conversation.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        {conversation.is_group && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">👥</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold truncate" style={{ color: theme.colors.text }}>
            {conversation.name}
          </h3>
          <div className="flex items-center space-x-1">
            {conversation.last_message_at && (
              <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
                {formatTime(conversation.last_message_at)}
              </span>
            )}
            <Volume2 size={12} className="text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 flex-1 min-w-0">
            <CheckCheck size={14} className="text-blue-500 flex-shrink-0" />
            <p className="text-sm truncate" style={{ color: theme.colors.textSecondary }}>
              {conversation.last_message || 'No messages yet'}
            </p>
          </div>
          
          {conversation.unread_count && conversation.unread_count > 0 && (
            <div className="ml-2 bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
              {conversation.unread_count > 99 ? '99+' : conversation.unread_count}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};