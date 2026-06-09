import { Link, useRouter } from 'expo-router';
import { Alert } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { AppCard } from '@/components/ui/app-card';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';
import { StateView } from '@/components/ui/state-view';
import { clearDatabase } from '@/data/local/database';
import { bootstrapDatabase } from '@/data/local/migrations';
import { useAuth } from '@/hooks/use-auth';
import { useDashboard } from '@/hooks/use-dashboard';

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const { state } = useDashboard();

  function confirmLogout() {
    Alert.alert('退出登录', '确认退出当前登录状态吗？', [
      { text: '取消', style: 'cancel' },
      { text: '退出登录', style: 'destructive', onPress: logout },
    ]);
  }

  function confirmClearData() {
    Alert.alert('清除本地数据', '清除后本地保存的记录将无法恢复，请确认是否继续。', [
      { text: '取消', style: 'cancel' },
      {
        text: '清除本地数据',
        style: 'destructive',
        onPress: async () => {
          await clearDatabase();
          await bootstrapDatabase();
          router.replace('/(auth)/login');
        },
      },
    ]);
  }

  return (
    <Screen>
      <SectionHeader title="我的" subtitle="查看个人信息、绑定信息与应用说明。" />
      <StateView state={state}>
        {({ patient }) => (
          <>
            <AppCard>
              <ThemedText type="smallBold">个人信息</ThemedText>
              <ThemedText selectable>姓名：{patient.name}</ThemedText>
              <ThemedText selectable>受试者编号：{patient.subjectNo}</ThemedText>
              <ThemedText selectable>绑定手机号：{patient.phone}</ThemedText>
              <ThemedText selectable>当前使用人：{patient.currentUserRole}</ThemedText>
              <ThemedText selectable>最近筛查时间：{patient.lastScreeningDate}</ThemedText>
            </AppCard>
            <AppCard>
              <ThemedText type="smallBold">帮助与说明</ThemedText>
              <Link href="/(tabs)/(profile)/privacy">
                <ThemedText type="linkPrimary">隐私说明</ThemedText>
              </Link>
              <Link href="/(tabs)/(profile)/help">
                <ThemedText type="linkPrimary">使用帮助</ThemedText>
              </Link>
              <Link href="/(tabs)/(profile)/about">
                <ThemedText type="linkPrimary">关于本应用</ThemedText>
              </Link>
            </AppCard>
            <AppButton title="退出登录" variant="secondary" onPress={confirmLogout} />
            <AppButton title="清除本地数据" variant="danger" onPress={confirmClearData} />
          </>
        )}
      </StateView>
    </Screen>
  );
}
