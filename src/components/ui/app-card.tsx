import { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export function AppCard({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return (
    <ThemedView
      type="backgroundElement"
      style={[
        {
          borderRadius: 24,
          borderCurve: 'continuous',
          padding: Spacing.three,
          gap: Spacing.two,
          boxShadow: '0 8px 24px rgba(37, 109, 133, 0.08)',
        },
        style,
      ]}>
      {children}
    </ThemedView>
  );
}
