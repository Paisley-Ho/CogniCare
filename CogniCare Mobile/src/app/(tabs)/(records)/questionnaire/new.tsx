import { useRouter } from 'expo-router';
import { useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { AppCard } from '@/components/ui/app-card';
import { FormField } from '@/components/ui/form-field';
import { OptionGroup } from '@/components/ui/option-group';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';
import { useRepositories } from '@/repository/repository-provider';

export default function NewQuestionnaireScreen() {
  const repositories = useRepositories();
  const router = useRouter();
  const [sleepStatus, setSleepStatus] = useState('一般');
  const [emotionStatus, setEmotionStatus] = useState('稳定');
  const [memorySelfAssessment, setMemorySelfAssessment] = useState('偶有遗忘');
  const [familyObservedChanges, setFamilyObservedChanges] = useState('');
  const [reviewedOnTime, setReviewedOnTime] = useState('计划近期复查');
  const [medicalArrangement, setMedicalArrangement] = useState('无');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  async function submit() {
    setError('');
    const patient = await repositories.patient.getCurrentPatient();
    if (!patient) {
      setError('未能获取相关信息');
      return;
    }
    await repositories.questionnaire.submit(patient.id, {
      sleepStatus,
      emotionStatus,
      memorySelfAssessment,
      familyObservedChanges,
      reviewedOnTime,
      medicalArrangement,
      notes,
    });
    await repositories.reminder.completePendingBySourceType(patient.id, 'questionnaire');
    router.replace('/(tabs)/(records)/questionnaire');
  }

  return (
    <Screen>
      <SectionHeader title="随访问卷" subtitle="请根据近期实际情况完成随访填写，便于后续门诊随访管理。" />
      <AppCard>
        <OptionGroup label="近期睡眠情况" options={['良好', '一般', '较差'] as const} value={sleepStatus} onChange={setSleepStatus} />
        <OptionGroup label="近期情绪状态" options={['稳定', '偶有波动', '明显波动'] as const} value={emotionStatus} onChange={setEmotionStatus} />
        <OptionGroup label="近期记忆自评" options={['基本正常', '偶有遗忘', '较前变差', '不确定'] as const} value={memorySelfAssessment} onChange={setMemorySelfAssessment} />
        <FormField label="家属观察到的主要变化" placeholder="如有特殊情况，请简要描述" value={familyObservedChanges} onChangeText={setFamilyObservedChanges} multiline />
        <OptionGroup label="是否已按时复查" options={['是', '否', '计划近期复查'] as const} value={reviewedOnTime} onChange={setReviewedOnTime} />
        <OptionGroup label="是否已有新的就医安排" options={['无', '已预约门诊', '已完成就诊'] as const} value={medicalArrangement} onChange={setMedicalArrangement} />
        <FormField label="补充说明" placeholder="请输入补充说明" value={notes} onChangeText={setNotes} multiline />
        {error ? <ThemedText selectable themeColor="danger">{error}</ThemedText> : null}
        <AppButton title="提交问卷" onPress={submit} />
        <AppButton title="暂不填写" variant="secondary" onPress={() => router.back()} />
      </AppCard>
    </Screen>
  );
}
