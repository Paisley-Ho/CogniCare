import { ThemedText } from '@/components/themed-text';
import { UiState } from '@/model/common';
import { EmptyState } from './empty-state';

export function StateView<T>({ state, children }: { state: UiState<T>; children: (data: T) => React.ReactNode }) {
  if (state.status === 'loading') {
    return <ThemedText themeColor="textSecondary">正在加载应用…</ThemedText>;
  }

  if (state.status === 'empty') {
    return <EmptyState title="当前暂无记录" body="完成记录后将在这里展示" />;
  }

  if (state.status === 'error') {
    return <EmptyState title="未能获取相关信息" body={state.message} />;
  }

  return <>{children(state.data)}</>;
}
