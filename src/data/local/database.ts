import * as SQLite from 'expo-sqlite';

let database: SQLite.SQLiteDatabase | null = null;

export async function getDatabase() {
  if (!database) {
    database = await SQLite.openDatabaseAsync('cognicare-mobile.db');
  }

  return database;
}

export async function clearDatabase() {
  const db = await getDatabase();
  await db.execAsync(`
    DELETE FROM session;
    DELETE FROM reminder;
    DELETE FROM appointment;
    DELETE FROM questionnaire_submission;
    DELETE FROM observation_record;
    DELETE FROM report_summary;
    DELETE FROM screening_result;
    DELETE FROM patient;
    DELETE FROM app_meta;
  `);
}
