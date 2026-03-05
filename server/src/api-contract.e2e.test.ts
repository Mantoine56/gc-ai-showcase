import test from 'node:test';
import assert from 'node:assert/strict';
import { AIAssistantService } from './services/ai-assistant.service';

test('assistant query returns answer, suggestions, and citations contract', async () => {
  const mockPrisma = {
    project: {
      findMany: async () => [
        {
          id: 'p1',
          nameEN: 'Service Chatbot',
          nameFR: 'Chatbot de service',
          descriptionEN: 'Helps people find services.',
          descriptionFR: 'Aide les gens a trouver des services.',
          status: 'InProduction',
          organization: {
            id: 'o1',
            nameEN: 'Service Canada',
            nameFR: 'Service Canada',
          },
          isAutomatedDecisionSystem: false,
          involvesPersonalInfo: false,
          isOpenSource: true,
          capabilitiesEN: 'Chatbot',
          capabilitiesFR: 'Chatbot',
        },
      ],
      count: async () => 1,
    },
  };

  const assistant = new AIAssistantService(mockPrisma as any);
  const result = await assistant.query('show chatbot projects', 'en');

  assert.equal(typeof result.answer, 'string');
  assert.equal(Array.isArray(result.projects), true);
  assert.equal(Array.isArray(result.citations), true);
  assert.equal(Array.isArray(result.suggestions), true);
  assert.equal(result.projects[0]?.id, 'p1');
  assert.equal(result.citations[0]?.href, '/project/p1');
});
