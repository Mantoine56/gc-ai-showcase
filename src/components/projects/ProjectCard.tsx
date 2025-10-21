import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Eye } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  department: string;
  description: string;
  tags: string[];
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  image?: string;
  featured?: boolean;
  status: 'Research' | 'Pilot' | 'Beta' | 'Production';
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Production':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Beta':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'Pilot':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Research':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <Card className="group h-full flex flex-col transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 bg-gradient-card border-border/50">
      <CardHeader className="space-y-4">
        {/* Status and Featured Badge */}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={getStatusColor(project.status)}>
            {project.status}
          </Badge>
          {project.featured && (
            <Badge variant="outline" className="text-primary border-primary">
              Featured
            </Badge>
          )}
        </div>

        {/* Title and Department */}
        <div>
          <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            {project.department}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-xs px-2 py-1 bg-accent/50"
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-1 bg-accent/50">
              +{project.tags.length - 3} more
            </Badge>
          )}
        </div>

        {/* Tech Stack - This will push to the bottom of the content area */}
        <div className="mt-auto">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 4).map((tech) => (
              <span 
                key={tech}
                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md"
              >
                {tech}
              </span>
            ))}
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
        
        {project.demoUrl && (
          <Button variant="outline" size="sm" asChild>
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
        
        {project.repoUrl && (
          <Button variant="outline" size="sm" asChild>
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;