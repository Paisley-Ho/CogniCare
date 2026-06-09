import { PatientLocalDataSource } from '@/data/local/patient-local-data-source';

export class PatientRepository {
  constructor(private readonly patients: PatientLocalDataSource) {}

  getCurrentPatient() {
    return this.patients.getCurrentPatient();
  }
}
