import { Stack } from 'expo-router/stack';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: '登录' }} />
    </Stack>
  );
}
