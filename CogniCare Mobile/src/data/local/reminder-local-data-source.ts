import { NotificationItem, ReminderSourceType } from '@/model/reminder';
import { getDatabase } from './database';

type ReminderRow = {
  id: string;
  patient_id: string;
  category: NotificationItem['category'];
  title: string;
  body: string;
  due_at: string;
  status: NotificationItem['status'];
  source_type: ReminderSourceType;
  source_id: string;
  created_at: string;
};

function mapReminder(row: ReminderRow): NotificationItem {
  return {
    id: row.id,
    patientId: row.patient_id,
    category: row.category,
    title: row.title,
    body: row.body,
    dueAt: row.due_at,
    status: row.status,
    sourceType: row.source_type,
    sourceId: row.source_id,
    createdAt: row.created_at,
  };
}

export class ReminderLocalDataSource {
  async list(patientId: string) {
    const db = await getDatabase();
    const rows = await db.getAllAsync<ReminderRow>(
      'SELECT * FROM reminder WHERE patient_id = ? AND status != ? ORDER BY due_at ASC, created_at DESC',
      [patientId, '已完成']
    );
    return rows.map(mapReminder);
  }

  async save(reminder: NotificationItem) {
    const db = await getDatabase();
    await db.runAsync(
      'INSERT OR REPLACE INTO reminder (id, patient_id, category, title, body, due_at, status, source_type, source_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        reminder.id,
        reminder.patientId,
        reminder.category,
        reminder.title,
        reminder.body,
        reminder.dueAt,
        reminder.status,
        reminder.sourceType,
        reminder.sourceId,
        reminder.createdAt,
      ]
    );
  }

  async updateStatus(id: string, status: NotificationItem['status']) {
    const db = await getDatabase();
    await db.runAsync('UPDATE reminder SET status = ? WHERE id = ?', [status, id]);
  }

  async completePendingBySourceType(patientId: string, sourceType: ReminderSourceType) {
    const db = await getDatabase();
    await db.runAsync('UPDATE reminder SET status = ? WHERE patient_id = ? AND source_type = ? AND status != ?', [
      '已完成',
      patientId,
      sourceType,
      '已完成',
    ]);
  }
}
