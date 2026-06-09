import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { AppCard } from '@/components/ui/app-card';
import { DisclaimerCard } from '@/components/ui/disclaimer-card';
import { QuickActionGrid } from '@/components/ui/quick-action-grid';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';
import { StateView } from '@/components/ui/state-view';
import { StatusTag } from '@/components/ui/status-tag';
import { useDashboard } from '@/hooks/use-dashboard';
import { getAppointmentStatusTone, isActiveAppointmentStatus } from '@/model/appointment';

export default function DashboardScreen() {
  const { state } = useDashboard();

  return (
    <Screen>
      <SectionHeader title="您好，欢迎回来" subtitle="已为您同步最近一次筛查与随访信息" />
      <StateView state={state}>
        {({ patient, screening, appointments }) => {
          const activeAppointment = appointments.find((appointment) => isActiveAppointmentStatus(appointment.status));

          return (
            <>
            <AppCard>
              <ThemedText type="smallBold">受试者信息</ThemedText>
              <ThemedText selectable>姓名：{patient.name}</ThemedText>
              <ThemedText selectable>年龄：{patient.age} 岁</ThemedText>
              <ThemedText selectable>编号：{patient.subjectNo}</ThemedText>
              <ThemedText selectable>最近筛查：{patient.lastScreeningDate}</ThemedText>
            </AppCard>

            <AppCard>
              <ThemedText type="smallBold">最近一次筛查结果</ThemedText>
              {screening ? <StatusTag label={screening.status} tone="warning" /> : null}
              <ThemedText selectable themeColor="textSecondary">
                {screening?.riskPrompt ?? '当前暂无筛查结果摘要'}
              </ThemedText>
              <Link href="/(tabs)/(results)" asChild>
                <AppButton title="查看结果详情" />
              </Link>
            </AppCard>

            <AppCard>
              <ThemedText type="smallBold">复查提醒</ThemedText>
              <ThemedText selectable>建议复查时间：{screening?.nextReviewDate ?? '待同步'}</ThemedText>
              {activeAppointment ? (
                <>
                  <StatusTag label={activeAppointment.status} tone={getAppointmentStatusTone(activeAppointment.status)} />
                  <ThemedText selectable themeColor="textSecondary">
                    {activeAppointment.appointmentType}：{activeAppointment.appointmentDate}
                  </ThemedText>
                  <Link href={`/(tabs)/(records)/appointment/${activeAppointment.id}`} asChild>
                    <AppButton title="查看预约" variant="secondary" />
                  </Link>
                </>
              ) : (
                <>
                  <ThemedText selectable themeColor="textSecondary">
                    当前状态：待提交
                  </ThemedText>
                  <Link href="/(tabs)/(records)/appointment/new" asChild>
                    <AppButton title="立即预约" variant="secondary" />
                  </Link>
                </>
              )}
            </AppCard>

            <QuickActionGrid
              primaryActions={[
                { href: '/(tabs)/(results)', title: '结果摘要' },
                { href: '/(tabs)/(results)/report', title: '报告摘要' },
              ]}
              secondaryActions={[
                { href: '/(tabs)/(records)/observation/new', title: '家庭观察记录' },
                { href: '/(tabs)/(records)/questionnaire/new', title: '随访问卷' },
                { href: '/(tabs)/(records)/appointment/new', title: '预约复查' },
              ]}
            />

            <DisclaimerCard />
            </>
          );
        }}
      </StateView>
    </Screen>
  );
}
