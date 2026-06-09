export type ApiClient = {
  get<T>(path: string): Promise<T>;
  post<T>(path: string, body: unknown): Promise<T>;
};

export function createApiClient(baseUrl: string): ApiClient {
  return {
    async get<T>(path: string) {
      const response = await fetch(`${baseUrl}${path}`);
      if (!response.ok) throw new Error('网络异常，请稍后再试');
      return response.json() as Promise<T>;
    },
    async post<T>(path: string, body: unknown) {
      const response = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('提交失败，请稍后重试');
      return response.json() as Promise<T>;
    },
  };
}
