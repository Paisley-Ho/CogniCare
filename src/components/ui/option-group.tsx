import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  const theme = useTheme();

  return (
    <View style={{ gap: Spacing.two }}>
      <ThemedText type="smallBold">{label}</ThemedText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two }}>
        {options.map((option) => {
          const selected = option === value;
          return (
            <Pressable
              accessibilityRole="button"
              key={option}
              onPress={() => onChange(option)}
              style={{
                minHeight: 42,
                borderRadius: 999,
                paddingHorizontal: Spacing.three,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selected ? theme.primary : theme.primarySoft,
              }}>
              <ThemedText style={{ color: selected ? '#FFFFFF' : theme.primary, fontWeight: '700' }}>{option}</ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
