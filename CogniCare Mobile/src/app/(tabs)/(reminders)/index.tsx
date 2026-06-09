import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { AppCard } from '@/components/ui/app-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';
import { StateView } from '@/components/ui/state-view';
import { StatusTag } from '@/components/ui/status-tag';
import { useReminders } from '@/hooks/use-reminders';

function getCompleteTitle(category: string) {
  if (category === '问卷提醒') return '已填写';
  if (category === '观察记录提醒') return '已记录';
  if (category === '复查提醒') return '已预约';
  return '已完成';
}

export default function RemindersScreen() {
  const { state, completeReminder } = useReminders();

  return (
    <Screen>
      <SectionHeader title="提醒中心" subtitle="这里将展示复查、问卷、观察记录等相关提醒。" />
      <StateView state={state}>
        {({ records }) =>
          records.length ? (
            records.map((reminder) => (
              <AppCard key={reminder.id}>
                <StatusTag label={reminder.category} tone="primary" />
                <ThemedText selectable type="smallBold">{reminder.title}</ThemedText>
                <ThemedText selectable themeColor="textSecondary">{reminder.body}</ThemedText>
                <ThemedText selectable type="small" themeColor="textSecondary">提醒时间：{reminder.dueAt}</ThemedText>
                <StatusTag label={reminder.status} tone={reminder.status === '已完成' ? 'success' : 'warning'} />
                <AppButton title={getCompleteTitle(reminder.category)} variant="secondary" onPress={() => completeReminder(reminder.id)} />
              </AppCard>
            ))
          ) : (
            <EmptyState title="当前暂无新的提醒" body="后续随访与复查提醒将在这里展示" />
          )
        }
      </StateView>
    </Screen>
  );
}
