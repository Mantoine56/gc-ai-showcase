import test from 'node:test';
import assert from 'node:assert/strict';
import { assertValidTransition, computeTranslationStatus } from './project-workflow.service';

test('assertValidTransition allows configured moderation transitions', () => {
  assert.doesNotThrow(() => assertValidTransition('Draft', 'Submitted'));
  assert.doesNotThrow(() => assertValidTransition('Submitted', 'Approved'));
  assert.doesNotThrow(() => assertValidTransition('Approved', 'Published'));
});

test('assertValidTransition rejects invalid transitions', () => {
  assert.throws(
    () => assertValidTransition('Draft', 'Published'),
    /Invalid moderation transition/
  );
  assert.throws(
    () => assertValidTransition('Archived', 'Draft'),
    /Invalid moderation transition/
  );
});

test('computeTranslationStatus requires french fields to be present', () => {
  assert.equal(
    computeTranslationStatus({
      nameEN: 'Name',
      nameFR: 'Nom',
      descriptionEN: 'Description',
      descriptionFR: 'Description',
      capabilitiesEN: 'Search',
      capabilitiesFR: 'Recherche',
      dataSourcesEN: null,
      dataSourcesFR: null,
      personalInformationBanksEN: null,
      personalInformationBanksFR: null,
      atipRequestRefsEN: null,
      atipRequestRefsFR: null,
      outcomesEN: null,
      outcomesFR: null,
    }),
    'Ready'
  );

  assert.equal(
    computeTranslationStatus({
      nameEN: 'Name',
      nameFR: '',
      descriptionEN: 'Description',
      descriptionFR: 'Description',
      capabilitiesEN: null,
      capabilitiesFR: null,
      dataSourcesEN: null,
      dataSourcesFR: null,
      personalInformationBanksEN: null,
      personalInformationBanksFR: null,
      atipRequestRefsEN: null,
      atipRequestRefsFR: null,
      outcomesEN: null,
      outcomesFR: null,
    }),
    'Incomplete'
  );
});

test('computeTranslationStatus requires both languages when optional content is present', () => {
  assert.equal(
    computeTranslationStatus({
      nameEN: 'Name',
      nameFR: 'Nom',
      descriptionEN: 'Description',
      descriptionFR: 'Description',
      capabilitiesEN: 'Search',
      capabilitiesFR: '',
      dataSourcesEN: null,
      dataSourcesFR: null,
      personalInformationBanksEN: null,
      personalInformationBanksFR: null,
      atipRequestRefsEN: null,
      atipRequestRefsFR: null,
      outcomesEN: null,
      outcomesFR: null,
    }),
    'Incomplete'
  );
});
