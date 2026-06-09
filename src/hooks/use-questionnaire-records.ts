import { useCallback } from 'react';

import { useRepositories } from '@/repository/repository-provider';
import { useAsyncState } from './use-async-state';

export function useQuestionnaireRecords() {
  const repositories = useRepositories();

  const loader = useCallback(async () => {
    const patient = await repositories.patient.getCurrentPatient();
    if (!patient) return null;
    const records = await repositories.questionnaire.list(patient.id);
    return { patient, records };
  }, [repositories]);

  return useAsyncState(loader);
}

export function useQuestionnaireRecord(id: string) {
  const repositories = useRepositories();
  const loader = useCallback(() => repositories.questionnaire.get(id), [repositories, id]);
  return useAsyncState(loader);
}
