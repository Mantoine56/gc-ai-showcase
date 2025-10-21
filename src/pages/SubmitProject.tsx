import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import SubmissionWizard from '@/components/submission/SubmissionWizard';
import { useCreateProject } from '@/hooks/useProjects';
import { CreateProjectInput } from '@/types';
import { toast } from 'sonner';

export default function SubmitProject() {
  const navigate = useNavigate();
  const createProject = useCreateProject();

  const handleSubmit = async (data: CreateProjectInput) => {
    try {
      await createProject.mutateAsync(data);
      toast.success('Project submitted successfully!', {
        description: 'Your AI system has been submitted for review. You will be notified when it is published.',
      });
      navigate('/');
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Failed to submit project', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
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
