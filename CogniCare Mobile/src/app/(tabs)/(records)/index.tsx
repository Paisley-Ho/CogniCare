import { EmptyState } from '@/components/ui/empty-state';
import { RecordListItem } from '@/components/ui/record-list-item';
import { RecordOverviewSection } from '@/components/ui/record-overview-section';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';
import { StateView } from '@/components/ui/state-view';
import { useAppointments } from '@/hooks/use-appointments';
import { useObservationRecords } from '@/hooks/use-observation-records';
import { useQuestionnaireRecords } from '@/hooks/use-questionnaire-records';
import { getAppointmentStatusTone } from '@/model/appointment';

export default function RecordsScreen() {
  const observations = useObservationRecords();
  const questionnaires = useQuestionnaireRecords();
  const appointments = useAppointments();

  return (
    <Screen>
      <SectionHeader title="记录" subtitle="家庭观察、随访问卷与预约记录将在这里展示。" />
      <RecordOverviewSection
        title="预约记录"
        description="查看已提交的复查预约与处理状态。"
        listHref="/(tabs)/(records)/appointment"
        actionHref="/(tabs)/(records)/appointment/new"
        actionTitle="提交预约"
        actionVariant="primary">
        <StateView state={appointments.state}>
          {({ records }) =>
            records.length ? (
              records.slice(0, 2).map((record) => (
                <RecordListItem
                  key={record.id}
                  href={`/(tabs)/(records)/appointment/${record.id}`}
                  title={record.appointmentDate}
                  subtitle={record.appointmentType}
                  tag={record.status}
                  tagTone={getAppointmentStatusTone(record.status)}
                />
              ))
            ) : (
              <EmptyState title="当前暂无预约记录" body="提交预约后将在这里展示" />
            )
          }
        </StateView>
      </RecordOverviewSection>

      <RecordOverviewSection
        title="随访问卷结果记录"
        description="查看历次随访问卷填写结果。"
        listHref="/(tabs)/(records)/questionnaire"
        actionHref="/(tabs)/(records)/questionnaire/new"
        actionTitle="继续填写">
        <StateView state={questionnaires.state}>
          {({ records }) =>
            records.length ? (
              records.slice(0, 2).map((record) => (
                <RecordListItem
                  key={record.id}
                  href={`/(tabs)/(records)/questionnaire/${record.id}`}
                  title={record.submittedAt.slice(0, 10)}
                  subtitle={`睡眠情况：${record.sleepStatus}`}
                  meta={`记忆自评：${record.memorySelfAssessment}`}
                />
              ))
            ) : (
              <EmptyState title="当前暂无随访问卷结果记录" body="后续填写的问卷结果将在这里展示" />
            )
          }
        </StateView>
      </RecordOverviewSection>

      <RecordOverviewSection
        title="家庭观察记录"
        description="查看家庭成员或本人记录的近期表现变化。"
        listHref="/(tabs)/(records)/observation"
        actionHref="/(tabs)/(records)/observation/new"
        actionTitle="新增记录">
        <StateView state={observations.state}>
          {({ records }) =>
            records.length ? (
              records.slice(0, 2).map((record) => (
                <RecordListItem
                  key={record.id}
                  href={`/(tabs)/(records)/observation/${record.id}`}
                  title={record.recordDate}
                  subtitle={`记录人：${record.recorder}`}
                  meta={`总体情况：${record.memoryChange}`}
                />
              ))
            ) : (
              <EmptyState title="当前暂无家庭观察记录" body="建议定期记录近期变化，便于后续复查参考" />
            )
          }
        </StateView>
      </RecordOverviewSection>
    </Screen>
  );
}
