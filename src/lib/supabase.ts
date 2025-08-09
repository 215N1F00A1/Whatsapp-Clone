import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for demo purposes
export const mockProfiles = [
  {
    id: '1',
    display_name: 'John Doe',
    phone_number: '+1234567890',
    avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'Hey there! I am using WhatsApp.',
    is_online: true,
    last_seen: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    display_name: 'Jane Smith',
    phone_number: '+1234567891',
    avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'Busy',
    is_online: false,
    last_seen: new Date(Date.now() - 300000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    display_name: 'Mike Johnson',
    phone_number: '+1234567892',
    avatar_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'Available',
    is_online: true,
    last_seen: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    display_name: 'Sarah Wilson',
    phone_number: '+1234567893',
    avatar_url: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'At work',
    is_online: false,
    last_seen: new Date(Date.now() - 3600000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const mockConversations = [
  {
    id: '1',
    name: 'John Doe',
    is_group: false,
    avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    last_message: 'Hey! How are you doing?',
    last_message_at: new Date(Date.now() - 300000).toISOString(),
    unread_count: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    is_group: false,
    avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    last_message: 'Thanks for the help!',
    last_message_at: new Date(Date.now() - 600000).toISOString(),
    unread_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Family Group',
    is_group: true,
    avatar_url: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=150',
    last_message: 'Mike: See you all tomorrow!',
    last_message_at: new Date(Date.now() - 1800000).toISOString(),
    unread_count: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    is_group: false,
    avatar_url: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    last_message: 'Perfect! Let\'s do it.',
    last_message_at: new Date(Date.now() - 3600000).toISOString(),
    unread_count: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const mockMessages = [
  {
    id: '1',
    conversation_id: '1',
    sender_id: '1',
    content: 'Hey! How are you doing?',
    message_type: 'text' as const,
    sender: mockProfiles[0],
    statuses: [{ id: '1', message_id: '1', profile_id: 'current-user', status: 'read' as const, created_at: new Date().toISOString() }],
    created_at: new Date(Date.now() - 300000).toISOString(),
    updated_at: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: '2',
    conversation_id: '1',
    sender_id: 'current-user',
    content: 'I\'m doing great! Thanks for asking. How about you?',
    message_type: 'text' as const,
    sender: { id: 'current-user', display_name: 'You', phone_number: '+1234567899', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    statuses: [{ id: '2', message_id: '2', profile_id: '1', status: 'delivered' as const, created_at: new Date().toISOString() }],
    created_at: new Date(Date.now() - 240000).toISOString(),
    updated_at: new Date(Date.now() - 240000).toISOString(),
  },
  {
    id: '3',
    conversation_id: '1',
    sender_id: '1',
    content: 'I\'m doing well too! Just finished a big project at work.',
    message_type: 'text' as const,
    sender: mockProfiles[0],
    statuses: [{ id: '3', message_id: '3', profile_id: 'current-user', status: 'read' as const, created_at: new Date().toISOString() }],
    created_at: new Date(Date.now() - 180000).toISOString(),
    updated_at: new Date(Date.now() - 180000).toISOString(),
  },
  {
    id: '4',
    conversation_id: '2',
    sender_id: '2',
    content: 'Thanks for the help with the presentation!',
    message_type: 'text' as const,
    sender: mockProfiles[1],
    statuses: [{ id: '4', message_id: '4', profile_id: 'current-user', status: 'read' as const, created_at: new Date().toISOString() }],
    created_at: new Date(Date.now() - 600000).toISOString(),
    updated_at: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: '5',
    conversation_id: '2',
    sender_id: 'current-user',
    content: 'You\'re welcome! Glad I could help.',
    message_type: 'text' as const,
    sender: { id: 'current-user', display_name: 'You', phone_number: '+1234567899', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    statuses: [{ id: '5', message_id: '5', profile_id: '2', status: 'read' as const, created_at: new Date().toISOString() }],
    created_at: new Date(Date.now() - 540000).toISOString(),
    updated_at: new Date(Date.now() - 540000).toISOString(),
  },
];

// Mock API functions
export const mockApi = {
  getConversations: () => Promise.resolve(mockConversations),
  getMessages: (conversationId: string) => Promise.resolve(mockMessages.filter(m => m.conversation_id === conversationId)),
  sendMessage: (conversationId: string, content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      conversation_id: conversationId,
      sender_id: 'current-user',
      content,
      message_type: 'text' as const,
      sender: { id: 'current-user', display_name: 'You', phone_number: '+1234567899', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      statuses: [{ id: Date.now().toString(), message_id: Date.now().toString(), profile_id: 'other', status: 'sent' as const, created_at: new Date().toISOString() }],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockMessages.push(newMessage);
    
    // Update conversation last message
    const conversation = mockConversations.find(c => c.id === conversationId);
    if (conversation) {
      conversation.last_message = content;
      conversation.last_message_at = new Date().toISOString();
    }
    
    // Simulate status updates
    setTimeout(() => {
      newMessage.statuses = [{ id: Date.now().toString(), message_id: newMessage.id, profile_id: 'other', status: 'delivered' as const, created_at: new Date().toISOString() }];
    }, 1000);
    
    setTimeout(() => {
      newMessage.statuses = [{ id: Date.now().toString(), message_id: newMessage.id, profile_id: 'other', status: 'read' as const, created_at: new Date().toISOString() }];
    }, 3000);
    
    return Promise.resolve(newMessage);
  },
};