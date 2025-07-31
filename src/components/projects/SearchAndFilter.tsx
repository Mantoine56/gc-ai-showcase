import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDepartments: string[];
  onDepartmentToggle: (department: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  availableDepartments: string[];
  availableTags: string[];
  focusSearch?: boolean;
}

const SearchAndFilter = ({
  searchQuery,
  onSearchChange,
  selectedDepartments,
  onDepartmentToggle,
  selectedTags,
  onTagToggle,
  availableDepartments,
  availableTags,
  focusSearch = false
}: SearchAndFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [focusSearch]);

  const clearAllFilters = () => {
    onSearchChange('');
    selectedDepartments.forEach(dept => onDepartmentToggle(dept));
    selectedTags.forEach(tag => onTagToggle(tag));
  };

  const activeFiltersCount = selectedDepartments.length + selectedTags.length;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={searchInputRef}
          type="text"
          placeholder="Search projects by title, description, or technology..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 h-12 text-base bg-card shadow-card"
        />
      </div>

      {/* Filter Toggle and Clear */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 min-w-[20px] px-1.5 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            Clear all
          </Button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="max-w-4xl mx-auto p-6 bg-card rounded-lg shadow-card border border-border">
          <div className="space-y-6">
            {/* Departments */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Departments
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableDepartments.map((department) => (
                  <Badge
                    key={department}
                    variant={selectedDepartments.includes(department) ? "default" : "outline"}
                    className="cursor-pointer hover:opacity-80 transition-opacity px-3 py-1"
                    onClick={() => onDepartmentToggle(department)}
                  >
                    {department}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Technologies & Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:opacity-80 transition-opacity px-3 py-1"
                    onClick={() => onTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedDepartments.map((department) => (
              <Badge
                key={`dept-${department}`}
                variant="secondary"
                className="gap-1 pr-1 pl-3"
              >
                {department}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0.5 hover:bg-transparent"
                  onClick={() => onDepartmentToggle(department)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {selectedTags.map((tag) => (
              <Badge
                key={`tag-${tag}`}
                variant="secondary"
                className="gap-1 pr-1 pl-3"
              >
                {tag}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0.5 hover:bg-transparent"
                  onClick={() => onTagToggle(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;