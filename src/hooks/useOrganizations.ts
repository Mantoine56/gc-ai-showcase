import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationsApi } from '@/lib/api';
import { Organization } from '@/types';
import { toast } from '@/hooks/use-toast';

/**
 * Query key factory for organizations
 */
export const organizationKeys = {
  all: ['organizations'] as const,
  lists: () => [...organizationKeys.all, 'list'] as const,
  list: (search?: string) => [...organizationKeys.lists(), { search }] as const,
  details: () => [...organizationKeys.all, 'detail'] as const,
  detail: (id: string) => [...organizationKeys.details(), id] as const,
};

/**
 * Hook to fetch all organizations
 */
export function useOrganizations(search?: string) {
  return useQuery({
    queryKey: organizationKeys.list(search),
    queryFn: () => organizationsApi.getAll(search),
    staleTime: 1000 * 60 * 10, // 10 minutes (organizations don't change often)
  });
}

/**
 * Hook to fetch a single organization by ID
 */
export function useOrganization(id: string) {
  return useQuery({
    queryKey: organizationKeys.detail(id),
    queryFn: () => organizationsApi.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to create a new organization (admin only)
 */
export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { nameEN: string; nameFR: string; acronym?: string; url?: string }) =>
      organizationsApi.create(data),
    onSuccess: (newOrg) => {
      // Invalidate all organization lists
      queryClient.invalidateQueries({ queryKey: organizationKeys.lists() });

      toast({
        title: 'Organization created',
        description: `${newOrg.nameEN} has been successfully created.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error creating organization',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook to update an organization (admin only)
 */
export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Organization> }) =>
      organizationsApi.update(id, data),
    onSuccess: (updatedOrg) => {
      // Invalidate all organization lists
      queryClient.invalidateQueries({ queryKey: organizationKeys.lists() });

      // Invalidate the specific organization detail
      queryClient.invalidateQueries({ queryKey: organizationKeys.detail(updatedOrg.id) });

      toast({
        title: 'Organization updated',
        description: `${updatedOrg.nameEN} has been successfully updated.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error updating organization',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook to delete an organization (admin only)
 */
export function useDeleteOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => organizationsApi.delete(id),
    onSuccess: (result) => {
      // Invalidate all organization lists
      queryClient.invalidateQueries({ queryKey: organizationKeys.lists() });

      toast({
        title: 'Organization deleted',
        description: result.message,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error deleting organization',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
