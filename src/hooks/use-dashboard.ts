import { useCallback } from 'react';

import { useRepositories } from '@/repository/repository-provider';
import { useAsyncState } from './use-async-state';

export function useDashboard() {
  const repositories = useRepositories();

  const loader = useCallback(async () => {
    const patient = await repositories.patient.getCurrentPatient();
    if (!patient) return null;
    const screening = await repositories.screening.getLatestResult(patient.id);
    const observations = await repositories.observation.list(patient.id);
    const questionnaires = await repositories.questionnaire.list(patient.id);
    const appointments = await repositories.appointment.list(patient.id);
    return { patient, screening, observations, questionnaires, appointments };
  }, [repositories]);

  return useAsyncState(loader);
}
