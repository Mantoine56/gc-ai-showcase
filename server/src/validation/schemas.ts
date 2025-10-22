import { z } from 'zod';

// Enums
export const PrimaryUsersSchema = z.enum(['Employees', 'MembersOfPublic', 'Both', 'Neither']);
export const DevelopedBySchema = z.enum(['Government', 'Vendor', 'Other']);
export const ProjectStatusSchema = z.enum(['InDevelopment', 'InProduction', 'Retired']);
export const ModerationStateSchema = z.enum(['Draft', 'Submitted', 'Approved', 'Published', 'Archived']);

// Project validation schema
export const CreateProjectSchema = z.object({
  // Core Identity
  name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
  serviceInventoryId: z.string().optional(),

  // Organization
  organizationId: z.string().min(1, 'Organization is required'),

  // Description
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be 1000 characters or less'),
  primaryUsers: PrimaryUsersSchema,

  // Development
  developedBy: DevelopedBySchema,
  vendorName: z.string().optional(),

  // Status
  status: ProjectStatusSchema,
  statusYear: z.number().int().min(2000).max(2100).optional(),

  // Capabilities
  capabilities: z.string().max(300, 'Capabilities must be 300 characters or less').optional(),

  // Compliance
  isAutomatedDecisionSystem: z.boolean().default(false),
  openGovAiaId: z.string().optional(),
  dataSources: z.string().optional(),
  involvesPersonalInfo: z.boolean().default(false),
  personalInformationBanks: z.string().optional(), // Stored as string, can be comma-separated
  hasUserNotification: z.boolean().default(false),
  atipRequestRefs: z.string().optional(),

  // Outcomes
  outcomes: z.string().max(500, 'Outcomes must be 500 characters or less').optional(),

  // Metadata
  featured: z.boolean().optional(),

  // Open Source
  isOpenSource: z.boolean().optional(),
  githubUrl: z.string().url('Must be a valid URL').optional(),
}).refine((data) => {
  // If developedBy is Vendor, vendorName is required
  if (data.developedBy === 'Vendor' && !data.vendorName) {
    return false;
  }
  return true;
}, {
  message: 'Vendor name is required when developed by vendor',
  path: ['vendorName'],
});

export const UpdateProjectSchema = z.object({
  // Core Identity
  name: z.string().min(1).max(50).optional(),
  serviceInventoryId: z.string().optional(),

  // Organization
  organizationId: z.string().optional(),

  // Description
  description: z.string().min(1).max(1000).optional(),
  primaryUsers: PrimaryUsersSchema.optional(),

  // Development
  developedBy: DevelopedBySchema.optional(),
  vendorName: z.string().optional(),

  // Status
  status: ProjectStatusSchema.optional(),
  statusYear: z.number().int().min(2000).max(2100).optional(),

  // Capabilities
  capabilities: z.string().max(300).optional(),

  // Compliance
  isAutomatedDecisionSystem: z.boolean().optional(),
  openGovAiaId: z.string().optional(),
  dataSources: z.string().optional(),
  involvesPersonalInfo: z.boolean().optional(),
  personalInformationBanks: z.string().optional(),
  hasUserNotification: z.boolean().optional(),
  atipRequestRefs: z.string().optional(),

  // Outcomes
  outcomes: z.string().max(500).optional(),

  // Metadata
  featured: z.boolean().optional(),

  // Open Source
  isOpenSource: z.boolean().optional(),
  githubUrl: z.string().url('Must be a valid URL').optional(),
});

// Query/filter schema
export const ProjectQuerySchema = z.object({
  // Search
  query: z.string().optional(),

  // Filters
  organizationId: z.string().optional(),
  status: ProjectStatusSchema.optional(),
  isAutomatedDecisionSystem: z.enum(['true', 'false']).optional(),
  involvesPersonalInfo: z.enum(['true', 'false']).optional(),
  statusYear: z.string().optional(), // Can be a year or range
  moderationState: ModerationStateSchema.optional(),
  featured: z.enum(['true', 'false']).optional(),
  isOpenSource: z.enum(['true', 'false']).optional(),

  // Pagination
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('20'),

  // Sorting
  sortBy: z.enum(['name', 'createdAt', 'updatedAt', 'status', 'statusYear']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Organization schema
export const CreateOrganizationSchema = z.object({
  nameEN: z.string().min(1, 'English name is required'),
  nameFR: z.string().min(1, 'French name is required'),
  acronym: z.string().optional(),
  url: z.string().url('Must be a valid URL').optional(),
});

export const UpdateOrganizationSchema = CreateOrganizationSchema.partial();

// Code request schema
export const CreateCodeRequestSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  requesterEmail: z.string().email('Must be a valid email'),
  message: z.string().min(1, 'Message is required').max(1000, 'Message must be 1000 characters or less'),
});

// Type exports
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
export type ProjectQuery = z.infer<typeof ProjectQuerySchema>;
export type CreateOrganizationInput = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganizationInput = z.infer<typeof UpdateOrganizationSchema>;
export type CreateCodeRequestInput = z.infer<typeof CreateCodeRequestSchema>;

// Admin stats query schema
export const AdminStatsQuerySchema = z.object({
  scope: z.enum(['published', 'all']).optional().default('published'),
  includeCodeRequests: z.enum(['true', 'false']).optional().default('true'),
});

export type AdminStatsQuery = z.infer<typeof AdminStatsQuerySchema>;
