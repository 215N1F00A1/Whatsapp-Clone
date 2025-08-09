import React from 'react';
import { X, Palette, Moon, Sun, Monitor, User, Bell, Lock, Info } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useAuth } from '../hooks/useAuth';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme, currentTheme, setTheme, availableThemes } = useThemeStore();
  const { profile } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto" style={{ backgroundColor: theme.colors.surface }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: theme.colors.border }}>
          <h2 className="text-xl font-semibold" style={{ color: theme.colors.text }}>Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            style={{ color: theme.colors.textSecondary }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-b" style={{ borderColor: theme.colors.border }}>
          <div className="flex items-center space-x-3">
            <img
              src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.display_name || 'User')}&background=00a884&color=fff`}
              alt={profile?.display_name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg" style={{ color: theme.colors.text }}>
                {profile?.display_name}
              </h3>
              <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                {profile?.phone_number}
              </p>
              <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                {profile?.status}
              </p>
            </div>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="p-4 border-b" style={{ borderColor: theme.colors.border }}>
          <div className="flex items-center space-x-3 mb-3">
            <Palette size={20} style={{ color: theme.colors.primary }} />
            <h3 className="font-semibold" style={{ color: theme.colors.text }}>Theme</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(availableThemes).map(([key, themeOption]) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  currentTheme === key 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{
                  borderColor: currentTheme === key ? theme.colors.primary : theme.colors.border,
                  backgroundColor: currentTheme === key ? `${theme.colors.primary}10` : 'transparent',
                }}
              >
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: themeOption.colors.primary }}
                  />
                  <span className="text-sm font-medium" style={{ color: theme.colors.text }}>
                    {themeOption.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Options */}
        <div className="p-4 space-y-2">
          <SettingsItem icon={User} label="Account" />
          <SettingsItem icon={Lock} label="Privacy" />
          <SettingsItem icon={Bell} label="Notifications" />
          <SettingsItem icon={Info} label="Help" />
        </div>

        {/* Footer */}
        <div className="p-4 border-t text-center" style={{ borderColor: theme.colors.border }}>
          <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
            WhatsApp Web Clone v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

const SettingsItem: React.FC<{ icon: React.ElementType; label: string }> = ({ icon: Icon, label }) => {
  const { theme } = useThemeStore();
  
  return (
    <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <Icon size={20} style={{ color: theme.colors.textSecondary }} />
      <span style={{ color: theme.colors.text }}>{label}</span>
    </button>
  );
};