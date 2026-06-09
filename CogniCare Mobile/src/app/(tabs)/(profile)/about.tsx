import { ThemedText } from '@/components/themed-text';
import { AppCard } from '@/components/ui/app-card';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';

export default function AboutScreen() {
  return (
    <Screen>
      <SectionHeader title="关于本应用" />
      <AppCard>
        <ThemedText selectable>
          认知健康随访是一款面向轻度认知障碍辅助筛查项目的患者/家属随访应用，用于查看门诊筛查结果摘要、接收复查提醒、填写家庭观察记录及随访问卷。
        </ThemedText>
        <ThemedText selectable themeColor="textSecondary">本应用内容仅供辅助参考，不作为临床诊断依据。</ThemedText>
        <ThemedText selectable themeColor="textSecondary">如存在明显风险提示，请及时前往门诊进一步评估。</ThemedText>
        <ThemedText selectable themeColor="textSecondary">请根据医生建议按时完成复查与随访。</ThemedText>
      </AppCard>
    </Screen>
  );
}
