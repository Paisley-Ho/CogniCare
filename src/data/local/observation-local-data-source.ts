import { ObservationRecord } from '@/model/observation-record';
import { getDatabase } from './database';

type ObservationRow = {
  id: string;
  patient_id: string;
  record_date: string;
  recorder: ObservationRecord['recorder'];
  memory_change: string;
  emotion_change: string;
  communication_change: string;
  daily_living_change: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

function mapObservation(row: ObservationRow): ObservationRecord {
  return {
    id: row.id,
    patientId: row.patient_id,
    recordDate: row.record_date,
    recorder: row.recorder,
    memoryChange: row.memory_change,
    emotionChange: row.emotion_change,
    communicationChange: row.communication_change,
    dailyLivingChange: row.daily_living_change,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class ObservationLocalDataSource {
  async list(patientId: string) {
    const db = await getDatabase();
    const rows = await db.getAllAsync<ObservationRow>(
      'SELECT * FROM observation_record WHERE patient_id = ? ORDER BY record_date DESC, created_at DESC',
      [patientId]
    );
    return rows.map(mapObservation);
  }

  async get(id: string) {
    const db = await getDatabase();
    const row = await db.getFirstAsync<ObservationRow>('SELECT * FROM observation_record WHERE id = ?', [id]);
    return row ? mapObservation(row) : null;
  }

  async save(record: ObservationRecord) {
    const db = await getDatabase();
    await db.runAsync(
      'INSERT OR REPLACE INTO observation_record (id, patient_id, record_date, recorder, memory_change, emotion_change, communication_change, daily_living_change, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        record.id,
        record.patientId,
        record.recordDate,
        record.recorder,
        record.memoryChange,
        record.emotionChange,
        record.communicationChange,
        record.dailyLivingChange,
        record.notes,
        record.createdAt,
        record.updatedAt,
      ]
    );
  }

  async remove(id: string) {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM observation_record WHERE id = ?', [id]);
  }
}
