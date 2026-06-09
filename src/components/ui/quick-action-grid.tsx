import { Link, type Href } from 'expo-router';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { AppCard } from './app-card';

type QuickAction = {
  href: Href;
  title: string;
};

type QuickActionGridProps = {
  primaryActions: QuickAction[];
  secondaryActions: QuickAction[];
};

function QuickActionTile({ action, emphasis }: { action: QuickAction; emphasis: 'primary' | 'secondary' }) {
  const theme = useTheme();
  const isPrimary = emphasis === 'primary';

  return (
    <Link href={action.href} asChild>
      <Pressable style={{ flex: 1 }}>
        <AppCard
          style={{
            minHeight: isPrimary ? 96 : 76,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0,
            backgroundColor: theme.backgroundElement,
            paddingHorizontal: Spacing.three,
            boxShadow: isPrimary ? '0 10px 28px rgba(37, 109, 133, 0.12)' : '0 8px 20px rgba(37, 109, 133, 0.06)',
          }}>
          <ThemedText
            type={isPrimary ? 'default' : 'smallBold'}
            themeColor={isPrimary ? 'primary' : 'text'}
            style={{
              textAlign: 'center',
              fontWeight: 700,
              lineHeight: isPrimary ? 24 : 20,
            }}>
            {action.title}
          </ThemedText>
        </AppCard>
      </Pressable>
    </Link>
  );
}

export function QuickActionGrid({ primaryActions, secondaryActions }: QuickActionGridProps) {
  return (
    <View style={{ gap: Spacing.two }}>
      <View style={{ flexDirection: 'row', gap: Spacing.two }}>
        {primaryActions.map((action) => (
          <QuickActionTile key={action.title} action={action} emphasis="primary" />
        ))}
      </View>
      <View style={{ flexDirection: 'row', gap: Spacing.two }}>
        {secondaryActions.map((action) => (
          <QuickActionTile key={action.title} action={action} emphasis="secondary" />
        ))}
      </View>
    </View>
  );
}
