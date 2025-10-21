import ProjectCard from './ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

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

interface ProjectGridProps {
  projects: Project[];
  isLoading?: boolean;
  searchQuery?: string;
}

const ProjectGrid = ({ projects, isLoading = false, searchQuery = '' }: ProjectGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No projects found
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {searchQuery 
            ? `No projects match your search for "${searchQuery}". Try adjusting your filters or search terms.`
            : "No projects match your current filters. Try adjusting your selection."
          }
        </p>
      </div>
    );
  }

  // Separate featured and regular projects
  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);

  return (
    <div className="space-y-8">
      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-foreground">Featured Projects</h2>
            <div className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full w-16" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* All Projects */}
      {regularProjects.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {featuredProjects.length > 0 ? 'All Projects' : 'Projects'}
            </h2>
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {regularProjects.length} result{regularProjects.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;