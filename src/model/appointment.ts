export type AppointmentType = '门诊复查' | '正式筛查' | '随访咨询';
export type AppointmentStatus = '待提交' | '已提交' | '已确认' | '已取消' | '已完成' | '已爽约';

export type AppointmentRecord = {
  id: string;
  patientId: string;
  suggestedReviewDate: string;
  appointmentType: AppointmentType;
  appointmentDate: string;
  phone: string;
  remark: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
};

export type AppointmentInput = Pick<AppointmentRecord, 'appointmentType' | 'appointmentDate' | 'phone' | 'remark' | 'suggestedReviewDate'>;

export const ACTIVE_APPOINTMENT_STATUSES: AppointmentStatus[] = ['已提交', '已确认'];

export function isActiveAppointmentStatus(status: AppointmentStatus) {
  return ACTIVE_APPOINTMENT_STATUSES.includes(status);
}

export function getAppointmentStatusTone(status: AppointmentStatus) {
  if (status === '已完成') return 'success' as const;
  if (status === '已取消' || status === '已爽约') return 'warning' as const;
  return 'primary' as const;
}
