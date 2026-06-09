import { useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { AppCard } from '@/components/ui/app-card';
import { Screen } from '@/components/ui/screen';
import { StateView } from '@/components/ui/state-view';
import { useQuestionnaireRecord } from '@/hooks/use-questionnaire-records';

export default function QuestionnaireDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state } = useQuestionnaireRecord(id);

  return (
    <Screen>
      <StateView state={state}>
        {(record) => (
          <AppCard>
            <ThemedText type="smallBold">提交时间</ThemedText>
            <ThemedText selectable>{record.submittedAt.slice(0, 10)}</ThemedText>
            <ThemedText type="smallBold">近期睡眠情况</ThemedText>
            <ThemedText selectable>{record.sleepStatus}</ThemedText>
            <ThemedText type="smallBold">近期情绪状态</ThemedText>
            <ThemedText selectable>{record.emotionStatus}</ThemedText>
            <ThemedText type="smallBold">近期记忆自评</ThemedText>
            <ThemedText selectable>{record.memorySelfAssessment}</ThemedText>
            <ThemedText type="smallBold">家属观察到的主要变化</ThemedText>
            <ThemedText selectable themeColor="textSecondary">{record.familyObservedChanges || '暂无补充'}</ThemedText>
            <ThemedText type="smallBold">是否已按时复查</ThemedText>
            <ThemedText selectable>{record.reviewedOnTime}</ThemedText>
            <ThemedText type="smallBold">新的就医安排</ThemedText>
            <ThemedText selectable>{record.medicalArrangement}</ThemedText>
            <ThemedText type="smallBold">补充说明</ThemedText>
            <ThemedText selectable themeColor="textSecondary">{record.notes || '暂无补充说明'}</ThemedText>
          </AppCard>
        )}
      </StateView>
    </Screen>
  );
}
