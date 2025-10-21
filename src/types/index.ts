// Production schema types matching the backend Prisma models

export enum PrimaryUsers {
  Employees = 'Employees',
  MembersOfPublic = 'MembersOfPublic',
  Both = 'Both',
  Neither = 'Neither',
}

export enum DevelopedBy {
  Government = 'Government',
  Vendor = 'Vendor',
  Other = 'Other',
}

export enum ProjectStatus {
  InDevelopment = 'InDevelopment',
  InProduction = 'InProduction',
  Retired = 'Retired',
}

export enum ModerationState {
  Draft = 'Draft',
  Submitted = 'Submitted',
  Approved = 'Approved',
  Published = 'Published',
  Archived = 'Archived',
}

export interface Organization {
  id: string;
  nameEN: string;
  nameFR: string;
  acronym?: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    projects: number;
  };
}

export interface Project {
  id: string;

  // Core Identity
  aiRegisterId?: string;
  name: string;
  serviceInventoryId?: string;

  // Organization
  organizationId: string;
  organization?: Organization;

  // Description and Purpose
  description: string;
  primaryUsers: PrimaryUsers;

  // Development
  developedBy: DevelopedBy;
  vendorName?: string;

  // Status and Timeline
  status: ProjectStatus;
  statusYear?: number;

  // Capabilities
  capabilities?: string;

  // Compliance and Governance
  isAutomatedDecisionSystem: boolean;
  openGovAiaId?: string;
  dataSources?: string;
  involvesPersonalInfo: boolean;
  personalInformationBanks?: string;
  hasUserNotification: boolean;
  atipRequestRefs?: string;

  // Outcomes
  outcomes?: string;

  // Internal fields
  source1?: string;
  source2?: string;

  // Metadata
  moderationState: ModerationState;
  featured: boolean;

  // Audit
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;

  // Relations
  codeRequests?: CodeRequest[];
}

export interface CodeRequest {
  id: string;
  projectId: string;
  requesterId?: string;
  requesterEmail: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  roles: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  actorId?: string;
  action: string;
  entity: string;
  entityId: string;
  diff?: string;
  createdAt: string;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  error: string;
  message?: string;
  details?: any;
}

// Search and filter types
export interface ProjectFilters {
  query?: string;
  organizationId?: string;
  status?: ProjectStatus;
  isAutomatedDecisionSystem?: boolean;
  involvesPersonalInfo?: boolean;
  statusYear?: number;
  moderationState?: ModerationState;
  featured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'status' | 'statusYear';
  sortOrder?: 'asc' | 'desc';
}

// Form input types
export interface CreateProjectInput {
  name: string;
  serviceInventoryId?: string;
  organizationId: string;
  description: string;
  primaryUsers: PrimaryUsers;
  developedBy: DevelopedBy;
  vendorName?: string;
  status: ProjectStatus;
  statusYear?: number;
  capabilities?: string;
  isAutomatedDecisionSystem: boolean;
  openGovAiaId?: string;
  dataSources?: string;
  involvesPersonalInfo: boolean;
  personalInformationBanks?: string;
  hasUserNotification: boolean;
  atipRequestRefs?: string;
  outcomes?: string;
  featured?: boolean;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id?: string;
}

// Import/Export types
export interface ImportResult {
  success: boolean;
  imported: number;
  errors: Array<{ row: number; error: string }>;
  warnings: Array<{ row: number; warning: string }>;
}
