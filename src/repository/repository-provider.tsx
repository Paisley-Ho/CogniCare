import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import { AppointmentLocalDataSource } from '@/data/local/appointment-local-data-source';
import { ObservationLocalDataSource } from '@/data/local/observation-local-data-source';
import { PatientLocalDataSource } from '@/data/local/patient-local-data-source';
import { QuestionnaireLocalDataSource } from '@/data/local/questionnaire-local-data-source';
import { ReminderLocalDataSource } from '@/data/local/reminder-local-data-source';
import { ScreeningLocalDataSource } from '@/data/local/screening-local-data-source';
import { SessionLocalDataSource } from '@/data/local/session-local-data-source';
import { AppointmentRepository } from './appointment-repository';
import { AuthRepository } from './auth-repository';
import { ObservationRepository } from './observation-repository';
import { PatientRepository } from './patient-repository';
import { QuestionnaireRepository } from './questionnaire-repository';
import { ReminderRepository } from './reminder-repository';
import { ScreeningRepository } from './screening-repository';

export type Repositories = {
  auth: AuthRepository;
  patient: PatientRepository;
  screening: ScreeningRepository;
  observation: ObservationRepository;
  questionnaire: QuestionnaireRepository;
  appointment: AppointmentRepository;
  reminder: ReminderRepository;
};

const RepositoryContext = createContext<Repositories | null>(null);

export function RepositoryProvider({ children }: PropsWithChildren) {
  const repositories = useMemo<Repositories>(() => {
    const sessions = new SessionLocalDataSource();
    const patients = new PatientLocalDataSource();

    return {
      auth: new AuthRepository(sessions, patients),
      patient: new PatientRepository(patients),
      screening: new ScreeningRepository(new ScreeningLocalDataSource()),
      observation: new ObservationRepository(new ObservationLocalDataSource()),
      questionnaire: new QuestionnaireRepository(new QuestionnaireLocalDataSource()),
      appointment: new AppointmentRepository(new AppointmentLocalDataSource()),
      reminder: new ReminderRepository(new ReminderLocalDataSource()),
    };
  }, []);

  return <RepositoryContext.Provider value={repositories}>{children}</RepositoryContext.Provider>;
}

export function useRepositories() {
  const repositories = useContext(RepositoryContext);
  if (!repositories) throw new Error('RepositoryProvider is missing');
  return repositories;
}
