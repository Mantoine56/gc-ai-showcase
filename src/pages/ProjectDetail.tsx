import { useParams, Link } from 'react-router-dom';
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
import { ProjectStatus, PrimaryUsers, DevelopedBy } from '@/types';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
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
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
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
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case ProjectStatus.InDevelopment:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case ProjectStatus.Retired:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.InProduction:
        return 'In Production';
      case ProjectStatus.InDevelopment:
        return 'In Development';
      case ProjectStatus.Retired:
        return 'Retired';
      default:
        return status;
    }
  };

  const getPrimaryUsersLabel = (users: PrimaryUsers) => {
    switch (users) {
      case PrimaryUsers.Employees:
        return 'Government Employees';
      case PrimaryUsers.MembersOfPublic:
        return 'Members of the Public';
      case PrimaryUsers.Both:
        return 'Both Employees and Public';
      case PrimaryUsers.Neither:
        return 'Neither';
      default:
        return users;
    }
  };

  const getDevelopedByLabel = (dev: DevelopedBy) => {
    switch (dev) {
      case DevelopedBy.Government:
        return 'Government (In-house)';
      case DevelopedBy.Vendor:
        return 'Vendor';
      case DevelopedBy.Other:
        return 'Other';
      default:
        return dev;
    }
  };

  const capabilities = project.capabilities
    ? project.capabilities.split(',').map(c => c.trim())
    : [];

  const dataSources = project.dataSources
    ? project.dataSources.split(',').map(d => d.trim())
    : [];

  const personalInformationBanks = project.personalInformationBanks
    ? project.personalInformationBanks.split(',').map(p => p.trim())
    : [];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Breadcrumb */}
        <div>
          <Button variant="ghost" asChild className="pl-0">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
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
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {project.isAutomatedDecisionSystem && (
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                <Shield className="h-3 w-3 mr-1" />
                Automated Decision System
              </Badge>
            )}
            {project.involvesPersonalInfo && (
              <Badge variant="outline" className="text-purple-600 border-purple-600">
                <User className="h-3 w-3 mr-1" />
                Involves Personal Information
              </Badge>
            )}
          </div>

          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gcds-text-primary">
              {project.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>{project.organization?.nameEN || 'Unknown Organization'}</span>
              </div>
              {project.statusYear && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Since {project.statusYear}</span>
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
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>

            {/* Capabilities */}
            {capabilities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Capabilities
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
            {project.outcomes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Outcomes & Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.outcomes}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Data & Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Data Sources</h4>
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
                  <h4 className="font-semibold text-sm mb-2">Personal Information</h4>
                  <div className="flex items-center gap-2 text-sm">
                    {project.involvesPersonalInfo ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>This system involves personal information</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-gray-400" />
                        <span>This system does not involve personal information</span>
                      </>
                    )}
                  </div>
                  {personalInformationBanks.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">
                        Personal Information Banks:
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
                  <h4 className="font-semibold text-sm mb-2">User Notification</h4>
                  <div className="flex items-center gap-2 text-sm">
                    {project.hasUserNotification ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Users are notified about AI use</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-gray-400" />
                        <span>No user notification implemented</span>
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
                  Compliance & Governance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">
                    Automated Decision System (ADS)
                  </h4>
                  <div className="flex items-center gap-2 text-sm">
                    {project.isAutomatedDecisionSystem ? (
                      <>
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span>This is an Automated Decision System</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                        <span>Not an Automated Decision System</span>
                      </>
                    )}
                  </div>
                </div>

                {project.openGovAiaId && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-sm mb-2">
                        Open Government AIA ID
                      </h4>
                      <p className="text-sm text-muted-foreground font-mono">
                        {project.openGovAiaId}
                      </p>
                    </div>
                  </>
                )}

                {project.atipRequestRefs && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-sm mb-2">ATIP Request References</h4>
                      <p className="text-sm text-muted-foreground">
                        {project.atipRequestRefs}
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
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    Organization
                  </h4>
                  <p className="text-sm font-medium">
                    {project.organization?.nameEN || 'Unknown'}
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
                    Primary Users
                  </h4>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{getPrimaryUsersLabel(project.primaryUsers)}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    Developed By
                  </h4>
                  <p className="text-sm">{getDevelopedByLabel(project.developedBy)}</p>
                  {project.vendorName && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Vendor: {project.vendorName}
                    </p>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    Status
                  </h4>
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusLabel(project.status)}
                  </Badge>
                  {project.statusYear && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Since {project.statusYear}
                    </p>
                  )}
                </div>

                {project.serviceInventoryId && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                        Service Inventory ID
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
                  Metadata
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-muted-foreground">
                <div>
                  <span className="font-semibold">Created:</span>{' '}
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-semibold">Last Updated:</span>{' '}
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
