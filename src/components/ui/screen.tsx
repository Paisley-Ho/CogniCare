import { PropsWithChildren } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export function Screen({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        {
          padding: Spacing.three,
          paddingBottom: BottomTabInset + Spacing.four,
          gap: Spacing.three,
          width: '100%',
          maxWidth: MaxContentWidth,
          alignSelf: 'center',
        },
        style,
      ]}>
      {children}
    </ScrollView>
  );
}
