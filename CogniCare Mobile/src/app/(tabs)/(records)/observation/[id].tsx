import { useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { AppCard } from '@/components/ui/app-card';
import { Screen } from '@/components/ui/screen';
import { StateView } from '@/components/ui/state-view';
import { useObservationRecord } from '@/hooks/use-observation-records';

export default function ObservationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state } = useObservationRecord(id);

  return (
    <Screen>
      <StateView state={state}>
        {(record) => (
          <AppCard>
            <ThemedText type="smallBold">记录日期</ThemedText>
            <ThemedText selectable>{record.recordDate}</ThemedText>
            <ThemedText type="smallBold">记录人</ThemedText>
            <ThemedText selectable>{record.recorder}</ThemedText>
            <ThemedText type="smallBold">近期记忆变化</ThemedText>
            <ThemedText selectable>{record.memoryChange}</ThemedText>
            <ThemedText type="smallBold">近期情绪变化</ThemedText>
            <ThemedText selectable>{record.emotionChange}</ThemedText>
            <ThemedText type="smallBold">表达或沟通情况</ThemedText>
            <ThemedText selectable>{record.communicationChange}</ThemedText>
            <ThemedText type="smallBold">日常生活能力变化</ThemedText>
            <ThemedText selectable>{record.dailyLivingChange}</ThemedText>
            <ThemedText type="smallBold">补充说明</ThemedText>
            <ThemedText selectable themeColor="textSecondary">{record.notes || '暂无补充说明'}</ThemedText>
          </AppCard>
        )}
      </StateView>
    </Screen>
  );
}
