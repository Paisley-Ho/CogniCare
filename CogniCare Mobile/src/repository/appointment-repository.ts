import { AppointmentLocalDataSource } from '@/data/local/appointment-local-data-source';
import { AppointmentInput, AppointmentRecord } from '@/model/appointment';
import { createId, nowIso } from '@/model/common';

export type AppointmentCancelDecision = {
  canCancel: boolean;
  reason: string;
};

function cancellationDeadline(appointmentDate: string) {
  const match = appointmentDate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!match) return null;
  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day) - 1, 12, 0, 0);
}

export function getAppointmentCancelDecision(record: AppointmentRecord, now = new Date()): AppointmentCancelDecision {
  if (record.status === '已提交') {
    return { canCancel: true, reason: '预约申请尚未确认，可取消后重新提交。' };
  }

  if (record.status === '已确认') {
    const deadline = cancellationDeadline(record.appointmentDate);
    if (!deadline) {
      return { canCancel: false, reason: '预约日期格式异常，请联系门诊工作人员处理。' };
    }
    if (now.getTime() <= deadline.getTime()) {
      return { canCancel: true, reason: '已确认预约可在就诊日前一天 12:00 前取消。' };
    }
    return { canCancel: false, reason: '已超过 App 内取消截止时间，请联系门诊工作人员处理。' };
  }

  if (record.status === '已完成') return { canCancel: false, reason: '预约已完成，不能取消。' };
  if (record.status === '已取消') return { canCancel: false, reason: '预约已取消，无需重复操作。' };
  if (record.status === '已爽约') return { canCancel: false, reason: '预约已标记为爽约，请联系门诊工作人员。' };
  return { canCancel: false, reason: '当前状态暂不能取消预约。' };
}

export class AppointmentRepository {
  constructor(private readonly appointments: AppointmentLocalDataSource) {}

  list(patientId: string) {
    return this.appointments.list(patientId);
  }

  get(id: string) {
    return this.appointments.get(id);
  }

  async getActiveForSuggestedReview(patientId: string, suggestedReviewDate: string) {
    const [active] = await this.appointments.getActiveBySuggestedReviewDate(patientId, suggestedReviewDate);
    return active ?? null;
  }

  async submit(patientId: string, input: AppointmentInput) {
    const active = await this.getActiveForSuggestedReview(patientId, input.suggestedReviewDate);
    if (active) {
      throw new Error('当前已有进行中的预约，请取消或完成后再重新提交。');
    }

    const timestamp = nowIso();
    const record = {
      id: createId('appointment'),
      patientId,
      ...input,
      remark: input.remark.trim(),
      status: '已提交' as const,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await this.appointments.save(record);
    return record;
  }

  async cancel(id: string) {
    const record = await this.appointments.get(id);
    if (!record) {
      throw new Error('未找到预约记录');
    }

    const decision = getAppointmentCancelDecision(record);
    if (!decision.canCancel) {
      throw new Error(decision.reason);
    }

    const updatedAt = nowIso();
    const cancelled = { ...record, status: '已取消' as const, updatedAt };
    await this.appointments.updateStatus(id, cancelled.status, updatedAt);
    return cancelled;
  }
}
