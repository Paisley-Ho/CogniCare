import { Link, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { AppButton } from './app-button';
import { AppCard } from './app-card';

type RecordOverviewSectionProps = {
  title: string;
  description: string;
  listHref: Href;
  listTitle?: string;
  actionHref: Href;
  actionTitle: string;
  actionVariant?: 'primary' | 'secondary';
  children: ReactNode;
};

export function RecordOverviewSection({
  title,
  description,
  listHref,
  listTitle = '查看全部',
  actionHref,
  actionTitle,
  actionVariant = 'secondary',
  children,
}: RecordOverviewSectionProps) {
  return (
    <AppCard>
      <View style={{ gap: Spacing.one }}>
        <ThemedText type="smallBold">{title}</ThemedText>
        <ThemedText selectable type="small" themeColor="textSecondary">
          {description}
        </ThemedText>
      </View>
      {children}
      <View style={{ flexDirection: 'row', gap: Spacing.two }}>
        <Link href={listHref} asChild>
          <AppButton title={listTitle} variant="secondary" style={{ flex: 1 }} />
        </Link>
        <Link href={actionHref} asChild>
          <AppButton title={actionTitle} variant={actionVariant} style={{ flex: 1 }} />
        </Link>
      </View>
    </AppCard>
  );
}
