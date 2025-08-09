export interface Profile {
  id: string;
  display_name: string;
  phone_number: string;
  avatar_url?: string;
  status?: string;
  last_seen?: string;
  is_online?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  name?: string;
  is_group: boolean;
  avatar_url?: string;
  last_message?: string;
  last_message_at?: string;
  unread_count?: number;
  participants?: any[];
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'audio' | 'video' | 'document';
  media_url?: string;
  reply_to_id?: string;
  reply_to?: Message;
  sender?: Profile;
  statuses?: MessageStatus[];
  created_at: string;
  updated_at: string;
}

export interface MessageStatus {
  id: string;
  message_id: string;
  profile_id: string;
  status: 'sent' | 'delivered' | 'read';
  created_at: string;
}

export interface ConversationParticipant {
  id: string;
  conversation_id: string;
  profile_id: string;
  role: 'admin' | 'member';
  joined_at: string;
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    messageBubbleOwn: string;
    messageBubbleOther: string;
  };
}