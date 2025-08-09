import React, { useState, useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { ChatHeader } from './ChatHeader';
import { Message, Conversation } from '../types';
import { mockApi } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { useThemeStore } from '../store/themeStore';
import toast from 'react-hot-toast';

interface ChatWindowProps {
  selectedConversation: string | null;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedConversation,
  onBack,
  showBackButton = false,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { profile } = useAuth();
  const { theme } = useThemeStore();

  useEffect(() => {
    if (!selectedConversation || !profile) {
      setMessages([]);
      setConversation(null);
      return;
    }

    fetchMessages();
  }, [selectedConversation, profile]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    if (!selectedConversation) return;
    setLoading(true);
    try {
      const data = await mockApi.getMessages(selectedConversation);
      setMessages(data);
      
      // Set conversation info from mock data
      const mockConversations = await mockApi.getConversations();
      const conv = mockConversations.find(c => c.id === selectedConversation);
      if (conv) {
        setConversation(conv);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedConversation || !profile) return;

    try {
      await mockApi.sendMessage(selectedConversation, content);
      await fetchMessages();
      toast.success('Message sent!');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!selectedConversation) {
    return (
      <div className="flex-1 flex flex-col" style={{ backgroundColor: theme.colors.background }}>
        <div className="px-4 py-3 border-b" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}>
          <div className="flex items-center justify-center h-12">
            <span style={{ color: theme.colors.textSecondary }}>Select a conversation to start chatting</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: theme.colors.background }}>
          <div className="text-center" style={{ color: theme.colors.textSecondary }}>
            <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: theme.colors.border }}>
              <span className="text-4xl">💬</span>
            </div>
            <h2 className="text-2xl font-medium mb-2" style={{ color: theme.colors.text }}>WhatsApp Web</h2>
            <p className="max-w-md" style={{ color: theme.colors.textSecondary }}>
              Send and receive messages without keeping your phone connected.
            </p>
            <p className="text-sm mt-2" style={{ color: theme.colors.textSecondary }}>
              Select a conversation from the sidebar to get started.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full" style={{ backgroundColor: theme.colors.background }}>
      <ChatHeader conversation={conversation} onBack={onBack} showBackButton={showBackButton} />

      <div 
        className="flex-1 overflow-y-auto px-4 py-4" 
        style={{ 
          backgroundColor: theme.colors.background,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full" style={{ color: theme.colors.textSecondary }}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: theme.colors.border }}>
                <span className="text-2xl">👋</span>
              </div>
              <p>No messages yet</p>
              <p className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>Send a message to start the conversation</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} isOwn={message.sender_id === profile?.id} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <MessageInput onSendMessage={handleSendMessage} disabled={!selectedConversation} />
    </div>
  );
};
