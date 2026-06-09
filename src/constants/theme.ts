/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#172033',
    background: '#F5F8FB',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E4F0F8',
    textSecondary: '#65758B',
    primary: '#256D85',
    primarySoft: '#E7F4F6',
    success: '#2E7D68',
    warning: '#A86616',
    danger: '#B42318',
    border: '#D9E4EC',
  },
  dark: {
    text: '#F6F8FB',
    background: '#101820',
    backgroundElement: '#18232D',
    backgroundSelected: '#203442',
    textSecondary: '#B7C4D1',
    primary: '#7AC7D8',
    primarySoft: '#183640',
    success: '#7ED8B8',
    warning: '#F0B35F',
    danger: '#FF9B91',
    border: '#2C4352',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
