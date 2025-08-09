import React from 'react';
import { ArrowLeft, Phone, Video, MoreVertical, Search } from 'lucide-react';
import { Conversation } from '../types';
import { useThemeStore } from '../store/themeStore';

interface ChatHeaderProps {
  conversation: Conversation | null;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  conversation,
  onBack,
  showBackButton = false,
}) => {
  const { theme } = useThemeStore();

  if (!conversation) return null;

  return (
    <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}>
      <div className="flex items-center space-x-3">
        {showBackButton && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
            style={{ color: theme.colors.textSecondary }}
          >
            <ArrowLeft size={20} />
          </button>
        )}
        
        <img
          src={conversation.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.name || 'User')}&background=00a884&color=fff`}
          alt={conversation.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        
        <div>
          <h2 className="font-semibold" style={{ color: theme.colors.text }}>
            {conversation.name}
          </h2>
          <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
            {conversation.is_group ? 'Group • 4 participants' : 'last seen recently'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" style={{ color: theme.colors.textSecondary }}>
          <Search size={20} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" style={{ color: theme.colors.textSecondary }}>
          <Phone size={20} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" style={{ color: theme.colors.textSecondary }}>
          <Video size={20} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" style={{ color: theme.colors.textSecondary }}>
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};