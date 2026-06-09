import { UserProfile } from '@/model/patient';
import { ApiClient } from './api-client';

export class PatientApi {
  constructor(private readonly client: ApiClient) {}

  getCurrentPatient() {
    return this.client.get<UserProfile>('/patient/current');
  }
}
