import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/lib/api';
import { AdminStatsResponse, AdminStatsScope } from '@/types';

/**
 * Query key factory for admin stats
 */
export const adminStatsKeys = {
  all: ['admin', 'stats'] as const,
  list: (params: { scope: AdminStatsScope; includeCodeRequests: boolean }) => [
    ...adminStatsKeys.all,
    params,
  ] as const,
};

/**
 * Hook to fetch comprehensive admin analytics
 * Always prefer Published scope by default for public view
 */
export function useAdminStats(params: { scope?: AdminStatsScope; includeCodeRequests?: boolean } = {}) {
  const scope = params.scope ?? 'published';
  const includeCodeRequests = params.includeCodeRequests ?? true;

  return useQuery<AdminStatsResponse>({
    queryKey: adminStatsKeys.list({ scope, includeCodeRequests }),
    queryFn: () => adminApi.getStats({ scope, includeCodeRequests }),
    staleTime: 1000 * 60 * 5,
  });
}


