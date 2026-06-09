import { Stack } from 'expo-router/stack';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: '我的' }} />
      <Stack.Screen name="about" options={{ title: '关于本应用' }} />
      <Stack.Screen name="privacy" options={{ title: '隐私说明' }} />
      <Stack.Screen name="help" options={{ title: '使用帮助' }} />
    </Stack>
  );
}
