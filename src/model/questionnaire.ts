export type FollowUpQuestionnaire = {
  id: string;
  patientId: string;
  submittedAt: string;
  sleepStatus: string;
  emotionStatus: string;
  memorySelfAssessment: string;
  familyObservedChanges: string;
  reviewedOnTime: string;
  medicalArrangement: string;
  notes: string;
};

export type FollowUpQuestionnaireInput = Omit<FollowUpQuestionnaire, 'id' | 'patientId' | 'submittedAt'>;
