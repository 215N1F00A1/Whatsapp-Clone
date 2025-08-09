import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ConversationList } from './components/ConversationList';
import { ChatWindow } from './components/ChatWindow';
import { SettingsModal } from './components/SettingsModal';
import { useAuth } from './hooks/useAuth';
import { useThemeStore } from './store/themeStore';

function App() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { profile, loading } = useAuth();
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Apply theme CSS variables on mount
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });
  }, [theme]);

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: theme.colors.primary }}></div>
          <p style={{ color: theme.colors.text }}>Loading WhatsApp Web...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden" style={{ backgroundColor: theme.colors.background }}>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: theme.colors.surface,
            color: theme.colors.text,
            border: `1px solid ${theme.colors.border}`,
          },
        }}
      />
      
      {/* Mobile: Show either conversation list or chat window */}
      {isMobile ? (
        <>
          {!selectedConversation ? (
            <ConversationList
              selectedConversation={selectedConversation}
              onSelectConversation={handleSelectConversation}
              onShowSettings={() => setShowSettings(true)}
            />
          ) : (
            <ChatWindow
              selectedConversation={selectedConversation}
              onBack={handleBackToList}
              showBackButton={true}
            />
          )}
        </>
      ) : (
        /* Desktop: Show both side by side */
        <>
          <ConversationList
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            onShowSettings={() => setShowSettings(true)}
          />
          <ChatWindow
            selectedConversation={selectedConversation}
            showBackButton={false}
          />
        </>
      )}

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}

export default App;
