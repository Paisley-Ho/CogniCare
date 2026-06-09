export type RecorderType = '本人' | '家属';

export type ObservationRecord = {
  id: string;
  patientId: string;
  recordDate: string;
  recorder: RecorderType;
  memoryChange: string;
  emotionChange: string;
  communicationChange: string;
  dailyLivingChange: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type ObservationRecordInput = Omit<ObservationRecord, 'id' | 'patientId' | 'createdAt' | 'updatedAt'>;
