// constants/Colors.ts

// Primary colors from the logo
const tealPrimary = '#4A969B';  // Teal from the logo
const purpleAccent = '#A370A4'; // Purple from the logo
const lightBackground = '#E5F1F1'; // Light teal background

export default {
  light: {
    text: '#1f2937',
    background: lightBackground,
    tint: tealPrimary,
    tabIconDefault: '#9ca3af',
    tabIconSelected: tealPrimary,
    cardBackground: '#ffffff',
    primary: tealPrimary,
    secondary: purpleAccent,
    muted: '#6b7280',
    danger: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
  },
  dark: {
    text: '#f9fafb',
    background: '#111827',
    tint: tealPrimary,
    tabIconDefault: '#6b7280',
    tabIconSelected: tealPrimary,
    cardBackground: '#1f2937',
    primary: tealPrimary,
    secondary: purpleAccent,
    muted: '#9ca3af',
    danger: '#f87171',
    success: '#34d399',
    warning: '#fbbf24',
  },
};
