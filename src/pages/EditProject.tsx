import { useNavigate, useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import SubmissionWizard from '@/components/submission/SubmissionWizard';
import { Button } from '@/components/ui/button';
import { useProject, useUpdateProject } from '@/hooks/useProjects';
import { CreateProjectInput, ModerationState } from '@/types';
import { toast } from 'sonner';
import { projectsApi } from '@/lib/api';

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading, error } = useProject(id || '');
  const updateProject = useUpdateProject();

  const handleSubmit = async (
    data: CreateProjectInput,
    options: { submitForReview: boolean }
  ) => {
    if (!id) return;

    try {
      const updatedProject = await updateProject.mutateAsync({ id, data });

      if (options.submitForReview && updatedProject.moderationState === ModerationState.Draft) {
        await projectsApi.submit(updatedProject.id);
        toast.success('Draft updated and submitted', {
          description: 'The updated draft is now back in the reviewer queue.',
        });
      } else if (!options.submitForReview) {
        toast.success('Draft updated', {
          description: 'Changes were saved without changing moderation state.',
        });
      }

      navigate(`/project/${updatedProject.id}`);
    } catch (submitError) {
      console.error('Update failed:', submitError);
      toast.error(
        options.submitForReview ? 'Failed to update and submit draft' : 'Failed to update draft',
        {
          description:
            submitError instanceof Error
              ? submitError.message
              : 'An unexpected error occurred',
        }
      );
      throw submitError;
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-sm text-muted-foreground">Loading draft...</div>
      </DashboardLayout>
    );
  }

  if (error || !project) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-gcds-text-primary">Draft not available</h1>
          <p className="text-muted-foreground">
            The draft could not be loaded or you do not have permission to edit it.
          </p>
          <Button onClick={() => navigate(-1)}>Go back</Button>
        </div>
      </DashboardLayout>
    );
  }

  if (project.moderationState !== ModerationState.Draft) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-gcds-text-primary">Draft editing only</h1>
          <p className="text-muted-foreground">
            Only draft records can be edited in the submission wizard. This entry is currently {project.moderationState}.
          </p>
          <Button onClick={() => navigate(`/project/${project.id}`)}>Open project detail</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <SubmissionWizard
          initialData={project}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/project/${project.id}`)}
          isEdit
        />
      </div>
    </DashboardLayout>
  );
}
