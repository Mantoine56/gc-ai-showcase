import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Shield,
  User,
  Users,
  Code,
  Database,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  TrendingUp,
} from 'lucide-react';
import { useProject } from '@/hooks/useProjects';
import { useLocalizedField } from '@/hooks/useLocalizedField';
import { ProjectStatus, PrimaryUsers, DevelopedBy } from '@/types';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('pages');
  const getField = useLocalizedField();
  const { data: project, isLoading, error } = useProject(id!);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-12 bg-muted rounded w-3/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-64 bg-muted rounded"></div>
                <div className="h-64 bg-muted rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-64 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !project) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">{t('projectDetail.notFound')}</h1>
            <p className="text-muted-foreground mb-8">
              {t('projectDetail.notFoundMessage')}
            </p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('projectDetail.backToDashboard')}
              </Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.InProduction:
        return 'bg-gcds-color-green-100 text-gcds-color-green-900';
      case ProjectStatus.InDevelopment:
        return 'bg-gcds-color-yellow-100 text-gcds-color-yellow-900';
      case ProjectStatus.Retired:
        return 'bg-gcds-color-grayscale-100 text-gcds-color-grayscale-900';
      default:
        return 'bg-gcds-color-grayscale-100 text-gcds-color-grayscale-900';
    }
  };

  const getStatusLabel = (status: ProjectStatus) => {
    return t(`enums:status.${status}`);
  };

  const getPrimaryUsersLabel = (users: PrimaryUsers) => {
    return t(`enums:primaryUsers.${users}`);
  };

  const getDevelopedByLabel = (dev: DevelopedBy) => {
    return t(`enums:developedBy.${dev}`);
  };

  // Get localized fields
  const projectName = getField(project, 'name');
  const projectDescription = getField(project, 'description');
  const projectCapabilities = getField(project, 'capabilities');
  const projectOutcomes = getField(project, 'outcomes');
  const projectDataSources = getField(project, 'dataSources');
  const projectPIBs = getField(project, 'personalInformationBanks');
  const projectATIPRefs = getField(project, 'atipRequestRefs');
  const organizationName = getField(project.organization, 'name');

  const capabilities = projectCapabilities
    ? projectCapabilities.split(',').map(c => c.trim())
    : [];

  const dataSources = projectDataSources
    ? projectDataSources.split(',').map(d => d.trim())
    : [];

  const personalInformationBanks = projectPIBs
    ? projectPIBs.split(',').map(p => p.trim())
    : [];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Breadcrumb */}
        <div>
          <Button variant="ghost" asChild className="pl-0">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('projectDetail.backToDashboard')}
            </Link>
          </Button>
        </div>

        {/* Project Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={getStatusColor(project.status)}>
              {getStatusLabel(project.status)}
            </Badge>
            {project.featured && (
              <Badge variant="outline" className="text-gcds-color-yellow-700 border-gcds-color-yellow-700">
                <Star className="h-3 w-3 mr-1" />
                {t('projectDetail.badges.featured')}
              </Badge>
            )}
            {project.isAutomatedDecisionSystem && (
              <Badge variant="outline" className="text-gcds-color-blue-700 border-gcds-color-blue-700">
                <Shield className="h-3 w-3 mr-1" />
                {t('projectDetail.badges.automatedDecisionSystem')}
              </Badge>
            )}
            {project.involvesPersonalInfo && (
              <Badge variant="outline" className="text-gcds-color-purple-700 border-gcds-color-purple-700">
                <User className="h-3 w-3 mr-1" />
                {t('projectDetail.badges.involvesPersonalInformation')}
              </Badge>
            )}
          </div>

          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gcds-text-primary">
              {projectName}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>{organizationName || 'Unknown Organization'}</span>
              </div>
              {project.statusYear && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{t('projectDetail.metadata.since', { year: project.statusYear })}</span>
                </div>
              )}
              {project.aiRegisterId && (
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <span className="font-mono text-xs">{project.aiRegisterId}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>{t('projectDetail.sections.overview')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {projectDescription}
                </p>
              </CardContent>
            </Card>

            {/* Capabilities */}
            {capabilities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {t('projectDetail.sections.capabilities')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {capabilities.map((capability, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm px-3 py-1"
                      >
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Outcomes */}
            {projectOutcomes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-gcds-color-green-700" />
                    {t('projectDetail.sections.outcomes')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {projectOutcomes}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Data & Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  {t('projectDetail.sections.dataPrivacy')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">{t('projectDetail.subsections.dataSources')}</h4>
                  {dataSources.length > 0 ? (
                    <div className="space-y-1">
                      {dataSources.map((source, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          • {source}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Not specified</p>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-sm mb-2">{t('projectDetail.subsections.personalInformation')}</h4>
                  <div className="flex items-center gap-2 text-sm">
                    {project.involvesPersonalInfo ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-gcds-color-green-700" />
                        <span>{t('projectDetail.dataStatus.involvesPI')}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-gcds-color-grayscale-400" />
                        <span>{t('projectDetail.dataStatus.noPI')}</span>
                      </>
                    )}
                  </div>
                  {personalInformationBanks.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">
                        {t('projectDetail.subsections.personalInformation')}:
                      </p>
                      {personalInformationBanks.map((bank, index) => (
                        <div key={index} className="text-xs text-muted-foreground">
                          • {bank}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-sm mb-2">{t('projectDetail.subsections.userNotification')}</h4>
                  <div className="flex items-center gap-2 text-sm">
                    {project.hasUserNotification ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-gcds-color-green-700" />
                        <span>{t('projectDetail.dataStatus.userNotified')}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-gcds-color-grayscale-400" />
                        <span>{t('projectDetail.dataStatus.noNotification')}</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance & Governance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {t('projectDetail.sections.compliance')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">
                    {t('projectDetail.subsections.automatedDecisionSystem')}
                  </h4>
                  <div className="flex items-center gap-2 text-sm">
                    {project.isAutomatedDecisionSystem ? (
                      <>
                        <AlertTriangle className="h-4 w-4 text-gcds-color-yellow-700" />
                        <span>{t('projectDetail.dataStatus.isADS')}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 text-gcds-color-grayscale-400" />
                        <span>{t('projectDetail.dataStatus.notADS')}</span>
                      </>
                    )}
                  </div>
                </div>

                {project.openGovAiaId && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-sm mb-2">
                        {t('projectDetail.subsections.openGovAiaId')}
                      </h4>
                      <p className="text-sm text-muted-foreground font-mono">
                        {project.openGovAiaId}
                      </p>
                    </div>
                  </>
                )}

                {projectATIPRefs && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-sm mb-2">{t('projectDetail.subsections.atipReferences')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {projectATIPRefs}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>{t('projectDetail.sections.quickInfo')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {t('projectDetail.metadata.organization')}
                  </h4>
                  <p className="text-sm font-medium">
                    {organizationName || 'Unknown'}
                  </p>
                  {project.organization?.acronym && (
                    <p className="text-xs text-muted-foreground">
                      {project.organization.acronym}
                    </p>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {t('projectDetail.metadata.primaryUsers')}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{getPrimaryUsersLabel(project.primaryUsers)}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {t('projectDetail.metadata.developedBy')}
                  </h4>
                  <p className="text-sm">{getDevelopedByLabel(project.developedBy)}</p>
                  {project.vendorName && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('projectDetail.metadata.vendor', { name: project.vendorName })}
                    </p>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    {t('projectDetail.metadata.status')}
                  </h4>
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusLabel(project.status)}
                  </Badge>
                  {project.statusYear && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('projectDetail.metadata.since', { year: project.statusYear })}
                    </p>
                  )}
                </div>

                {project.serviceInventoryId && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                        {t('projectDetail.metadata.serviceInventoryId')}
                      </h4>
                      <p className="text-xs font-mono text-muted-foreground">
                        {project.serviceInventoryId}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('projectDetail.sections.metadata')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-muted-foreground">
                <div>
                  <span className="font-semibold">{t('projectDetail.metadata.created')}:</span>{' '}
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-semibold">{t('projectDetail.metadata.lastUpdated')}:</span>{' '}
                  {new Date(project.updatedAt).toLocaleDateString()}
                </div>
                {project.moderationState && (
                  <div>
                    <span className="font-semibold">Status:</span>{' '}
                    <Badge variant="outline" className="text-xs ml-1">
                      {project.moderationState}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetail;
