import { Link } from 'expo-router';

import { AppButton } from '@/components/ui/app-button';
import { EmptyState } from '@/components/ui/empty-state';
import { RecordListItem } from '@/components/ui/record-list-item';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';
import { StateView } from '@/components/ui/state-view';
import { useAppointments } from '@/hooks/use-appointments';
import { getAppointmentStatusTone } from '@/model/appointment';

export default function AppointmentListScreen() {
  const { state } = useAppointments();

  return (
    <Screen>
      <SectionHeader title="预约复查" subtitle="可根据筛查建议预约门诊复查或正式筛查。" />
      <StateView state={state}>
        {({ records }) =>
          records.length ? (
            records.map((record) => (
              <RecordListItem
                key={record.id}
                href={`/(tabs)/(records)/appointment/${record.id}`}
                title={record.appointmentDate}
                subtitle={record.appointmentType}
                meta={`联系电话：${record.phone}`}
                tag={record.status}
                tagTone={getAppointmentStatusTone(record.status)}
              />
            ))
          ) : (
            <EmptyState title="当前暂无记录" body="提交预约后将在这里展示" />
          )
        }
      </StateView>
      <Link href="/(tabs)/(records)/appointment/new" asChild>
        <AppButton title="提交预约" />
      </Link>
    </Screen>
  );
}
