import { UseFormReturn } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useOrganizations } from '@/hooks/useOrganizations';
import { DevelopedBy, PrimaryUsers, ProjectStatus } from '@/types';
import { Activity, Building2, CheckCircle2, Globe2, Shield, Target, XCircle } from 'lucide-react';
import {
  getDraftReadiness,
  ProjectFormData,
} from '../projectForm';
import { getPublishReadiness } from '@/lib/projectReadiness';

interface ReviewStepProps {
  form: UseFormReturn<ProjectFormData>;
}

function formatBoolean(value: boolean) {
  return value ? (
    <div className="flex items-center gap-1 text-gcds-color-green-700">
      <CheckCircle2 className="h-4 w-4" />
      <span>Yes</span>
    </div>
  ) : (
    <div className="flex items-center gap-1 text-gcds-color-grayscale-500">
      <XCircle className="h-4 w-4" />
      <span>No</span>
    </div>
  );
}

function formatDevelopedBy(value: DevelopedBy) {
  switch (value) {
    case DevelopedBy.Government:
      return 'Government (in-house)';
    case DevelopedBy.Vendor:
      return 'Vendor';
    case DevelopedBy.Other:
      return 'Other / collaboration';
    default:
      return value;
  }
}

function formatPrimaryUsers(value: PrimaryUsers) {
  switch (value) {
    case PrimaryUsers.Employees:
      return 'Employees';
    case PrimaryUsers.MembersOfPublic:
      return 'Members of the public';
    case PrimaryUsers.Both:
      return 'Both';
    case PrimaryUsers.Neither:
      return 'Neither / indirect users';
    default:
      return value;
  }
}

function formatStatus(value: ProjectStatus) {
  switch (value) {
    case ProjectStatus.InDevelopment:
      return 'In development';
    case ProjectStatus.InProduction:
      return 'In production';
    case ProjectStatus.Retired:
      return 'Retired';
    default:
      return value;
  }
}

function getStatusColor(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.InProduction:
      return 'bg-gcds-color-green-100 text-gcds-color-green-900';
    case ProjectStatus.InDevelopment:
      return 'bg-gcds-color-yellow-100 text-gcds-color-yellow-900';
    case ProjectStatus.Retired:
      return 'bg-gcds-color-grayscale-100 text-gcds-color-grayscale-900';
  }
}

function BilingualReviewRow({
  label,
  english,
  french,
}: {
  label: string;
  english?: string;
  french?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-muted-foreground">{label}</div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-muted/20 p-3">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            English
          </div>
          <div className="text-sm whitespace-pre-wrap">{english || 'Not provided'}</div>
        </div>
        <div className="rounded-lg border border-border bg-muted/20 p-3">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            French
          </div>
          <div className="text-sm whitespace-pre-wrap">{french || 'Not provided'}</div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewStep({ form }: ReviewStepProps) {
  const formData = form.getValues();
  const { data: organizations } = useOrganizations();
  const organizationName =
    organizations?.find((org) => org.id === formData.organizationId)?.nameEN || 'Not selected';
  const draftReadiness = getDraftReadiness(formData);
  const publishReadiness = getPublishReadiness(formData);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gcds-color-blue-300 bg-gcds-color-blue-100 p-4">
        <h3 className="mb-2 text-lg font-semibold text-gcds-color-blue-900">
          Review your registry entry
        </h3>
        <p className="text-sm text-gcds-color-blue-900">
          Save a draft if the English minimum is complete. Reviewers can only publish once the bilingual
          publish checks below are satisfied.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-gcds-border-secondary">
          <CardHeader>
            <CardTitle className="text-base">Draft minimum</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Required fields complete</span>
              <Badge variant={draftReadiness.isReady ? 'default' : 'outline'}>
                {draftReadiness.completeCount}/{draftReadiness.totalCount}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {draftReadiness.items.map((item) => (
                <Badge key={item.key} variant={item.complete ? 'default' : 'outline'}>
                  {item.label}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gcds-border-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe2 className="h-4 w-4" />
              Publish readiness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Bilingual sections complete</span>
              <Badge variant={publishReadiness.isReady ? 'default' : 'outline'}>
                {publishReadiness.completeCount}/{publishReadiness.totalCount}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {publishReadiness.items.map((item) => (
                <Badge key={item.key} variant={item.complete ? 'default' : 'outline'}>
                  {item.label}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5 text-primary" />
            Identity and ownership
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <BilingualReviewRow
            label="Project name"
            english={formData.nameEN}
            french={formData.nameFR}
          />
          {formData.serviceInventoryId && (
            <div>
              <div className="text-sm font-semibold text-muted-foreground">Service inventory ID</div>
              <div className="text-base">{formData.serviceInventoryId}</div>
            </div>
          )}
          <div>
            <div className="text-sm font-semibold text-muted-foreground">Organization</div>
            <div className="text-base">{organizationName}</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-muted-foreground">Developed by</div>
            <div className="text-base">{formatDevelopedBy(formData.developedBy)}</div>
          </div>
          {formData.vendorName && (
            <div>
              <div className="text-sm font-semibold text-muted-foreground">Vendor name</div>
              <div className="text-base">{formData.vendorName}</div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-primary" />
            Purpose and capabilities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <BilingualReviewRow
            label="Description"
            english={formData.descriptionEN}
            french={formData.descriptionFR}
          />
          <BilingualReviewRow
            label="Capabilities"
            english={formData.capabilitiesEN}
            french={formData.capabilitiesFR}
          />
          <div>
            <div className="text-sm font-semibold text-muted-foreground">Primary users</div>
            <div className="text-base">{formatPrimaryUsers(formData.primaryUsers)}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-1 text-sm font-semibold text-muted-foreground">
              Automated decision system
            </div>
            {formatBoolean(formData.isAutomatedDecisionSystem)}
          </div>
          {formData.openGovAiaId && (
            <div>
              <div className="text-sm font-semibold text-muted-foreground">AIA ID</div>
              <div className="text-base">{formData.openGovAiaId}</div>
            </div>
          )}
          <Separator />
          <div>
            <div className="mb-1 text-sm font-semibold text-muted-foreground">
              Involves personal information
            </div>
            {formatBoolean(formData.involvesPersonalInfo)}
          </div>
          {(formData.personalInformationBanksEN || formData.personalInformationBanksFR) && (
            <BilingualReviewRow
              label="PIB references"
              english={formData.personalInformationBanksEN}
              french={formData.personalInformationBanksFR}
            />
          )}
          <Separator />
          <div>
            <div className="mb-1 text-sm font-semibold text-muted-foreground">User notification</div>
            {formatBoolean(formData.hasUserNotification)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-primary" />
            Operations and status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-1 text-sm font-semibold text-muted-foreground">Current status</div>
            <Badge className={getStatusColor(formData.status)}>{formatStatus(formData.status)}</Badge>
          </div>
          {formData.statusYear && (
            <div>
              <div className="text-sm font-semibold text-muted-foreground">Status year</div>
              <div className="text-base">{formData.statusYear}</div>
            </div>
          )}
          <BilingualReviewRow
            label="Data sources"
            english={formData.dataSourcesEN}
            french={formData.dataSourcesFR}
          />
          <BilingualReviewRow
            label="ATIP references"
            english={formData.atipRequestRefsEN}
            french={formData.atipRequestRefsFR}
          />
          <BilingualReviewRow
            label="Outcomes and impact"
            english={formData.outcomesEN}
            french={formData.outcomesFR}
          />
        </CardContent>
      </Card>

      <div className="rounded-lg border border-gcds-color-green-300 bg-gcds-color-green-100 p-4">
        <p className="text-sm text-gcds-color-green-900">
          Save as draft to preserve work. Submit for review when the English minimum is complete and the
          bilingual publish checklist is on track.
        </p>
      </div>
    </div>
  );
}
