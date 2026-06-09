import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { AppCard } from '@/components/ui/app-card';
import { DisclaimerCard } from '@/components/ui/disclaimer-card';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';
import { StateView } from '@/components/ui/state-view';
import { StatusTag } from '@/components/ui/status-tag';
import { useScreeningResult } from '@/hooks/use-screening-result';

export default function ResultSummaryScreen() {
  const { state } = useScreeningResult();

  return (
    <Screen>
      <SectionHeader title="结果摘要" subtitle="以下内容为最近一次门诊辅助筛查结果摘要，请结合实际情况理解。" />
      <StateView state={state}>
        {({ screening }) => (
          <>
            <AppCard>
              <ThemedText type="smallBold">筛查时间</ThemedText>
              <ThemedText selectable>{screening.screeningDate}</ThemedText>
              <ThemedText type="smallBold">结果状态</ThemedText>
              <StatusTag label={screening.status} tone="warning" />
              <ThemedText type="smallBold">风险提示</ThemedText>
              <ThemedText selectable themeColor="textSecondary">
                {screening.riskPrompt}
              </ThemedText>
              <ThemedText type="smallBold">建议说明</ThemedText>
              <ThemedText selectable themeColor="textSecondary">
                {screening.recommendation}
              </ThemedText>
              <ThemedText type="smallBold">下次复查建议</ThemedText>
              <ThemedText selectable>{screening.nextReviewDate}</ThemedText>
            </AppCard>
            <Link href="/(tabs)/(results)/report" asChild>
              <AppButton title="查看报告摘要" />
            </Link>
            <Link href="/(tabs)/(records)/appointment/new" asChild>
              <AppButton title="预约门诊复查" variant="secondary" />
            </Link>
            <DisclaimerCard />
          </>
        )}
      </StateView>
    </Screen>
  );
}
