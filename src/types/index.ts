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

export enum TranslationStatus {
  Incomplete = 'Incomplete',
  Ready = 'Ready',
}

export enum ContactRole {
  Primary = 'Primary',
  Technical = 'Technical',
  Business = 'Business',
}

export interface ProjectContact {
  name: string;
  email: string;
  role: ContactRole;
  title?: string;
  phone?: string;
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
  nameEN: string;
  nameFR: string;
  name: string; // Legacy alias from API
  serviceInventoryId?: string;

  // Organization
  organizationId: string;
  organization?: Organization;

  // Description and Purpose
  descriptionEN: string;
  descriptionFR: string;
  description: string; // Legacy alias from API
  primaryUsers: PrimaryUsers;

  // Development
  developedBy: DevelopedBy;
  vendorName?: string;

  // Status and Timeline
  status: ProjectStatus;
  statusYear?: number;

  // Capabilities
  capabilitiesEN?: string;
  capabilitiesFR?: string;
  capabilities?: string; // Legacy alias from API

  // Compliance and Governance
  isAutomatedDecisionSystem: boolean;
  openGovAiaId?: string;
  dataSourcesEN?: string;
  dataSourcesFR?: string;
  dataSources?: string; // Legacy alias from API
  involvesPersonalInfo: boolean;
  personalInformationBanksEN?: string;
  personalInformationBanksFR?: string;
  personalInformationBanks?: string; // Legacy alias from API
  hasUserNotification: boolean;
  atipRequestRefsEN?: string;
  atipRequestRefsFR?: string;
  atipRequestRefs?: string; // Legacy alias from API

  // Outcomes
  outcomesEN?: string;
  outcomesFR?: string;
  outcomes?: string; // Legacy alias from API

  // Contacts
  contacts?: ProjectContact[];

  // Internal fields
  source1?: string;
  source2?: string;

  // Metadata
  moderationState: ModerationState;
  translationStatus: TranslationStatus;
  ownerEntraObjectId?: string;
  submittedAt?: string;
  approvedAt?: string;
  publishedAt?: string;
  reviewNotes?: string;
  featured: boolean;

  // Open Source
  isOpenSource: boolean;
  githubUrl?: string;

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

export interface ProjectAuditEntry extends AuditLog {
  actorDisplayName?: string;
  actorEmail?: string;
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

export interface ProjectStats {
  total: number;
  featured: number;
  inProduction: number;
  organizations: number;
  openSource: number;
}

export interface ApiError {
  error: string;
  message?: string;
  details?: unknown;
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
  isOpenSource?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'organization' | 'createdAt' | 'updatedAt' | 'status' | 'statusYear';
  sortOrder?: 'asc' | 'desc';
}

// Form input types
export interface CreateProjectInput {
  nameEN?: string;
  nameFR?: string;
  name?: string;
  serviceInventoryId?: string;
  organizationId: string;
  descriptionEN?: string;
  descriptionFR?: string;
  description?: string;
  primaryUsers: PrimaryUsers;
  developedBy: DevelopedBy;
  vendorName?: string;
  status: ProjectStatus;
  statusYear?: number;
  capabilitiesEN?: string;
  capabilitiesFR?: string;
  capabilities?: string;
  isAutomatedDecisionSystem: boolean;
  openGovAiaId?: string;
  dataSourcesEN?: string;
  dataSourcesFR?: string;
  dataSources?: string;
  involvesPersonalInfo: boolean;
  personalInformationBanksEN?: string;
  personalInformationBanksFR?: string;
  personalInformationBanks?: string;
  hasUserNotification: boolean;
  atipRequestRefsEN?: string;
  atipRequestRefsFR?: string;
  atipRequestRefs?: string;
  outcomesEN?: string;
  outcomesFR?: string;
  outcomes?: string;
  featured?: boolean;
  isOpenSource?: boolean;
  githubUrl?: string;
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

// Admin Stats types mirroring /api/admin/stats response
export type AdminStatsScope = 'published' | 'all';

export interface AdminStatsDistributionItem {
  key: string;
  count: number;
}

export interface AdminStatsSummary {
  total: number;
  featured: number;
  inProduction: number;
  organizations: number;
  adsCount: number;
  personalInfoCount: number;
  hasUserNotificationCount: number;
  openGovAiaProvided: number;
}

export interface AdminStatsOrganizations {
  top: Array<{ organizationId: string; name: string; count: number }>;
  othersCount: number;
  matrix: Array<{ organizationId: string; name: string; status: string; count: number }>;
}

export interface AdminStatsVendors {
  top: Array<{ vendorName: string; count: number }>;
}

export interface AdminStatsTimeSeries {
  months: string[];
  createdMonthly: number[];
  publishedMonthly: number[];
  cumulative: number[];
}

export interface AdminStatsGovernance {
  statusYearBuckets: Array<{ year: number; count: number }>;
  openGovAiaProvided: number;
}

export interface AdminStatsContentTopItem { key: string; count: number }

export interface AdminStatsContent {
  capabilitiesTop: AdminStatsContentTopItem[];
  pibCodesTop: AdminStatsContentTopItem[];
}

export interface AdminStatsCodeRequests {
  total: number;
  countsByStatus: AdminStatsDistributionItem[];
  months: string[];
  createdMonthly: number[];
  byProjectTop: Array<{ projectId: string; projectName: string; count: number }>;
}

export interface AdminStatsResponse {
  scope: AdminStatsScope;
  summary: AdminStatsSummary;
  distributions: {
    status: AdminStatsDistributionItem[];
    moderationState: AdminStatsDistributionItem[];
    developedBy: AdminStatsDistributionItem[];
    primaryUsers: AdminStatsDistributionItem[];
  };
  organizations: AdminStatsOrganizations;
  vendors: AdminStatsVendors;
  timeSeries: AdminStatsTimeSeries;
  governance: AdminStatsGovernance;
  content: AdminStatsContent;
  codeRequests?: AdminStatsCodeRequests;
}
