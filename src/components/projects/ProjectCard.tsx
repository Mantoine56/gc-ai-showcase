import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Shield, User } from 'lucide-react';
import { Project, ProjectStatus } from '@/types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
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
    switch (status) {
      case ProjectStatus.InProduction:
        return 'Production';
      case ProjectStatus.InDevelopment:
        return 'Development';
      case ProjectStatus.Retired:
        return 'Retired';
      default:
        return status;
    }
  };

  // Extract capabilities as tags
  const capabilities = project.capabilities
    ? project.capabilities.split(',').map(c => c.trim()).slice(0, 3)
    : [];

  return (
    <Card className="group h-full flex flex-col transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 bg-gradient-card border-border/50">
      <CardHeader className="space-y-4">
        {/* Status and Featured Badge */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge variant="secondary" className={getStatusColor(project.status)}>
            {getStatusLabel(project.status)}
          </Badge>
          <div className="flex items-center gap-2">
            {project.featured && (
              <Badge variant="outline" className="text-primary border-primary">
                Featured
              </Badge>
            )}
            {project.isAutomatedDecisionSystem && (
              <Badge variant="outline" className="text-gcds-color-blue-700 border-gcds-color-blue-700" title="Automated Decision System">
                <Shield className="h-3 w-3 mr-1" />
                ADS
              </Badge>
            )}
            {project.involvesPersonalInfo && (
              <Badge variant="outline" className="text-gcds-color-purple-700 border-gcds-color-purple-700" title="Involves Personal Information">
                <User className="h-3 w-3 mr-1" />
                PI
              </Badge>
            )}
          </div>
        </div>

        {/* Title and Department */}
        <div>
          <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            {project.organization?.nameEN || 'Unknown Organization'}
          </p>
          {project.statusYear && (
            <p className="text-xs text-muted-foreground mt-1">
              Since {project.statusYear}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Capabilities Tags */}
        {capabilities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {capabilities.map((cap) => (
              <Badge
                key={cap}
                variant="outline"
                className="text-xs px-2 py-1 bg-accent/50"
              >
                {cap}
              </Badge>
            ))}
            {project.capabilities && project.capabilities.split(',').length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1 bg-accent/50">
                +{project.capabilities.split(',').length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-auto pt-2 border-t border-border/50">
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>
              <span className="font-semibold">Developed by:</span>
              <div>{project.developedBy === 'Government' ? 'In-house' : project.developedBy}</div>
            </div>
            <div>
              <span className="font-semibold">Primary Users:</span>
              <div>
                {project.primaryUsers === 'MembersOfPublic'
                  ? 'Public'
                  : project.primaryUsers === 'Employees'
                  ? 'Staff'
                  : project.primaryUsers}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-2 pt-4 mt-auto">
        <Button asChild size="sm" className="flex-1">
          <Link to={`/project/${project.id}`}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
