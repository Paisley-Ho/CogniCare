import { ReminderLocalDataSource } from '@/data/local/reminder-local-data-source';
import { ReminderSourceType } from '@/model/reminder';

export class ReminderRepository {
  constructor(private readonly reminders: ReminderLocalDataSource) {}

  list(patientId: string) {
    return this.reminders.list(patientId);
  }

  markViewed(id: string) {
    return this.reminders.updateStatus(id, '已查看');
  }

  markCompleted(id: string) {
    return this.reminders.updateStatus(id, '已完成');
  }

  completePendingBySourceType(patientId: string, sourceType: ReminderSourceType) {
    return this.reminders.completePendingBySourceType(patientId, sourceType);
  }
}
