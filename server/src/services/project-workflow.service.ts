import {
  ModerationState,
  Project,
  TranslationStatus,
} from '../../generated/prisma';

const ALLOWED_TRANSITIONS: Record<ModerationState, ModerationState[]> = {
  Draft: ['Submitted', 'Archived'],
  Submitted: ['Approved', 'Draft', 'Archived'],
  Approved: ['Published', 'Archived'],
  Published: ['Archived'],
  Archived: [],
};

export function assertValidTransition(
  from: ModerationState,
  to: ModerationState
): void {
  if (from === to) return;
  if (!ALLOWED_TRANSITIONS[from].includes(to)) {
    throw new Error(`Invalid moderation transition: ${from} -> ${to}`);
  }
}

type TranslationFieldBase =
  | 'name'
  | 'description'
  | 'capabilities'
  | 'dataSources'
  | 'personalInformationBanks'
  | 'atipRequestRefs'
  | 'outcomes';

type TranslationStatusInput = Pick<
  Project,
  | 'nameEN'
  | 'nameFR'
  | 'descriptionEN'
  | 'descriptionFR'
  | 'capabilitiesEN'
  | 'capabilitiesFR'
  | 'dataSourcesEN'
  | 'dataSourcesFR'
  | 'personalInformationBanksEN'
  | 'personalInformationBanksFR'
  | 'atipRequestRefsEN'
  | 'atipRequestRefsFR'
  | 'outcomesEN'
  | 'outcomesFR'
  | 'involvesPersonalInfo'
>;

const REQUIRED_BILINGUAL_FIELDS: TranslationFieldBase[] = [
  'name',
  'description',
  'capabilities',
  'dataSources',
  'outcomes',
];
const OPTIONAL_BILINGUAL_FIELDS: TranslationFieldBase[] = [
  'personalInformationBanks',
  'atipRequestRefs',
];

function hasValue(value: string | null | undefined): boolean {
  return Boolean(value?.trim());
}

function getBilingualValues(project: TranslationStatusInput, field: TranslationFieldBase) {
  return {
    en: project[`${field}EN` as keyof TranslationStatusInput] as string | null | undefined,
    fr: project[`${field}FR` as keyof TranslationStatusInput] as string | null | undefined,
  };
}

export function hasFrenchContentForPublish(project: TranslationStatusInput): boolean {
  const requiredFieldsComplete = REQUIRED_BILINGUAL_FIELDS.every((field) => {
    const { en, fr } = getBilingualValues(project, field);
    return hasValue(en) && hasValue(fr);
  });

  if (!requiredFieldsComplete) {
    return false;
  }

  const personalInformationBanksValid = project.involvesPersonalInfo
    ? (() => {
        const { en, fr } = getBilingualValues(project, 'personalInformationBanks');
        return hasValue(en) && hasValue(fr);
      })()
    : true;

  if (!personalInformationBanksValid) {
    return false;
  }

  return OPTIONAL_BILINGUAL_FIELDS.every((field) => {
    if (field === 'personalInformationBanks') {
      const { en, fr } = getBilingualValues(project, field);
      const enHasValue = hasValue(en);
      const frHasValue = hasValue(fr);
      return (!enHasValue && !frHasValue) || (enHasValue && frHasValue);
    }

    const { en, fr } = getBilingualValues(project, field);
    const enHasValue = hasValue(en);
    const frHasValue = hasValue(fr);

    return (!enHasValue && !frHasValue) || (enHasValue && frHasValue);
  });
}

export function computeTranslationStatus(
  project: TranslationStatusInput
): TranslationStatus {
  return hasFrenchContentForPublish(project) ? 'Ready' : 'Incomplete';
}
