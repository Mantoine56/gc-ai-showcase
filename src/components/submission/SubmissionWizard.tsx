import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Form } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronLeft, ChevronRight, Globe2, Save } from 'lucide-react';
import { CreateProjectInput, Project } from '@/types';
import IdentityStep from './steps/IdentityStep';
import PurposeStep from './steps/PurposeStep';
import ComplianceStep from './steps/ComplianceStep';
import OperationsStep from './steps/OperationsStep';
import ReviewStep from './steps/ReviewStep';
import {
  getDraftReadiness,
  getInitialProjectFormValues,
  getPublishReadiness,
  ProjectFormData,
  projectSchema,
  STEP_FIELDS,
  toProjectPayload,
} from './projectForm';

interface SubmissionWizardProps {
  initialData?: Partial<Project & CreateProjectInput>;
  onSubmit: (
    data: CreateProjectInput,
    options: { submitForReview: boolean }
  ) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
}

const STEPS = [
  { id: 1, name: 'Identity and ownership', description: 'Public registry identity and ownership details.' },
  { id: 2, name: 'Purpose and capabilities', description: 'What the system does and who it serves.' },
  { id: 3, name: 'Compliance', description: 'Privacy, notification, and ADS context.' },
  { id: 4, name: 'Operations and status', description: 'Operational status and publishable outcomes.' },
  { id: 5, name: 'Review', description: 'Check draft minimums and bilingual publish readiness.' },
] as const;

export default function SubmissionWizard({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}: SubmissionWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingAction, setPendingAction] = useState<'draft' | 'submit' | null>(null);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: getInitialProjectFormValues(initialData),
    mode: 'onChange',
  });

  const formValues = form.watch();
  const draftReadiness = useMemo(() => getDraftReadiness(formValues), [formValues]);
  const publishReadiness = useMemo(() => getPublishReadiness(formValues), [formValues]);
  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = async () => {
    const isValid = await form.trigger(STEP_FIELDS[currentStep] || []);
    if (isValid) {
      setCurrentStep((previousStep) => Math.min(previousStep + 1, STEPS.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((previousStep) => Math.max(previousStep - 1, 1));
  };

  const handleFormSubmit = async (data: ProjectFormData, submitForReview: boolean) => {
    setIsSubmitting(true);
    setPendingAction(submitForReview ? 'submit' : 'draft');
    try {
      await onSubmit(toProjectPayload(data), { submitForReview });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
      setPendingAction(null);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <IdentityStep form={form} />;
      case 2:
        return <PurposeStep form={form} />;
      case 3:
        return <ComplianceStep form={form} />;
      case 4:
        return <OperationsStep form={form} />;
      case 5:
        return <ReviewStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="text-2xl">
                  {isEdit ? 'Edit AI system entry' : 'Create AI system entry'}
                </CardTitle>
                <CardDescription className="mt-2">
                  Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].name}
                </CardDescription>
              </div>
              <div className="text-left lg:text-right">
                <div className="text-sm text-muted-foreground">Progress</div>
                <div className="text-2xl font-bold text-primary">{Math.round(progress)}%</div>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-foreground">Draft minimum</div>
                    <div className="text-sm text-muted-foreground">
                      English core fields required before save or submit.
                    </div>
                  </div>
                  <Badge variant={draftReadiness.isReady ? 'default' : 'outline'}>
                    {draftReadiness.completeCount}/{draftReadiness.totalCount}
                  </Badge>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Globe2 className="h-4 w-4" />
                      Publish readiness
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Reviewers can publish only when bilingual content is complete.
                    </div>
                  </div>
                  <Badge variant={publishReadiness.isReady ? 'default' : 'outline'}>
                    {publishReadiness.completeCount}/{publishReadiness.totalCount}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <nav aria-label="Form progress" className="hidden justify-between md:flex">
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`flex-1 ${index < STEPS.length - 1 ? 'border-r border-border' : ''}`}
          >
            <button
              type="button"
              className={`w-full rounded-md p-4 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                currentStep === step.id
                  ? 'text-primary'
                  : currentStep > step.id
                    ? 'text-gcds-color-green-600'
                    : 'text-muted-foreground'
              } ${currentStep < step.id ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-accent'}`}
              onClick={() => currentStep >= step.id && setCurrentStep(step.id)}
              disabled={currentStep < step.id}
              aria-current={currentStep === step.id ? 'step' : undefined}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                    currentStep === step.id
                      ? 'bg-primary text-primary-foreground'
                      : currentStep > step.id
                        ? 'bg-gcds-color-green-600 text-white'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <div className="text-center text-xs font-medium">{step.name}</div>
              </div>
            </button>
          </div>
        ))}
      </nav>

      <Card>
        <CardHeader>
          <CardTitle>{STEPS[currentStep - 1].name}</CardTitle>
          <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={(event) => event.preventDefault()}>
              {renderStep()}

              <div className="mt-8 flex items-center justify-between border-t pt-6">
                <div>
                  {currentStep > 1 && (
                    <Button type="button" variant="outline" onClick={handlePrevious}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button type="button" variant="ghost" onClick={onCancel}>
                    Cancel
                  </Button>

                  {currentStep < STEPS.length ? (
                    <Button type="button" onClick={handleNext}>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isSubmitting}
                        onClick={() => void form.handleSubmit((data) => handleFormSubmit(data, false))()}
                      >
                        {isSubmitting && pendingAction === 'draft' ? (
                          <>
                            <Save className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save draft
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => void form.handleSubmit((data) => handleFormSubmit(data, true))()}
                        className="min-w-40"
                      >
                        {isSubmitting && pendingAction === 'submit' ? (
                          <>
                            <Save className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            {isEdit ? 'Update and submit' : 'Submit for review'}
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
