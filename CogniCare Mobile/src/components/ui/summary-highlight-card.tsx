import type { ReactNode } from 'react';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { AppCard } from './app-card';

type SummaryHighlightCardProps = {
  title: string;
  body: string;
  emphasis?: 'primary' | 'secondary' | 'warning';
  children?: ReactNode;
};

export function SummaryHighlightCard({ title, body, emphasis = 'secondary', children }: SummaryHighlightCardProps) {
  const theme = useTheme();
  const color = emphasis === 'warning' ? theme.warning : emphasis === 'primary' ? theme.primary : theme.text;
  const isPrimary = emphasis === 'primary';

  return (
    <AppCard
      style={{
        borderWidth: 1,
        borderLeftWidth: isPrimary ? 4 : 1,
        borderColor: emphasis === 'secondary' ? theme.border : color,
        backgroundColor: theme.backgroundElement,
        paddingLeft: isPrimary ? Spacing.three - Spacing.one : Spacing.three,
      }}>
      <ThemedText type="smallBold" style={{ color }}>
        {title}
      </ThemedText>
      {children}
      <ThemedText
        selectable
        themeColor="textSecondary"
        style={{
          fontSize: emphasis === 'primary' ? 17 : 15,
          lineHeight: emphasis === 'primary' ? 26 : 23,
          paddingTop: children ? 0 : Spacing.one,
        }}>
        {body}
      </ThemedText>
    </AppCard>
  );
}
