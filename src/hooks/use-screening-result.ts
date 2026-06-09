import { useCallback } from 'react';

import { useRepositories } from '@/repository/repository-provider';
import { useAsyncState } from './use-async-state';

export function useScreeningResult() {
  const repositories = useRepositories();

  const loader = useCallback(async () => {
    const patient = await repositories.patient.getCurrentPatient();
    if (!patient) return null;
    const screening = await repositories.screening.getLatestResult(patient.id);
    if (!screening) return null;
    return { patient, screening };
  }, [repositories]);

  return useAsyncState(loader);
}

export function useReportSummary() {
  const repositories = useRepositories();

  const loader = useCallback(async () => {
    const patient = await repositories.patient.getCurrentPatient();
    if (!patient) return null;
    const screening = await repositories.screening.getLatestResult(patient.id);
    if (!screening) return null;
    const report = await repositories.screening.getReportSummary(screening.id);
    if (!report) return null;
    return { patient, screening, report };
  }, [repositories]);

  return useAsyncState(loader);
}
