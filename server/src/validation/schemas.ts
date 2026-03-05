import { z } from 'zod';

export const PrimaryUsersSchema = z.enum([
  'Employees',
  'MembersOfPublic',
  'Both',
  'Neither',
]);
export const DevelopedBySchema = z.enum(['Government', 'Vendor', 'Other']);
export const ProjectStatusSchema = z.enum([
  'InDevelopment',
  'InProduction',
  'Retired',
]);
export const ModerationStateSchema = z.enum([
  'Draft',
  'Submitted',
  'Approved',
  'Published',
  'Archived',
]);

const optionalText = (max?: number) => {
  const base = max
    ? z.string().trim().max(max, `Must be ${max} characters or less`)
    : z.string().trim();
  return base.optional();
};

const ProjectWriteBaseSchema = z.object({
  // Canonical bilingual fields
  nameEN: optionalText(50),
  nameFR: optionalText(50),
  descriptionEN: optionalText(1000),
  descriptionFR: optionalText(1000),
  capabilitiesEN: optionalText(300),
  capabilitiesFR: optionalText(300),
  dataSourcesEN: optionalText(),
  dataSourcesFR: optionalText(),
  personalInformationBanksEN: optionalText(),
  personalInformationBanksFR: optionalText(),
  atipRequestRefsEN: optionalText(),
  atipRequestRefsFR: optionalText(),
  outcomesEN: optionalText(500),
  outcomesFR: optionalText(500),

  // Legacy aliases kept for compatibility
  name: optionalText(50),
  description: optionalText(1000),
  capabilities: optionalText(300),
  dataSources: optionalText(),
  personalInformationBanks: optionalText(),
  atipRequestRefs: optionalText(),
  outcomes: optionalText(500),

  // Shared fields
  serviceInventoryId: optionalText(),
  organizationId: z.string().trim().min(1, 'Organization is required'),
  primaryUsers: PrimaryUsersSchema,
  developedBy: DevelopedBySchema,
  vendorName: optionalText(),
  status: ProjectStatusSchema,
  statusYear: z.number().int().min(2000).max(2100).optional(),
  isAutomatedDecisionSystem: z.boolean().default(false),
  openGovAiaId: optionalText(),
  involvesPersonalInfo: z.boolean().default(false),
  hasUserNotification: z.boolean().default(false),
  featured: z.boolean().optional(),
  isOpenSource: z.boolean().optional(),
  githubUrl: z.string().url('Must be a valid URL').optional(),
  reviewNotes: optionalText(),
});

export const CreateProjectSchema = ProjectWriteBaseSchema.superRefine((data, ctx) => {
  const nameEN = data.nameEN || data.name;
  const descriptionEN = data.descriptionEN || data.description;

  if (!nameEN) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['nameEN'],
      message: 'English name is required',
    });
  }

  if (!descriptionEN) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['descriptionEN'],
      message: 'English description is required',
    });
  }

  if (data.developedBy === 'Vendor' && !data.vendorName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['vendorName'],
      message: 'Vendor name is required when developed by vendor',
    });
  }
});

export const UpdateProjectSchema = ProjectWriteBaseSchema.partial().superRefine((data, ctx) => {
  if (data.developedBy === 'Vendor' && data.vendorName === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['vendorName'],
      message: 'Vendor name cannot be empty when developed by vendor',
    });
  }
});

export const ProjectQuerySchema = z.object({
  query: z.string().optional(),
  organizationId: z.string().optional(),
  status: ProjectStatusSchema.optional(),
  isAutomatedDecisionSystem: z.enum(['true', 'false']).optional(),
  involvesPersonalInfo: z.enum(['true', 'false']).optional(),
  statusYear: z.string().optional(),
  moderationState: ModerationStateSchema.optional(),
  featured: z.enum(['true', 'false']).optional(),
  isOpenSource: z.enum(['true', 'false']).optional(),
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('20'),
  sortBy: z
    .enum(['name', 'organization', 'createdAt', 'updatedAt', 'status', 'statusYear'])
    .optional()
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const CreateOrganizationSchema = z.object({
  nameEN: z.string().trim().min(1, 'English name is required'),
  nameFR: z.string().trim().min(1, 'French name is required'),
  acronym: z.string().trim().optional(),
  url: z.string().url('Must be a valid URL').optional(),
});

export const UpdateOrganizationSchema = CreateOrganizationSchema.partial();

export const CreateCodeRequestSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  requesterEmail: z.string().email('Must be a valid email'),
  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .max(1000, 'Message must be 1000 characters or less'),
});

export const AdminStatsQuerySchema = z.object({
  scope: z.enum(['published', 'all']).optional().default('published'),
  includeCodeRequests: z.enum(['true', 'false']).optional().default('true'),
});

export const AssistantQuerySchema = z.object({
  query: z.string().trim().min(1, 'Query is required'),
  locale: z.enum(['en', 'fr']).optional().default('en'),
});

export const ModerationNotesSchema = z.object({
  reviewNotes: z.string().trim().max(2000).optional(),
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
export type ProjectQuery = z.infer<typeof ProjectQuerySchema>;
export type CreateOrganizationInput = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganizationInput = z.infer<typeof UpdateOrganizationSchema>;
export type CreateCodeRequestInput = z.infer<typeof CreateCodeRequestSchema>;
export type AdminStatsQuery = z.infer<typeof AdminStatsQuerySchema>;
export type AssistantQuery = z.infer<typeof AssistantQuerySchema>;
