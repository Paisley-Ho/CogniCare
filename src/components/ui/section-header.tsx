import { ThemedText } from '@/components/themed-text';

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <>
      <ThemedText type="subtitle" style={{ fontSize: 22, lineHeight: 30 }}>
        {title}
      </ThemedText>
      {subtitle ? (
        <ThemedText selectable type="small" themeColor="textSecondary">
          {subtitle}
        </ThemedText>
      ) : null}
    </>
  );
}
