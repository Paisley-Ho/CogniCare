import { QuestionnaireLocalDataSource } from '@/data/local/questionnaire-local-data-source';
import { createId, nowIso } from '@/model/common';
import { FollowUpQuestionnaireInput } from '@/model/questionnaire';

export class QuestionnaireRepository {
  constructor(private readonly questionnaires: QuestionnaireLocalDataSource) {}

  list(patientId: string) {
    return this.questionnaires.list(patientId);
  }

  get(id: string) {
    return this.questionnaires.get(id);
  }

  async submit(patientId: string, input: FollowUpQuestionnaireInput) {
    const record = {
      id: createId('questionnaire'),
      patientId,
      submittedAt: nowIso(),
      ...input,
      familyObservedChanges: input.familyObservedChanges.trim(),
      notes: input.notes.trim(),
    };

    await this.questionnaires.save(record);
    return record;
  }
}
