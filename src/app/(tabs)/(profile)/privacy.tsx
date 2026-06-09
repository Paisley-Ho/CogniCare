import { ThemedText } from '@/components/themed-text';
import { AppCard } from '@/components/ui/app-card';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';

export default function PrivacyScreen() {
  return (
    <Screen>
      <SectionHeader title="隐私说明" />
      <AppCard>
        <ThemedText selectable>
          为了向您提供筛查结果查看、随访记录和复查提醒等服务，本应用可能会保存必要的基础信息和随访记录。相关信息仅用于本项目服务展示与后续扩展对接，不会用于与本服务无关的用途。
        </ThemedText>
        <ThemedText selectable themeColor="textSecondary">请勿在应用中填写与服务无关的敏感信息。</ThemedText>
        <ThemedText selectable themeColor="textSecondary">如由家属代为操作，请确保信息填写真实准确。</ThemedText>
      </AppCard>
    </Screen>
  );
}
