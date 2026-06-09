import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import { AuthSession } from '@/model/auth';
import { useRepositories } from '@/repository/repository-provider';

export function useAuth() {
  const repositories = useRepositories();
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshSession = useCallback(async () => {
    const current = await repositories.auth.getSession();
    setSession(current);
    return current;
  }, [repositories.auth]);

  const login = useCallback(
    async (identifier: string, code: string) => {
      setLoading(true);
      try {
        const nextSession = await repositories.auth.login(identifier, code);
        setSession(nextSession);
        router.replace('/(tabs)/(home)');
        return nextSession;
      } finally {
        setLoading(false);
      }
    },
    [repositories.auth, router]
  );

  const logout = useCallback(async () => {
    await repositories.auth.logout();
    setSession(null);
    router.replace('/(auth)/login');
  }, [repositories.auth, router]);

  return { session, loading, refreshSession, login, logout };
}
