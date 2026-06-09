import { useCallback, useEffect, useState } from 'react';

import { UiState } from '@/model/common';

async function resolveState<T>(loader: () => Promise<T | null>): Promise<UiState<T>> {
  try {
    const data = await loader();
    if (Array.isArray(data) && data.length === 0) return { status: 'empty' };
    if (!data) return { status: 'empty' };
    return { status: 'success', data };
  } catch (error) {
    return { status: 'error', message: error instanceof Error ? error.message : '未能获取相关信息' };
  }
}

export function useAsyncState<T>(loader: () => Promise<T | null>) {
  const [state, setState] = useState<UiState<T>>({ status: 'loading' });

  const reload = useCallback(async () => {
    setState({ status: 'loading' });
    setState(await resolveState(loader));
  }, [loader]);

  useEffect(() => {
    let canceled = false;

    Promise.resolve().then(async () => {
      const nextState = await resolveState(loader);
      if (!canceled) setState(nextState);
    });

    return () => {
      canceled = true;
    };
  }, [loader]);

  return { state, reload };
}
