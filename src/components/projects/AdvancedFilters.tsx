import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Filter, X, ArrowUpDown, Building2, Shield, User, Activity } from 'lucide-react';
import { ProjectStatus } from '@/types';

interface AdvancedFiltersProps {
  // Status filters
  selectedStatuses: ProjectStatus[];
  onStatusToggle: (status: ProjectStatus) => void;

  // Compliance filters
  filterADS: boolean;
  onADSToggle: () => void;
  filterPersonalInfo: boolean;
  onPersonalInfoToggle: () => void;

  // Department filters
  selectedDepartments: string[];
  onDepartmentToggle: (deptId: string) => void;
  availableDepartments: Array<{ id: string; name: string }>;

  // Sort controls
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;

  // Clear all
  onClearAll: () => void;
}

export default function AdvancedFilters({
  selectedStatuses,
  onStatusToggle,
  filterADS,
  onADSToggle,
  filterPersonalInfo,
  onPersonalInfoToggle,
  selectedDepartments,
  onDepartmentToggle,
  availableDepartments,
  sortBy,
  sortOrder,
  onSortChange,
  onClearAll,
}: AdvancedFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const activeFiltersCount =
    selectedStatuses.length +
    selectedDepartments.length +
    (filterADS ? 1 : 0) +
    (filterPersonalInfo ? 1 : 0);

  const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.InProduction:
        return 'In Production';
      case ProjectStatus.InDevelopment:
        return 'In Development';
      case ProjectStatus.Retired:
        return 'Retired';
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.InProduction:
        return 'bg-gcds-color-green-100 text-gcds-color-green-900';
      case ProjectStatus.InDevelopment:
        return 'bg-gcds-color-yellow-100 text-gcds-color-yellow-900';
      case ProjectStatus.Retired:
        return 'bg-gcds-color-grayscale-100 text-gcds-color-grayscale-900';
    }
  };

  return (
    <>
      {/* Backdrop */}
      {showFilters && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowFilters(false)}
        />
      )}

      <div className="relative">
        {/* Filter Controls Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button
            variant={showFilters ? "default" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 min-w-[20px] px-1.5 text-xs bg-gcds-background-primary">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Clear all
            </Button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <Label className="text-sm text-muted-foreground flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort by:
          </Label>
          <Select
            value={`${sortBy}-${sortOrder}`}
            onValueChange={(value) => {
              const [newSortBy, newSortOrder] = value.split('-');
              onSortChange(newSortBy, newSortOrder as 'asc' | 'desc');
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">Newest First</SelectItem>
              <SelectItem value="createdAt-asc">Oldest First</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="statusYear-desc">Status Year (Latest)</SelectItem>
              <SelectItem value="statusYear-asc">Status Year (Earliest)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filters Panel - Absolutely positioned to overlay content */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 p-6 bg-card rounded-lg shadow-lg border border-border space-y-6 z-50">
          {/* Project Status */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Project Status</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.values(ProjectStatus).map((status) => (
                <Badge
                  key={status}
                  variant={selectedStatuses.includes(status) ? "default" : "outline"}
                  className={`cursor-pointer transition-all px-3 py-1.5 ${
                    selectedStatuses.includes(status)
                      ? `${getStatusColor(status)} hover:brightness-95`
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => onStatusToggle(status)}
                >
                  {getStatusLabel(status)}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Compliance & Governance */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Compliance & Governance</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={filterADS ? "default" : "outline"}
                className={`cursor-pointer transition-all px-3 py-1.5 ${
                  filterADS
                    ? 'bg-gcds-color-blue-100 text-gcds-color-blue-900 hover:brightness-95'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={onADSToggle}
              >
                <Shield className="h-3 w-3 mr-1" />
                Automated Decision System
              </Badge>
              <Badge
                variant={filterPersonalInfo ? "default" : "outline"}
                className={`cursor-pointer transition-all px-3 py-1.5 ${
                  filterPersonalInfo
                    ? 'bg-gcds-color-purple-100 text-gcds-color-purple-900 hover:brightness-95'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={onPersonalInfoToggle}
              >
                <User className="h-3 w-3 mr-1" />
                Involves Personal Info
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Departments */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Departments & Agencies</h3>
            </div>
            <Select
              value={selectedDepartments.length === 1 ? selectedDepartments[0] : ""}
              onValueChange={(value) => {
                if (value) {
                  onDepartmentToggle(value);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select department(s)..." />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {availableDepartments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{dept.name}</span>
                      {selectedDepartments.includes(dept.id) && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDepartments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedDepartments.map((deptId) => {
                  const dept = availableDepartments.find(d => d.id === deptId);
                  return dept ? (
                    <Badge
                      key={dept.id}
                      variant="secondary"
                      className="gap-1 pr-1 pl-2"
                    >
                      {dept.name}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0.5 hover:bg-transparent"
                        onClick={() => onDepartmentToggle(deptId)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active Filters Display - remains in normal flow */}
      {activeFiltersCount > 0 && !showFilters && (
        <div className="flex flex-wrap gap-2 items-center mt-3">
          <span className="text-xs font-medium text-muted-foreground">Active:</span>

          {/* Status badges */}
          {selectedStatuses.map((status) => (
            <Badge
              key={`status-${status}`}
              className={`gap-1 pr-1 pl-2 text-xs ${getStatusColor(status)}`}
            >
              {getStatusLabel(status)}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0.5 hover:bg-transparent"
                onClick={() => onStatusToggle(status)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {/* Compliance badges */}
          {filterADS && (
            <Badge className="gap-1 pr-1 pl-2 text-xs bg-gcds-color-blue-100 text-gcds-color-blue-900">
              <Shield className="h-3 w-3 mr-1" />
              ADS
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0.5 hover:bg-transparent"
                onClick={onADSToggle}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {filterPersonalInfo && (
            <Badge className="gap-1 pr-1 pl-2 text-xs bg-gcds-color-purple-100 text-gcds-color-purple-900">
              <User className="h-3 w-3 mr-1" />
              Personal Info
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0.5 hover:bg-transparent"
                onClick={onPersonalInfoToggle}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {/* Department badges */}
          {selectedDepartments.slice(0, 3).map((deptId) => {
            const dept = availableDepartments.find(d => d.id === deptId);
            return dept ? (
              <Badge
                key={`dept-${deptId}`}
                variant="secondary"
                className="gap-1 pr-1 pl-2 text-xs"
              >
                {dept.name}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0.5 hover:bg-transparent"
                  onClick={() => onDepartmentToggle(deptId)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ) : null;
          })}
          {selectedDepartments.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{selectedDepartments.length - 3} more
            </Badge>
          )}
        </div>
      )}
      </div>
    </>
  );
}
