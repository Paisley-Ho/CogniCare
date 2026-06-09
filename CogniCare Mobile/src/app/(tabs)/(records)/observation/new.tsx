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

const today = new Date().toISOString().slice(0, 10);

export default function NewObservationScreen() {
  const repositories = useRepositories();
  const router = useRouter();
  const [recordDate, setRecordDate] = useState(today);
  const [recorder, setRecorder] = useState<'本人' | '家属'>('家属');
  const [memoryChange, setMemoryChange] = useState('偶尔忘事');
  const [emotionChange, setEmotionChange] = useState('基本稳定');
  const [communicationChange, setCommunicationChange] = useState('无明显异常');
  const [dailyLivingChange, setDailyLivingChange] = useState('基本正常');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  async function submit() {
    setError('');
    const patient = await repositories.patient.getCurrentPatient();
    if (!patient) {
      setError('未能获取相关信息');
      return;
    }
    await repositories.observation.create(patient.id, {
      recordDate,
      recorder,
      memoryChange,
      emotionChange,
      communicationChange,
      dailyLivingChange,
      notes,
    });
    await repositories.reminder.completePendingBySourceType(patient.id, 'observation_record');
    router.replace('/(tabs)/(records)/observation');
  }

  return (
    <Screen>
      <SectionHeader title="新增观察记录" subtitle="请根据近期实际情况记录家庭中的认知和生活表现变化。" />
      <AppCard>
        <FormField label="记录日期" value={recordDate} onChangeText={setRecordDate} placeholder="请选择记录日期" />
        <OptionGroup label="记录人" options={['本人', '家属'] as const} value={recorder} onChange={setRecorder} />
        <OptionGroup label="近期记忆变化" options={['无明显变化', '偶尔忘事', '较前更明显', '需要重点关注'] as const} value={memoryChange} onChange={setMemoryChange} />
        <OptionGroup label="近期情绪变化" options={['基本稳定', '偶有波动', '明显波动', '需要进一步关注'] as const} value={emotionChange} onChange={setEmotionChange} />
        <OptionGroup label="表达或沟通情况" options={['无明显异常', '偶尔表达不清', '较前变差', '需要重点关注'] as const} value={communicationChange} onChange={setCommunicationChange} />
        <OptionGroup label="日常生活能力变化" options={['基本正常', '轻微下降', '明显下降', '需要进一步评估'] as const} value={dailyLivingChange} onChange={setDailyLivingChange} />
        <FormField label="补充说明" value={notes} onChangeText={setNotes} placeholder="如有特殊情况，请简要描述" multiline />
        {error ? <ThemedText selectable themeColor="danger">{error}</ThemedText> : null}
        <AppButton title="保存记录" onPress={submit} />
        <AppButton title="取消" variant="secondary" onPress={() => router.back()} />
      </AppCard>
    </Screen>
  );
}
