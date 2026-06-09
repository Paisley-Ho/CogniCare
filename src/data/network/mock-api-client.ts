import { mockPatient, mockReportSummary, mockScreeningSummary } from '@/data/seed/mock-data';
import { ApiClient } from './api-client';

export const mockApiClient: ApiClient = {
  async get(path) {
    if (path.includes('patient')) return mockPatient as never;
    if (path.includes('screening')) return mockScreeningSummary as never;
    if (path.includes('report')) return mockReportSummary as never;
    return {} as never;
  },
  async post(_path, body) {
    return body as never;
  },
};
