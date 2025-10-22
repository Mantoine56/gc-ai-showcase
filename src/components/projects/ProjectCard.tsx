import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Shield, User, Building2, CheckCircle2, Code2, Users, Star, Sparkles } from 'lucide-react';
import { Project, ProjectStatus } from '@/types';
import { useLocalizedField } from '@/hooks/useLocalizedField';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation(['components', 'enums']);
  const getField = useLocalizedField();

  const getStatusInfo = (status: ProjectStatus) => {
    const statusLabel = t(`enums:status.${status}`);

    switch (status) {
      case ProjectStatus.InProduction:
        return {
          badge: 'bg-gcds-color-green-100 text-gcds-color-green-900 border-gcds-color-green-300',
          border: 'border-l-gcds-color-green-500',
          icon: CheckCircle2,
          label: statusLabel
        };
      case ProjectStatus.InDevelopment:
        return {
          badge: 'bg-gcds-color-yellow-100 text-gcds-color-yellow-900 border-gcds-color-yellow-300',
          border: 'border-l-gcds-color-yellow-500',
          icon: Code2,
          label: statusLabel
        };
      case ProjectStatus.Retired:
        return {
          badge: 'bg-gcds-color-grayscale-100 text-gcds-color-grayscale-900 border-gcds-color-grayscale-300',
          border: 'border-l-gcds-color-grayscale-400',
          icon: Users,
          label: statusLabel
        };
      default:
        return {
          badge: 'bg-gcds-color-grayscale-100 text-gcds-color-grayscale-900 border-gcds-color-grayscale-300',
          border: 'border-l-gcds-color-grayscale-400',
          icon: Users,
          label: status
        };
    }
  };

  const statusInfo = getStatusInfo(project.status);
  const StatusIcon = statusInfo.icon;

  // Get localized text fields
  const projectName = getField(project, 'name');
  const projectDescription = getField(project, 'description');
  const projectCapabilities = getField(project, 'capabilities');
  const organizationName = getField(project.organization, 'name');

  // Extract capabilities as tags
  const capabilities = projectCapabilities
    ? projectCapabilities.split(',').map(c => c.trim()).slice(0, 3)
    : [];

  return (
    <Card className={`group h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-card border-l-4 ${statusInfo.border} relative overflow-hidden`}>
      <CardHeader className="space-y-4 pb-3">
        {/* Status and Compliance Badges */}
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant="secondary" className={`${statusInfo.badge} border font-semibold shadow-sm`}>
              <StatusIcon className="h-3.5 w-3.5 mr-1.5" />
              {statusInfo.label}
            </Badge>
            {project.featured && (
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-blue-700 font-semibold shadow-sm">
                <Star className="h-3 w-3 mr-1 fill-current" />
                {t('components:projectCard.featured')}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {project.isAutomatedDecisionSystem && (
              <Badge variant="outline" className="text-gcds-color-blue-700 border-gcds-color-blue-700 bg-gcds-color-blue-50 shadow-sm" title="Automated Decision System">
                <Shield className="h-3 w-3 mr-1" />
                ADS
              </Badge>
            )}
            {project.involvesPersonalInfo && (
              <Badge variant="outline" className="text-gcds-color-purple-700 border-gcds-color-purple-700 bg-gcds-color-purple-50 shadow-sm" title="Involves Personal Information">
                <User className="h-3 w-3 mr-1" />
                PI
              </Badge>
            )}
          </div>
        </div>

        {/* Title and Department */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
            {projectName}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4 shrink-0 text-gcds-color-blue-600" />
            <span className="font-medium line-clamp-1">{organizationName || 'Unknown Organization'}</span>
          </div>
          {project.statusYear && (
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" />
              Since {project.statusYear}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 flex-1 flex flex-col pt-3 pb-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 min-h-[60px]">
          {projectDescription}
        </p>

        {/* Capabilities Tags */}
        {capabilities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {capabilities.map((cap) => (
              <Badge
                key={cap}
                variant="outline"
                className="text-xs px-2.5 py-0.5 bg-gcds-color-blue-50 text-gcds-color-blue-800 border-gcds-color-blue-200 font-medium"
              >
                {cap}
              </Badge>
            ))}
            {projectCapabilities && projectCapabilities.split(',').length > 3 && (
              <Badge variant="outline" className="text-xs px-2.5 py-0.5 bg-gcds-color-blue-50 text-gcds-color-blue-800 border-gcds-color-blue-200 font-medium">
                +{projectCapabilities.split(',').length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-auto pt-3 border-t border-border">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <Code2 className="h-3.5 w-3.5 text-gcds-color-blue-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gcds-text-primary">{t('components:projectCard.developedBy')}</div>
                <div className="text-muted-foreground">{t(`enums:developedBy.${project.developedBy}`)}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users className="h-3.5 w-3.5 text-gcds-color-purple-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gcds-text-primary">{t('components:projectCard.primaryUsers')}</div>
                <div className="text-muted-foreground">{t(`enums:primaryUsers.${project.primaryUsers}`)}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-2 pt-3 pb-4 bg-gcds-background-secondary/30">
        <Button asChild size="sm" className="flex-1 group-hover:shadow-md transition-all">
          <Link to={`/project/${project.id}`}>
            <Eye className="mr-2 h-4 w-4" />
            {t('components:projectCard.viewDetails')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
