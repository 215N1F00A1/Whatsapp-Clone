import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme } from '../types';

const themes: Record<string, Theme> = {
  light: {
    name: 'Light',
    colors: {
      primary: '#00a884',
      secondary: '#008069',
      background: '#f0f2f5',
      surface: '#ffffff',
      text: '#111b21',
      textSecondary: '#667781',
      border: '#e9edef',
      messageBubbleOwn: '#d9fdd3',
      messageBubbleOther: '#ffffff',
    },
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#00a884',
      secondary: '#008069',
      background: '#0b141a',
      surface: '#202c33',
      text: '#e9edef',
      textSecondary: '#8696a0',
      border: '#2a3942',
      messageBubbleOwn: '#005c4b',
      messageBubbleOther: '#202c33',
    },
  },
  blue: {
    name: 'Blue',
    colors: {
      primary: '#1976d2',
      secondary: '#1565c0',
      background: '#f5f7fa',
      surface: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#666666',
      border: '#e0e0e0',
      messageBubbleOwn: '#e3f2fd',
      messageBubbleOther: '#ffffff',
    },
  },
  purple: {
    name: 'Purple',
    colors: {
      primary: '#7b1fa2',
      secondary: '#6a1b9a',
      background: '#faf5ff',
      surface: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#666666',
      border: '#e0e0e0',
      messageBubbleOwn: '#f3e5f5',
      messageBubbleOther: '#ffffff',
    },
  },
};

interface ThemeStore {
  currentTheme: string;
  theme: Theme;
  setTheme: (themeName: string) => void;
  availableThemes: Record<string, Theme>;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      currentTheme: 'light',
      theme: themes.light,
      availableThemes: themes,
      setTheme: (themeName: string) => {
        const theme = themes[themeName];
        if (theme) {
          set({ currentTheme: themeName, theme });
          // Apply CSS variables
          const root = document.documentElement;
          Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
          });
        }
      },
    }),
    {
      name: 'whatsapp-theme',
    }
  )
);