import { AppointmentRecord } from '@/model/appointment';
import { AuthSession } from '@/model/auth';
import { NotificationItem } from '@/model/reminder';
import { ObservationRecord } from '@/model/observation-record';
import { FollowUpQuestionnaire } from '@/model/questionnaire';
import { UserProfile } from '@/model/patient';
import { ReportSummary } from '@/model/report';
import { ScreeningSummary } from '@/model/screening-result';

export const mockPatient: UserProfile = {
  id: 'patient_demo_001',
  name: '张某某',
  age: 68,
  subjectNo: 'MCI20260012',
  phone: '13800000000',
  currentUserRole: '家属',
  lastScreeningDate: '2026-06-08',
};

export const mockSession: AuthSession = {
  id: 'session_demo_001',
  patientId: mockPatient.id,
  subjectNo: mockPatient.subjectNo,
  phone: mockPatient.phone,
  currentUserRole: mockPatient.currentUserRole,
  lastLoginAt: '2026-06-08T09:00:00.000Z',
};

export const mockScreeningSummary: ScreeningSummary = {
  id: 'screening_demo_001',
  patientId: mockPatient.id,
  screeningDate: '2026-06-08',
  status: '提示存在认知风险',
  riskLevel: 'medium',
  riskPrompt: '本次筛查结果提示存在一定认知风险，建议结合近期生活表现与门诊进一步评估结果综合判断。',
  recommendation: '建议按时复查，并由患者本人或家属持续记录近期认知与生活功能变化。',
  nextReviewDate: '2026-09-08',
};

export const mockReportSummary: ReportSummary = {
  id: 'report_demo_001',
  screeningResultId: mockScreeningSummary.id,
  overview: '受试者已完成本次门诊辅助筛查，系统根据标准化任务表现生成初步结果摘要。',
  resultSummary: '本次筛查结果提示受试者当前认知状态需持续关注，建议结合后续门诊复查结果综合评估。',
  riskNote: '本结果仅反映本次筛查时点表现，用于辅助参考，不作为临床诊断依据。',
  followUpAdvice: '建议按时复查，并由患者本人或家属持续记录近期认知与生活功能变化。',
};

export const mockObservationRecords: ObservationRecord[] = [];

export const mockQuestionnaires: FollowUpQuestionnaire[] = [];

export const mockAppointments: AppointmentRecord[] = [];

export const mockReminders: NotificationItem[] = [
  {
    id: 'reminder_review_001',
    patientId: mockPatient.id,
    category: '复查提醒',
    title: '您有一条待处理的复查提醒',
    body: '建议复查时间：2026-09-08，可根据筛查建议预约门诊复查或正式筛查。',
    dueAt: '2026-09-08',
    status: '待处理',
    sourceType: 'screening_result',
    sourceId: mockScreeningSummary.id,
    createdAt: '2026-06-08T09:00:00.000Z',
  },
  {
    id: 'reminder_questionnaire_001',
    patientId: mockPatient.id,
    category: '问卷提醒',
    title: '建议填写本周随访问卷',
    body: '请根据近期实际情况完成随访填写，便于后续门诊随访管理。',
    dueAt: '2026-06-15',
    status: '待处理',
    sourceType: 'questionnaire',
    sourceId: '',
    createdAt: '2026-06-08T09:00:00.000Z',
  },
  {
    id: 'reminder_observation_001',
    patientId: mockPatient.id,
    category: '观察记录提醒',
    title: '建议补充近期家庭观察记录',
    body: '建议定期记录近期变化，便于后续门诊复查参考。',
    dueAt: '2026-06-15',
    status: '待处理',
    sourceType: 'observation_record',
    sourceId: '',
    createdAt: '2026-06-08T09:00:00.000Z',
  },
];
