import { AppCard } from './app-card';
import { ThemedText } from '@/components/themed-text';

export function DisclaimerCard() {
  return (
    <AppCard>
      <ThemedText type="smallBold">温馨提示</ThemedText>
      <ThemedText selectable type="small" themeColor="textSecondary">
        本应用展示的筛查结果仅供辅助参考，不作为临床诊断依据。如存在风险提示，请结合门诊医生意见进一步评估。
      </ThemedText>
    </AppCard>
  );
}
