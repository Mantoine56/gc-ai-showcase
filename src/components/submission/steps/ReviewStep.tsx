import { UseFormReturn } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DevelopedBy, PrimaryUsers, ProjectStatus } from '@/types';
import { Building2, Target, Shield, Activity, CheckCircle2, XCircle } from 'lucide-react';
import { useOrganizations } from '@/hooks/useOrganizations';

interface ReviewStepProps {
  form: UseFormReturn<any>;
}

export default function ReviewStep({ form }: ReviewStepProps) {
  const formData = form.getValues();
  const { data: organizations } = useOrganizations();

  // Find organization name
  const organizationName = organizations?.find(org => org.id === formData.organizationId)?.nameEN || 'Not selected';

  // Helper to format boolean values
  const formatBoolean = (value: boolean) => value ? (
    <div className="flex items-center gap-1 text-green-600">
      <CheckCircle2 className="h-4 w-4" />
      <span>Yes</span>
    </div>
  ) : (
    <div className="flex items-center gap-1 text-gray-500">
      <XCircle className="h-4 w-4" />
      <span>No</span>
    </div>
  );

  // Format enum values
  const formatDevelopedBy = (value: DevelopedBy) => {
    switch (value) {
      case DevelopedBy.Government: return 'Government (In-house)';
      case DevelopedBy.Vendor: return 'Vendor';
      case DevelopedBy.Collaboration: return 'Collaboration';
      default: return value;
    }
  };

  const formatPrimaryUsers = (value: PrimaryUsers) => {
    switch (value) {
      case PrimaryUsers.Employees: return 'Employees (Internal Government Staff)';
      case PrimaryUsers.MembersOfPublic: return 'Members of Public (Citizens)';
      case PrimaryUsers.Both: return 'Both (Employees and Public)';
      default: return value;
    }
  };

  const formatStatus = (value: ProjectStatus) => {
    switch (value) {
      case ProjectStatus.InDevelopment: return 'In Development';
      case ProjectStatus.InProduction: return 'In Production';
      case ProjectStatus.Retired: return 'Retired';
      default: return value;
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.InProduction:
        return 'bg-green-100 text-green-800';
      case ProjectStatus.InDevelopment:
        return 'bg-yellow-100 text-yellow-800';
      case ProjectStatus.Retired:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Review Your Submission
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Please review all information below. You can go back to any step to make changes before submitting.
        </p>
      </div>

      {/* Identity & Ownership */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5 text-primary" />
            Identity & Ownership
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm font-semibold text-muted-foreground">Project Name</div>
            <div className="text-base">{formData.name || 'Not provided'}</div>
          </div>
          {formData.serviceInventoryId && (
            <div>
              <div className="text-sm font-semibold text-muted-foreground">Service Inventory ID</div>
              <div className="text-base">{formData.serviceInventoryId}</div>
            </div>
          )}
          <div>
            <div className="text-sm font-semibold text-muted-foreground">Organization</div>
            <div className="text-base">{organizationName}</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-muted-foreground">Developed By</div>
            <div className="text-base">{formatDevelopedBy(formData.developedBy)}</div>
          </div>
          {formData.vendorName && (
            <div>
              <div className="text-sm font-semibold text-muted-foreground">Vendor Name</div>
              <div className="text-base">{formData.vendorName}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Purpose & Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-primary" />
            Purpose & Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm font-semibold text-muted-foreground">Description</div>
            <div className="text-base">{formData.description || 'Not provided'}</div>
          </div>
          {formData.capabilities && (
            <div>
              <div className="text-sm font-semibold text-muted-foreground mb-2">Key Capabilities</div>
              <div className="flex flex-wrap gap-2">
                {formData.capabilities.split(',').map((cap: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {cap.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <div>
            <div className="text-sm font-semibold text-muted-foreground">Primary Users</div>
            <div className="text-base">{formatPrimaryUsers(formData.primaryUsers)}</div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm font-semibold text-muted-foreground mb-1">Automated Decision System (ADS)</div>
            {formatBoolean(formData.isAutomatedDecisionSystem)}
          </div>
          {formData.isAutomatedDecisionSystem && formData.openGovAiaId && (
            <div>
              <div className="text-sm font-semibold text-muted-foreground">AIA ID</div>
              <div className="text-base">{formData.openGovAiaId}</div>
            </div>
          )}
          <Separator />
          <div>
            <div className="text-sm font-semibold text-muted-foreground mb-1">Involves Personal Information</div>
            {formatBoolean(formData.involvesPersonalInfo)}
          </div>
          {formData.involvesPersonalInfo && formData.personalInformationBanks && (
            <div>
              <div className="text-sm font-semibold text-muted-foreground">PIB References</div>
              <div className="text-base">{formData.personalInformationBanks}</div>
            </div>
          )}
          <Separator />
          <div>
            <div className="text-sm font-semibold text-muted-foreground mb-1">User Notification</div>
            {formatBoolean(formData.hasUserNotification)}
          </div>
        </CardContent>
      </Card>

      {/* Operations & Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-primary" />
            Operations & Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm font-semibold text-muted-foreground mb-1">Current Status</div>
            <Badge className={getStatusColor(formData.status)}>
              {formatStatus(formData.status)}
            </Badge>
          </div>
          {formData.statusYear && (
            <div>
              <div className="text-sm font-semibold text-muted-foreground">Status Year</div>
              <div className="text-base">{formData.statusYear}</div>
            </div>
          )}
          {formData.dataSources && (
            <div>
              <div className="text-sm font-semibold text-muted-foreground">Data Sources</div>
              <div className="text-base">{formData.dataSources}</div>
            </div>
          )}
          {formData.atipRequestRefs && (
            <div>
              <div className="text-sm font-semibold text-muted-foreground">ATIP Request References</div>
              <div className="text-base">{formData.atipRequestRefs}</div>
            </div>
          )}
          {formData.outcomes && (
            <div>
              <div className="text-sm font-semibold text-muted-foreground">Outcomes & Impact</div>
              <div className="text-base">{formData.outcomes}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Final Note */}
      <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <p className="text-sm text-green-800 dark:text-green-200">
          By submitting this form, you confirm that the information provided is accurate and complete to the best of your knowledge.
          The submission will be reviewed by administrators before being published to the public registry.
        </p>
      </div>
    </div>
  );
}
