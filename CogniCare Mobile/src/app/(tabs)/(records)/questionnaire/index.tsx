import { Link } from 'expo-router';

import { AppButton } from '@/components/ui/app-button';
import { EmptyState } from '@/components/ui/empty-state';
import { RecordListItem } from '@/components/ui/record-list-item';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';
import { StateView } from '@/components/ui/state-view';
import { useQuestionnaireRecords } from '@/hooks/use-questionnaire-records';

export default function QuestionnaireListScreen() {
  const { state } = useQuestionnaireRecords();

  return (
    <Screen>
      <SectionHeader title="随访问卷" subtitle="请根据近期实际情况完成随访填写，便于后续门诊随访管理。" />
      <StateView state={state}>
        {({ records }) =>
          records.length ? (
            records.map((record) => (
              <RecordListItem
                key={record.id}
                href={`/(tabs)/(records)/questionnaire/${record.id}`}
                title={record.submittedAt.slice(0, 10)}
                subtitle={`睡眠情况：${record.sleepStatus}`}
                meta={`情绪状态：${record.emotionStatus}`}
              />
            ))
          ) : (
            <EmptyState title="当前暂无随访问卷记录" body="后续填写的问卷将在这里展示" />
          )
        }
      </StateView>
      <Link href="/(tabs)/(records)/questionnaire/new" asChild>
        <AppButton title="提交问卷" />
      </Link>
    </Screen>
  );
}
