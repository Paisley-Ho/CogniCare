import { ReportSummary } from '@/model/report';
import { ScreeningSummary } from '@/model/screening-result';
import { ApiClient } from './api-client';

export class ScreeningApi {
  constructor(private readonly client: ApiClient) {}

  getLatestResult(patientId: string) {
    return this.client.get<ScreeningSummary>(`/patients/${patientId}/screening/latest`);
  }

  getReportSummary(resultId: string) {
    return this.client.get<ReportSummary>(`/screening/${resultId}/report`);
  }
}
