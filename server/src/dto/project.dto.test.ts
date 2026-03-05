import test from 'node:test';
import assert from 'node:assert/strict';
import { ModerationState, ProjectStatus, TranslationStatus } from '../../generated/prisma';
import { toCreateProjectData, toUpdateProjectData } from './project.dto';

test('toCreateProjectData maps legacy single-language fields to bilingual schema', () => {
  const mapped = toCreateProjectData({
    name: 'Legacy Project',
    description: 'Legacy description',
    organizationId: 'org-1',
    primaryUsers: 'Employees',
    developedBy: 'Government',
    status: 'InDevelopment',
  });

  assert.equal(mapped.nameEN, 'Legacy Project');
  assert.equal(mapped.nameFR, '');
  assert.equal(mapped.descriptionEN, 'Legacy description');
  assert.equal(mapped.descriptionFR, '');
  assert.equal(mapped.translationStatus, TranslationStatus.Incomplete);
  assert.deepEqual(mapped.organization, { connect: { id: 'org-1' } });
});

test('toUpdateProjectData keeps translation incomplete until french fields are explicitly provided', () => {
  const existing = {
    id: 'p1',
    aiRegisterId: null,
    nameEN: 'Project A',
    nameFR: '',
    serviceInventoryId: null,
    organizationId: 'org-1',
    descriptionEN: 'EN',
    descriptionFR: '',
    primaryUsers: 'Employees',
    developedBy: 'Government',
    vendorName: null,
    status: ProjectStatus.InDevelopment,
    statusYear: null,
    capabilitiesEN: null,
    capabilitiesFR: null,
    isAutomatedDecisionSystem: false,
    openGovAiaId: null,
    dataSourcesEN: null,
    dataSourcesFR: null,
    involvesPersonalInfo: false,
    personalInformationBanksEN: null,
    personalInformationBanksFR: null,
    hasUserNotification: false,
    atipRequestRefsEN: null,
    atipRequestRefsFR: null,
    outcomesEN: null,
    outcomesFR: null,
    source1: null,
    source2: null,
    moderationState: ModerationState.Draft,
    translationStatus: TranslationStatus.Incomplete,
    ownerEntraObjectId: 'user-1',
    submittedAt: null,
    approvedAt: null,
    publishedAt: null,
    reviewNotes: null,
    featured: false,
    isOpenSource: false,
    githubUrl: null,
    createdBy: null,
    updatedBy: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as const;

  const unchangedTranslation = toUpdateProjectData(existing as any, {
    descriptionEN: 'Updated EN description',
  });
  assert.equal(
    unchangedTranslation.translationStatus,
    TranslationStatus.Incomplete
  );

  const translated = toUpdateProjectData(existing as any, {
    nameFR: 'Projet A',
    descriptionFR: 'Description FR',
    capabilitiesEN: 'Search',
    capabilitiesFR: 'Recherche',
    dataSourcesEN: 'Internal registry',
    dataSourcesFR: 'Registre interne',
    outcomesEN: 'Faster service',
    outcomesFR: 'Service plus rapide',
  });
  assert.equal(translated.translationStatus, TranslationStatus.Ready);
});

test('toUpdateProjectData keeps translation incomplete when optional EN content lacks FR content', () => {
  const existing = {
    id: 'p2',
    aiRegisterId: null,
    nameEN: 'Project A',
    nameFR: 'Projet A',
    serviceInventoryId: null,
    organizationId: 'org-1',
    descriptionEN: 'EN',
    descriptionFR: 'FR',
    primaryUsers: 'Employees',
    developedBy: 'Government',
    vendorName: null,
    status: ProjectStatus.InDevelopment,
    statusYear: null,
    capabilitiesEN: null,
    capabilitiesFR: null,
    isAutomatedDecisionSystem: false,
    openGovAiaId: null,
    dataSourcesEN: null,
    dataSourcesFR: null,
    involvesPersonalInfo: false,
    personalInformationBanksEN: null,
    personalInformationBanksFR: null,
    hasUserNotification: false,
    atipRequestRefsEN: null,
    atipRequestRefsFR: null,
    outcomesEN: null,
    outcomesFR: null,
    source1: null,
    source2: null,
    moderationState: ModerationState.Draft,
    translationStatus: TranslationStatus.Ready,
    ownerEntraObjectId: 'user-1',
    submittedAt: null,
    approvedAt: null,
    publishedAt: null,
    reviewNotes: null,
    featured: false,
    isOpenSource: false,
    githubUrl: null,
    createdBy: null,
    updatedBy: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as const;

  const updated = toUpdateProjectData(existing as any, {
    capabilitiesEN: 'Search, ranking',
  });

  assert.equal(updated.translationStatus, TranslationStatus.Incomplete);
});
