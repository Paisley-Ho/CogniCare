import { AuthSession } from '@/model/auth';
import { getDatabase } from './database';

type SessionRow = {
  id: string;
  patient_id: string;
  subject_no: string;
  phone: string;
  current_user_role: AuthSession['currentUserRole'];
  last_login_at: string;
};

function mapSession(row: SessionRow): AuthSession {
  return {
    id: row.id,
    patientId: row.patient_id,
    subjectNo: row.subject_no,
    phone: row.phone,
    currentUserRole: row.current_user_role,
    lastLoginAt: row.last_login_at,
  };
}

export class SessionLocalDataSource {
  async getSession() {
    const db = await getDatabase();
    const row = await db.getFirstAsync<SessionRow>('SELECT * FROM session LIMIT 1');
    return row ? mapSession(row) : null;
  }

  async saveSession(session: AuthSession) {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM session');
    await db.runAsync(
      'INSERT INTO session (id, patient_id, subject_no, phone, current_user_role, last_login_at) VALUES (?, ?, ?, ?, ?, ?)',
      [session.id, session.patientId, session.subjectNo, session.phone, session.currentUserRole, session.lastLoginAt]
    );
  }

  async clearSession() {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM session');
  }
}
