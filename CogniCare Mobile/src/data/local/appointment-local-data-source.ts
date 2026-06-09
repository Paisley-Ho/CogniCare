import { ACTIVE_APPOINTMENT_STATUSES, AppointmentRecord } from '@/model/appointment';
import { getDatabase } from './database';

type AppointmentRow = {
  id: string;
  patient_id: string;
  suggested_review_date: string;
  appointment_type: AppointmentRecord['appointmentType'];
  appointment_date: string;
  phone: string;
  remark: string;
  status: AppointmentRecord['status'];
  created_at: string;
  updated_at: string;
};

function mapAppointment(row: AppointmentRow): AppointmentRecord {
  return {
    id: row.id,
    patientId: row.patient_id,
    suggestedReviewDate: row.suggested_review_date,
    appointmentType: row.appointment_type,
    appointmentDate: row.appointment_date,
    phone: row.phone,
    remark: row.remark,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class AppointmentLocalDataSource {
  async list(patientId: string) {
    const db = await getDatabase();
    const rows = await db.getAllAsync<AppointmentRow>(
      'SELECT * FROM appointment WHERE patient_id = ? ORDER BY created_at DESC',
      [patientId]
    );
    return rows.map(mapAppointment);
  }

  async get(id: string) {
    const db = await getDatabase();
    const row = await db.getFirstAsync<AppointmentRow>('SELECT * FROM appointment WHERE id = ?', [id]);
    return row ? mapAppointment(row) : null;
  }

  async getActiveBySuggestedReviewDate(patientId: string, suggestedReviewDate: string) {
    const db = await getDatabase();
    const rows = await db.getAllAsync<AppointmentRow>(
      `SELECT * FROM appointment
       WHERE patient_id = ?
         AND suggested_review_date = ?
         AND status IN (${ACTIVE_APPOINTMENT_STATUSES.map(() => '?').join(', ')})
       ORDER BY created_at DESC`,
      [patientId, suggestedReviewDate, ...ACTIVE_APPOINTMENT_STATUSES]
    );
    return rows.map(mapAppointment);
  }

  async updateStatus(id: string, status: AppointmentRecord['status'], updatedAt: string) {
    const db = await getDatabase();
    await db.runAsync('UPDATE appointment SET status = ?, updated_at = ? WHERE id = ?', [status, updatedAt, id]);
  }

  async save(record: AppointmentRecord) {
    const db = await getDatabase();
    await db.runAsync(
      'INSERT OR REPLACE INTO appointment (id, patient_id, suggested_review_date, appointment_type, appointment_date, phone, remark, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        record.id,
        record.patientId,
        record.suggestedReviewDate,
        record.appointmentType,
        record.appointmentDate,
        record.phone,
        record.remark,
        record.status,
        record.createdAt,
        record.updatedAt,
      ]
    );
  }
}
