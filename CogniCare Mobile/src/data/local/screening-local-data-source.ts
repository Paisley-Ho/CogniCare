import { ReportSummary } from '@/model/report';
import { ScreeningSummary } from '@/model/screening-result';
import { getDatabase } from './database';

type ScreeningRow = {
  id: string;
  patient_id: string;
  screening_date: string;
  status: ScreeningSummary['status'];
  risk_level: ScreeningSummary['riskLevel'];
  risk_prompt: string;
  recommendation: string;
  next_review_date: string;
};

type ReportRow = {
  id: string;
  screening_result_id: string;
  overview: string;
  result_summary: string;
  risk_note: string;
  follow_up_advice: string;
};

function mapScreening(row: ScreeningRow): ScreeningSummary {
  return {
    id: row.id,
    patientId: row.patient_id,
    screeningDate: row.screening_date,
    status: row.status,
    riskLevel: row.risk_level,
    riskPrompt: row.risk_prompt,
    recommendation: row.recommendation,
    nextReviewDate: row.next_review_date,
  };
}

function mapReport(row: ReportRow): ReportSummary {
  return {
    id: row.id,
    screeningResultId: row.screening_result_id,
    overview: row.overview,
    resultSummary: row.result_summary,
    riskNote: row.risk_note,
    followUpAdvice: row.follow_up_advice,
  };
}

export class ScreeningLocalDataSource {
  async getLatestResult(patientId: string) {
    const db = await getDatabase();
    const row = await db.getFirstAsync<ScreeningRow>(
      'SELECT * FROM screening_result WHERE patient_id = ? ORDER BY screening_date DESC LIMIT 1',
      [patientId]
    );
    return row ? mapScreening(row) : null;
  }

  async getReportSummary(resultId: string) {
    const db = await getDatabase();
    const row = await db.getFirstAsync<ReportRow>('SELECT * FROM report_summary WHERE screening_result_id = ? LIMIT 1', [
      resultId,
    ]);
    return row ? mapReport(row) : null;
  }
}
