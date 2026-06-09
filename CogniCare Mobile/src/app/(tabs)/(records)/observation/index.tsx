import { Link } from 'expo-router';

import { AppButton } from '@/components/ui/app-button';
import { EmptyState } from '@/components/ui/empty-state';
import { RecordListItem } from '@/components/ui/record-list-item';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';
import { StateView } from '@/components/ui/state-view';
import { useObservationRecords } from '@/hooks/use-observation-records';

export default function ObservationListScreen() {
  const { state } = useObservationRecords();

  return (
    <Screen>
      <SectionHeader title="家庭观察记录" subtitle="请根据近期实际情况记录受试者在家庭中的认知和生活表现变化。" />
      <StateView state={state}>
        {({ records }) =>
          records.length ? (
            records.map((record) => (
              <RecordListItem
                key={record.id}
                href={`/(tabs)/(records)/observation/${record.id}`}
                title={record.recordDate}
                subtitle={`记录人：${record.recorder}`}
                meta={`记忆变化：${record.memoryChange}`}
              />
            ))
          ) : (
            <EmptyState title="当前暂无观察记录" body="建议定期记录近期变化，便于后续门诊复查参考" />
          )
        }
      </StateView>
      <Link href="/(tabs)/(records)/observation/new" asChild>
        <AppButton title="新增记录" />
      </Link>
    </Screen>
  );
}
