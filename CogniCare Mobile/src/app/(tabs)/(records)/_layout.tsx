import { Stack } from 'expo-router/stack';

export default function RecordsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: '记录' }} />
      <Stack.Screen name="observation/index" options={{ title: '家庭观察记录' }} />
      <Stack.Screen name="observation/new" options={{ title: '新增观察记录' }} />
      <Stack.Screen name="observation/[id]" options={{ title: '观察记录详情' }} />
      <Stack.Screen name="questionnaire/index" options={{ title: '随访问卷' }} />
      <Stack.Screen name="questionnaire/new" options={{ title: '填写随访问卷' }} />
      <Stack.Screen name="questionnaire/[id]" options={{ title: '问卷详情' }} />
      <Stack.Screen name="appointment/index" options={{ title: '预约复查' }} />
      <Stack.Screen name="appointment/new" options={{ title: '提交预约' }} />
      <Stack.Screen name="appointment/[id]" options={{ title: '预约详情' }} />
    </Stack>
  );
}
