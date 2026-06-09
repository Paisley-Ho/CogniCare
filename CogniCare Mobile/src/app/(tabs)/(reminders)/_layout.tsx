import { Stack } from 'expo-router/stack';

export default function RemindersLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: '提醒中心' }} />
    </Stack>
  );
}
