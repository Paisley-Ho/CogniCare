import { RecordStatus } from './common';

export type ReminderCategory = '复查提醒' | '问卷提醒' | '观察记录提醒' | '预约通知';

export type ReminderSourceType = 'screening_result' | 'questionnaire' | 'observation_record' | 'appointment';

export type NotificationItem = {
  id: string;
  patientId: string;
  category: ReminderCategory;
  title: string;
  body: string;
  dueAt: string;
  status: RecordStatus;
  sourceType: ReminderSourceType;
  sourceId: string;
  createdAt: string;
};

export type FollowUpReminder = NotificationItem;
