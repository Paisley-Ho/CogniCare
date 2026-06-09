import { UserProfile } from '@/model/patient';
import { getDatabase } from './database';

type PatientRow = {
  id: string;
  name: string;
  age: number;
  subject_no: string;
  phone: string;
  current_user_role: UserProfile['currentUserRole'];
  last_screening_date: string;
};

function mapPatient(row: PatientRow): UserProfile {
  return {
    id: row.id,
    name: row.name,
    age: row.age,
    subjectNo: row.subject_no,
    phone: row.phone,
    currentUserRole: row.current_user_role,
    lastScreeningDate: row.last_screening_date,
  };
}

export class PatientLocalDataSource {
  async getCurrentPatient() {
    const db = await getDatabase();
    const row = await db.getFirstAsync<PatientRow>('SELECT * FROM patient LIMIT 1');
    return row ? mapPatient(row) : null;
  }

  async findByIdentifier(identifier: string) {
    const db = await getDatabase();
    const row = await db.getFirstAsync<PatientRow>('SELECT * FROM patient WHERE phone = ? OR subject_no = ? LIMIT 1', [
      identifier,
      identifier,
    ]);
    return row ? mapPatient(row) : null;
  }
}
