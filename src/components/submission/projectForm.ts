import { z } from 'zod';
import {
  CreateProjectInput,
  DevelopedBy,
  PrimaryUsers,
  ProjectStatus,
  TranslationStatus,
} from '@/types';

const requiredText = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be ${max} characters or less`);

const optionalText = (label: string, max?: number) => {
  const base = z.string().trim();
  if (!max) return base;
  return base.max(max, `${label} must be ${max} characters or less`);
};

export const projectSchema = z
  .object({
    nameEN: requiredText('English project name', 50),
    nameFR: optionalText('French project name', 50),
    serviceInventoryId: optionalText('Service inventory ID'),
    organizationId: z.string().min(1, 'Organization is required'),
    developedBy: z.nativeEnum(DevelopedBy),
    vendorName: optionalText('Vendor name'),
    descriptionEN: requiredText('English description', 1000),
    descriptionFR: optionalText('French description', 1000),
    capabilitiesEN: optionalText('English capabilities', 300),
    capabilitiesFR: optionalText('French capabilities', 300),
    primaryUsers: z.nativeEnum(PrimaryUsers),
    isAutomatedDecisionSystem: z.boolean().default(false),
    openGovAiaId: optionalText('AIA ID'),
    involvesPersonalInfo: z.boolean().default(false),
    personalInformationBanksEN: optionalText('English PIB references'),
    personalInformationBanksFR: optionalText('French PIB references'),
    hasUserNotification: z.boolean().default(false),
    status: z.nativeEnum(ProjectStatus),
    statusYear: z.number().int().min(2000).max(2100).optional(),
    dataSourcesEN: optionalText('English data sources'),
    dataSourcesFR: optionalText('French data sources'),
    atipRequestRefsEN: optionalText('English ATIP references'),
    atipRequestRefsFR: optionalText('French ATIP references'),
    outcomesEN: optionalText('English outcomes', 500),
    outcomesFR: optionalText('French outcomes', 500),
    featured: z.boolean().optional(),
    isOpenSource: z.boolean().optional(),
    githubUrl: optionalText('GitHub URL'),
  })
  .refine(
    (data) => {
      if (data.developedBy === DevelopedBy.Vendor && !data.vendorName) {
        return false;
      }
      return true;
    },
    {
      message: 'Vendor name is required when developed by vendor',
      path: ['vendorName'],
    }
  )
  .refine(
    (data) => {
      if (data.isOpenSource && data.githubUrl && !/^https?:\/\//.test(data.githubUrl)) {
        return false;
      }
      return true;
    },
    {
      message: 'GitHub URL must start with http:// or https://',
      path: ['githubUrl'],
    }
  );

export type ProjectFormData = z.infer<typeof projectSchema>;

export const STEP_FIELDS: Record<number, Array<keyof ProjectFormData>> = {
  1: ['nameEN', 'nameFR', 'organizationId', 'developedBy', 'vendorName', 'serviceInventoryId'],
  2: ['descriptionEN', 'descriptionFR', 'capabilitiesEN', 'capabilitiesFR', 'primaryUsers'],
  3: [
    'isAutomatedDecisionSystem',
    'openGovAiaId',
    'involvesPersonalInfo',
    'personalInformationBanksEN',
    'personalInformationBanksFR',
    'hasUserNotification',
  ],
  4: [
    'status',
    'statusYear',
    'dataSourcesEN',
    'dataSourcesFR',
    'atipRequestRefsEN',
    'atipRequestRefsFR',
    'outcomesEN',
    'outcomesFR',
  ],
};

type BilingualFieldBase =
  | 'name'
  | 'description'
  | 'capabilities'
  | 'dataSources'
  | 'personalInformationBanks'
  | 'atipRequestRefs'
  | 'outcomes';

type FormInitialData = Partial<CreateProjectInput> & {
  translationStatus?: TranslationStatus;
};

export interface ReadinessItem {
  key: string;
  label: string;
  complete: boolean;
  required: boolean;
}

function hasText(value: string | null | undefined): boolean {
  return Boolean(value?.trim());
}

function normalizeOptionalText(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function getPair(data: Partial<ProjectFormData>, field: BilingualFieldBase) {
  return {
    en: data[`${field}EN` as keyof ProjectFormData] as string | undefined,
    fr: data[`${field}FR` as keyof ProjectFormData] as string | undefined,
  };
}

function isRequiredPairComplete(data: Partial<ProjectFormData>, field: BilingualFieldBase) {
  const pair = getPair(data, field);
  return hasText(pair.en) && hasText(pair.fr);
}

function isOptionalPairComplete(data: Partial<ProjectFormData>, field: BilingualFieldBase) {
  const pair = getPair(data, field);
  const enHasValue = hasText(pair.en);
  const frHasValue = hasText(pair.fr);
  return (!enHasValue && !frHasValue) || (enHasValue && frHasValue);
}

export function getDraftReadiness(data: Partial<ProjectFormData>) {
  const items: ReadinessItem[] = [
    { key: 'nameEN', label: 'English name', complete: hasText(data.nameEN), required: true },
    {
      key: 'descriptionEN',
      label: 'English description',
      complete: hasText(data.descriptionEN),
      required: true,
    },
    {
      key: 'organizationId',
      label: 'Organization',
      complete: hasText(data.organizationId),
      required: true,
    },
    {
      key: 'developedBy',
      label: 'Developed by',
      complete: hasText(data.developedBy),
      required: true,
    },
    {
      key: 'primaryUsers',
      label: 'Primary users',
      complete: hasText(data.primaryUsers),
      required: true,
    },
    { key: 'status', label: 'Status', complete: hasText(data.status), required: true },
  ];

  return {
    items,
    completeCount: items.filter((item) => item.complete).length,
    totalCount: items.length,
    isReady: items.every((item) => item.complete),
  };
}

export function getPublishReadiness(data: Partial<ProjectFormData>) {
  const items: ReadinessItem[] = [
    { key: 'name', label: 'Name (EN/FR)', complete: isRequiredPairComplete(data, 'name'), required: true },
    {
      key: 'description',
      label: 'Description (EN/FR)',
      complete: isRequiredPairComplete(data, 'description'),
      required: true,
    },
    {
      key: 'capabilities',
      label: 'Capabilities',
      complete: isOptionalPairComplete(data, 'capabilities'),
      required: false,
    },
    {
      key: 'dataSources',
      label: 'Data sources',
      complete: isOptionalPairComplete(data, 'dataSources'),
      required: false,
    },
    {
      key: 'personalInformationBanks',
      label: 'PIB references',
      complete: isOptionalPairComplete(data, 'personalInformationBanks'),
      required: false,
    },
    {
      key: 'atipRequestRefs',
      label: 'ATIP references',
      complete: isOptionalPairComplete(data, 'atipRequestRefs'),
      required: false,
    },
    {
      key: 'outcomes',
      label: 'Outcomes',
      complete: isOptionalPairComplete(data, 'outcomes'),
      required: false,
    },
  ];

  return {
    items,
    completeCount: items.filter((item) => item.complete).length,
    totalCount: items.length,
    isReady: items.every((item) => item.complete),
  };
}

export function getInitialProjectFormValues(initialData?: FormInitialData): ProjectFormData {
  return {
    nameEN: initialData?.nameEN || initialData?.name || '',
    nameFR: initialData?.nameFR || '',
    serviceInventoryId: initialData?.serviceInventoryId || '',
    organizationId: initialData?.organizationId || '',
    developedBy: initialData?.developedBy || DevelopedBy.Government,
    vendorName: initialData?.vendorName || '',
    descriptionEN: initialData?.descriptionEN || initialData?.description || '',
    descriptionFR: initialData?.descriptionFR || '',
    capabilitiesEN: initialData?.capabilitiesEN || initialData?.capabilities || '',
    capabilitiesFR: initialData?.capabilitiesFR || '',
    primaryUsers: initialData?.primaryUsers || PrimaryUsers.Employees,
    isAutomatedDecisionSystem: initialData?.isAutomatedDecisionSystem || false,
    openGovAiaId: initialData?.openGovAiaId || '',
    involvesPersonalInfo: initialData?.involvesPersonalInfo || false,
    personalInformationBanksEN:
      initialData?.personalInformationBanksEN || initialData?.personalInformationBanks || '',
    personalInformationBanksFR: initialData?.personalInformationBanksFR || '',
    hasUserNotification: initialData?.hasUserNotification || false,
    status: initialData?.status || ProjectStatus.InDevelopment,
    statusYear: initialData?.statusYear,
    dataSourcesEN: initialData?.dataSourcesEN || initialData?.dataSources || '',
    dataSourcesFR: initialData?.dataSourcesFR || '',
    atipRequestRefsEN: initialData?.atipRequestRefsEN || initialData?.atipRequestRefs || '',
    atipRequestRefsFR: initialData?.atipRequestRefsFR || '',
    outcomesEN: initialData?.outcomesEN || initialData?.outcomes || '',
    outcomesFR: initialData?.outcomesFR || '',
    featured: initialData?.featured || false,
    isOpenSource: initialData?.isOpenSource || false,
    githubUrl: initialData?.githubUrl || '',
  };
}

export function toProjectPayload(data: ProjectFormData): CreateProjectInput {
  return {
    nameEN: data.nameEN.trim(),
    nameFR: normalizeOptionalText(data.nameFR),
    serviceInventoryId: normalizeOptionalText(data.serviceInventoryId),
    organizationId: data.organizationId,
    developedBy: data.developedBy,
    vendorName: normalizeOptionalText(data.vendorName),
    descriptionEN: data.descriptionEN.trim(),
    descriptionFR: normalizeOptionalText(data.descriptionFR),
    capabilitiesEN: normalizeOptionalText(data.capabilitiesEN),
    capabilitiesFR: normalizeOptionalText(data.capabilitiesFR),
    primaryUsers: data.primaryUsers,
    isAutomatedDecisionSystem: data.isAutomatedDecisionSystem,
    openGovAiaId: normalizeOptionalText(data.openGovAiaId),
    involvesPersonalInfo: data.involvesPersonalInfo,
    personalInformationBanksEN: normalizeOptionalText(data.personalInformationBanksEN),
    personalInformationBanksFR: normalizeOptionalText(data.personalInformationBanksFR),
    hasUserNotification: data.hasUserNotification,
    status: data.status,
    statusYear: data.statusYear,
    dataSourcesEN: normalizeOptionalText(data.dataSourcesEN),
    dataSourcesFR: normalizeOptionalText(data.dataSourcesFR),
    atipRequestRefsEN: normalizeOptionalText(data.atipRequestRefsEN),
    atipRequestRefsFR: normalizeOptionalText(data.atipRequestRefsFR),
    outcomesEN: normalizeOptionalText(data.outcomesEN),
    outcomesFR: normalizeOptionalText(data.outcomesFR),
    featured: data.featured,
    isOpenSource: data.isOpenSource,
    githubUrl: normalizeOptionalText(data.githubUrl),
  };
}
