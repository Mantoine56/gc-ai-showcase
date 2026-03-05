export interface ReadinessItem {
  key: string;
  label: string;
  complete: boolean;
  required: boolean;
}

export interface PublishReadinessSource {
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
  involvesPersonalInfo?: boolean;
}

function hasText(value: string | null | undefined): boolean {
  return Boolean(value?.trim());
}

function isRequiredPairComplete(en: string | undefined, fr: string | undefined) {
  return hasText(en) && hasText(fr);
}

function isOptionalPairComplete(en: string | undefined, fr: string | undefined) {
  const enHasValue = hasText(en);
  const frHasValue = hasText(fr);
  return (!enHasValue && !frHasValue) || (enHasValue && frHasValue);
}

export function getPublishReadiness(data: PublishReadinessSource) {
  const items: ReadinessItem[] = [
    {
      key: 'name',
      label: 'Name (EN/FR)',
      complete: isRequiredPairComplete(data.nameEN, data.nameFR),
      required: true,
    },
    {
      key: 'description',
      label: 'Description (EN/FR)',
      complete: isRequiredPairComplete(data.descriptionEN, data.descriptionFR),
      required: true,
    },
    {
      key: 'capabilities',
      label: 'Capabilities (EN/FR)',
      complete: isRequiredPairComplete(data.capabilitiesEN, data.capabilitiesFR),
      required: true,
    },
    {
      key: 'dataSources',
      label: 'Data sources (EN/FR)',
      complete: isRequiredPairComplete(data.dataSourcesEN, data.dataSourcesFR),
      required: true,
    },
    {
      key: 'outcomes',
      label: 'Outcomes (EN/FR)',
      complete: isRequiredPairComplete(data.outcomesEN, data.outcomesFR),
      required: true,
    },
    {
      key: 'personalInformationBanks',
      label: 'PIB references',
      complete: data.involvesPersonalInfo
        ? isRequiredPairComplete(
            data.personalInformationBanksEN,
            data.personalInformationBanksFR
          )
        : isOptionalPairComplete(
            data.personalInformationBanksEN,
            data.personalInformationBanksFR
          ),
      required: Boolean(data.involvesPersonalInfo),
    },
    {
      key: 'atipRequestRefs',
      label: 'ATIP references',
      complete: isOptionalPairComplete(data.atipRequestRefsEN, data.atipRequestRefsFR),
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

export function isProjectPublishReady(data: PublishReadinessSource) {
  return getPublishReadiness(data).isReady;
}
