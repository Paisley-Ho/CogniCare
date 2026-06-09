import { Link } from 'expo-router';
import { useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { AppCard } from '@/components/ui/app-card';
import { FormField } from '@/components/ui/form-field';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';

export default function LoginScreen() {
  const { login, loading } = useAuth();
  const [identifier, setIdentifier] = useState('MCI20260012');
  const [code, setCode] = useState('123456');
  const [message, setMessage] = useState('当前为演示版流程，验证码可模拟输入');
  const [error, setError] = useState('');

  async function handleLogin() {
    setError('');
    try {
      await login(identifier, code);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : '验证码错误，请重新输入');
    }
  }

  return (
    <Screen>
      <SectionHeader
        title="欢迎使用认知健康随访"
        subtitle="请输入手机号或受试者编号，查看筛查结果并管理后续随访信息"
      />
      <AppCard style={{ gap: Spacing.three }}>
        <FormField label="手机号 / 受试者编号" placeholder="请输入手机号或受试者编号" value={identifier} onChangeText={setIdentifier} />
        <FormField label="验证码" placeholder="请输入验证码" value={code} onChangeText={setCode} keyboardType="number-pad" error={error} />
        <ThemedText selectable type="small" themeColor="textSecondary">
          可使用手机号或受试者编号登录。如由家属代为使用，请填写已绑定的信息。
        </ThemedText>
        <ThemedText selectable type="small" themeColor="textSecondary">
          {message}
        </ThemedText>
        <AppButton title="获取验证码" variant="secondary" onPress={() => setMessage('验证码已发送，演示版可输入任意验证码')} />
        <AppButton title={loading ? '正在登录…' : '进入应用'} disabled={loading} onPress={handleLogin} />
      </AppCard>
      <AppCard>
        <ThemedText type="smallBold">遇到问题？</ThemedText>
        <Link href="/(tabs)/(profile)/help">
          <ThemedText type="linkPrimary">查看使用说明</ThemedText>
        </Link>
        <ThemedText selectable type="small" themeColor="textSecondary">
          如无法登录，请联系门诊工作人员核对绑定信息。
        </ThemedText>
      </AppCard>
    </Screen>
  );
}
