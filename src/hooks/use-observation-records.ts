import { useCallback } from 'react';

import { useRepositories } from '@/repository/repository-provider';
import { useAsyncState } from './use-async-state';

export function useObservationRecords() {
  const repositories = useRepositories();

  const loader = useCallback(async () => {
    const patient = await repositories.patient.getCurrentPatient();
    if (!patient) return null;
    const records = await repositories.observation.list(patient.id);
    return { patient, records };
  }, [repositories]);

  return useAsyncState(loader);
}

export function useObservationRecord(id: string) {
  const repositories = useRepositories();
  const loader = useCallback(() => repositories.observation.get(id), [repositories, id]);
  return useAsyncState(loader);
}
