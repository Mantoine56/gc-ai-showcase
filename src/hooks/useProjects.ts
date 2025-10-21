import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '@/lib/api';
import {
  Project,
  ProjectFilters,
  CreateProjectInput,
  UpdateProjectInput,
  PaginatedResponse,
} from '@/types';
import { toast } from '@/hooks/use-toast';

/**
 * Query key factory for projects
 */
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters: ProjectFilters) => [...projectKeys.lists(), filters] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  stats: (id: string) => [...projectKeys.all, 'stats', id] as const,
};

/**
 * Hook to fetch projects with filters
 */
export function useProjects(filters: ProjectFilters = {}) {
  return useQuery({
    queryKey: projectKeys.list(filters),
    queryFn: () => projectsApi.getAll(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch a single project by ID
 */
export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectsApi.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to create a new project
 */
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectInput) => projectsApi.create(data),
    onSuccess: (newProject) => {
      // Invalidate all project lists
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });

      toast({
        title: 'Project created',
        description: `${newProject.name} has been successfully created.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error creating project',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook to update an existing project
 */
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectInput }) =>
      projectsApi.update(id, data),
    onSuccess: (updatedProject) => {
      // Invalidate all project lists
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });

      // Invalidate the specific project detail
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(updatedProject.id) });

      toast({
        title: 'Project updated',
        description: `${updatedProject.name} has been successfully updated.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error updating project',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook to delete (archive) a project
 */
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectsApi.delete(id),
    onSuccess: (result) => {
      // Invalidate all project lists
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });

      // Invalidate the specific project detail
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(result.project.id) });

      toast({
        title: 'Project archived',
        description: result.message,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error archiving project',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook to fetch project statistics
 */
export function useProjectStats(id: string) {
  return useQuery({
    queryKey: projectKeys.stats(id),
    queryFn: () => projectsApi.getStats(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch global project statistics
 */
export function useGlobalStats() {
  return useQuery({
    queryKey: [...projectKeys.all, 'global-stats'] as const,
    queryFn: () => projectsApi.getGlobalStats(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
