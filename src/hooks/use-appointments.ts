import { useCallback } from 'react';

import { useRepositories } from '@/repository/repository-provider';
import { useAsyncState } from './use-async-state';

export function useAppointments() {
  const repositories = useRepositories();

  const loader = useCallback(async () => {
    const patient = await repositories.patient.getCurrentPatient();
    if (!patient) return null;
    const screening = await repositories.screening.getLatestResult(patient.id);
    const records = await repositories.appointment.list(patient.id);
    return { patient, screening, records };
  }, [repositories]);

  return useAsyncState(loader);
}

export function useAppointment(id: string) {
  const repositories = useRepositories();
  const loader = useCallback(() => repositories.appointment.get(id), [repositories, id]);
  return useAsyncState(loader);
}
