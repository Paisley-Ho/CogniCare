import { AppointmentInput, AppointmentRecord } from '@/model/appointment';
import { ObservationRecord, ObservationRecordInput } from '@/model/observation-record';
import { FollowUpQuestionnaire, FollowUpQuestionnaireInput } from '@/model/questionnaire';
import { ApiClient } from './api-client';

export class FollowUpApi {
  constructor(private readonly client: ApiClient) {}

  createObservation(input: ObservationRecordInput) {
    return this.client.post<ObservationRecord>('/follow-up/observations', input);
  }

  submitQuestionnaire(input: FollowUpQuestionnaireInput) {
    return this.client.post<FollowUpQuestionnaire>('/follow-up/questionnaires', input);
  }

  submitAppointment(input: AppointmentInput) {
    return this.client.post<AppointmentRecord>('/follow-up/appointments', input);
  }
}
