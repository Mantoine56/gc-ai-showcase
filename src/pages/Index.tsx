import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import SearchAndFilter from '@/components/projects/SearchAndFilter';
import ProjectGrid from '@/components/projects/ProjectGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Star, Clock, BarChart3, Building2 } from 'lucide-react';
import projectsData from '@/data/projects.json';

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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const projects: Project[] = projectsData as Project[];

  // Initialize fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(projects, {
      keys: ['title', 'description', 'department', 'tags', 'techStack'],
      threshold: 0.3,
      includeScore: true,
    });
  }, [projects]);

  // Get unique departments and tags
  const availableDepartments = useMemo(() => {
    return [...new Set(projects.map(p => p.department))].sort();
  }, [projects]);

  const availableTags = useMemo(() => {
    const allTags = projects.flatMap(p => [...p.tags, ...p.techStack]);
    return [...new Set(allTags)].sort();
  }, [projects]);

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply text search
    if (searchQuery.trim()) {
      const results = fuse.search(searchQuery);
      filtered = results.map(result => result.item);
    }

    // Apply department filter
    if (selectedDepartments.length > 0) {
      filtered = filtered.filter(project => 
        selectedDepartments.includes(project.department)
      );
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(project => 
        selectedTags.some(tag => 
          project.tags.includes(tag) || project.techStack.includes(tag)
        )
      );
    }

    return filtered;
  }, [projects, searchQuery, selectedDepartments, selectedTags, fuse]);

  // Handle department filter toggle
  const handleDepartmentToggle = (department: string) => {
    setSelectedDepartments(prev => 
      prev.includes(department) 
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  // Handle tag filter toggle
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Get featured and trending projects
  const featuredProjects = useMemo(() => {
    return filteredProjects.filter(project => project.featured);
  }, [filteredProjects]);

  const trendingProjects = useMemo(() => {
    // For demo purposes, sort by status priority
    const statusPriority = { 'Production': 4, 'Beta': 3, 'Pilot': 2, 'Research': 1 };
    return [...filteredProjects]
      .sort((a, b) => (statusPriority[b.status] || 0) - (statusPriority[a.status] || 0))
      .slice(0, 6);
  }, [filteredProjects]);

  const recentProjects = useMemo(() => {
    // For demo purposes, reverse the array to simulate recent additions
    return [...filteredProjects].reverse().slice(0, 6);
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

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Dashboard Header */}
        <div className="space-y-6">
          {/* Title Section */}
          <div>
            <h1 className="text-2xl font-bold text-gcds-text-primary">AI Projects Dashboard</h1>
            <p className="text-gcds-text-secondary mt-2">
              Discover and explore {projects.length} AI initiatives across Government of Canada departments
            </p>
          </div>
          
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 xl:gap-6">
            {/* Total Projects Card */}
            <div className="bg-gcds-background-primary rounded-lg p-4 lg:p-5 xl:p-6 border border-gcds-border-secondary hover:border-gcds-border-accent transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="p-2 lg:p-3 bg-gcds-color-blue-100 rounded-xl shrink-0">
                  <BarChart3 className="h-5 w-5 lg:h-6 lg:w-6 text-gcds-color-blue-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-gcds-text-primary">{projects.length}</div>
                  <div className="text-xs lg:text-sm font-medium text-gcds-text-secondary mt-1">Total Projects</div>
                </div>
              </div>
            </div>
            
            {/* Departments Card */}
            <div className="bg-gcds-background-primary rounded-lg p-4 lg:p-5 xl:p-6 border border-gcds-border-secondary hover:border-gcds-border-accent transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="p-2 lg:p-3 bg-gcds-color-blue-100 rounded-xl shrink-0">
                  <Building2 className="h-5 w-5 lg:h-6 lg:w-6 text-gcds-color-blue-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-gcds-text-primary">{availableDepartments.length}</div>
                  <div className="text-xs lg:text-sm font-medium text-gcds-text-secondary mt-1">Departments</div>
                </div>
              </div>
            </div>
            
            {/* Featured Projects Card */}
            <div className="bg-gcds-background-primary rounded-lg p-4 lg:p-5 xl:p-6 border border-gcds-border-secondary hover:border-gcds-border-accent transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="p-2 lg:p-3 bg-gcds-color-blue-100 rounded-xl shrink-0">
                  <Star className="h-5 w-5 lg:h-6 lg:w-6 text-gcds-color-blue-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-gcds-text-primary">{featuredProjects.length}</div>
                  <div className="text-xs lg:text-sm font-medium text-gcds-text-secondary mt-1">Featured</div>
                </div>
              </div>
            </div>
            
            {/* In Production Card */}
            <div className="bg-gcds-background-primary rounded-lg p-4 lg:p-5 xl:p-6 border border-gcds-border-secondary hover:border-gcds-border-accent transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="p-2 lg:p-3 bg-gcds-color-blue-100 rounded-xl shrink-0">
                  <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6 text-gcds-color-blue-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-gcds-text-primary">{projects.filter(p => p.status === 'Production').length}</div>
                  <div className="text-xs lg:text-sm font-medium text-gcds-text-secondary mt-1">In Production</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-gcds-background-primary rounded-lg border border-gcds-border-secondary p-4">
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedDepartments={selectedDepartments}
            onDepartmentToggle={handleDepartmentToggle}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            availableDepartments={availableDepartments}
            availableTags={availableTags}
          />
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              All ({filteredProjects.length})
            </TabsTrigger>
            <TabsTrigger value="featured" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Featured ({featuredProjects.length})
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending ({trendingProjects.length})
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent ({recentProjects.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <ProjectGrid 
              projects={filteredProjects}
              isLoading={isLoading}
              searchQuery={searchQuery}
            />
          </TabsContent>
          
          <TabsContent value="featured" className="mt-6">
            <ProjectGrid 
              projects={featuredProjects}
              isLoading={isLoading}
              searchQuery={searchQuery}
            />
          </TabsContent>
          
          <TabsContent value="trending" className="mt-6">
            <ProjectGrid 
              projects={trendingProjects}
              isLoading={isLoading}
              searchQuery={searchQuery}
            />
          </TabsContent>
          
          <TabsContent value="recent" className="mt-6">
            <ProjectGrid 
              projects={recentProjects}
              isLoading={isLoading}
              searchQuery={searchQuery}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Index;
