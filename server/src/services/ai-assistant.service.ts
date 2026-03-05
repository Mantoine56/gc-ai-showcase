import {
  Prisma,
  PrismaClient,
  ProjectStatus,
  PrimaryUsers,
} from '../../generated/prisma';

type AssistantLocale = 'en' | 'fr';

interface QueryIntent {
  type: 'search' | 'stats' | 'general';
  statuses?: ProjectStatus[];
  primaryUsers?: PrimaryUsers[];
  adsOnly?: boolean;
  personalInfoOnly?: boolean;
  keywords: string[];
}

interface AssistantProjectResult {
  id: string;
  nameEN: string;
  nameFR: string;
  descriptionEN: string;
  descriptionFR: string;
  status: ProjectStatus;
  organization: {
    id: string;
    nameEN: string;
    nameFR: string;
  };
  isAutomatedDecisionSystem: boolean;
  involvesPersonalInfo: boolean;
  isOpenSource: boolean;
  capabilitiesEN: string | null;
  capabilitiesFR: string | null;
}

interface AssistantCitation {
  projectId: string;
  title: string;
  href: string;
}

interface AssistantResponse {
  answer: string;
  projects: Array<{
    id: string;
    nameEN: string;
    nameFR: string;
    descriptionEN: string;
    descriptionFR: string;
    status: ProjectStatus;
    organizationNameEN: string;
    organizationNameFR: string;
    isAutomatedDecisionSystem: boolean;
    involvesPersonalInfo: boolean;
    isOpenSource: boolean;
  }>;
  citations: AssistantCitation[];
  suggestions: string[];
}

const DEFAULT_SUGGESTIONS: Record<AssistantLocale, string[]> = {
  en: [
    'How many projects are in production?',
    'Show projects that involve personal information',
    'List automated decision systems',
    'Show open source AI projects',
  ],
  fr: [
    'Combien de projets sont en production?',
    'Montrez les projets qui impliquent des renseignements personnels',
    'Lister les systèmes de décision automatisée',
    'Montrez les projets IA open source',
  ],
};

const KEYWORD_HINTS = [
  'chatbot',
  'vision',
  'translation',
  'document',
  'classification',
  'prediction',
  'detection',
  'fraud',
  'search',
];

function parseKeywords(query: string): string[] {
  const normalized = query.toLowerCase();
  return KEYWORD_HINTS.filter((keyword) => normalized.includes(keyword));
}

function localizeField(
  locale: AssistantLocale,
  enValue: string | null | undefined,
  frValue: string | null | undefined
): string {
  if (locale === 'fr') return frValue || enValue || '';
  return enValue || frValue || '';
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}…`;
}

export class AIAssistantService {
  constructor(private readonly prisma: PrismaClient) {}

  private parseIntent(userQuery: string): QueryIntent {
    const query = userQuery.toLowerCase();
    const intent: QueryIntent = {
      type: 'general',
      keywords: parseKeywords(userQuery),
    };

    if (query.includes('how many') || query.includes('count') || query.includes('combien')) {
      intent.type = 'stats';
    } else if (
      query.includes('show') ||
      query.includes('find') ||
      query.includes('list') ||
      query.includes('montre') ||
      query.includes('trouve')
    ) {
      intent.type = 'search';
    }

    if (query.includes('production') || query.includes('live')) {
      intent.statuses = ['InProduction'];
    } else if (query.includes('development') || query.includes('pilot')) {
      intent.statuses = ['InDevelopment'];
    } else if (query.includes('retired')) {
      intent.statuses = ['Retired'];
    }

    if (query.includes('public') || query.includes('citizen')) {
      intent.primaryUsers = ['MembersOfPublic'];
    } else if (query.includes('employee') || query.includes('internal')) {
      intent.primaryUsers = ['Employees'];
    }

    if (
      query.includes('automated decision') ||
      query.includes('ads') ||
      query.includes('décision automatis')
    ) {
      intent.adsOnly = true;
    }

    if (
      query.includes('personal information') ||
      query.includes('privacy') ||
      query.includes('renseignements personnels')
    ) {
      intent.personalInfoOnly = true;
    }

    return intent;
  }

  private buildWhere(intent: QueryIntent) {
    const where: Prisma.ProjectWhereInput = {
      moderationState: 'Published',
    };

    if (intent.statuses?.length) {
      where.status = { in: intent.statuses };
    }

    if (intent.primaryUsers?.length) {
      where.primaryUsers = { in: intent.primaryUsers };
    }

    if (intent.adsOnly) where.isAutomatedDecisionSystem = true;
    if (intent.personalInfoOnly) where.involvesPersonalInfo = true;

    if (intent.keywords.length > 0) {
      where.AND = intent.keywords.map((keyword) => ({
        OR: [
          { nameEN: { contains: keyword } },
          { nameFR: { contains: keyword } },
          { descriptionEN: { contains: keyword } },
          { descriptionFR: { contains: keyword } },
          { capabilitiesEN: { contains: keyword } },
          { capabilitiesFR: { contains: keyword } },
        ],
      }));
    }

    return where;
  }

  private formatProjectOutput(projects: AssistantProjectResult[]) {
    return projects.map((project) => ({
      id: project.id,
      nameEN: project.nameEN,
      nameFR: project.nameFR,
      descriptionEN: project.descriptionEN,
      descriptionFR: project.descriptionFR,
      status: project.status,
      organizationNameEN: project.organization.nameEN,
      organizationNameFR: project.organization.nameFR,
      isAutomatedDecisionSystem: project.isAutomatedDecisionSystem,
      involvesPersonalInfo: project.involvesPersonalInfo,
      isOpenSource: project.isOpenSource,
    }));
  }

  private buildCitations(projects: AssistantProjectResult[], locale: AssistantLocale): AssistantCitation[] {
    return projects.slice(0, 5).map((project) => ({
      projectId: project.id,
      title: localizeField(locale, project.nameEN, project.nameFR),
      href: `/project/${project.id}`,
    }));
  }

  private getMetadataSafeContext(projects: AssistantProjectResult[], locale: AssistantLocale) {
    return projects.slice(0, 12).map((project) => ({
      id: project.id,
      name: localizeField(locale, project.nameEN, project.nameFR),
      descriptionSummary: truncate(
        localizeField(locale, project.descriptionEN, project.descriptionFR),
        240
      ),
      status: project.status,
      organization: localizeField(locale, project.organization.nameEN, project.organization.nameFR),
      capabilityTags: localizeField(locale, project.capabilitiesEN, project.capabilitiesFR)
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
        .slice(0, 8),
      flags: {
        automatedDecisionSystem: project.isAutomatedDecisionSystem,
        involvesPersonalInfo: project.involvesPersonalInfo,
        openSource: project.isOpenSource,
      },
    }));
  }

  private async generateWithOpenAI(
    userQuery: string,
    locale: AssistantLocale,
    projects: AssistantProjectResult[],
    totalCount: number
  ): Promise<string | null> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return null;

    const model = process.env.OPENAI_ASSISTANT_MODEL || 'gpt-4o-mini';
    const contextPayload = this.getMetadataSafeContext(projects, locale);

    const systemPrompt =
      locale === 'fr'
        ? 'Vous êtes un assistant du registre IA du gouvernement du Canada. Répondez avec des faits, en français, en vous basant uniquement sur le contexte fourni.'
        : 'You are the Government of Canada AI registry assistant. Respond factually in English and use only the provided context.';

    const userPrompt = JSON.stringify({
      query: userQuery,
      resultCount: totalCount,
      projects: contextPayload,
      instructions:
        locale === 'fr'
          ? 'Résumez les résultats en 2-4 phrases et mentionnez le nombre de projets trouvés.'
          : 'Summarize results in 2-4 sentences and mention the number of matching projects.',
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error('OpenAI assistant call failed:', response.status, body);
      return null;
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return payload.choices?.[0]?.message?.content?.trim() || null;
  }

  private buildDeterministicAnswer(
    locale: AssistantLocale,
    intent: QueryIntent,
    projects: AssistantProjectResult[],
    totalCount: number
  ): string {
    if (intent.type === 'stats') {
      const inProduction = projects.filter((project) => project.status === 'InProduction').length;
      if (locale === 'fr') {
        return `J'ai trouvé ${totalCount} projet(s) correspondant à votre demande. Parmi les résultats affichés, ${inProduction} sont en production.`;
      }
      return `I found ${totalCount} matching project(s). Among the displayed results, ${inProduction} are in production.`;
    }

    if (projects.length === 0) {
      return locale === 'fr'
        ? "Je n'ai trouvé aucun projet correspondant. Essayez d'élargir les filtres ou d'utiliser des mots-clés différents."
        : 'I could not find matching projects. Try broader filters or different keywords.';
    }

    const leadProject = localizeField(locale, projects[0].nameEN, projects[0].nameFR);
    if (locale === 'fr') {
      return `J'ai trouvé ${totalCount} projet(s). Le premier résultat est « ${leadProject} ». Consultez les citations pour ouvrir les fiches projet.`;
    }
    return `I found ${totalCount} matching project(s). The top result is "${leadProject}". Use the citations to open project records.`;
  }

  async query(userQuery: string, locale: AssistantLocale = 'en'): Promise<AssistantResponse> {
    const intent = this.parseIntent(userQuery);
    const where = this.buildWhere(intent);

    const [projects, totalCount] = await Promise.all([
      this.prisma.project.findMany({
        where,
        include: {
          organization: true,
        },
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
        take: 12,
      }),
      this.prisma.project.count({ where }),
    ]);

    const typedProjects = projects as AssistantProjectResult[];
    const citations = this.buildCitations(typedProjects, locale);

    const llmAnswer = await this.generateWithOpenAI(userQuery, locale, typedProjects, totalCount);
    const answer =
      llmAnswer || this.buildDeterministicAnswer(locale, intent, typedProjects, totalCount);

    return {
      answer,
      projects: this.formatProjectOutput(typedProjects),
      citations,
      suggestions: DEFAULT_SUGGESTIONS[locale],
    };
  }

  async getConversationStarters(locale: AssistantLocale = 'en'): Promise<string[]> {
    return DEFAULT_SUGGESTIONS[locale];
  }
}
