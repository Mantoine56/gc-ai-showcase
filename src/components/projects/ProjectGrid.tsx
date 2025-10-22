import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Project } from '@/types';

interface ProjectGridProps {
  projects: Project[];
  isLoading?: boolean;
  searchQuery?: string;
}

const ProjectGrid = ({ projects, isLoading = false, searchQuery = '' }: ProjectGridProps) => {
  const { t } = useTranslation('components');

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="status" aria-live="polite" aria-label={t('accessibility.loading', { ns: 'common' })}>
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
        <span className="sr-only">{t('accessibility.loading', { ns: 'common' })}</span>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12" role="status" aria-live="polite">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t('projectGrid.noProjects')}
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {searchQuery
            ? `No projects match your search for "${searchQuery}". Try adjusting your filters or search terms.`
            : t('projectGrid.noProjects')
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
            <h2 className="text-2xl font-bold text-foreground">{t('nav.featured', { ns: 'common' })} {t('nav.projects', { ns: 'common' })}</h2>
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
              {featuredProjects.length > 0 ? t('nav.allProjects', { ns: 'common' }) : t('nav.projects', { ns: 'common' })}
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
