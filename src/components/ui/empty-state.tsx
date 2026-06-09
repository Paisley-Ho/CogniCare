import { AppCard } from './app-card';
import { ThemedText } from '@/components/themed-text';

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <AppCard>
      <ThemedText selectable type="smallBold">
        {title}
      </ThemedText>
      <ThemedText selectable type="small" themeColor="textSecondary">
        {body}
      </ThemedText>
    </AppCard>
  );
}
