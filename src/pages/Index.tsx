import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import SearchAndFilter from '@/components/projects/SearchAndFilter';
import AdvancedFilters from '@/components/projects/AdvancedFilters';
import ProjectGrid from '@/components/projects/ProjectGrid';
import { ProjectPagination } from '@/components/projects/ProjectPagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { TrendingUp, Star, Clock, BarChart3, Building2 } from 'lucide-react';
import { useProjects, useGlobalStats } from '@/hooks/useProjects';
import { useOrganizations } from '@/hooks/useOrganizations';
import { ProjectFilters, ProjectStatus } from '@/types';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([]);
  const [filterADS, setFilterADS] = useState(false);
  const [filterPersonalInfo, setFilterPersonalInfo] = useState(false);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);

  // Build filters for API
  const filters: ProjectFilters = useMemo(() => {
    const f: ProjectFilters = {
      query: searchQuery || undefined,
      organizationId: selectedDepartments.length === 1 ? selectedDepartments[0] : undefined,
      status: selectedStatuses.length === 1 ? selectedStatuses[0] : undefined,
      page,
      limit: 20,
      sortBy: sortBy as any,
      sortOrder,
    };

    // Add featured filter for featured tab
    if (activeTab === 'featured') {
      f.featured = true;
    }

    return f;
  }, [searchQuery, selectedDepartments, selectedStatuses, page, activeTab, sortBy, sortOrder]);

  // Fetch projects from API
  const { data: projectsResponse, isLoading, error } = useProjects(filters);
  const { data: organizations } = useOrganizations();
  const { data: globalStats } = useGlobalStats();

  const projects = projectsResponse?.data || [];
  const pagination = projectsResponse?.pagination;

  // Get unique departments/organizations for filters
  const availableDepartments = useMemo(() => {
    if (!organizations) return [];
    return organizations.map(org => ({
      id: org.id,
      name: org.nameEN,
    }));
  }, [organizations]);

  // Filter projects client-side for additional filters not in API
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Filter by ADS
    if (filterADS) {
      filtered = filtered.filter(p => p.isAutomatedDecisionSystem);
    }

    // Filter by Personal Info
    if (filterPersonalInfo) {
      filtered = filtered.filter(p => p.involvesPersonalInfo);
    }

    // Filter by multiple statuses (client-side)
    if (selectedStatuses.length > 1) {
      filtered = filtered.filter(p => selectedStatuses.includes(p.status));
    }

    // Filter by multiple departments (client-side)
    if (selectedDepartments.length > 1) {
      filtered = filtered.filter(p => selectedDepartments.includes(p.organizationId));
    }

    return filtered;
  }, [projects, filterADS, filterPersonalInfo, selectedStatuses, selectedDepartments]);

  // For MVP, we'll use a simplified tag system based on capabilities
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      if (project.capabilities) {
        // Extract keywords from capabilities
        const keywords = project.capabilities.split(',').map(k => k.trim());
        keywords.forEach(k => tags.add(k));
      }
    });
    return Array.from(tags).sort();
  }, [projects]);

  // Filter projects for different tabs
  const featuredProjects = useMemo(() => {
    return filteredProjects.filter(p => p.featured);
  }, [filteredProjects]);

  const trendingProjects = useMemo(() => {
    // Sort by status priority
    const statusPriority: Record<ProjectStatus, number> = {
      [ProjectStatus.InProduction]: 4,
      [ProjectStatus.InDevelopment]: 2,
      [ProjectStatus.Retired]: 1,
    };
    return [...filteredProjects]
      .sort((a, b) => (statusPriority[b.status] || 0) - (statusPriority[a.status] || 0))
      .slice(0, 6);
  }, [filteredProjects]);

  const recentProjects = useMemo(() => {
    return [...filteredProjects].slice(0, 6);
  }, [filteredProjects]);

  const getTabProjects = () => {
    switch (activeTab) {
      case 'featured':
        return featuredProjects;
      case 'trending':
        return trendingProjects;
      case 'recent':
        return recentProjects;
      default:
        return filteredProjects;
    }
  };

  // Handle department filter toggle
  const handleDepartmentToggle = (departmentId: string) => {
    setSelectedDepartments(prev =>
      prev.includes(departmentId)
        ? prev.filter(d => d !== departmentId)
        : [...prev, departmentId]
    );
    setPage(1); // Reset to first page when filter changes
  };

  // Handle tag filter toggle (for future use)
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setPage(1);
  };

  // Handle status filter toggle
  const handleStatusToggle = (status: ProjectStatus) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
    setPage(1);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPage(1);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedDepartments([]);
    setSelectedStatuses([]);
    setFilterADS(false);
    setFilterPersonalInfo(false);
    setPage(1);
  };

  // Get stats from global statistics API
  const totalProjects = globalStats?.total || 0;
  const totalDepartments = globalStats?.organizations || 0;
  const totalFeatured = globalStats?.featured || 0;
  const totalInProduction = globalStats?.inProduction || 0;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-4">
        {/* Dashboard Header */}
        <div className="space-y-4">
          {/* Title Section */}
          <div>
            <h1 className="text-2xl font-bold text-gcds-text-primary">AI Projects Dashboard</h1>
            <p className="text-gcds-text-secondary mt-1.5">
              Discover and explore {totalProjects} AI initiatives across Government of Canada departments
            </p>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
            {/* Total Projects Card */}
            <div className="bg-gcds-background-primary rounded-lg p-4 border border-gcds-border-secondary hover:border-gcds-border-accent transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gcds-color-blue-100 rounded-xl shrink-0">
                  <BarChart3 className="h-5 w-5 text-gcds-color-blue-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-2xl font-bold text-gcds-text-primary">{totalProjects}</div>
                  <div className="text-xs font-medium text-gcds-text-secondary mt-0.5">Total Projects</div>
                </div>
              </div>
            </div>

            {/* Departments Card */}
            <div className="bg-gcds-background-primary rounded-lg p-4 border border-gcds-border-secondary hover:border-gcds-border-accent transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gcds-color-blue-100 rounded-xl shrink-0">
                  <Building2 className="h-5 w-5 text-gcds-color-blue-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-2xl font-bold text-gcds-text-primary">{totalDepartments}</div>
                  <div className="text-xs font-medium text-gcds-text-secondary mt-0.5">Departments</div>
                </div>
              </div>
            </div>

            {/* Featured Projects Card */}
            <div className="bg-gcds-background-primary rounded-lg p-4 border border-gcds-border-secondary hover:border-gcds-border-accent transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gcds-color-blue-100 rounded-xl shrink-0">
                  <Star className="h-5 w-5 text-gcds-color-blue-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-2xl font-bold text-gcds-text-primary">{totalFeatured}</div>
                  <div className="text-xs font-medium text-gcds-text-secondary mt-0.5">Featured</div>
                </div>
              </div>
            </div>

            {/* In Production Card */}
            <div className="bg-gcds-background-primary rounded-lg p-4 border border-gcds-border-secondary hover:border-gcds-border-accent transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gcds-color-blue-100 rounded-xl shrink-0">
                  <TrendingUp className="h-5 w-5 text-gcds-color-blue-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-2xl font-bold text-gcds-text-primary">{totalInProduction}</div>
                  <div className="text-xs font-medium text-gcds-text-secondary mt-0.5">In Production</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Search, Filters & Tabs */}
        <div className="bg-gcds-background-primary rounded-lg border border-gcds-border-secondary p-3 space-y-3">
          {/* Search & Sort Row */}
          <div className="flex flex-col lg:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search AI systems by name, description, or capabilities..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-9 pr-4 h-10 text-sm bg-card"
              />
            </div>
          </div>

          {/* Tabs & Filters Row */}
          <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
              <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:inline-flex h-9">
                <TabsTrigger value="all" className="flex items-center gap-1.5 text-xs px-3">
                  <BarChart3 className="h-3.5 w-3.5" />
                  All ({pagination?.total || 0})
                </TabsTrigger>
                <TabsTrigger value="featured" className="flex items-center gap-1.5 text-xs px-3">
                  <Star className="h-3.5 w-3.5" />
                  Featured ({featuredProjects.length})
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center gap-1.5 text-xs px-3">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Trending ({trendingProjects.length})
                </TabsTrigger>
                <TabsTrigger value="recent" className="flex items-center gap-1.5 text-xs px-3">
                  <Clock className="h-3.5 w-3.5" />
                  Recent ({recentProjects.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="w-full lg:w-auto">
              <AdvancedFilters
                selectedStatuses={selectedStatuses}
                onStatusToggle={handleStatusToggle}
                filterADS={filterADS}
                onADSToggle={() => setFilterADS(!filterADS)}
                filterPersonalInfo={filterPersonalInfo}
                onPersonalInfoToggle={() => setFilterPersonalInfo(!filterPersonalInfo)}
                selectedDepartments={selectedDepartments}
                onDepartmentToggle={handleDepartmentToggle}
                availableDepartments={availableDepartments}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                onClearAll={handleClearAllFilters}
              />
            </div>
          </div>
        </div>

        {/* Projects Display */}
        <div>
          <ProjectGrid
            projects={getTabProjects()}
            isLoading={isLoading}
            searchQuery={searchQuery}
          />
          {error && (
            <div className="text-center py-8 text-gcds-text-danger">
              Error loading projects: {(error as Error).message}
            </div>
          )}

          {/* Pagination and Results Info - only show for "all" tab */}
          {activeTab === 'all' && pagination && !isLoading && (
            <div className="mt-8 space-y-4">
              <ProjectPagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
              <div className="text-center text-sm text-muted-foreground">
                Showing {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} projects
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
