export type ScreeningStatus = '未见明显风险提示' | '提示存在认知风险' | '建议进一步评估' | '建议持续随访观察';

export type ScreeningSummary = {
  id: string;
  patientId: string;
  screeningDate: string;
  status: ScreeningStatus;
  riskLevel: 'low' | 'medium' | 'high';
  riskPrompt: string;
  recommendation: string;
  nextReviewDate: string;
};
