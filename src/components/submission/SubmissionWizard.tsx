import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Form } from '@/components/ui/form';
import { ChevronLeft, ChevronRight, Save, Check } from 'lucide-react';
import { CreateProjectInput, PrimaryUsers, DevelopedBy, ProjectStatus } from '@/types';
import IdentityStep from './steps/IdentityStep';
import PurposeStep from './steps/PurposeStep';
import ComplianceStep from './steps/ComplianceStep';
import OperationsStep from './steps/OperationsStep';
import ReviewStep from './steps/ReviewStep';

// Zod schema for form validation
const projectSchema = z.object({
  // Step 1: Identity & Ownership
  name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
  serviceInventoryId: z.string().optional(),
  organizationId: z.string().min(1, 'Organization is required'),
  developedBy: z.nativeEnum(DevelopedBy),
  vendorName: z.string().optional(),

  // Step 2: Purpose & Capabilities
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be 1000 characters or less'),
  capabilities: z.string().max(300, 'Capabilities must be 300 characters or less').optional(),
  primaryUsers: z.nativeEnum(PrimaryUsers),

  // Step 3: Compliance
  isAutomatedDecisionSystem: z.boolean().default(false),
  openGovAiaId: z.string().optional(),
  involvesPersonalInfo: z.boolean().default(false),
  personalInformationBanks: z.string().optional(),
  hasUserNotification: z.boolean().default(false),

  // Step 4: Operations & Status
  status: z.nativeEnum(ProjectStatus),
  statusYear: z.number().int().min(2000).max(2100).optional().or(z.nan()),
  dataSources: z.string().optional(),
  atipRequestRefs: z.string().optional(),
  outcomes: z.string().max(500, 'Outcomes must be 500 characters or less').optional(),

  // Metadata
  featured: z.boolean().optional(),
}).refine((data) => {
  // If developedBy is Vendor, vendorName is required
  if (data.developedBy === DevelopedBy.Vendor && !data.vendorName) {
    return false;
  }
  return true;
}, {
  message: 'Vendor name is required when developed by vendor',
  path: ['vendorName'],
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface SubmissionWizardProps {
  initialData?: Partial<CreateProjectInput>;
  onSubmit: (data: CreateProjectInput) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
}

const STEPS = [
  { id: 1, name: 'Identity & Ownership', description: 'Basic information about your AI system' },
  { id: 2, name: 'Purpose & Capabilities', description: 'What does your AI system do?' },
  { id: 3, name: 'Compliance', description: 'Privacy and governance requirements' },
  { id: 4, name: 'Operations & Status', description: 'Current status and outcomes' },
  { id: 5, name: 'Review & Submit', description: 'Review your submission' },
];

export default function SubmissionWizard({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false
}: SubmissionWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: initialData?.name || '',
      serviceInventoryId: initialData?.serviceInventoryId || '',
      organizationId: initialData?.organizationId || '',
      developedBy: initialData?.developedBy || DevelopedBy.Government,
      vendorName: initialData?.vendorName || '',
      description: initialData?.description || '',
      capabilities: initialData?.capabilities || '',
      primaryUsers: initialData?.primaryUsers || PrimaryUsers.Employees,
      isAutomatedDecisionSystem: initialData?.isAutomatedDecisionSystem || false,
      openGovAiaId: initialData?.openGovAiaId || '',
      involvesPersonalInfo: initialData?.involvesPersonalInfo || false,
      personalInformationBanks: initialData?.personalInformationBanks || '',
      hasUserNotification: initialData?.hasUserNotification || false,
      status: initialData?.status || ProjectStatus.InDevelopment,
      statusYear: initialData?.statusYear || undefined,
      dataSources: initialData?.dataSources || '',
      atipRequestRefs: initialData?.atipRequestRefs || '',
      outcomes: initialData?.outcomes || '',
      featured: initialData?.featured || false,
    },
    mode: 'onChange',
  });

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = async () => {
    // Validate current step fields
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFormSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      // Convert NaN to undefined for statusYear
      const submitData = {
        ...data,
        statusYear: isNaN(data.statusYear as number) ? undefined : data.statusYear,
      } as CreateProjectInput;

      await onSubmit(submitData);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  {isEdit ? 'Edit AI System' : 'Register New AI System'}
                </CardTitle>
                <CardDescription className="mt-2">
                  Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].name}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Progress</div>
                <div className="text-2xl font-bold text-primary">{Math.round(progress)}%</div>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Step Indicators */}
      <div className="hidden md:flex justify-between">
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`flex-1 ${index < STEPS.length - 1 ? 'border-r border-border' : ''}`}
          >
            <div
              className={`flex flex-col items-center p-4 cursor-pointer transition-colors ${
                currentStep === step.id
                  ? 'text-primary'
                  : currentStep > step.id
                  ? 'text-green-600'
                  : 'text-muted-foreground'
              }`}
              onClick={() => setCurrentStep(step.id)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep === step.id
                    ? 'bg-primary text-primary-foreground'
                    : currentStep > step.id
                    ? 'bg-green-600 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
              </div>
              <div className="text-xs font-medium text-center">{step.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>{STEPS[currentStep - 1].name}</CardTitle>
          <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <div>
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>

                  {currentStep < STEPS.length ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                    >
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-w-32"
                    >
                      {isSubmitting ? (
                        <>
                          <Save className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          {isEdit ? 'Update Project' : 'Submit Project'}
                        </>
                      )}
                    </Button>
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

// Helper function to get fields to validate for each step
function getFieldsForStep(step: number): (keyof ProjectFormData)[] {
  switch (step) {
    case 1:
      return ['name', 'organizationId', 'developedBy', 'vendorName'];
    case 2:
      return ['description', 'capabilities', 'primaryUsers'];
    case 3:
      return ['isAutomatedDecisionSystem', 'openGovAiaId', 'involvesPersonalInfo', 'personalInformationBanks', 'hasUserNotification'];
    case 4:
      return ['status', 'statusYear', 'dataSources', 'atipRequestRefs', 'outcomes'];
    default:
      return [];
  }
}
