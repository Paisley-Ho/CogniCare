import { FollowUpQuestionnaire } from '@/model/questionnaire';
import { getDatabase } from './database';

type QuestionnaireRow = {
  id: string;
  patient_id: string;
  submitted_at: string;
  sleep_status: string;
  emotion_status: string;
  memory_self_assessment: string;
  family_observed_changes: string;
  reviewed_on_time: string;
  medical_arrangement: string;
  notes: string;
};

function mapQuestionnaire(row: QuestionnaireRow): FollowUpQuestionnaire {
  return {
    id: row.id,
    patientId: row.patient_id,
    submittedAt: row.submitted_at,
    sleepStatus: row.sleep_status,
    emotionStatus: row.emotion_status,
    memorySelfAssessment: row.memory_self_assessment,
    familyObservedChanges: row.family_observed_changes,
    reviewedOnTime: row.reviewed_on_time,
    medicalArrangement: row.medical_arrangement,
    notes: row.notes,
  };
}

export class QuestionnaireLocalDataSource {
  async list(patientId: string) {
    const db = await getDatabase();
    const rows = await db.getAllAsync<QuestionnaireRow>(
      'SELECT * FROM questionnaire_submission WHERE patient_id = ? ORDER BY submitted_at DESC',
      [patientId]
    );
    return rows.map(mapQuestionnaire);
  }

  async get(id: string) {
    const db = await getDatabase();
    const row = await db.getFirstAsync<QuestionnaireRow>('SELECT * FROM questionnaire_submission WHERE id = ?', [id]);
    return row ? mapQuestionnaire(row) : null;
  }

  async save(record: FollowUpQuestionnaire) {
    const db = await getDatabase();
    await db.runAsync(
      'INSERT OR REPLACE INTO questionnaire_submission (id, patient_id, submitted_at, sleep_status, emotion_status, memory_self_assessment, family_observed_changes, reviewed_on_time, medical_arrangement, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        record.id,
        record.patientId,
        record.submittedAt,
        record.sleepStatus,
        record.emotionStatus,
        record.memorySelfAssessment,
        record.familyObservedChanges,
        record.reviewedOnTime,
        record.medicalArrangement,
        record.notes,
      ]
    );
  }
}
