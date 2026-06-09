import { Pressable, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AppButtonProps = PressableProps & {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: StyleProp<ViewStyle>;
};

export function AppButton({ title, variant = 'primary', disabled, style, ...props }: AppButtonProps) {
  const theme = useTheme();
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';
  const backgroundColor = isPrimary ? theme.primary : isDanger ? '#FFF1F0' : theme.primarySoft;
  const color = isPrimary ? '#FFFFFF' : isDanger ? theme.danger : theme.primary;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={[
        {
          minHeight: 48,
          borderRadius: 16,
          borderCurve: 'continuous',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: Spacing.three,
          opacity: disabled ? 0.5 : 1,
          backgroundColor,
        },
        style,
      ]}
      {...props}>
      <ThemedText type="default" style={{ color, fontWeight: '700' } as StyleProp<TextStyle>}>
        {title}
      </ThemedText>
    </Pressable>
  );
}
