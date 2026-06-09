import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { AppCard } from '@/components/ui/app-card';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';
import { StateView } from '@/components/ui/state-view';
import { StatusTag } from '@/components/ui/status-tag';
import { SummaryHighlightCard } from '@/components/ui/summary-highlight-card';
import { useReportSummary } from '@/hooks/use-screening-result';

export default function ReportSummaryScreen() {
  const { state } = useReportSummary();

  return (
    <Screen>
      <SectionHeader title="报告摘要" subtitle="这里展示的是门诊筛查报告的摘要内容，便于患者及家属快速查看。" />
      <StateView state={state}>
        {({ patient, screening, report }) => (
          <>
            <AppCard>
              <ThemedText type="smallBold">基本信息</ThemedText>
              <ThemedText selectable>姓名：{patient.name}</ThemedText>
              <ThemedText selectable>编号：{patient.subjectNo}</ThemedText>
              <ThemedText selectable>筛查时间：{screening.screeningDate}</ThemedText>
            </AppCard>
            <SummaryHighlightCard title="结果总结" body={report.resultSummary} emphasis="primary">
              <StatusTag label={screening.status} tone="warning" />
            </SummaryHighlightCard>
            <SummaryHighlightCard title="筛查概述" body={report.overview} />
            <SummaryHighlightCard title="风险说明" body={report.riskNote} emphasis="warning" />
            <SummaryHighlightCard title="后续建议" body={report.followUpAdvice} emphasis="primary" />
            <Link href="/(tabs)/(records)/appointment/new" asChild>
              <AppButton title="预约复查" />
            </Link>
            <Link href="/(tabs)/(results)" asChild>
              <AppButton title="返回结果页" variant="secondary" />
            </Link>
          </>
        )}
      </StateView>
    </Screen>
  );
}
