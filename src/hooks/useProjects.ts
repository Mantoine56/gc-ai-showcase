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
  moderation: (id: string) => [...projectKeys.all, 'moderation', id] as const,
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

export function useSubmitProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reviewNotes }: { id: string; reviewNotes?: string }) =>
      projectsApi.submit(id, reviewNotes),
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(project.id) });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
      toast({
        title: 'Project submitted',
        description: `${project.name} was submitted for review.`,
      });
    },
  });
}

export function useApproveProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reviewNotes }: { id: string; reviewNotes?: string }) =>
      projectsApi.approve(id, reviewNotes),
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(project.id) });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
      toast({
        title: 'Project approved',
        description: `${project.name} is approved and ready to publish.`,
      });
    },
  });
}

export function useRequestChangesProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reviewNotes }: { id: string; reviewNotes?: string }) =>
      projectsApi.requestChanges(id, reviewNotes),
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(project.id) });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
      toast({
        title: 'Changes requested',
        description: `${project.name} was returned to draft for updates.`,
      });
    },
  });
}

export function usePublishProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reviewNotes }: { id: string; reviewNotes?: string }) =>
      projectsApi.publish(id, reviewNotes),
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(project.id) });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
      toast({
        title: 'Project published',
        description: `${project.name} is now visible in the public registry.`,
      });
    },
  });
}

export function useArchiveProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reviewNotes }: { id: string; reviewNotes?: string }) =>
      projectsApi.archive(id, reviewNotes),
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(project.id) });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
      toast({
        title: 'Project archived',
        description: `${project.name} has been archived.`,
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
