import { ThemedText } from '@/components/themed-text';
import { AppCard } from '@/components/ui/app-card';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';

const faqs = [
  ['我为什么能看到筛查结果？', '您当前绑定的是门诊辅助筛查项目中的受试者信息，用于查看最近一次结果摘要和后续随访安排。'],
  ['结果能否作为确诊依据？', '不能。本应用中的结果仅供辅助参考，不能替代医生诊断。'],
  ['家属可以代为填写吗？', '可以。家属可协助查看结果、填写观察记录和随访问卷。'],
  ['我如何预约复查？', '可在首页或预约复查页面提交预约信息，后续由门诊工作人员进一步确认；已确认预约请在截止时间前取消，逾期请联系门诊。'],
] as const;

export default function HelpScreen() {
  return (
    <Screen>
      <SectionHeader title="使用帮助" />
      {faqs.map(([question, answer]) => (
        <AppCard key={question}>
          <ThemedText selectable type="smallBold">{question}</ThemedText>
          <ThemedText selectable themeColor="textSecondary">{answer}</ThemedText>
        </AppCard>
      ))}
    </Screen>
  );
}
