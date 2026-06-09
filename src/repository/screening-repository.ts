import { ScreeningLocalDataSource } from '@/data/local/screening-local-data-source';

export class ScreeningRepository {
  constructor(private readonly screenings: ScreeningLocalDataSource) {}

  getLatestResult(patientId: string) {
    return this.screenings.getLatestResult(patientId);
  }

  getReportSummary(resultId: string) {
    return this.screenings.getReportSummary(resultId);
  }
}
