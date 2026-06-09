import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { AppCard } from '@/components/ui/app-card';
import { Screen } from '@/components/ui/screen';
import { StateView } from '@/components/ui/state-view';
import { StatusTag } from '@/components/ui/status-tag';
import { useAppointment } from '@/hooks/use-appointments';
import { getAppointmentCancelDecision } from '@/repository/appointment-repository';
import { useRepositories } from '@/repository/repository-provider';
import { getAppointmentStatusTone } from '@/model/appointment';

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const repositories = useRepositories();
  const { state, reload } = useAppointment(id);
  const [cancelling, setCancelling] = useState(false);

  async function cancelAppointment() {
    setCancelling(true);
    try {
      await repositories.appointment.cancel(id);
      await reload();
    } catch (error) {
      Alert.alert('无法取消预约', error instanceof Error ? error.message : '请稍后重试');
    } finally {
      setCancelling(false);
    }
  }

  return (
    <Screen>
      <StateView state={state}>
        {(record) => {
          const cancelDecision = getAppointmentCancelDecision(record);

          return (
            <AppCard>
              <ThemedText type="smallBold">预约状态</ThemedText>
              <StatusTag label={record.status} tone={getAppointmentStatusTone(record.status)} />
              <ThemedText type="smallBold">建议复查时间</ThemedText>
              <ThemedText selectable>{record.suggestedReviewDate}</ThemedText>
              <ThemedText type="smallBold">预约类型</ThemedText>
              <ThemedText selectable>{record.appointmentType}</ThemedText>
              <ThemedText type="smallBold">预约日期</ThemedText>
              <ThemedText selectable>{record.appointmentDate}</ThemedText>
              <ThemedText type="smallBold">联系电话</ThemedText>
              <ThemedText selectable>{record.phone}</ThemedText>
              <ThemedText type="smallBold">备注说明</ThemedText>
              <ThemedText selectable themeColor="textSecondary">{record.remark || '暂无备注'}</ThemedText>
              <ThemedText selectable type="small" themeColor="textSecondary">
                {record.status === '已提交'
                  ? '请等待门诊工作人员进一步确认。'
                  : '已确认预约请在就诊日前一天 12:00 前取消，逾期请联系门诊工作人员处理。'}
              </ThemedText>
              {cancelDecision.canCancel ? (
                <AppButton
                  title={cancelling ? '正在取消…' : '取消预约'}
                  variant="danger"
                  disabled={cancelling}
                  onPress={() =>
                    Alert.alert('取消预约', '取消后本次预约申请将失效，如需复查需重新提交预约。', [
                      { text: '再想想', style: 'cancel' },
                      { text: '确认取消', style: 'destructive', onPress: cancelAppointment },
                    ])
                  }
                />
              ) : (
                <ThemedText selectable type="small" themeColor="textSecondary">
                  {cancelDecision.reason}
                </ThemedText>
              )}
            </AppCard>
          );
        }}
      </StateView>
    </Screen>
  );
}
