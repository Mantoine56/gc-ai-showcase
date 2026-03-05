import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import SubmissionWizard from '@/components/submission/SubmissionWizard';
import { useCreateProject } from '@/hooks/useProjects';
import { CreateProjectInput } from '@/types';
import { toast } from 'sonner';
import { projectsApi } from '@/lib/api';

export default function SubmitProject() {
  const navigate = useNavigate();
  const createProject = useCreateProject();

  const handleSubmit = async (
    data: CreateProjectInput,
    options: { submitForReview: boolean }
  ) => {
    try {
      const createdProject = await createProject.mutateAsync(data);

      if (options.submitForReview) {
        await projectsApi.submit(createdProject.id);
        toast.success('Project submitted successfully', {
          description:
            'The draft is now in the reviewer queue. Open the admin area to continue the moderation flow.',
        });
      } else {
        toast.success('Draft saved', {
          description: 'The project was saved as a draft and remains visible to reviewers/admins only.',
        });
      }

      navigate(`/project/${createdProject.id}`);
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error(
        options.submitForReview ? 'Failed to submit project' : 'Failed to save draft',
        {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        }
      );
      throw error; // Re-throw to keep the wizard in submitting state
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <SubmissionWizard
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </DashboardLayout>
  );
}
