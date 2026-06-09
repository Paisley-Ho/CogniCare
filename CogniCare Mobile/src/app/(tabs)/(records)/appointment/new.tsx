import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { AppCard } from '@/components/ui/app-card';
import { FormField } from '@/components/ui/form-field';
import { OptionGroup } from '@/components/ui/option-group';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';
import { StatusTag } from '@/components/ui/status-tag';
import { AppointmentRecord, AppointmentType, getAppointmentStatusTone } from '@/model/appointment';
import { useRepositories } from '@/repository/repository-provider';

export default function NewAppointmentScreen() {
  const repositories = useRepositories();
  const router = useRouter();
  const [suggestedReviewDate, setSuggestedReviewDate] = useState('2026-09-08');
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('门诊复查');
  const [appointmentDate, setAppointmentDate] = useState('2026-09-08');
  const [phone, setPhone] = useState('13800000000');
  const [remark, setRemark] = useState('');
  const [error, setError] = useState('');
  const [activeAppointment, setActiveAppointment] = useState<AppointmentRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadDefaults() {
      const patient = await repositories.patient.getCurrentPatient();
      if (!patient) return;
      const screening = await repositories.screening.getLatestResult(patient.id);
      if (!mounted) return;
      const nextReviewDate = screening?.nextReviewDate ?? suggestedReviewDate;
      setPhone(patient.phone);
      if (screening?.nextReviewDate) {
        setSuggestedReviewDate(screening.nextReviewDate);
        setAppointmentDate(screening.nextReviewDate);
      }
      const active = await repositories.appointment.getActiveForSuggestedReview(patient.id, nextReviewDate);
      if (mounted) setActiveAppointment(active);
    }
    loadDefaults();

    return () => {
      mounted = false;
    };
  }, [repositories, suggestedReviewDate]);

  async function submit() {
    setError('');
    if (activeAppointment) {
      setError('当前已有进行中的预约，请先取消或等待门诊处理。');
      return;
    }
    if (!appointmentDate.trim() || !phone.trim()) {
      setError('请先完善必填信息');
      return;
    }
    const patient = await repositories.patient.getCurrentPatient();
    if (!patient) {
      setError('未能获取相关信息');
      return;
    }
    setSubmitting(true);
    try {
      await repositories.appointment.submit(patient.id, {
        suggestedReviewDate,
        appointmentType,
        appointmentDate,
        phone,
        remark,
      });
      await repositories.reminder.completePendingBySourceType(patient.id, 'screening_result');
      await repositories.reminder.completePendingBySourceType(patient.id, 'appointment');
      router.replace('/(tabs)/(records)/appointment');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : '提交失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen>
      <SectionHeader title="预约复查" subtitle="可根据筛查建议预约门诊复查或正式筛查。" />
      <AppCard>
        <ThemedText selectable>建议复查时间：{suggestedReviewDate}</ThemedText>
        <ThemedText selectable themeColor="textSecondary">
          提交后需门诊确认；已确认预约请在就诊日前一天 12:00 前取消，逾期请联系门诊。
        </ThemedText>
        {activeAppointment ? (
          <>
            <ThemedText selectable type="smallBold">当前已有进行中的预约</ThemedText>
            <StatusTag label={activeAppointment.status} tone={getAppointmentStatusTone(activeAppointment.status)} />
            <ThemedText selectable themeColor="textSecondary">
              {activeAppointment.appointmentType}：{activeAppointment.appointmentDate}
            </ThemedText>
            <Link href={`/(tabs)/(records)/appointment/${activeAppointment.id}`} asChild>
              <AppButton title="查看已有预约" variant="secondary" />
            </Link>
          </>
        ) : (
          <ThemedText selectable themeColor="textSecondary">当前预约状态：待提交</ThemedText>
        )}
        <OptionGroup label="预约类型" options={['门诊复查', '正式筛查', '随访咨询'] as const} value={appointmentType} onChange={setAppointmentType} />
        <FormField label="预约日期" placeholder="请选择预约日期" value={appointmentDate} onChangeText={setAppointmentDate} />
        <FormField label="联系电话" placeholder="请输入联系电话" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <FormField label="备注说明" placeholder="如有特殊需求，请填写备注" value={remark} onChangeText={setRemark} multiline />
        {error ? <ThemedText selectable themeColor="danger">{error}</ThemedText> : null}
        <AppButton title={submitting ? '正在提交…' : '提交预约'} onPress={submit} disabled={Boolean(activeAppointment) || submitting} />
        <AppButton title="返回" variant="secondary" onPress={() => router.back()} />
      </AppCard>
    </Screen>
  );
}
