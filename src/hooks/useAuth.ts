import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/api';

export function useAuthProfile() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authApi.me(),
    staleTime: 60_000,
  });
}
