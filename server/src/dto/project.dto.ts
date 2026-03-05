import { Project, Prisma, TranslationStatus } from '../../generated/prisma';
import { computeTranslationStatus } from '../services/project-workflow.service';

function cleanString(value: string | null | undefined): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function coalesce(...values: Array<string | null | undefined>): string | undefined {
  for (const value of values) {
    const cleaned = cleanString(value);
    if (cleaned) return cleaned;
  }
  return undefined;
}

export interface ProjectWriteDTO {
  // Canonical bilingual fields
  nameEN?: string;
  nameFR?: string;
  descriptionEN?: string;
  descriptionFR?: string;
  capabilitiesEN?: string;
  capabilitiesFR?: string;
  dataSourcesEN?: string;
  dataSourcesFR?: string;
  personalInformationBanksEN?: string;
  personalInformationBanksFR?: string;
  atipRequestRefsEN?: string;
  atipRequestRefsFR?: string;
  outcomesEN?: string;
  outcomesFR?: string;

  // Legacy single-language aliases (accepted for compatibility)
  name?: string;
  description?: string;
  capabilities?: string;
  dataSources?: string;
  personalInformationBanks?: string;
  atipRequestRefs?: string;
  outcomes?: string;

  serviceInventoryId?: string;
  organizationId?: string;
  primaryUsers?: Project['primaryUsers'];
  developedBy?: Project['developedBy'];
  vendorName?: string;
  status?: Project['status'];
  statusYear?: number;
  isAutomatedDecisionSystem?: boolean;
  openGovAiaId?: string;
  involvesPersonalInfo?: boolean;
  hasUserNotification?: boolean;
  featured?: boolean;
  isOpenSource?: boolean;
  githubUrl?: string;
  moderationState?: Project['moderationState'];
  reviewNotes?: string;
}

function mapBilingualField(
  data: ProjectWriteDTO,
  field: 'name' | 'description' | 'capabilities' | 'dataSources' | 'personalInformationBanks' | 'atipRequestRefs' | 'outcomes'
): { en?: string; fr?: string } {
  return {
    en: coalesce(data[`${field}EN` as keyof ProjectWriteDTO] as string | undefined, data[field] as string | undefined),
    fr: coalesce(data[`${field}FR` as keyof ProjectWriteDTO] as string | undefined),
  };
}

export function toCreateProjectData(
  data: ProjectWriteDTO,
  ownerEntraObjectId?: string
): Prisma.ProjectCreateInput {
  const name = mapBilingualField(data, 'name');
  const description = mapBilingualField(data, 'description');
  const capabilities = mapBilingualField(data, 'capabilities');
  const dataSources = mapBilingualField(data, 'dataSources');
  const personalInformationBanks = mapBilingualField(data, 'personalInformationBanks');
  const atipRequestRefs = mapBilingualField(data, 'atipRequestRefs');
  const outcomes = mapBilingualField(data, 'outcomes');

  const nameEN = name.en || '';
  const descriptionEN = description.en || '';
  const nameFR = cleanString(name.fr) || '';
  const descriptionFR = cleanString(description.fr) || '';
  const capabilitiesEN = cleanString(capabilities.en) || null;
  const capabilitiesFR = cleanString(capabilities.fr) || null;
  const dataSourcesEN = cleanString(dataSources.en) || null;
  const dataSourcesFR = cleanString(dataSources.fr) || null;
  const personalInformationBanksEN = cleanString(personalInformationBanks.en) || null;
  const personalInformationBanksFR = cleanString(personalInformationBanks.fr) || null;
  const atipRequestRefsEN = cleanString(atipRequestRefs.en) || null;
  const atipRequestRefsFR = cleanString(atipRequestRefs.fr) || null;
  const outcomesEN = cleanString(outcomes.en) || null;
  const outcomesFR = cleanString(outcomes.fr) || null;
  const translationStatus = computeTranslationStatus({
    nameEN,
    nameFR,
    descriptionEN,
    descriptionFR,
    capabilitiesEN,
    capabilitiesFR,
    dataSourcesEN,
    dataSourcesFR,
    personalInformationBanksEN,
    personalInformationBanksFR,
    atipRequestRefsEN,
    atipRequestRefsFR,
    outcomesEN,
    outcomesFR,
    involvesPersonalInfo: Boolean(data.involvesPersonalInfo),
  });

  return {
    nameEN,
    nameFR,
    serviceInventoryId: cleanString(data.serviceInventoryId) || null,
    organization: {
      connect: {
        id: data.organizationId || '',
      },
    },
    descriptionEN,
    descriptionFR,
    primaryUsers: data.primaryUsers!,
    developedBy: data.developedBy!,
    vendorName: cleanString(data.vendorName) || null,
    status: data.status!,
    statusYear: data.statusYear || null,
    capabilitiesEN,
    capabilitiesFR,
    isAutomatedDecisionSystem: Boolean(data.isAutomatedDecisionSystem),
    openGovAiaId: cleanString(data.openGovAiaId) || null,
    dataSourcesEN,
    dataSourcesFR,
    involvesPersonalInfo: Boolean(data.involvesPersonalInfo),
    personalInformationBanksEN,
    personalInformationBanksFR,
    hasUserNotification: Boolean(data.hasUserNotification),
    atipRequestRefsEN,
    atipRequestRefsFR,
    outcomesEN,
    outcomesFR,
    featured: Boolean(data.featured),
    isOpenSource: Boolean(data.isOpenSource),
    githubUrl: cleanString(data.githubUrl) || null,
    moderationState: 'Draft',
    ownerEntraObjectId: ownerEntraObjectId || null,
    translationStatus,
  };
}

export function toUpdateProjectData(
  existing: Project,
  patch: ProjectWriteDTO
): Prisma.ProjectUpdateInput {
  const name = mapBilingualField(patch, 'name');
  const description = mapBilingualField(patch, 'description');
  const capabilities = mapBilingualField(patch, 'capabilities');
  const dataSources = mapBilingualField(patch, 'dataSources');
  const personalInformationBanks = mapBilingualField(patch, 'personalInformationBanks');
  const atipRequestRefs = mapBilingualField(patch, 'atipRequestRefs');
  const outcomes = mapBilingualField(patch, 'outcomes');

  const nextNameEN = name.en || existing.nameEN;
  let nextNameFR: string;
  if (patch.nameFR !== undefined) {
    nextNameFR = cleanString(patch.nameFR) || '';
  } else {
    nextNameFR = existing.nameFR;
  }

  const nextDescriptionEN = description.en || existing.descriptionEN;
  let nextDescriptionFR: string;
  if (patch.descriptionFR !== undefined) {
    nextDescriptionFR = cleanString(patch.descriptionFR) || '';
  } else {
    nextDescriptionFR = existing.descriptionFR;
  }

  const nextCapabilitiesEN =
    capabilities.en !== undefined || patch.capabilitiesEN === '' || patch.capabilities === ''
      ? cleanString(capabilities.en) || null
      : existing.capabilitiesEN;
  const nextCapabilitiesFR =
    capabilities.fr !== undefined || patch.capabilitiesFR === ''
      ? cleanString(capabilities.fr) || null
      : existing.capabilitiesFR;
  const nextDataSourcesEN =
    dataSources.en !== undefined || patch.dataSourcesEN === '' || patch.dataSources === ''
      ? cleanString(dataSources.en) || null
      : existing.dataSourcesEN;
  const nextDataSourcesFR =
    dataSources.fr !== undefined || patch.dataSourcesFR === ''
      ? cleanString(dataSources.fr) || null
      : existing.dataSourcesFR;
  const nextPersonalInformationBanksEN =
    personalInformationBanks.en !== undefined ||
    patch.personalInformationBanksEN === '' ||
    patch.personalInformationBanks === ''
      ? cleanString(personalInformationBanks.en) || null
      : existing.personalInformationBanksEN;
  const nextPersonalInformationBanksFR =
    personalInformationBanks.fr !== undefined || patch.personalInformationBanksFR === ''
      ? cleanString(personalInformationBanks.fr) || null
      : existing.personalInformationBanksFR;
  const nextAtipRequestRefsEN =
    atipRequestRefs.en !== undefined || patch.atipRequestRefsEN === '' || patch.atipRequestRefs === ''
      ? cleanString(atipRequestRefs.en) || null
      : existing.atipRequestRefsEN;
  const nextAtipRequestRefsFR =
    atipRequestRefs.fr !== undefined || patch.atipRequestRefsFR === ''
      ? cleanString(atipRequestRefs.fr) || null
      : existing.atipRequestRefsFR;
  const nextOutcomesEN =
    outcomes.en !== undefined || patch.outcomesEN === '' || patch.outcomes === ''
      ? cleanString(outcomes.en) || null
      : existing.outcomesEN;
  const nextOutcomesFR =
    outcomes.fr !== undefined || patch.outcomesFR === ''
      ? cleanString(outcomes.fr) || null
      : existing.outcomesFR;
  const translationStatus: TranslationStatus = computeTranslationStatus({
    nameEN: nextNameEN,
    nameFR: nextNameFR,
    descriptionEN: nextDescriptionEN,
    descriptionFR: nextDescriptionFR,
    capabilitiesEN: nextCapabilitiesEN,
    capabilitiesFR: nextCapabilitiesFR,
    dataSourcesEN: nextDataSourcesEN,
    dataSourcesFR: nextDataSourcesFR,
    personalInformationBanksEN: nextPersonalInformationBanksEN,
    personalInformationBanksFR: nextPersonalInformationBanksFR,
    atipRequestRefsEN: nextAtipRequestRefsEN,
    atipRequestRefsFR: nextAtipRequestRefsFR,
    outcomesEN: nextOutcomesEN,
    outcomesFR: nextOutcomesFR,
    involvesPersonalInfo:
      patch.involvesPersonalInfo !== undefined
        ? patch.involvesPersonalInfo
        : existing.involvesPersonalInfo,
  });

  const update: Prisma.ProjectUpdateInput = {
    nameEN: nextNameEN,
    nameFR: nextNameFR,
    descriptionEN: nextDescriptionEN,
    descriptionFR: nextDescriptionFR,
    translationStatus,
  };

  if (patch.organizationId !== undefined) {
    update.organization = { connect: { id: patch.organizationId } };
  }
  if (patch.serviceInventoryId !== undefined) {
    update.serviceInventoryId = cleanString(patch.serviceInventoryId) || null;
  }
  if (patch.primaryUsers !== undefined) {
    update.primaryUsers = patch.primaryUsers;
  }
  if (patch.developedBy !== undefined) {
    update.developedBy = patch.developedBy;
  }
  if (patch.vendorName !== undefined) {
    update.vendorName = cleanString(patch.vendorName) || null;
  }
  if (patch.status !== undefined) {
    update.status = patch.status;
  }
  if (patch.statusYear !== undefined) {
    update.statusYear = patch.statusYear || null;
  }
  if (capabilities.en !== undefined || capabilities.fr !== undefined || patch.capabilitiesEN === '' || patch.capabilitiesFR === '' || patch.capabilities === '') {
    update.capabilitiesEN = nextCapabilitiesEN;
    update.capabilitiesFR = nextCapabilitiesFR;
  }
  if (patch.isAutomatedDecisionSystem !== undefined) {
    update.isAutomatedDecisionSystem = patch.isAutomatedDecisionSystem;
  }
  if (patch.openGovAiaId !== undefined) {
    update.openGovAiaId = cleanString(patch.openGovAiaId) || null;
  }
  if (dataSources.en !== undefined || dataSources.fr !== undefined || patch.dataSourcesEN === '' || patch.dataSourcesFR === '' || patch.dataSources === '') {
    update.dataSourcesEN = nextDataSourcesEN;
    update.dataSourcesFR = nextDataSourcesFR;
  }
  if (patch.involvesPersonalInfo !== undefined) {
    update.involvesPersonalInfo = patch.involvesPersonalInfo;
  }
  if (
    personalInformationBanks.en !== undefined ||
    personalInformationBanks.fr !== undefined ||
    patch.personalInformationBanksEN === '' ||
    patch.personalInformationBanksFR === '' ||
    patch.personalInformationBanks === ''
  ) {
    update.personalInformationBanksEN = nextPersonalInformationBanksEN;
    update.personalInformationBanksFR = nextPersonalInformationBanksFR;
  }
  if (patch.hasUserNotification !== undefined) {
    update.hasUserNotification = patch.hasUserNotification;
  }
  if (atipRequestRefs.en !== undefined || atipRequestRefs.fr !== undefined || patch.atipRequestRefsEN === '' || patch.atipRequestRefsFR === '' || patch.atipRequestRefs === '') {
    update.atipRequestRefsEN = nextAtipRequestRefsEN;
    update.atipRequestRefsFR = nextAtipRequestRefsFR;
  }
  if (outcomes.en !== undefined || outcomes.fr !== undefined || patch.outcomesEN === '' || patch.outcomesFR === '' || patch.outcomes === '') {
    update.outcomesEN = nextOutcomesEN;
    update.outcomesFR = nextOutcomesFR;
  }
  if (patch.featured !== undefined) {
    update.featured = patch.featured;
  }
  if (patch.isOpenSource !== undefined) {
    update.isOpenSource = patch.isOpenSource;
  }
  if (patch.githubUrl !== undefined) {
    update.githubUrl = cleanString(patch.githubUrl) || null;
  }
  if (patch.reviewNotes !== undefined) {
    update.reviewNotes = cleanString(patch.reviewNotes) || null;
  }
  if (patch.moderationState !== undefined) {
    update.moderationState = patch.moderationState;
  }

  return update;
}

type ProjectLike = {
  nameEN: string;
  descriptionEN: string;
  capabilitiesEN: string | null;
  dataSourcesEN: string | null;
  personalInformationBanksEN: string | null;
  atipRequestRefsEN: string | null;
  outcomesEN: string | null;
};

export function serializeProject<T extends ProjectLike>(project: T) {
  return {
    ...project,
    name: project.nameEN,
    description: project.descriptionEN,
    capabilities: project.capabilitiesEN,
    dataSources: project.dataSourcesEN,
    personalInformationBanks: project.personalInformationBanksEN,
    atipRequestRefs: project.atipRequestRefsEN,
    outcomes: project.outcomesEN,
  };
}

export function serializeProjects<T extends ProjectLike>(projects: T[]) {
  return projects.map((project) => serializeProject(project));
}
