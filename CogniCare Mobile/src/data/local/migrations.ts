import { mockPatient, mockReminders, mockReportSummary, mockScreeningSummary } from '@/data/seed/mock-data';
import { getDatabase } from './database';

export async function migrateDatabase() {
  const db = await getDatabase();

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS session (
      id TEXT PRIMARY KEY NOT NULL,
      patient_id TEXT NOT NULL,
      subject_no TEXT NOT NULL,
      phone TEXT NOT NULL,
      current_user_role TEXT NOT NULL,
      last_login_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS patient (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      subject_no TEXT NOT NULL,
      phone TEXT NOT NULL,
      current_user_role TEXT NOT NULL,
      last_screening_date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS screening_result (
      id TEXT PRIMARY KEY NOT NULL,
      patient_id TEXT NOT NULL,
      screening_date TEXT NOT NULL,
      status TEXT NOT NULL,
      risk_level TEXT NOT NULL,
      risk_prompt TEXT NOT NULL,
      recommendation TEXT NOT NULL,
      next_review_date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS report_summary (
      id TEXT PRIMARY KEY NOT NULL,
      screening_result_id TEXT NOT NULL,
      overview TEXT NOT NULL,
      result_summary TEXT NOT NULL,
      risk_note TEXT NOT NULL,
      follow_up_advice TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS observation_record (
      id TEXT PRIMARY KEY NOT NULL,
      patient_id TEXT NOT NULL,
      record_date TEXT NOT NULL,
      recorder TEXT NOT NULL,
      memory_change TEXT NOT NULL,
      emotion_change TEXT NOT NULL,
      communication_change TEXT NOT NULL,
      daily_living_change TEXT NOT NULL,
      notes TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS questionnaire_submission (
      id TEXT PRIMARY KEY NOT NULL,
      patient_id TEXT NOT NULL,
      submitted_at TEXT NOT NULL,
      sleep_status TEXT NOT NULL,
      emotion_status TEXT NOT NULL,
      memory_self_assessment TEXT NOT NULL,
      family_observed_changes TEXT NOT NULL,
      reviewed_on_time TEXT NOT NULL,
      medical_arrangement TEXT NOT NULL,
      notes TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS appointment (
      id TEXT PRIMARY KEY NOT NULL,
      patient_id TEXT NOT NULL,
      suggested_review_date TEXT NOT NULL,
      appointment_type TEXT NOT NULL,
      appointment_date TEXT NOT NULL,
      phone TEXT NOT NULL,
      remark TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reminder (
      id TEXT PRIMARY KEY NOT NULL,
      patient_id TEXT NOT NULL,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      due_at TEXT NOT NULL,
      status TEXT NOT NULL,
      source_type TEXT NOT NULL,
      source_id TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
}

export async function seedDatabase() {
  const db = await getDatabase();
  const seeded = await db.getFirstAsync<{ value: string }>('SELECT value FROM app_meta WHERE key = ?', ['seeded']);

  if (seeded?.value === 'true') return;

  await db.runAsync(
    'INSERT OR REPLACE INTO patient (id, name, age, subject_no, phone, current_user_role, last_screening_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      mockPatient.id,
      mockPatient.name,
      mockPatient.age,
      mockPatient.subjectNo,
      mockPatient.phone,
      mockPatient.currentUserRole,
      mockPatient.lastScreeningDate,
    ]
  );

  await db.runAsync(
    'INSERT OR REPLACE INTO screening_result (id, patient_id, screening_date, status, risk_level, risk_prompt, recommendation, next_review_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      mockScreeningSummary.id,
      mockScreeningSummary.patientId,
      mockScreeningSummary.screeningDate,
      mockScreeningSummary.status,
      mockScreeningSummary.riskLevel,
      mockScreeningSummary.riskPrompt,
      mockScreeningSummary.recommendation,
      mockScreeningSummary.nextReviewDate,
    ]
  );

  await db.runAsync(
    'INSERT OR REPLACE INTO report_summary (id, screening_result_id, overview, result_summary, risk_note, follow_up_advice) VALUES (?, ?, ?, ?, ?, ?)',
    [
      mockReportSummary.id,
      mockReportSummary.screeningResultId,
      mockReportSummary.overview,
      mockReportSummary.resultSummary,
      mockReportSummary.riskNote,
      mockReportSummary.followUpAdvice,
    ]
  );

  for (const reminder of mockReminders) {
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

  await db.runAsync('INSERT OR REPLACE INTO app_meta (key, value) VALUES (?, ?)', ['seeded', 'true']);
}

export async function bootstrapDatabase() {
  await migrateDatabase();
  await seedDatabase();
}
