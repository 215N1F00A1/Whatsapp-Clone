import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, MessageCircle, Archive, Users, Settings } from 'lucide-react';
import { Conversation } from '../types';
import { ConversationItem } from './ConversationItem';
import { mockApi } from '../lib/supabase';
import { useThemeStore } from '../store/themeStore';

interface ConversationListProps {
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
  onShowSettings: () => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  selectedConversation,
  onSelectConversation,
  onShowSettings,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { theme } = useThemeStore();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const data = await mockApi.getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter(conversation =>
    conversation.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col h-full" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between" style={{ borderColor: theme.colors.border }}>
        <h1 className="text-xl font-semibold" style={{ color: theme.colors.text }}>Chats</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" style={{ color: theme.colors.textSecondary }}>
            <MessageCircle size={20} />
          </button>
          <button 
            onClick={onShowSettings}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors" 
            style={{ color: theme.colors.textSecondary }}
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-gray-200" style={{ borderColor: theme.colors.border }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none outline-none focus:bg-white focus:ring-2 focus:ring-green-500 transition-all"
            style={{ 
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
            }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-b border-gray-200 flex items-center space-x-4" style={{ borderColor: theme.colors.border }}>
        <button className="flex items-center space-x-2 text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors" style={{ color: theme.colors.primary }}>
          <Archive size={16} />
          <span>Archived</span>
        </button>
        <button className="flex items-center space-x-2 text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors" style={{ color: theme.colors.primary }}>
          <Users size={16} />
          <span>Groups</span>
        </button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <MessageCircle size={48} className="mb-2 opacity-50" />
            <p>No conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={selectedConversation === conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};