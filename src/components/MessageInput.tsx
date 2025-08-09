import React, { useState } from 'react';
import { Send, Paperclip, Mic, Smile } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { theme } = useThemeStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white px-4 py-3 border-t border-gray-200" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}>
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <button
          type="button"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          style={{ color: theme.colors.textSecondary }}
        >
          <Paperclip size={20} />
        </button>

        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-2 bg-gray-100 rounded-lg border-none outline-none focus:bg-white focus:ring-2 focus:ring-green-500 transition-all resize-none max-h-32"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
            }}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
            style={{ color: theme.colors.textSecondary }}
          >
            <Smile size={16} />
          </button>
        </div>

        {message.trim() ? (
          <button
            type="submit"
            disabled={disabled}
            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors disabled:opacity-50"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <Send size={20} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsRecording(!isRecording)}
            className={`p-2 rounded-full transition-colors ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'hover:bg-gray-100'
            }`}
            style={{ color: isRecording ? 'white' : theme.colors.textSecondary }}
          >
            <Mic size={20} />
          </button>
        )}
      </form>
    </div>
  );
};