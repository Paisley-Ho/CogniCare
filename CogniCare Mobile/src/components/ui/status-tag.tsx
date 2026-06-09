import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function StatusTag({ label, tone = 'primary' }: { label: string; tone?: 'primary' | 'success' | 'warning' | 'danger' }) {
  const theme = useTheme();
  const color = theme[tone];

  return (
    <ThemedText
      selectable
      type="smallBold"
      style={{
        alignSelf: 'flex-start',
        color,
        backgroundColor: tone === 'warning' ? '#FFF8E8' : theme.primarySoft,
        borderRadius: 999,
        overflow: 'hidden',
        paddingHorizontal: Spacing.two,
        paddingVertical: Spacing.one,
      }}>
      {label}
    </ThemedText>
  );
}
