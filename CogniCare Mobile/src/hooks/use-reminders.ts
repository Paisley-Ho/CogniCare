import { useCallback } from 'react';

import { useRepositories } from '@/repository/repository-provider';
import { useAsyncState } from './use-async-state';

export function useReminders() {
  const repositories = useRepositories();

  const loader = useCallback(async () => {
    const patient = await repositories.patient.getCurrentPatient();
    if (!patient) return null;
    const records = await repositories.reminder.list(patient.id);
    return { patient, records };
  }, [repositories]);

  const { state, reload } = useAsyncState(loader);

  const completeReminder = useCallback(
    async (id: string) => {
      await repositories.reminder.markCompleted(id);
      await reload();
    },
    [reload, repositories]
  );

  return { state, reload, completeReminder };
}
