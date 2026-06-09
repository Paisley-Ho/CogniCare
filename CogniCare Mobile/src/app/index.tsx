import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { AppCard } from '@/components/ui/app-card';
import { Screen } from '@/components/ui/screen';
import { ThemedText } from '@/components/themed-text';
import { bootstrapDatabase } from '@/data/local/migrations';
import { Spacing } from '@/constants/theme';
import { useRepositories } from '@/repository/repository-provider';

export default function SplashScreen() {
  const router = useRouter();
  const repositories = useRepositories();
  const [status, setStatus] = useState('正在加载应用…');

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      setStatus('正在准备您的随访信息…');
      await bootstrapDatabase();
      setStatus('正在检查本地登录状态…');
      const session = await repositories.auth.getSession();
      if (!mounted) return;
      router.replace(session ? '/(tabs)/(home)' : '/(auth)/login');
    }

    bootstrap().catch(() => {
      if (mounted) setStatus('未能获取相关信息');
    });

    return () => {
      mounted = false;
    };
  }, [repositories.auth, router]);

  return (
    <Screen style={{ flexGrow: 1, justifyContent: 'center' }}>
      <AppCard style={{ gap: Spacing.three }}>
        <ThemedText type="subtitle" selectable>
          认知健康随访
        </ThemedText>
        <ThemedText selectable themeColor="textSecondary">
          MCI 辅助筛查结果查看与随访管理
        </ThemedText>
        <ThemedText selectable themeColor="primary">
          {status}
        </ThemedText>
        <ThemedText selectable type="small" themeColor="textSecondary">
          本应用供受试者及家属查看筛查结果、接收提醒与填写随访记录使用
        </ThemedText>
        <ThemedText selectable type="small" themeColor="textSecondary">
          结果仅供辅助参考，不作为临床诊断依据
        </ThemedText>
      </AppCard>
    </Screen>
  );
}
