import { TextInput, TextInputProps, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function FormField({ label, error, ...props }: TextInputProps & { label: string; error?: string }) {
  const theme = useTheme();

  return (
    <View style={{ gap: Spacing.one }}>
      <ThemedText type="smallBold">{label}</ThemedText>
      <TextInput
        placeholderTextColor={theme.textSecondary}
        style={{
          minHeight: 50,
          borderRadius: 16,
          borderCurve: 'continuous',
          borderWidth: 1,
          borderColor: error ? theme.danger : theme.border,
          backgroundColor: theme.backgroundElement,
          color: theme.text,
          paddingHorizontal: Spacing.three,
          fontSize: 17,
        }}
        {...props}
      />
      {error ? (
        <ThemedText selectable type="small" style={{ color: theme.danger }}>
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
}
