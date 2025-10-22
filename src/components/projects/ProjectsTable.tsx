import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Settings2,
  Shield,
  User,
  Star,
} from 'lucide-react';
import { Project, ProjectStatus, PrimaryUsers, DevelopedBy } from '@/types';

interface ProjectsTableProps {
  projects: Project[];
  isLoading?: boolean;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
}

type SortField = 'name' | 'organization' | 'status' | 'statusYear' | 'createdAt';

const DEFAULT_VISIBLE_COLUMNS = [
  'name',
  'organization',
  'status',
  'capabilities',
  'primaryUsers',
  'developedBy',
  'actions',
];

export function ProjectsTable({ projects, isLoading, sortBy, sortOrder, onSortChange }: ProjectsTableProps) {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(DEFAULT_VISIBLE_COLUMNS);

  // Column definitions
  const allColumns = [
    { id: 'name', label: 'Project Name', sortable: true },
    { id: 'organization', label: 'Organization', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'statusYear', label: 'Year', sortable: true },
    { id: 'capabilities', label: 'Capabilities', sortable: false },
    { id: 'primaryUsers', label: 'Primary Users', sortable: false },
    { id: 'developedBy', label: 'Developed By', sortable: false },
    { id: 'compliance', label: 'Compliance', sortable: false },
    { id: 'createdAt', label: 'Created', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
  ];

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      onSortChange(field, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange(field, 'asc');
    }
  };

  // Projects are already sorted by the API, just use them directly
  const sortedProjects = projects;

  // Toggle column visibility
  const toggleColumn = (columnId: string) => {
    if (columnId === 'actions') return; // Always show actions
    setVisibleColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId]
    );
  };

  // Helper functions
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.InProduction:
        return 'bg-gcds-color-green-100 text-gcds-color-green-900 dark:bg-gcds-color-green-900/20 dark:text-gcds-color-green-300';
      case ProjectStatus.InDevelopment:
        return 'bg-gcds-color-yellow-100 text-gcds-color-yellow-900 dark:bg-gcds-color-yellow-900/20 dark:text-gcds-color-yellow-300';
      case ProjectStatus.Retired:
        return 'bg-gcds-color-grayscale-100 text-gcds-color-grayscale-900 dark:bg-gcds-color-grayscale-900/20 dark:text-gcds-color-grayscale-300';
      default:
        return 'bg-gcds-color-grayscale-100 text-gcds-color-grayscale-900 dark:bg-gcds-color-grayscale-900/20 dark:text-gcds-color-grayscale-300';
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

  const getPrimaryUsersLabel = (users: PrimaryUsers) => {
    switch (users) {
      case PrimaryUsers.Employees:
        return 'Employees';
      case PrimaryUsers.MembersOfPublic:
        return 'Public';
      case PrimaryUsers.Both:
        return 'Both';
      case PrimaryUsers.Neither:
        return 'Neither';
      default:
        return users;
    }
  };

  const getDevelopedByLabel = (dev: DevelopedBy) => {
    switch (dev) {
      case DevelopedBy.Government:
        return 'Government';
      case DevelopedBy.Vendor:
        return 'Vendor';
      case DevelopedBy.Other:
        return 'Other';
      default:
        return dev;
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
        <p className="mt-4 text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {sortedProjects.length} {sortedProjects.length === 1 ? 'project' : 'projects'}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings2 className="h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {allColumns
              .filter((col) => col.id !== 'actions')
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={visibleColumns.includes(column.id)}
                  onCheckedChange={() => toggleColumn(column.id)}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.includes('name') && (
                <TableHead className="w-[250px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('name')}
                    className="h-auto p-0 hover:bg-transparent font-semibold"
                  >
                    Project Name
                    <SortIcon field="name" />
                  </Button>
                </TableHead>
              )}
              {visibleColumns.includes('organization') && (
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('organization')}
                    className="h-auto p-0 hover:bg-transparent font-semibold"
                  >
                    Organization
                    <SortIcon field="organization" />
                  </Button>
                </TableHead>
              )}
              {visibleColumns.includes('status') && (
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('status')}
                    className="h-auto p-0 hover:bg-transparent font-semibold"
                  >
                    Status
                    <SortIcon field="status" />
                  </Button>
                </TableHead>
              )}
              {visibleColumns.includes('statusYear') && (
                <TableHead className="w-[100px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('statusYear')}
                    className="h-auto p-0 hover:bg-transparent font-semibold"
                  >
                    Year
                    <SortIcon field="statusYear" />
                  </Button>
                </TableHead>
              )}
              {visibleColumns.includes('capabilities') && (
                <TableHead className="w-[200px]">Capabilities</TableHead>
              )}
              {visibleColumns.includes('primaryUsers') && (
                <TableHead>Primary Users</TableHead>
              )}
              {visibleColumns.includes('developedBy') && (
                <TableHead>Developed By</TableHead>
              )}
              {visibleColumns.includes('compliance') && (
                <TableHead>Compliance</TableHead>
              )}
              {visibleColumns.includes('createdAt') && (
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('createdAt')}
                    className="h-auto p-0 hover:bg-transparent font-semibold"
                  >
                    Created
                    <SortIcon field="createdAt" />
                  </Button>
                </TableHead>
              )}
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProjects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.length + 1}
                  className="h-24 text-center"
                >
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              sortedProjects.map((project) => (
                <TableRow key={project.id} className="hover:bg-muted/50">
                  {visibleColumns.includes('name') && (
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/project/${project.id}`}
                          className="hover:text-primary transition-colors"
                        >
                          {project.name}
                        </Link>
                        {project.featured && (
                          <Star className="h-3 w-3 text-gcds-color-yellow-500 fill-gcds-color-yellow-500" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {project.description}
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.includes('organization') && (
                    <TableCell>
                      <div className="text-sm">{project.organization?.nameEN}</div>
                      {project.organization?.acronym && (
                        <div className="text-xs text-muted-foreground">
                          {project.organization.acronym}
                        </div>
                      )}
                    </TableCell>
                  )}
                  {visibleColumns.includes('status') && (
                    <TableCell>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusLabel(project.status)}
                      </Badge>
                    </TableCell>
                  )}
                  {visibleColumns.includes('statusYear') && (
                    <TableCell className="text-muted-foreground">
                      {project.statusYear || '-'}
                    </TableCell>
                  )}
                  {visibleColumns.includes('capabilities') && (
                    <TableCell>
                      {project.capabilities ? (
                        <div className="flex flex-wrap gap-1">
                          {project.capabilities
                            .split(',')
                            .slice(0, 2)
                            .map((cap, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {cap.trim()}
                              </Badge>
                            ))}
                          {project.capabilities.split(',').length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.capabilities.split(',').length - 2}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                  )}
                  {visibleColumns.includes('primaryUsers') && (
                    <TableCell className="text-sm">
                      {getPrimaryUsersLabel(project.primaryUsers)}
                    </TableCell>
                  )}
                  {visibleColumns.includes('developedBy') && (
                    <TableCell className="text-sm">
                      <div>{getDevelopedByLabel(project.developedBy)}</div>
                      {project.vendorName && (
                        <div className="text-xs text-muted-foreground">
                          {project.vendorName}
                        </div>
                      )}
                    </TableCell>
                  )}
                  {visibleColumns.includes('compliance') && (
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {project.isAutomatedDecisionSystem && (
                          <Badge
                            variant="outline"
                            className="text-xs w-fit text-gcds-color-blue-700 border-gcds-color-blue-700"
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            ADS
                          </Badge>
                        )}
                        {project.involvesPersonalInfo && (
                          <Badge
                            variant="outline"
                            className="text-xs w-fit text-gcds-color-purple-700 border-gcds-color-purple-700"
                          >
                            <User className="h-3 w-3 mr-1" />
                            PI
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.includes('createdAt') && (
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </TableCell>
                  )}
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="ghost">
                      <Link to={`/project/${project.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
