import { Stack } from 'expo-router/stack';

export default function ResultsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: '结果摘要' }} />
      <Stack.Screen name="report" options={{ title: '报告摘要' }} />
    </Stack>
  );
}
