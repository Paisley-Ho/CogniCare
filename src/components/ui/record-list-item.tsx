import { Href, Link } from 'expo-router';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { AppCard } from './app-card';
import { StatusTag } from './status-tag';

export function RecordListItem({
  href,
  title,
  subtitle,
  meta,
  tag,
  tagTone = 'primary',
}: {
  href: Href;
  title: string;
  subtitle: string;
  meta?: string;
  tag?: string;
  tagTone?: 'primary' | 'success' | 'warning' | 'danger';
}) {
  return (
    <Link href={href} asChild>
      <Pressable>
        <AppCard>
          <View style={{ gap: Spacing.one }}>
            <ThemedText selectable type="smallBold">
              {title}
            </ThemedText>
            <ThemedText selectable type="small" themeColor="textSecondary">
              {subtitle}
            </ThemedText>
            {meta ? (
              <ThemedText selectable type="small" themeColor="textSecondary">
                {meta}
              </ThemedText>
            ) : null}
          </View>
          {tag ? <StatusTag label={tag} tone={tagTone} /> : null}
        </AppCard>
      </Pressable>
    </Link>
  );
}
